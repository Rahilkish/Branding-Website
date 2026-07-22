import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState("");
  const [cursorVariant, setCursorVariant] = useState("default");

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for data-cursor attributes up the tree
      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        const type = cursorEl.getAttribute('data-cursor');
        const text = cursorEl.getAttribute('data-cursor-text') || "";
        
        if (type === 'drag') {
          setCursorVariant('text');
          setCursorText(text || "DRAG");
        } else if (type === 'view') {
          setCursorVariant('text');
          setCursorText(text || "VIEW");
        } else if (type === 'hover') {
          setCursorVariant('hover');
          setCursorText("");
        }
      } else {
        // Check standard interactive elements
        const interactive = target.closest('a, button, input, textarea, select');
        if (interactive) {
          setCursorVariant('hover');
          setCursorText("");
        } else {
          setCursorVariant('default');
          setCursorText("");
        }
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  const variants = {
    default: {
      width: 16,
      height: 16,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#f8f8f6",
      mixBlendMode: "difference" as any,
      border: "0px solid transparent"
    },
    hover: {
      width: 64,
      height: 64,
      x: "-50%",
      y: "-50%",
      backgroundColor: "transparent",
      border: "1px solid #f8f8f6",
      mixBlendMode: "difference" as any,
    },
    text: {
      width: 100,
      height: 100,
      x: "-50%",
      y: "-50%",
      backgroundColor: "#f8f8f6",
      mixBlendMode: "difference" as any,
      border: "0px solid transparent"
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] flex items-center justify-center text-sand overflow-hidden hidden md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.span 
        className="text-[10px] font-bold uppercase tracking-[0.2em] mix-blend-difference text-[#1a1a1a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: cursorVariant === 'text' ? 1 : 0 }}
      >
        {cursorText}
      </motion.span>
    </motion.div>
  );
}
