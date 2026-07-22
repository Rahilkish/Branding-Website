import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [counter, setCounter] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Paced loading simulator with randomized, organic steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Organic pacing: speeds up and slows down dynamically
        const increment = Math.floor(Math.random() * 3) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  // Track mouse position to give subtle gravity warp to the fluid goo
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.08;
      const y = (e.clientY - window.innerHeight / 2) * 0.08;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Trigger page reveal once the organic expansion finishes
  useEffect(() => {
    if (counter === 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000); // Allow expansion animation to fully blossom
      return () => clearTimeout(timer);
    }
  }, [counter, onComplete]);

  const isCompleted = counter === 100;

  // Kinetic orbital parameters for gooey liquid elements
  const orbitRadius = Math.max(0, 150 - (counter * 1.7)); // shrink to 0 as they coalesce
  const angle = (counter / 100) * Math.PI * 4; // 2 complete rotations

  // Elegant status coordinates
  const density = (1.2 + (counter * 0.015)).toFixed(3);
  const alignment = counter.toString().padStart(3, '0');

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[999] bg-charcoal flex flex-col items-center justify-center text-sand overflow-hidden select-none"
    >
      {/* Subtle organic noise grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{ 
          backgroundImage: "url('data:image/svg+xml;utf8,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" 
        }}
      />

      {/* Behind-the-scenes engineering grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center">
        <div className="w-full h-full border-t border-b border-sand/20 absolute" style={{ height: '50%' }} />
        <div className="w-full h-full border-l border-r border-sand/20 absolute" style={{ width: '50%' }} />
      </div>

      {/* Interactive Compass drafting circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ rotate: counter * 0.8 }}
          className="absolute w-[280px] h-[280px] rounded-full border border-sand/5 flex items-center justify-center"
        >
          <div className="absolute inset-0 border border-dashed border-sand/10 rounded-full" />
          <span className="absolute top-2 text-[7px] font-mono text-sand/35 tracking-wider">00°N</span>
          <span className="absolute right-2 text-[7px] font-mono text-sand/35 tracking-wider">90°E</span>
          <span className="absolute bottom-2 text-[7px] font-mono text-sand/35 tracking-wider">180°S</span>
          <span className="absolute left-2 text-[7px] font-mono text-sand/35 tracking-wider">270°W</span>
        </motion.div>

        <motion.div 
          animate={{ rotate: -counter * 0.4 }}
          className="absolute w-[420px] h-[420px] rounded-full border border-dashed border-sand/5"
        />
        
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute w-[560px] h-[560px] rounded-full border border-sand/[0.02]"
        />
      </div>

      {/* SVG Gooey Filter definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="gooey-preloader">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Gooey morphing core */}
      <div 
        className="relative w-[500px] h-[500px] flex items-center justify-center"
        style={{ filter: "url(#gooey-preloader)" }}
      >
        {/* Core Mass */}
        <motion.div
          animate={{ 
            x: mousePos.x, 
            y: mousePos.y,
            scale: isCompleted ? 75 : 1 + (counter / 100) * 0.75,
            backgroundColor: isCompleted ? "#f8f8f6" : "#f8f8f6"
          }}
          transition={{ 
            type: "spring", 
            stiffness: isCompleted ? 28 : 100, 
            damping: isCompleted ? 14 : 14 
          }}
          className="absolute w-28 h-28 rounded-full bg-sand origin-center"
        />

        {/* Orbiting Blobs that fuse to the Core */}
        {!isCompleted && (
          <>
            {/* Blob A - Medium float */}
            <motion.div
              animate={{
                x: mousePos.x + Math.cos(angle) * orbitRadius,
                y: mousePos.y + Math.sin(angle) * orbitRadius,
                scale: Math.max(0.1, 1 - (counter / 100) * 0.7)
              }}
              transition={{ type: "spring", stiffness: 75, damping: 13 }}
              className="absolute w-16 h-16 rounded-full bg-sand"
            />

            {/* Blob B - Secondary counter-orbiter */}
            <motion.div
              animate={{
                x: mousePos.x + Math.cos(angle + Math.PI) * orbitRadius * 0.9,
                y: mousePos.y + Math.sin(angle + Math.PI) * orbitRadius * 0.9,
                scale: Math.max(0.1, 0.8 - (counter / 100) * 0.6)
              }}
              transition={{ type: "spring", stiffness: 65, damping: 12 }}
              className="absolute w-14 h-14 rounded-full bg-sand"
            />

            {/* Blob C - Kinetic Accent (Gold/Ochre Brand Tone) */}
            <motion.div
              animate={{
                x: mousePos.x + Math.sin(angle * 1.5) * orbitRadius * 1.2,
                y: mousePos.y + Math.cos(angle * 1.5) * orbitRadius * 1.2,
                scale: Math.max(0.1, 0.7 - (counter / 100) * 0.5)
              }}
              transition={{ type: "spring", stiffness: 55, damping: 10 }}
              className="absolute w-12 h-12 rounded-full bg-accent"
            />
          </>
        )}
      </div>

      {/* Interactive Label Core Floating Overlay */}
      <div className="absolute pointer-events-none flex flex-col items-center justify-center text-center z-20">
        <motion.div
          animate={{ 
            opacity: isCompleted ? 0 : 1,
            y: isCompleted ? -20 : 0,
            scale: isCompleted ? 0.8 : 1
          }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center"
        >
          <span className="font-serif italic font-light text-xl text-charcoal mix-blend-difference select-none pointer-events-none">
            {counter < 40 ? "identity" : counter < 80 ? "motion" : "creation"}
          </span>
        </motion.div>
      </div>

      {/* Fine-line Monospace Telemetry / Diagnostics Overlay */}
      <div className="absolute bottom-10 left-10 md:left-24 text-[10px] font-mono opacity-50 flex flex-col gap-1 tracking-widest text-left select-none">
        <div className="flex items-center gap-2">
          <span className="text-accent animate-pulse">●</span>
          <span>[SYSTEM_STABILITY: CORE_OK]</span>
        </div>
        <div className="text-[9px] opacity-75">
          [MATRIX: {alignment}] [DENSITY_INDEX: {density}]
        </div>
      </div>

      {/* Elegant minimalist loading progress bar and percentages */}
      <div className="absolute bottom-10 right-10 md:right-24 text-[10px] font-mono flex items-center gap-4 tracking-widest select-none">
        <span className="w-10 text-right opacity-80">{counter}%</span>
        <div className="w-24 md:w-48 h-[1px] bg-sand/15 relative">
          <div
            className="absolute top-0 left-0 h-full bg-sand transition-all duration-75"
            style={{ width: `${counter}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
