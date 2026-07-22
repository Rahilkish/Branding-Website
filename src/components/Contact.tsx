import { motion } from 'motion/react';
import Magnetic from './Magnetic';

export default function Contact() {
  return (
    <section id="contact" className="pt-32 md:pt-48 pb-12 px-6 md:px-12 lg:px-24 bg-charcoal text-sand relative z-10 flex flex-col justify-between min-h-[90vh]">
      <div className="w-full text-center flex flex-col items-center flex-grow justify-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-[12vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase mb-16"
        >
          Ready to <br/><span className="italic font-light">Elevate?</span>
        </motion.h2>
        
        <Magnetic>
          <motion.a 
            href="mailto:rahilrkishnani@gmail.com"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            data-cursor="hover"
            className="inline-block border border-sand px-12 py-6 text-sm font-medium uppercase tracking-[0.2em] hover:bg-sand hover:text-charcoal transition-colors duration-300 rounded-full"
          >
            Start a Conversation
          </motion.a>
        </Magnetic>
      </div>
      
      <footer className="mt-24 pt-8 border-t border-sand/20 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-sand/50 uppercase tracking-[0.2em]">
        <span>&copy; {new Date().getFullYear()} Rahil</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-sand transition-colors" data-cursor="hover">Instagram</a>
          <a href="#" className="hover:text-sand transition-colors" data-cursor="hover">LinkedIn</a>
          <a href="#" className="hover:text-sand transition-colors" data-cursor="hover">Behance</a>
        </div>
      </footer>
    </section>
  );
}
