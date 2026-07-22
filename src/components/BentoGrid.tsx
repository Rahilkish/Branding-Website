import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import React, { useState } from 'react';

const BENTO_ITEMS = [
  {
    id: 'manifesto',
    title: 'Not Just Pretty. Powerful.',
    colSpan: 'md:col-span-2 lg:col-span-2',
    rowSpan: 'md:row-span-2',
    color: 'bg-charcoal text-sand',
    content: 'We build digital experiences that refuse to be ignored. Function disguised as art.',
    hoverContent: 'Every pixel serves a purpose. We don’t just design for aesthetics; we engineer for impact. The intersection of brutalism and elegance.'
  },
  {
    id: 'services',
    title: 'Capabilities',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    color: 'bg-accent text-charcoal',
    content: 'Brand Identity / Motion Design / Creative Direction',
    hoverContent: 'A full-spectrum approach to brand building. From initial strategy to final motion curves.'
  },
  {
    id: 'aesthetic',
    title: 'Aesthetic',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    color: 'bg-[#e4dccf] text-charcoal',
    content: 'Minimal. Brutal. Refined.',
    hoverContent: 'Stripping away the unnecessary to reveal the core truth of the brand.'
  },
  {
    id: 'contact',
    title: 'Let\'s Talk',
    colSpan: 'md:col-span-2 lg:col-span-1',
    rowSpan: 'md:row-span-2',
    color: 'bg-charcoal text-sand',
    content: 'Ready to build something that moves?',
    hoverContent: 'Drop us a line. We are always looking for the next boundary to push.',
    link: '#contact'
  }
];

function BentoCard({ item, index, hoveredId, setHoveredId }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10px", "10px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10px", "10px"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHoveredId(null);
  };

  return (
    <div 
      className={`relative ${item.colSpan} ${item.rowSpan} [perspective:1000px]`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHoveredId(item.id)}
      onClick={() => item.link && (window.location.href = item.link)}
    >
      <motion.div
        className={`w-full h-full relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between cursor-pointer ${item.color} shadow-lg`}
        style={{
          rotateX: hoveredId === item.id ? rotateX : 0,
          rotateY: hoveredId === item.id ? rotateY : 0,
          transformStyle: "preserve-3d"
        }}
        whileHover={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        data-cursor={item.link ? "pointer" : "hover"}
      >
        <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <motion.div 
          className="relative z-10 flex justify-between items-start"
          style={{ x: translateX, y: translateY, translateZ: 50 }}
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
            0{index + 1}
          </span>
          {item.link && (
            <motion.div 
              animate={{ rotate: hoveredId === item.id ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-8 h-8 rounded-full border border-current flex items-center justify-center"
            >
              ↗
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          className="relative z-10 mt-auto"
          style={{ x: translateX, y: translateY, translateZ: 30 }}
        >
          <h3 className="font-serif text-3xl md:text-4xl tracking-tight leading-[1.1] mb-4">
            {item.title}
          </h3>
          
          <div className="relative h-[60px] overflow-hidden">
            <AnimatePresence mode="wait">
              {hoveredId === item.id ? (
                <motion.p
                  key="hover"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-sm md:text-base opacity-80 leading-relaxed font-medium"
                >
                  {item.hoverContent}
                </motion.p>
              ) : (
                <motion.p
                  key="base"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="text-sm md:text-base opacity-80 leading-relaxed"
                >
                  {item.content}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Decorative elements based on type */}
        {item.id === 'manifesto' && (
          <motion.div 
            className="absolute right-[-10%] bottom-[-20%] w-[60%] aspect-square rounded-full border border-current opacity-10 pointer-events-none"
            style={{ translateZ: -20 }}
            animate={{ 
              scale: hoveredId === item.id ? 1.1 : 1,
              rotate: hoveredId === item.id ? 90 : 0
            }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
        )}
      </motion.div>
    </div>
  );
}

export default function BentoGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-sand" id="bento">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 auto-rows-[250px]"
        >
          {BENTO_ITEMS.map((item, index) => (
            <BentoCard 
              key={item.id} 
              item={item} 
              index={index} 
              hoveredId={hoveredId} 
              setHoveredId={setHoveredId} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
