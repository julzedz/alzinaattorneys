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
