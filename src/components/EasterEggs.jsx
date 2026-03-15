import { useState, useEffect, useCallback, useRef } from 'react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
];

const AMBIENT_BUBBLES = [
  // RCT classics
  "I'm lost!",
  "I feel sick!",
  "I need to use the facilities.",
  "This is great value!",
  "This is too intense for me!",
  "I've been on this ride before.",
  "I'm hungry.",
  "I'm thirsty.",
  // Portfolio-specific
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
  "This ride is excellent!",
];

const IDLE_BUBBLES = [
  "I'm lost!",
  "Hello? Is anyone there?",
  "I've been waiting here for a while...",
  "I need to use the facilities.",
  "Is this ride broken?",
  "I wonder where the exit is.",
];

const AGE_STAGES = [
  { id: 'projects', name: 'Feudal Age',    sub: 'Building tools. Shipping code.' },
  { id: 'about',    name: 'Castle Age',    sub: 'The story so far.' },
  { id: 'skills',   name: 'Imperial Age',  sub: 'Full arsenal unlocked.' },
  { id: 'contact',  name: 'Post-Imperial', sub: 'Send a raven.' },
];

const BIOS_LINES = [
  { text: 'CHARLIE SYSTEM BIOS v3.0',                                   style: 'header' },
  { text: 'Copyright (C) 2026  Charlie de Buriatte' },
  { text: '' },
  { text: 'CPU  : Intel Core i9-13900K @ 3.00GHz ........... OK' },
  { text: 'RAM  : 49152MB ..................................... OK' },
  { text: 'GPU  : NVIDIA GeForce RTX 5070 Ti .............. FOUND',     style: 'highlight' },
  { text: '' },
  { text: 'Initialising local AI subsystems...' },
  { text: '  Whisper (speech-to-text) .................... LOADED' },
  { text: '  Llama 3 (local inference) ............... STANDING BY' },
  { text: '  VRAM: 16GB reserved ........................ READY',        style: 'highlight' },
  { text: '' },
  { text: 'BOOT DEVICE: Portfolio v3.0',                                style: 'highlight' },
  { text: '' },
  { text: 'Press any key to continue...',                               style: 'blink' },
];

const BIOS_DELAYS = [0, 80, 160, 320, 480, 640, 760, 960, 1100, 1250, 1400, 1560, 1760, 1900, 2300];

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
    <div
      style={{
        position: 'fixed',
        left: x,
        top: y,
        zIndex: 9998,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.4s ease',
        transform: 'translate(-50%, calc(-100% - 14px))',
      }}
    >
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {/* Bubble body */}
        <div style={{
          background: 'white',
          border: '2px solid #222',
          borderRadius: '6px',
          padding: '7px 13px',
          fontSize: '13px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#111',
          whiteSpace: 'nowrap',
          maxWidth: '260px',
          boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
          lineHeight: 1.4,
        }}>
          {message}
        </div>
        {/* Tail outer (border colour) */}
        <div style={{
          position: 'absolute',
          bottom: '-11px',
          left: '18px',
          width: 0, height: 0,
          borderLeft: '9px solid transparent',
          borderRight: '9px solid transparent',
          borderTop: '10px solid #222',
        }} />
        {/* Tail inner (fill colour) */}
        <div style={{
          position: 'absolute',
          bottom: '-8px',
          left: '20px',
          width: 0, height: 0,
          borderLeft: '7px solid transparent',
          borderRight: '7px solid transparent',
          borderTop: '8px solid white',
        }} />
      </div>
    </div>
  );
}

// ─── AgeNotification ─────────────────────────────────────────────────────────

function AgeNotification({ stage, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 50);
    const hide = setTimeout(() => setVisible(false), 2800);
    const done = setTimeout(onDone, 3300);
    return () => { clearTimeout(show); clearTimeout(hide); clearTimeout(done); };
  }, [onDone]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: `translate(-50%, -50%) scale(${visible ? 1 : 0.85})`,
      zIndex: 9997,
      pointerEvents: 'none',
      opacity: visible ? 1 : 0,
      transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      textAlign: 'center',
    }}>
      <div style={{
        background: 'rgba(8, 6, 18, 0.94)',
        border: '1px solid rgba(212, 175, 55, 0.45)',
        borderRadius: '4px',
        padding: '22px 48px',
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.15), 0 8px 32px rgba(0,0,0,0.7)',
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: 'rgba(212, 175, 55, 0.6)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          You have advanced to the
        </div>
        <div style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '30px',
          fontWeight: '700',
          color: '#D4AF37',
          letterSpacing: '1px',
          textShadow: '0 0 24px rgba(212, 175, 55, 0.5)',
        }}>
          {stage.name}
        </div>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'rgba(212, 175, 55, 0.45)',
          marginTop: '8px',
          fontStyle: 'italic',
        }}>
          {stage.sub}
        </div>
      </div>
    </div>
  );
}

// ─── BiosScreen ───────────────────────────────────────────────────────────────

function BiosScreen({ onDismiss }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timers = BIOS_DELAYS.map((delay, i) =>
      setTimeout(() => setVisibleCount(i + 1), delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const dismiss = () => onDismiss();
    window.addEventListener('keydown', dismiss);
    window.addEventListener('click', dismiss);
    return () => {
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('click', dismiss);
    };
  }, [onDismiss]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: '#000',
      zIndex: 10000,
      padding: '48px 64px',
      cursor: 'pointer',
      overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', 'Courier New', monospace",
        fontSize: '14px',
        lineHeight: 1.75,
      }}>
        {BIOS_LINES.slice(0, visibleCount).map((line, i) => {
          let color = '#999';
          let fontWeight = 'normal';
          if (line.style === 'header')    { color = '#fff'; fontWeight = 'bold'; }
          if (line.style === 'highlight') { color = '#80ff80'; }

          return (
            <div key={i} style={{ color, fontWeight, minHeight: '1.75em' }}>
              {line.text || '\u00A0'}
              {line.style === 'blink' && i === visibleCount - 1 && (
                <span style={{ animation: 'bios-blink 1s step-end infinite' }}>█</span>
              )}
            </div>
          );
        })}
      </div>
      <style>{`@keyframes bios-blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

// ─── FusEffect ────────────────────────────────────────────────────────────────

function FusEffect({ onDone }) {
  const [phase, setPhase] = useState('flash');

  useEffect(() => {
    const toWave = setTimeout(() => setPhase('wave'), 80);
    const toDone = setTimeout(() => { setPhase('done'); onDone(); }, 1000);
    return () => { clearTimeout(toWave); clearTimeout(toDone); };
  }, [onDone]);

  if (phase === 'done') return null;

  return (
    <>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9996,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {/* Screen flash */}
        {phase === 'flash' && (
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.12)' }} />
        )}

        {/* Shockwave rings */}
        {phase === 'wave' && (
          <>
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '80px', height: '80px',
              border: '3px solid rgba(139, 92, 246, 0.9)',
              borderRadius: '50%',
              animation: 'fus-ring 0.9s ease-out forwards',
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              width: '80px', height: '80px',
              border: '2px solid rgba(255,255,255,0.35)',
              borderRadius: '50%',
              animation: 'fus-ring 0.9s ease-out 0.08s forwards',
            }} />
          </>
        )}

        {/* Text */}
        {phase === 'wave' && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: '900',
            color: 'white',
            textShadow: '0 0 30px rgba(139,92,246,0.9), 0 0 60px rgba(139,92,246,0.5)',
            letterSpacing: '10px',
            animation: 'fus-text 0.9s ease-out forwards',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            FUS RO DAH!
          </div>
        )}
      </div>

      <style>{`
        @keyframes fus-ring {
          from { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          to   { transform: translate(-50%, -50%) scale(28); opacity: 0; }
        }
        @keyframes fus-text {
          0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6); }
          15%  { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
          65%  { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.15); }
        }
      `}</style>
    </>
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
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9995,
      background: 'rgba(8, 6, 18, 0.96)',
      borderTop: '1px solid rgba(139, 92, 246, 0.25)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        color: 'rgba(139, 92, 246, 0.65)',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        flexShrink: 0,
      }}>
        📢 PA
      </span>
      <span style={{
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '13px',
        color: 'rgba(196, 181, 253, 0.75)',
      }}>
        This park will be closing soon. Please make your way to the exit. Thank you for visiting.
      </span>
      <button
        onClick={() => setVisible(false)}
        style={{
          marginLeft: 'auto',
          background: 'none',
          border: 'none',
          color: 'rgba(139, 92, 246, 0.45)',
          cursor: 'pointer',
          fontSize: '18px',
          lineHeight: 1,
          flexShrink: 0,
          padding: '0 4px',
        }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  );
}

// ─── EasterEggs (main) ───────────────────────────────────────────────────────

export default function EasterEggs() {
  const [biosVisible, setBiosVisible] = useState(false);
  const [fusVisible,  setFusVisible]  = useState(false);
  const [bubbles,     setBubbles]     = useState([]);
  const [ageStage,    setAgeStage]    = useState(null);

  const konamiProgress = useRef([]);
  const fusBuffer      = useRef('');
  const idleTimer      = useRef(null);
  const bubbleTimer    = useRef(null);
  const seenAges       = useRef(new Set());
  const bubbleId       = useRef(0);
  const fusCooldown    = useRef(false);
  const fastScrollCooldown = useRef(false);

  // ── Spawn a thought bubble ──────────────────────────────────────────────────
  const spawnBubble = useCallback((message) => {
    const id = ++bubbleId.current;
    const margin = 120;
    const x = margin + Math.random() * (window.innerWidth  - margin * 2);
    const y = margin + Math.random() * (window.innerHeight - margin * 2);
    setBubbles(prev => [...prev.slice(-2), { id, message, x, y }]); // cap at 3
  }, []);

  const removeBubble = useCallback((id) => {
    setBubbles(prev => prev.filter(b => b.id !== id));
  }, []);

  // ── Ambient bubbles (random interval) ──────────────────────────────────────
  useEffect(() => {
    const schedule = () => {
      const delay = 18000 + Math.random() * 22000; // 18–40 s
      bubbleTimer.current = setTimeout(() => {
        const msg = AMBIENT_BUBBLES[Math.floor(Math.random() * AMBIENT_BUBBLES.length)];
        spawnBubble(msg);
        schedule();
      }, delay);
    };
    // First bubble after 20 s so it doesn't feel instant
    bubbleTimer.current = setTimeout(() => {
      schedule();
      spawnBubble(AMBIENT_BUBBLES[Math.floor(Math.random() * AMBIENT_BUBBLES.length)]);
    }, 20000);
    return () => clearTimeout(bubbleTimer.current);
  }, [spawnBubble]);

  // ── Idle bubble ─────────────────────────────────────────────────────────────
  const resetIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      const msg = IDLE_BUBBLES[Math.floor(Math.random() * IDLE_BUBBLES.length)];
      spawnBubble(msg);
    }, 45000);
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

  // ── Fast-scroll bubble ──────────────────────────────────────────────────────
  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = Date.now();

    const onScroll = () => {
      const now = Date.now();
      const dy  = Math.abs(window.scrollY - lastY);
      const dt  = now - lastT;
      if (dt > 0 && dy / dt > 3 && !fastScrollCooldown.current) {
        fastScrollCooldown.current = true;
        spawnBubble('I feel sick!');
        setTimeout(() => { fastScrollCooldown.current = false; }, 6000);
      }
      lastY = window.scrollY;
      lastT = now;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [spawnBubble]);

  // ── Konami Code ─────────────────────────────────────────────────────────────
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

  // ── FUS RO DAH ──────────────────────────────────────────────────────────────
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

  // ── Age Advancement ─────────────────────────────────────────────────────────
  useEffect(() => {
    const observers = AGE_STAGES.map(stage => {
      const el = document.getElementById(stage.id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !seenAges.current.has(stage.id)) {
            seenAges.current.add(stage.id);
            setAgeStage(stage);
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, []);

  return (
    <>
      {biosVisible && <BiosScreen onDismiss={() => setBiosVisible(false)} />}
      {fusVisible  && <FusEffect  onDone={() => setFusVisible(false)} />}
      {ageStage    && <AgeNotification stage={ageStage} onDone={() => setAgeStage(null)} />}
      <ParkClosing />
      {bubbles.map(b => (
        <ThoughtBubble
          key={b.id}
          id={b.id}
          message={b.message}
          x={b.x}
          y={b.y}
          onRemove={removeBubble}
        />
      ))}
    </>
  );
}
