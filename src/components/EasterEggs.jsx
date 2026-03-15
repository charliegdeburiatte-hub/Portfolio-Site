import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

const AMBIENT_BUBBLES = [
  "I'm lost!",
  "I need to use the facilities.",
  "This is great value!",
  "This is too intense for me!",
  "I've been on this ride before.",
  "I'm hungry.",
  "I'm thirsty.",
  "This ride is excellent!",
  "I should hire this developer.",
  "Built in under a month?",
  "This is great value for a junior developer!",
  "Where do I send an offer?",
  "The attention to detail is remarkable.",
  "I can't believe this is entry-level work!",
  "bookmarked.",
  "...I think I've found my next hire.",
  "This person clearly loves what they do.",
  "19 releases. In two months.",
  "I'm telling all my colleagues about this.",
];

const IDLE_BUBBLES = [
  "I'm lost!",
  "Hello? Is anyone there?",
  "I've been waiting here for a while...",
  "I need to use the facilities.",
  "Is this ride broken?",
  "I wonder where the exit is.",
];

const D = '─'.repeat(54);

// Each entry: { text, style, delay }
// style: 'header' | 'ok' | 'warn' | 'crit' | 'info' | 'dim' | 'blink' | 'highlight'
// Special: { type: 'ram', delay }
const BIOS_LINES = [
  // ── POST ──────────────────────────────────────────────────────────
  { text: 'CHARLIE SYSTEM BIOS  v3.0.0',                            style: 'header',    delay: 0 },
  { text: 'American Megatrends Inc.  ©2026',                                            delay: 60 },
  { text: D,                                                         style: 'dim',       delay: 130 },
  { text: '',                                                                            delay: 180 },
  { text: 'Motherboard  : ASUS ROG MAXIMUS Z790 HERO',                                  delay: 280 },
  { text: 'BIOS Version : 3.0.0  |  Released: 2026/03/15',                              delay: 360 },
  { text: '',                                                                            delay: 420 },
  { text: 'Processor    : Intel Core i9-13900K',                                        delay: 520 },
  { text: '               24 Cores (8P+16E)  |  32 Threads',                            delay: 580 },
  { text: '               Base: 3.00GHz  |  Boost: 5.80GHz',                            delay: 640 },
  { text: '               Microcode: 0x0000002E .................. OK', style: 'ok',    delay: 780 },
  { text: '',                                                                            delay: 860 },
  { text: 'Memory Test  :',                                                              delay: 960 },
  { type: 'ram',                                                                         delay: 1060 },
  { text: '  DIMM_A1    : 24576MB DDR5-6000 CL30 ............... OK', style: 'ok',     delay: 2700 },
  { text: '  DIMM_B1    : 24576MB DDR5-6000 CL30 ............... OK', style: 'ok',     delay: 2860 },
  { text: '  Total      : 49152MB ................................ OK', style: 'ok',     delay: 3000 },
  { text: '',                                                                            delay: 3100 },
  { text: 'PCI-E Devices:',                                                              delay: 3200 },
  { text: '  [SLOT 01 x16]  NVIDIA GeForce RTX 5070 Ti ...... FOUND', style: 'highlight', delay: 3360 },
  { text: '                 VRAM: 16384MB GDDR7',                                        delay: 3440 },
  { text: '  [SLOT 02  x1]  Intel I225-V 2.5GbE ............. FOUND', style: 'ok',     delay: 3560 },
  { text: '',                                                                            delay: 3640 },
  { text: 'Storage      :',                                                              delay: 3740 },
  { text: '  [M.2_1]  Samsung 990 Pro 2TB NVMe ................. OK', style: 'ok',      delay: 3880 },
  { text: '  [M.2_2]  Not populated',                                 style: 'dim',     delay: 3980 },
  { text: '',                                                                            delay: 4060 },
  { text: 'System Info  :',                                                              delay: 4160 },
  { text: '  Product  : CharlieWorkstation MK.I',                                        delay: 4240 },
  { text: '  Serial   : CH-2026-00001',                                                  delay: 4320 },
  { text: '  UUID     : c4a110de-bur1-4tte-a716-202600000001',                           delay: 4400 },
  { text: '',                                                                            delay: 4480 },
  { text: D,                                                         style: 'dim',       delay: 4540 },
  { text: 'SYSTEM DIAGNOSTICS',                                      style: 'header',    delay: 4600 },
  { text: D,                                                         style: 'dim',       delay: 4660 },
  { text: '',                                                                            delay: 4720 },
  { text: '[ PASS ]  CPU stress test ............................ OK', style: 'ok',      delay: 4860 },
  { text: '[ PASS ]  GPU compute benchmark ....................... OK', style: 'ok',     delay: 5020 },
  { text: '[ PASS ]  Memory integrity check ..................... OK', style: 'ok',      delay: 5180 },
  { text: '[ PASS ]  NVMe read/write ............................ OK', style: 'ok',      delay: 5320 },
  { text: '[ PASS ]  git commit --sanity-check .................. OK', style: 'ok',     delay: 5460 },
  { text: '',                                                                            delay: 5560 },
  { text: '[ WARN ]  social_life.dll ............ NOT FOUND (non-critical)', style: 'warn', delay: 5680 },
  { text: '[ WARN ]  sleep.sys .................. BYPASSED (recurring)', style: 'warn', delay: 5840 },
  { text: '[ WARN ]  work_life_balance.config ... FILE MISSING',     style: 'warn',     delay: 5980 },
  { text: '[ CRIT ]  coffee_level.exe ........... STATUS: CRITICALLY LOW', style: 'crit', delay: 6120 },
  { text: '[ INFO ]  todo_list.txt .............. 847 items pending', style: 'info',    delay: 6260 },
  { text: '[ INFO ]  hyperfixation.service ....... RUNNING (normal)', style: 'info',    delay: 6380 },
  { text: '',                                                                            delay: 6460 },
  { text: D,                                                         style: 'dim',       delay: 6520 },
  { text: 'LOADING CHARLIGOS v3.0',                                  style: 'header',    delay: 6580 },
  { text: D,                                                         style: 'dim',       delay: 6640 },
  { text: '',                                                                            delay: 6700 },
  { text: '[  OK  ]  nvidia-rtx-5070ti.ko ........ loaded (CUDA 12.x)', style: 'ok',   delay: 6860 },
  { text: '[  OK  ]  local_ai_runtime.service .... started',          style: 'ok',      delay: 7020 },
  { text: '[  OK  ]  whisper.service .............. started (local)',  style: 'ok',     delay: 7160 },
  { text: '[  OK  ]  llama3.service ............... started (local)',  style: 'ok',     delay: 7300 },
  { text: '[  OK  ]  git.service ................... started',         style: 'ok',     delay: 7420 },
  { text: '[  OK  ]  claude_code.service ........... started',         style: 'ok',     delay: 7540 },
  { text: '[ WARN ]  social_life.service .......... unit not found',  style: 'warn',    delay: 7660 },
  { text: '[ WARN ]  sleep.target .................. bypassed again', style: 'warn',    delay: 7780 },
  { text: '',                                                                            delay: 7860 },
  { text: D,                                                         style: 'dim',       delay: 7920 },
  { text: 'PORTFOLIO SERVICES',                                       style: 'header',   delay: 7980 },
  { text: D,                                                         style: 'dim',       delay: 8040 },
  { text: '',                                                                            delay: 8100 },
  { text: 'Registering projects...',                                                     delay: 8200 },
  { text: '[  OK  ]  job-analyzer.service ......... v3.0   19 releases', style: 'ok',  delay: 8380 },
  { text: '[  OK  ]  julie-portfolio.service ....... v1.0   client work', style: 'ok', delay: 8540 },
  { text: '[  OK  ]  hjelply.service ............... v0.8   experimental', style: 'ok',delay: 8700 },
  { text: '[ INIT ]  interview-analyzer.service .... v0.1   standing by', style: 'info', delay: 8840 },
  { text: '',                                                                            delay: 8940 },
  { text: 'Loading skill modules...',                                                    delay: 9040 },
  { text: '  react@18 ............ comfortable .. [████████████] OK',  style: 'ok',    delay: 9200 },
  { text: '  typescript@5 ........ comfortable .. [████████████] OK',  style: 'ok',    delay: 9340 },
  { text: '  tailwindcss@3 ....... comfortable .. [████████████] OK',  style: 'ok',    delay: 9480 },
  { text: '  nodejs@20 ........... learning ..... [████████░░░░] INIT', style: 'info', delay: 9620 },
  { text: '  postgresql@16 ....... learning ..... [████████░░░░] INIT', style: 'info', delay: 9760 },
  { text: '  whisper ............. exploring .... [████░░░░░░░░] READY', style: 'highlight', delay: 9900 },
  { text: '  llama3 .............. exploring .... [████░░░░░░░░] READY', style: 'highlight', delay: 10040 },
  { text: '  pytorch ............. exploring .... [███░░░░░░░░░] INIT', style: 'info', delay: 10180 },
  { text: '',                                                                            delay: 10280 },
  { text: 'All systems nominal.  Portfolio v3.0 is ready.',           style: 'highlight', delay: 10420 },
  { text: '',                                                                            delay: 10520 },
];

const BOOT_OPTIONS = [
  { key: 'ENTER', label: 'Portfolio v3.0',   note: '(recommended)',  action: 'boot' },
  { key: '2',     label: 'Safe Mode',         note: '(limited UI)',   action: 'safe' },
  { key: '3',     label: 'BIOS Setup',        note: '(you\'re here)', action: 'setup' },
  { key: 'ESC',   label: 'Emergency Shell',   note: '(good luck)',    action: 'shell' },
];

// ─── RamCounter ───────────────────────────────────────────────────────────────

function RamCounter() {
  const MAX = 49152;
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const interval = 16;
    const increment = MAX / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(current + increment, MAX);
      setCount(Math.floor(current));
      if (current >= MAX) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const BAR_LEN = 22;
  const filled = Math.floor((count / MAX) * BAR_LEN);
  const bar    = '█'.repeat(filled) + '░'.repeat(BAR_LEN - filled);
  const done   = count >= MAX;

  return (
    <div style={{ color: done ? '#80ff80' : '#ffcc00', minHeight: '1.75em' }}>
      {`  [${bar}]  ${String(count).padStart(5)}MB / ${MAX}MB${done ? ' ......... OK' : ''}`}
    </div>
  );
}

// ─── BootMenu ─────────────────────────────────────────────────────────────────

function BootMenu({ onDismiss }) {
  const [selected, setSelected] = useState(0);
  const [message,  setMessage]  = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (message) { onDismiss(); return; }

      if (e.key === 'ArrowUp')   { setSelected(s => (s - 1 + BOOT_OPTIONS.length) % BOOT_OPTIONS.length); return; }
      if (e.key === 'ArrowDown') { setSelected(s => (s + 1) % BOOT_OPTIONS.length); return; }

      const idx = BOOT_OPTIONS.findIndex(o =>
        o.key === 'ENTER' ? e.key === 'Enter' : e.key === o.key
      );
      const target = idx >= 0 ? BOOT_OPTIONS[idx] : null;
      if (!target && e.key !== 'Escape') return;

      const action = target ? target.action : 'shell';

      if (action === 'boot') { onDismiss(); return; }
      if (action === 'safe')  setMessage('Safe Mode not available.\nPortfolio is already minimal.');
      if (action === 'setup') setMessage('You are already in BIOS Setup.\nThis is as deep as it goes.');
      if (action === 'shell') setMessage('$ _\n\nNo. Go look at the portfolio.\n\nPress any key to boot normally.');
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [message, onDismiss]);

  const W = '═'.repeat(52);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#000',
    }}>
      {message ? (
        <div style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: '14px',
          color: '#ffcc00',
          textAlign: 'center',
          lineHeight: 2,
          whiteSpace: 'pre',
        }}>
          {message}
          <div style={{ color: '#555', marginTop: '16px', fontSize: '12px' }}>
            Press any key...
          </div>
        </div>
      ) : (
        <div style={{
          fontFamily: "'JetBrains Mono', 'Courier New', monospace",
          fontSize: '14px',
          color: '#999',
          lineHeight: 1.9,
        }}>
          <div style={{ color: '#555' }}>{`╔${W}╗`}</div>
          <div style={{ color: '#555' }}>
            {'║'}<span style={{ color: '#fff', fontWeight: 'bold' }}>
              {'                    BOOT MENU                      '}
            </span>{'║'}
          </div>
          <div style={{ color: '#555' }}>{`╠${W}╣`}</div>
          <div style={{ color: '#555' }}>{'║' + ' '.repeat(52) + '║'}</div>

          {BOOT_OPTIONS.map((opt, i) => {
            const isSelected = i === selected;
            return (
              <div key={opt.key} style={{ color: '#555' }}>
                {'║  '}
                <span style={{
                  color: isSelected ? '#000' : '#ccc',
                  background: isSelected ? '#80ff80' : 'transparent',
                  fontWeight: isSelected ? 'bold' : 'normal',
                }}>
                  {isSelected ? '►' : ' '}
                  {` [${opt.key.padEnd(5)}]  ${opt.label.padEnd(24)}${opt.note.padEnd(16)}`}
                </span>
                {'║'}
              </div>
            );
          })}

          <div style={{ color: '#555' }}>{'║' + ' '.repeat(52) + '║'}</div>
          <div style={{ color: '#555' }}>{`╠${W}╣`}</div>
          <div style={{ color: '#555' }}>
            {'║'}
            <span style={{ color: '#777', fontSize: '12px' }}>
              {'  ↑↓ to select   ENTER to boot   ESC for shell          '}
            </span>
            {'║'}
          </div>
          <div style={{ color: '#555' }}>{`╚${W}╝`}</div>
        </div>
      )}
    </div>
  );
}

// ─── BiosScreen ───────────────────────────────────────────────────────────────

function BiosScreen({ onDismiss }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showMenu,     setShowMenu]     = useState(false);
  const contentRef = useRef(null);

  // Reveal lines one by one
  useEffect(() => {
    const timers = BIOS_LINES.map((line, i) =>
      setTimeout(() => {
        setVisibleCount(i + 1);
      }, line.delay)
    );
    // Show boot menu 800ms after last line
    const menuTimer = setTimeout(
      () => setShowMenu(true),
      BIOS_LINES[BIOS_LINES.length - 1].delay + 800
    );
    return () => { timers.forEach(clearTimeout); clearTimeout(menuTimer); };
  }, []);

  // Auto-scroll to bottom as lines appear
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [visibleCount]);

  const styleFor = (s) => {
    switch (s) {
      case 'header':    return { color: '#fff', fontWeight: 'bold' };
      case 'ok':        return { color: '#80ff80' };
      case 'highlight': return { color: '#80ff80', fontWeight: 'bold' };
      case 'warn':      return { color: '#ffcc00' };
      case 'crit':      return { color: '#ff6060', fontWeight: 'bold' };
      case 'info':      return { color: '#00ccff' };
      case 'dim':       return { color: '#444' };
      default:          return { color: '#999' };
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#000',
      zIndex: 10000,
      overflow: 'hidden',
      cursor: showMenu ? 'default' : 'pointer',
    }}>
      {/* Scrolling log */}
      {!showMenu && (
        <div
          ref={contentRef}
          style={{
            position: 'absolute', inset: 0,
            padding: '32px 48px',
            overflowY: 'auto',
            fontFamily: "'JetBrains Mono', 'Courier New', monospace",
            fontSize: '13px',
            lineHeight: 1.75,
            scrollbarWidth: 'none',
          }}
        >
          {BIOS_LINES.slice(0, visibleCount).map((line, i) => {
            if (line.type === 'ram') return <RamCounter key={i} />;
            return (
              <div key={i} style={{ ...styleFor(line.style), minHeight: '1.75em' }}>
                {line.text || '\u00A0'}
                {line.style === 'blink' && i === visibleCount - 1 && (
                  <span style={{ animation: 'bios-blink 1s step-end infinite' }}>█</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Boot menu overlay */}
      {showMenu && <BootMenu onDismiss={onDismiss} />}
    </div>
  );
}

// ─── FusEffect ────────────────────────────────────────────────────────────────

function FusEffect({ onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add('fus-shake');
    const removeShake = setTimeout(() => document.documentElement.classList.remove('fus-shake'), 450);
    const fadeOut     = setTimeout(() => setVisible(false), 800);
    const done        = setTimeout(onDone, 1000);
    return () => {
      clearTimeout(removeShake); clearTimeout(fadeOut); clearTimeout(done);
      document.documentElement.classList.remove('fus-shake');
    };
  }, [onDone]);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9996, pointerEvents: 'none' }}>
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '100px', height: '100px',
        border: '4px solid rgba(139, 92, 246, 0.95)',
        borderRadius: '50%',
        animation: 'fus-ring 0.9s ease-out forwards',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        width: '100px', height: '100px',
        border: '2px solid rgba(255,255,255,0.5)',
        borderRadius: '50%',
        animation: 'fus-ring 0.9s ease-out 0.07s forwards',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 'clamp(40px, 8vw, 80px)',
        fontWeight: '900',
        color: 'white',
        textShadow: '0 0 40px rgba(139,92,246,1), 0 0 80px rgba(139,92,246,0.6)',
        letterSpacing: '10px',
        whiteSpace: 'nowrap',
        animation: 'fus-text 0.9s ease-out forwards',
      }}>
        FUS RO DAH!
      </div>
    </div>
  );
}

// ─── ParkClosing ─────────────────────────────────────────────────────────────

function ParkClosing() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const h = new Date().getHours();
    if (h >= 22 || h < 4) {
      const t = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      zIndex: 9995,
      background: 'rgba(8, 6, 18, 0.96)',
      borderTop: '1px solid rgba(139, 92, 246, 0.25)',
      padding: '10px 20px',
      display: 'flex', alignItems: 'center', gap: '14px',
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px', color: 'rgba(139, 92, 246, 0.65)',
        letterSpacing: '2px', textTransform: 'uppercase', flexShrink: 0,
      }}>📢 PA</span>
      <span style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '13px', color: 'rgba(196, 181, 253, 0.75)',
      }}>
        This park will be closing soon. Please make your way to the exit. Thank you for visiting.
      </span>
      <button
        onClick={() => setVisible(false)}
        style={{
          marginLeft: 'auto', background: 'none', border: 'none',
          color: 'rgba(139, 92, 246, 0.45)', cursor: 'pointer',
          fontSize: '18px', lineHeight: 1, flexShrink: 0, padding: '0 4px',
        }}
        aria-label="Dismiss"
      >×</button>
    </div>
  );
}

// ─── ThoughtBubble ────────────────────────────────────────────────────────────

function ThoughtBubble({ id, message, x, y, onRemove }) {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeIn  = setTimeout(() => setOpacity(1), 30);
    const fadeOut = setTimeout(() => setOpacity(0), 3400);
    const remove  = setTimeout(() => onRemove(id), 3900);
    return () => { clearTimeout(fadeIn); clearTimeout(fadeOut); clearTimeout(remove); };
  }, [id, onRemove]);

  return (
    <div style={{
      position: 'fixed', left: x, top: y,
      zIndex: 9998, pointerEvents: 'none',
      opacity, transition: 'opacity 0.4s ease',
      transform: 'translate(-50%, calc(-100% - 14px))',
    }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div style={{
          background: 'white', border: '2px solid #222',
          borderRadius: '6px', padding: '7px 13px',
          fontSize: '13px', fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#111', whiteSpace: 'nowrap', maxWidth: '260px',
          boxShadow: '3px 3px 0 rgba(0,0,0,0.2)', lineHeight: 1.4,
        }}>
          {message}
        </div>
        <div style={{
          position: 'absolute', bottom: '-11px', left: '18px',
          width: 0, height: 0,
          borderLeft: '9px solid transparent', borderRight: '9px solid transparent',
          borderTop: '10px solid #222',
        }} />
        <div style={{
          position: 'absolute', bottom: '-8px', left: '20px',
          width: 0, height: 0,
          borderLeft: '7px solid transparent', borderRight: '7px solid transparent',
          borderTop: '8px solid white',
        }} />
      </div>
    </div>
  );
}

// ─── EasterEggs (main) ───────────────────────────────────────────────────────

export default function EasterEggs() {
  const [biosVisible, setBiosVisible] = useState(false);
  const [fusVisible,  setFusVisible]  = useState(false);
  const [bubbles,     setBubbles]     = useState([]);

  const konamiProgress     = useRef([]);
  const fusBuffer          = useRef('');
  const idleTimer          = useRef(null);
  const bubbleTimer        = useRef(null);
  const bubbleId           = useRef(0);
  const fusCooldown        = useRef(false);
  const fastScrollCooldown = useRef(false);

  const spawnBubble = useCallback((message) => {
    const id = ++bubbleId.current;
    const margin = 140;
    const x = margin + Math.random() * (window.innerWidth  - margin * 2);
    const y = margin + Math.random() * (window.innerHeight - margin * 2);
    setBubbles(prev => [...prev.slice(-2), { id, message, x, y }]);
  }, []);

  const removeBubble = useCallback((id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
  }, []);

  // Ambient bubbles — every 2–4 minutes
  useEffect(() => {
    const schedule = () => {
      const delay = 120000 + Math.random() * 120000;
      bubbleTimer.current = setTimeout(() => {
        spawnBubble(AMBIENT_BUBBLES[Math.floor(Math.random() * AMBIENT_BUBBLES.length)]);
        schedule();
      }, delay);
    };
    schedule();
    return () => clearTimeout(bubbleTimer.current);
  }, [spawnBubble]);

  // Idle bubble — 60s of no interaction
  const resetIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      spawnBubble(IDLE_BUBBLES[Math.floor(Math.random() * IDLE_BUBBLES.length)]);
    }, 60000);
  }, [spawnBubble]);

  useEffect(() => {
    resetIdle();
    const events = ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'];
    events.forEach(e => window.addEventListener(e, resetIdle, { passive: true }));
    return () => {
      clearTimeout(idleTimer.current);
      events.forEach(e => window.removeEventListener(e, resetIdle));
    };
  }, [resetIdle]);

  // Fast-scroll bubble
  useEffect(() => {
    let lastY = window.scrollY, lastT = Date.now();
    const onScroll = () => {
      const now = Date.now();
      const dy  = Math.abs(window.scrollY - lastY);
      const dt  = now - lastT;
      if (dt > 0 && dy / dt > 3 && !fastScrollCooldown.current) {
        fastScrollCooldown.current = true;
        spawnBubble('I feel sick!');
        setTimeout(() => { fastScrollCooldown.current = false; }, 10000);
      }
      lastY = window.scrollY; lastT = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [spawnBubble]);

  // Konami Code
  useEffect(() => {
    const onKey = (e) => {
      konamiProgress.current.push(e.key);
      if (konamiProgress.current.length > KONAMI.length) konamiProgress.current.shift();
      if (JSON.stringify(konamiProgress.current) === JSON.stringify(KONAMI)) {
        konamiProgress.current = [];
        setBiosVisible(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // FUS RO DAH
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (fusCooldown.current) return;
      fusBuffer.current = (fusBuffer.current + e.key.toUpperCase()).slice(-9);
      if (fusBuffer.current.includes('FUSRODAH')) {
        fusBuffer.current = '';
        fusCooldown.current = true;
        setFusVisible(true);
        setTimeout(() => { fusCooldown.current = false; }, 3000);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {biosVisible && <BiosScreen onDismiss={() => setBiosVisible(false)} />}
      {fusVisible  && <FusEffect  onDone={() => setFusVisible(false)} />}
      <ParkClosing />
      {bubbles.map(b => (
        <ThoughtBubble
          key={b.id} id={b.id}
          message={b.message} x={b.x} y={b.y}
          onRemove={removeBubble}
        />
      ))}
    </>
  );
}
