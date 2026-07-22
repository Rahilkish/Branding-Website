import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const ARCHIVE_ITEMS = [
  "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1583407723467-9b2dca250355?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80",
];

export default function Archive() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };
    if (selectedImage) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="archive" className="py-24 md:py-40 bg-charcoal text-sand overflow-hidden relative z-10 border-t border-sand/10">
      <div className="px-6 md:px-12 lg:px-24 mb-16 md:mb-24 flex justify-between items-end">
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[10vw] md:text-[8vw] tracking-tighter uppercase leading-[0.8]"
        >
          Index &<br/><span className="italic font-light text-sand/50">Print.</span>
        </motion.h2>
        <div className="hidden md:block max-w-sm text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed text-sand/60 text-right">
          A kinetic collection of posters,<br/>print collateral, and visual explorations.
        </div>
      </div>

      <div className="flex flex-col gap-8 md:gap-12 mt-16 cursor-grab active:cursor-grabbing">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          className="flex w-max hover:[animation-play-state:paused]"
        >
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-6 md:gap-12 px-3 md:px-6">
              {ARCHIVE_ITEMS.map((src, i) => (
                <div 
                  key={`${set}-${i}`} 
                  onClick={() => setSelectedImage(src)}
                  className="w-[70vw] md:w-[35vw] aspect-[3/4] shrink-0 relative group border border-sand/10 bg-sand/5 p-4 md:p-8 cursor-pointer"
                  data-cursor="hover"
                >
                  <img 
                    src={src} 
                    alt="Archive item" 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" 
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ x: ["-50%", "0%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
          className="flex w-max hover:[animation-play-state:paused]"
        >
          {[1, 2].map((set) => (
            <div key={set} className="flex gap-6 md:gap-12 px-3 md:px-6">
              {[...ARCHIVE_ITEMS].reverse().map((src, i) => (
                <div 
                  key={`${set}-${i}`} 
                  onClick={() => setSelectedImage(src)}
                  className="w-[50vw] md:w-[25vw] aspect-[4/5] shrink-0 relative group border border-sand/10 bg-sand/5 p-4 md:p-8 cursor-pointer"
                  data-cursor="hover"
                >
                  <img 
                    src={src} 
                    alt="Archive item" 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 pointer-events-none" 
                  />
                </div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && typeof document !== 'undefined' && createPortal(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[600] flex items-center justify-center bg-charcoal/95 backdrop-blur-md p-4 md:p-12 cursor-pointer"
            data-cursor="hover"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-full max-h-full"
            >
              <img
                src={selectedImage}
                alt="Selected archive item"
                className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-sand/20 bg-sand/5 p-2 md:p-4"
              />
              <div className="absolute top-0 right-0 -mt-12 -mr-4 md:-mr-12 text-sand/60 hover:text-sand transition-colors text-[10px] font-bold uppercase tracking-[0.2em]">
                Close (ESC)
              </div>
            </motion.div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </section>
  );
}
