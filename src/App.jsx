import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import EasterEggs from './components/EasterEggs';
import CVModal from './components/CVModal';
import useSpecular from './hooks/useSpecular';

function App() {
  const [cvOpen, setCvOpen] = useState(false);
  const openCV = () => setCvOpen(true);
  useSpecular();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-frost focus:px-4 focus:py-3 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Navigation onOpenCV={openCV} />
      <main id="main">
        <Hero onOpenCV={openCV} />
        <div className="relative">
          <div className="spine" aria-hidden="true" />
          <Projects />
          <About />
          <Skills />
          <Contact onOpenCV={openCV} />
        </div>
      </main>
      <Footer />
      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
      <EasterEggs />
    </>
  );
}

export default App;
