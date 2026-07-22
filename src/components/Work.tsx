import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import React, { useRef, useState, useEffect } from 'react';

const WORK_ITEMS = [
  {
    id: 'otaaq',
    title: 'Otaaq',
    category: 'Brand Identity',
    description: 'Full brand system built for a café currently under construction; strategy, logo direction, colour palette.',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80',
    color: '#e4dccf' // Warm off-white
  },
  {
    id: 'play-haus',
    title: 'Play-Haus',
    category: 'Brand Identity',
    description: 'Comprehensive branding project encompassing visual identity, motion framework, and physical collaterals. Details and documentation to be added.',
    image: 'https://images.unsplash.com/photo-1572949645841-094f3a9c4c94?auto=format&fit=crop&q=80',
    color: '#2a2a2a' // Dark
  }
];

function WorkCard({ item, index, setActiveProject, total }: { key?: string, item: any, index: number, setActiveProject: (id: string) => void, total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
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
  };

  // Calculate sticky overlap top position based on index
  const topOffset = `calc(5vh + ${index * 40}px)`;
  
  // Scale down older cards as new ones overlap
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1 - ((total - index) * 0.02)]);
  
  return (
    <motion.div 
      ref={cardRef}
      className="sticky h-[75vh] w-full cursor-pointer origin-top"
      style={{ top: topOffset, scale }}
      onClick={() => setActiveProject(item.id)}
      data-cursor="view"
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-full h-full overflow-hidden shadow-2xl border border-charcoal/10"
        style={{ 
          backgroundColor: item.color,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(-20px)" }}>
          <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 mix-blend-multiply filter grayscale hover:grayscale-0 transition-all duration-700 scale-105" />
        </div>
        
        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between text-charcoal pointer-events-none" style={{ transform: "translateZ(30px)" }}>
          <div className="flex justify-between items-start">
            <span className="text-xs md:text-sm font-medium uppercase tracking-[0.2em] border border-charcoal/20 px-6 py-3 rounded-full backdrop-blur-md bg-sand/20">
              {item.category}
            </span>
            <span className="font-serif text-3xl italic">0{index + 1}</span>
          </div>
          
          <div>
            <h3 className="font-serif text-6xl md:text-8xl lg:text-[9rem] tracking-tighter uppercase leading-[0.8] mix-blend-overlay text-white drop-shadow-sm">
              {item.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Work() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeProject]);

  return (
    <section id="work" className="py-24 md:py-40 px-6 md:px-12 lg:px-24 relative z-20 bg-sand">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16 md:mb-32">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[10vw] md:text-[8vw] tracking-tighter uppercase leading-[0.8] text-charcoal"
          >
            Branding Projects
          </motion.h2>
        </div>

        <div className="flex flex-col gap-8 pb-32">
          {WORK_ITEMS.map((item, index) => (
            <WorkCard key={item.id} item={item} index={index} total={WORK_ITEMS.length} setActiveProject={setActiveProject} />
          ))}
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div 
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[300] bg-sand overflow-y-auto"
            data-cursor="hover"
          >
            <div 
              className="absolute top-8 right-8 z-[310] cursor-pointer"
              onClick={() => setActiveProject(null)}
              data-cursor="hover"
            >
              <span className="text-xs font-medium uppercase tracking-[0.2em] border border-charcoal/20 px-6 py-3 rounded-full hover:bg-charcoal hover:text-sand transition-colors bg-sand">
                Close
              </span>
            </div>

            {/* Modal Content */}
            <div className="min-h-screen">
              <div className="h-[70vh] w-full relative">
                <img 
                  src={WORK_ITEMS.find(w => w.id === activeProject)?.image} 
                  alt="cover" 
                  className="w-full h-full object-cover filter grayscale"
                />
                <div className="absolute inset-0 bg-charcoal/20"></div>
                <div className="absolute bottom-12 left-6 md:left-12 lg:left-24 text-sand">
                  <h3 className="font-serif text-6xl md:text-8xl lg:text-[10rem] tracking-tighter uppercase leading-[0.8]">
                    {WORK_ITEMS.find(w => w.id === activeProject)?.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 md:px-12 lg:px-24 py-24 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
                <div className="md:col-span-4">
                  <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-charcoal/50 mb-4">The Brief</h4>
                  <p className="text-lg text-charcoal/80 leading-relaxed">
                    {WORK_ITEMS.find(w => w.id === activeProject)?.description}
                  </p>
                </div>
                
                <div className="md:col-span-8 space-y-8">
                  <div className="aspect-[16/9] bg-charcoal/10 flex items-center justify-center italic text-charcoal/40 text-sm">
                    [Process Shot 1]
                  </div>
                  <div className="aspect-[4/5] bg-charcoal/10 flex items-center justify-center italic text-charcoal/40 text-sm">
                    [Process Shot 2]
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
