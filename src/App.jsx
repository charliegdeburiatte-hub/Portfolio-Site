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

function App() {
  const [cvOpen, setCvOpen] = useState(false);
  const openCV = () => setCvOpen(true);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-[3px] focus:bg-raised focus:px-4 focus:py-3 focus:font-semibold focus:text-text"
      >
        Skip to content
      </a>
      <div className="grid-guides" aria-hidden="true">
        <div className="wrap grid-12">
          {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
        </div>
      </div>
      <Navigation onOpenCV={openCV} />
      <main id="main">
        <Hero onOpenCV={openCV} />
        <Projects />
        <About />
        <Skills />
        <Contact onOpenCV={openCV} />
      </main>
      <Footer />
      <CVModal open={cvOpen} onClose={() => setCvOpen(false)} />
      <EasterEggs />
    </>
  );
}

export default App;
