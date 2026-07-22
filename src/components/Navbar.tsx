import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Magnetic from './Magnetic';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const blur = useTransform(scrollY, [0, 100], [0, 12]);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6 flex justify-between items-center transition-colors duration-500`}
      style={{ 
        backgroundColor: `rgba(248, 248, 246, ${bgOpacity.get()})`,
        backdropFilter: `blur(${blur.get()}px)`
      }}
    >
      <Magnetic>
        <a href="#hero" className="font-serif text-xl tracking-tight block px-4 py-2" data-cursor="hover">
          Rahil<span className="italic">.</span>
        </a>
      </Magnetic>
      
      <nav className="hidden md:flex gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a1a1a]/80">
        <Magnetic><a href="#bento" className="block px-4 py-2 hover:text-[#1a1a1a] transition-colors" data-cursor="hover">About</a></Magnetic>
        <Magnetic><a href="#work" className="block px-4 py-2 hover:text-[#1a1a1a] transition-colors" data-cursor="hover">Projects</a></Magnetic>
        <Magnetic><a href="#archive" className="block px-4 py-2 hover:text-[#1a1a1a] transition-colors" data-cursor="hover">Index</a></Magnetic>
        <Magnetic><a href="#contact" className="block px-4 py-2 hover:text-[#1a1a1a] transition-colors" data-cursor="hover">Contact</a></Magnetic>
      </nav>
    </motion.header>
  );
}
