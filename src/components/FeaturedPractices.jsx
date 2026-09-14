import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import practiceAreas from '../data/practiceAreas.json';

export default function FeaturedPractices() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 text-white overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80" 
          alt="Modern law office" 
          className="w-full h-full object-cover object-center"
        />
        {/* Adjusted blend modes for better visibility */}
        <div className="absolute inset-0 bg-oxblood-900/80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-ink/50"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col mb-16 gap-4"
        >
          <div className="max-w-2xl">
            <motion.h2 
              variants={headerVariants}
              className="text-title-2 font-serif mb-4 text-white"
            >
              Our Core Expertise
            </motion.h2>
            <motion.p 
              variants={headerVariants}
              className="text-white/80 text-lg font-light"
            >
              We offer specialized counsel across a focused range of practice areas, delivering the depth of expertise required for complex matters.
            </motion.p>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col border-t border-white/20"
        >
          {practiceAreas.map((area) => {
            const Icon = Icons[area.icon] || Icons.Scale;
            return (
              <motion.div 
                key={area.id} 
                variants={rowVariants} 
                className="flex flex-col lg:flex-row py-8 md:py-10 border-b border-white/20 items-start lg:items-center gap-6 lg:gap-16"
              >
                <div className="flex items-center gap-6 lg:w-1/3 shrink-0">
                  <div className="w-12 h-12 flex items-center justify-center text-white/50 shrink-0">
                    <Icon className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <h3 className="text-2xl font-serif text-white">{area.title}</h3>
                </div>
                <div className="lg:w-2/3">
                  <p className="text-white/80 leading-relaxed font-light text-lg">
                    {area.shortDescription}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
