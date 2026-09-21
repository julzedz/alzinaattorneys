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
      <section className="relative py-32 md:py-48 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1920&q=80" 
            alt="Corporate Office Background" 
            className="w-full h-full object-cover object-center"
          />
          {/* Overlays for readability and brand color */}
          <div className="absolute inset-0 bg-oxblood-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display font-serif text-white drop-shadow-md"
          >
            Our Expertise
          </motion.h1>
        </div>
      </section>

      {/* 1.5 Overview Box (Overlapping) */}
      <section className="relative z-20 -mt-24 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-bg p-8 md:p-12 lg:p-16 shadow-2xl border border-border flex flex-col md:flex-row gap-8 md:gap-16 items-center rounded-sm"
          >
            <div className="md:w-1/3 shrink-0">
              <h2 className="text-4xl md:text-5xl font-serif text-ink/30 tracking-tight">
                Overview
              </h2>
            </div>
            <div className="md:w-2/3">
              <p 
                className="text-base md:text-lg text-ink-muted/70 leading-relaxed font-extralight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                We are a boutique law firm that specializes in providing sophisticated legal solutions that help our clients navigate complexity, manage risks and make informed, commercially sound business decisions. We are committed to excellence and our team's legal knowledge, ensures our clients receive practical and strategic advice. From litigation to real estate acquisition and management.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Practice Areas Editorial List */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-bg text-ink" ref={containerRef}>
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="flex flex-col"
          >
            {practiceAreas.map((area) => {
              const Icon = Icons[area.icon] || Icons.Scale;
              return (
                <motion.div 
                  key={area.id} 
                  id={area.id}
                  variants={staggerItem} 
                  className="flex flex-col md:flex-row items-start gap-8 md:gap-16 py-12 md:py-16 border-b border-border last:border-0 scroll-mt-32"
                >
                  <div className="md:w-1/3 shrink-0 flex flex-col gap-6">
                    <Icon className="w-10 h-10 stroke-1 text-accent/60" />
                    <h2 className="text-3xl md:text-4xl font-serif text-ink tracking-tight">
                      {area.title}
                    </h2>
                  </div>
                  
                  <div className="md:w-2/3 flex flex-col justify-center">
                    <p className="text-lg md:text-xl text-ink-muted leading-relaxed font-light mb-8">
                      {area.fullDescription}
                    </p>
                    
                    <div className="pt-6 border-t border-border/40">
                      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-ink/40 mb-4">
                        Key Focus Areas
                      </h3>
                      <p className="text-base text-ink-muted font-serif italic leading-relaxed">
                        {area.keyServices.join('  ·  ')}
                      </p>
                    </div>
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
