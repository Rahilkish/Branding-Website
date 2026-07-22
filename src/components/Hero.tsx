import { motion, useScroll, useTransform, useDragControls, useSpring } from 'motion/react';
import { useRef, useEffect } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const dragControls = useDragControls();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Subtle mouse tracking for the headline
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 based on screen size
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x * 15); // max 15px shift
      mouseY.set(y * 15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  
  return (
    <section ref={containerRef} className="h-screen pt-24 pb-16 px-6 md:px-12 lg:px-24 flex flex-col justify-center overflow-hidden relative" id="hero">
      
      {/* Draggable Badge */}
      <motion.div 
        drag
        dragConstraints={containerRef}
        dragElastic={0.2}
        dragControls={dragControls}
        whileDrag={{ scale: 1.1, cursor: "grabbing" }}
        className="absolute top-1/4 right-1/4 md:right-1/3 w-32 h-32 md:w-40 md:h-40 bg-charcoal text-sand rounded-full flex items-center justify-center text-center p-4 z-30 shadow-2xl cursor-grab mix-blend-difference select-none"
        data-cursor="drag"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 15 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.5 }}
      >
        <span className="text-[10px] md:text-[11px] font-medium uppercase tracking-[0.2em] leading-[1.6]">
          Rahil<br/>Identity &<br/>Motion<br/>Est. 2026
        </span>
      </motion.div>

      <motion.div 
        style={{ y: textY, opacity, x: mouseX }}
        className="w-full flex flex-col justify-center items-center text-center relative z-20"
      >
        <h1 className="font-serif text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase max-w-[90vw]">
          <span className="block overflow-hidden pb-2">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="block hover:italic transition-all duration-500 cursor-default"
            >
              I build
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="block hover:italic transition-all duration-500 cursor-default"
            >
              brands
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-2">
            <motion.span 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block hover:italic transition-all duration-500 cursor-default"
            >
              that <span className="italic font-light">move.</span>
            </motion.span>
          </span>
        </h1>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-charcoal/50 flex flex-col items-center gap-2"
      >
        <span>Scroll to explore</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-charcoal/30"
        />
      </motion.div>

    </section>
  );
}
