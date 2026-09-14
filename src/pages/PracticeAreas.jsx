import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import * as Icons from 'lucide-react';
import practiceAreas from '../data/practiceAreas.json';

export default function PracticeAreas() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="bg-oxblood-900 py-24 md:py-32 px-6 md:px-12 text-center">
        <div className="container mx-auto max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display font-serif text-white mb-6"
          >
            Our Expertise
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed"
          >
            We operate at the intersection of complex legal frameworks and dynamic business environments, delivering uncompromising representation and strategic foresight.
          </motion.p>
        </div>
      </section>

      {/* 2. Practice Areas Grid */}
      <section className="py-24 px-6 md:px-12 bg-bg text-ink" ref={containerRef}>
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          >
            {practiceAreas.map((area) => {
              const Icon = Icons[area.icon] || Icons.Scale;
              return (
                <motion.div 
                  key={area.id} 
                  id={area.id}
                  variants={staggerItem} 
                  whileHover={{ y: -8 }}
                  className="bg-bg-subtle p-8 md:p-12 rounded-sm border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10 hover:border-accent group scroll-mt-32"
                >
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-bg rounded-sm flex items-center justify-center shrink-0 border border-border group-hover:bg-accent group-hover:text-white transition-colors text-accent">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h2 className="text-title-2 font-serif group-hover:text-accent transition-colors">{area.title}</h2>
                  </div>
                  
                  <p className="text-lg text-ink-muted leading-relaxed mb-8">
                    {area.fullDescription}
                  </p>
                  
                  <div className="bg-bg p-6 rounded-sm border border-border">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-ink mb-4">Key Services</h3>
                    <ul className="space-y-3">
                      {area.keyServices.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0"></div>
                          <span className="text-ink-muted leading-relaxed">{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
