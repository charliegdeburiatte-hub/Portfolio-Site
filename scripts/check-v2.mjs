// Acceptance tests for BRIEF CHANGES v2.
//
// Usage: npm run build && node scripts/check-v2.mjs [url]
// With no url it serves dist/ itself with `vite preview` and stops it afterwards.
// Prints PASS or FAIL per test at 1440px and 390px and exits 1 if anything fails.
//
// The page marks what the tests look for with data-check attributes:
//   name-block      the nameplate around Charlie's name
//   analyser-panel  the glass Analyser panel
//   grain           the pebble grain layer
//   scale           the engraved scale; its major ticks carry data-tick="major"
// Photographs (img elements) are left out of the pixel checks, with a margin
// for the glass blur that spreads their colours past their edges.

import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const BRASS = /#c4a06a|rgba?\(\s*196[\s,]+160[\s,]+106/i;
const FONTS = ['Michroma', 'Hanken Grotesk Variable'];
const BANNED_FONTS = /\b(inter|geist|roboto|open sans|space grotesk|arial|helvetica|segoe|system-ui|-apple-system|blinkmacsystemfont)\b/i;
const PHOTO_MARGIN = 24; // px around each photo, twice the minimum glass blur

let failures = 0;
const report = (ok, id, name, width, detail) => {
  if (!ok) failures += 1;
  const where = width ? ` @${width}` : '';
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${String(id).padEnd(5)} ${name}${where}${detail ? `  (${detail})` : ''}`);
};

async function startPreview() {
  const port = 4179;
  const proc = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], { stdio: 'pipe' });
  const url = `http://localhost:${port}`;
  for (let i = 0; i < 60; i += 1) {
    try { if ((await fetch(url)).ok) return { url, proc }; } catch { /* not up yet */ }
    await new Promise((r) => setTimeout(r, 250));
  }
  proc.kill();
  throw new Error('vite preview did not start; run npm run build first');
}

// Where the photographs are on the current screen, padded for the glass blur around them
const photoRects = (page) => page.evaluate((m) => [...document.querySelectorAll('img, picture, video')]
  .map((el) => el.getBoundingClientRect())
  .filter((r) => r.width && r.height)
  .map((r) => [r.left - m, r.top - m, r.right + m, r.bottom + m]), PHOTO_MARGIN);

// Screenshot the whole page one viewport at a time, so each check sees what a screen sees
async function screens(page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewportSize().height;
  const shots = [];
  for (let y = 0; y < height; y += vh) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(120);
    shots.push({ png: (await page.screenshot()).toString('base64'), photos: await photoRects(page) });
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return shots;
}

// Pixel maths runs in a blank page through a canvas, so no image library is needed
async function analyse(browser, shot) {
  const p = await browser.newPage();
  const result = await p.evaluate(async ({ png, photos }) => {
    const img = new Image();
    img.src = `data:image/png;base64,${png}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = img.width; c.height = img.height;
    const g = c.getContext('2d', { willReadFrequently: true });
    g.drawImage(img, 0, 0);
    const { data } = g.getImageData(0, 0, c.width, c.height);
    const inPhoto = (x, y) => photos.some(([l, t, r, b]) => x >= l && x < r && y >= t && y < b);
    let red = 0, warm = 0, total = 0;
    let firstWarm = null;
    for (let i = 0, n = 0; i < data.length; i += 4, n += 1) {
      const x = n % c.width, y = (n / c.width) | 0;
      const r = data[i] / 255, gr = data[i + 1] / 255, b = data[i + 2] / 255;
      const max = Math.max(r, gr, b), min = Math.min(r, gr, b), d = max - min;
      const l = (max + min) / 2;
      const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
      let h = 0;
      if (d) {
        if (max === r) h = 60 * (((gr - b) / d) % 6);
        else if (max === gr) h = 60 * ((b - r) / d + 2);
        else h = 60 * ((r - gr) / d + 4);
        if (h < 0) h += 360;
      }
      total += 1;
      // Signal red #D6232A sits at hue 358, 72% saturation, 49% lightness
      if ((h >= 345 || h <= 12) && s >= 0.5 && l >= 0.2 && l <= 0.8) red += 1;
      if (h >= 20 && h <= 60 && s > 0.2 && !inPhoto(x, y)) {
        warm += 1;
        if (!firstWarm) firstWarm = { x, y, rgb: [data[i], data[i + 1], data[i + 2]] };
      }
    }
    return { red: red / total, warm, firstWarm };
  }, shot);
  await p.close();
  return result;
}

async function domChecks(page) {
  return page.evaluate(({ fonts, bannedSrc }) => {
    const banned = new RegExp(bannedSrc, 'i');
    const out = {};
    const all = [...document.querySelectorAll('*')];

    // 1. text-align: center anywhere
    const centred = all.filter((el) => getComputedStyle(el).textAlign === 'center');
    out.centred = centred.slice(0, 5).map((el) => `${el.tagName.toLowerCase()}.${(el.getAttribute('class') ?? '').slice(0, 30)}`);
    out.centredCount = centred.length;

    // 3. Analyser panel blur
    const panel = document.querySelector('[data-check="analyser-panel"]');
    if (panel) {
      const s = getComputedStyle(panel);
      const f = s.backdropFilter || s.webkitBackdropFilter || '';
      const m = f.match(/blur\(([\d.]+)px\)/);
      out.blur = m ? Number(m[1]) : 0;
      out.blurRaw = f;
    }

    // Column edges: the hero grid's columns, read from the grid itself
    const heroGrid = document.querySelector('#top .grid-12');
    const cols = [];
    if (heroGrid) {
      const gs = getComputedStyle(heroGrid);
      const left = heroGrid.getBoundingClientRect().left;
      const widths = gs.gridTemplateColumns.split(' ').map(parseFloat);
      const gap = parseFloat(gs.columnGap) || 0;
      let x = left;
      for (const w of widths) { cols.push(x); x += w + gap; }
    }
    out.cols = cols;

    // 4. Content span: the union of real content boxes (text runs and replaced elements)
    const main = document.querySelector('main');
    let minL = Infinity, maxR = -Infinity;
    const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let n = walker.currentNode; n; n = walker.nextNode()) {
      let rects = [];
      if (n.nodeType === 3) {
        if (!n.textContent.trim()) continue;
        // Screen-reader-only text sits in a clipped 1px box; it is not visible content
        const box = n.parentElement.getBoundingClientRect();
        if (box.width <= 1 && box.height <= 1) continue;
        const range = document.createRange(); range.selectNodeContents(n); rects = [...range.getClientRects()];
      } else if (/^(IMG|SVG|INPUT|TEXTAREA|BUTTON|SELECT|VIDEO|CANVAS)$/i.test(n.tagName)) {
        rects = [n.getBoundingClientRect()];
      } else continue;
      for (const r of rects) {
        if (!r.width || !r.height) continue;
        minL = Math.min(minL, r.left); maxR = Math.max(maxR, r.right);
      }
    }
    out.span = (maxR - minL) / window.innerWidth;
    out.overflow = document.documentElement.scrollWidth - window.innerWidth;
    out.spanPx = [Math.round(minL), Math.round(maxR)];

    // 5. Name block at column 1
    const name = document.querySelector('[data-check="name-block"]');
    out.nameLeft = name ? name.getBoundingClientRect().left : null;

    // 7. Scale ticks against column edges
    const scale = document.querySelector('[data-check="scale"]');
    const ticks = scale ? [...scale.querySelectorAll('[data-tick="major"]')]
      .filter((t) => t.getBoundingClientRect().width > 0 || t.getBoundingClientRect().height > 0)
      .map((t) => t.getBoundingClientRect().left) : [];
    out.ticks = ticks;
    out.scaleVisible = !!scale && scale.getBoundingClientRect().height > 0;

    // 8. Knurl: two crossed repeating gradients, counted on elements and their pseudo-elements
    const isKnurl = (bg) => /repeating-linear-gradient\(45deg/.test(bg) && /repeating-linear-gradient\(-45deg/.test(bg);
    let knurl = 0;
    const knurlEls = [];
    for (const el of all) {
      for (const pseudo of [null, '::before', '::after']) {
        if (isKnurl(getComputedStyle(el, pseudo).backgroundImage)) { knurl += 1; knurlEls.push(`${el.tagName.toLowerCase()}${pseudo ?? ''}`); }
      }
    }
    out.knurl = knurl; out.knurlEls = knurlEls;

    // 9. Grain opacity, multiplied up through its ancestors
    const grain = document.querySelector('[data-check="grain"]');
    if (grain) {
      let o = 1;
      for (let el = grain; el; el = el.parentElement) o *= parseFloat(getComputedStyle(el).opacity);
      out.grain = o;
    }

    // Font check: every visible element with its own text uses one of the two faces
    const wrongFont = [];
    const bannedUse = new Set();
    for (const el of all) {
      const s = getComputedStyle(el);
      if (banned.test(s.fontFamily)) bannedUse.add(s.fontFamily);
      const ownText = [...el.childNodes].some((c) => c.nodeType === 3 && c.textContent.trim());
      if (!ownText || !el.getClientRects().length || s.visibility === 'hidden') continue;
      const first = s.fontFamily.split(',')[0].trim().replace(/^["']|["']$/g, '');
      if (!fonts.includes(first)) wrongFont.push(`${el.tagName.toLowerCase()}: ${first}`);
    }
    out.wrongFont = [...new Set(wrongFont)].slice(0, 5);
    out.wrongFontCount = wrongFont.length;
    out.bannedFonts = [...bannedUse];
    out.fontsLoaded = fonts.map((f) => [f, document.fonts.check(`16px "${f}"`)]);
    return out;
  }, { fonts: FONTS, bannedSrc: BANNED_FONTS.source });
}

async function cssHasBrass(page) {
  return page.evaluate(async (src) => {
    const re = new RegExp(src, 'i');
    const hits = [];
    for (const sheet of document.styleSheets) {
      let text = '';
      if (sheet.href) text = await (await fetch(sheet.href)).text();
      else text = sheet.ownerNode?.textContent ?? '';
      if (re.test(text)) hits.push(sheet.href ?? 'inline <style>');
    }
    for (const el of document.querySelectorAll('[style]')) {
      if (re.test(el.getAttribute('style'))) hits.push(`style="" on ${el.tagName.toLowerCase()}`);
    }
    return hits;
  }, BRASS.source);
}

async function run(url) {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    console.log(`\n── ${width}px ──`);

    const d = await domChecks(page);

    report(d.centredCount === 0, 1, 'No element has text-align: center', width,
      d.centredCount ? `${d.centredCount} found, e.g. ${d.centred.join(', ')}` : '');

    const brass = await cssHasBrass(page);
    report(brass.length === 0, 2, '#C4A06A appears nowhere in the CSS', width, brass.join(', '));

    report(d.blur != null && d.blur >= 12, 3, 'Analyser panel backdrop-filter blur is 12px or more', width,
      d.blur == null ? 'panel not found' : `computed: ${d.blurRaw || 'none'}`);

    if (width === 1440) {
      report(d.span >= 0.85, 4, 'Page content spans at least 85% of the viewport', width,
        `${(d.span * 100).toFixed(1)}%, x ${d.spanPx[0]} to ${d.spanPx[1]}`);
    }

    // Not one of the ten tests: a span over 100% would only mean the page scrolls sideways
    report(d.overflow <= 0, 'extra', 'No horizontal scroll', width, d.overflow > 0 ? `${d.overflow}px wider than the viewport` : '');

    const col1 = d.cols[0];
    report(d.nameLeft != null && col1 != null && Math.abs(d.nameLeft - col1) <= 1, 5, 'Name block starts at grid column 1', width,
      d.nameLeft == null ? 'name block not found' : `name x ${d.nameLeft.toFixed(1)}, column 1 x ${col1?.toFixed(1)}`);

    const shots = await screens(page);
    // One more screen with keyboard focus showing, so the red focus ring is counted too
    await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
    shots.push({ png: (await page.screenshot()).toString('base64'), photos: await photoRects(page) });
    const results = [];
    for (const s of shots) results.push(await analyse(browser, s));
    const worstRed = Math.max(...results.map((r) => r.red));
    report(worstRed < 0.01, 6, 'Red #D6232A covers under 1% of pixels on every screen', width,
      `worst screen ${(worstRed * 100).toFixed(3)}% over ${shots.length} screens`);

    if (width === 1440) {
      const misaligned = d.ticks.filter((x) => !d.cols.some((c) => Math.abs(c - x) <= 1));
      report(d.ticks.length >= 12 && misaligned.length === 0, 7, 'Scale has 12+ major ticks, each on a grid column', width,
        `${d.ticks.length} major ticks, ${misaligned.length} off-column`);
    }

    report(d.knurl === 1, 8, 'Exactly one element uses the knurl pattern', width,
      `${d.knurl} found${d.knurlEls.length ? `: ${d.knurlEls.join(', ')}` : ''}`);

    report(d.grain != null && d.grain <= 0.04, 9, 'Grain layer at 4% opacity or less', width,
      d.grain == null ? 'grain layer not found' : `effective opacity ${(d.grain * 100).toFixed(1)}%`);

    const warm = results.reduce((n, r) => n + r.warm, 0);
    const firstWarm = results.find((r) => r.firstWarm)?.firstWarm;
    report(warm === 0, 10, 'No warm pixels (hue 20-60, saturation over 20%) outside photographs', width,
      warm ? `${warm} px, first at ${firstWarm.x},${firstWarm.y} rgb(${firstWarm.rgb.join(',')})` : '');

    const loaded = d.fontsLoaded.every(([, ok]) => ok);
    report(loaded && d.wrongFontCount === 0 && d.bannedFonts.length === 0, 'font', 'Only Michroma and Hanken Grotesk render text; no banned faces', width,
      [!loaded && `not loaded: ${d.fontsLoaded.filter(([, ok]) => !ok).map(([f]) => f).join(', ')}`,
        d.wrongFontCount && `${d.wrongFontCount} elements, e.g. ${d.wrongFont.join('; ')}`,
        d.bannedFonts.length && `banned in font stacks: ${d.bannedFonts.join(' | ')}`].filter(Boolean).join('; '));

    await page.close();
  }
  await browser.close();
}

const argUrl = process.argv[2];
let preview = null;
try {
  const url = argUrl ?? (preview = await startPreview()).url;
  await run(url);
} finally {
  preview?.proc.kill();
}
console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);
