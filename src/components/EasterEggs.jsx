import { useState, useEffect, useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
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
  { text: '[  OK  ]  freddo-index.service .......... v0.1   live',     style: 'ok',    delay: 8540 },
  { text: '[  OK  ]  interview-help.service ......... v1.0   shipped', style: 'ok',    delay: 8700 },
  { text: '[  OK  ]  hjelply.service ............... v0.8   experimental', style: 'ok',delay: 8840 },
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

// ─── EasterEggs (main) ───────────────────────────────────────────────────────

export default function EasterEggs() {
  const [biosVisible, setBiosVisible] = useState(false);
  const konamiProgress = useRef([]);

  // Konami Code → BIOS
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

  return biosVisible ? <BiosScreen onDismiss={() => setBiosVisible(false)} /> : null;
}
