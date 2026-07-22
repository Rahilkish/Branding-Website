/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Hero from './components/Hero';
import Work from './components/Work';
import Archive from './components/Archive';
import BentoGrid from './components/BentoGrid';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) return;
    
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, [isLoading]);

  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-sand text-charcoal selection:bg-accent/20 cursor-none md:cursor-none">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <Navbar />
      
      {/* Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[200] mix-blend-multiply opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>

      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-charcoal/20 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <main>
        <Hero />
        <BentoGrid />
        <Work />
        <Archive />
        <Contact />
      </main>
    </div>
  );
}
