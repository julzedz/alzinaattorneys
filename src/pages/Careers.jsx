import { useRef } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, GraduationCap } from 'lucide-react';

export default function Careers() {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="w-full bg-bg" ref={containerRef}>
      {/* 1. Hero Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1920&q=80" 
            alt="Corporate professionals collaborating" 
            className="w-full h-full object-cover object-center opacity-50 grayscale"
          />
          <div className="absolute inset-0 bg-oxblood-900/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-bg/20"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-display font-serif text-white drop-shadow-md mb-6"
          >
            Join Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto"
          >
            We aim to attract individuals with the necessary skills, aspirations, and drive to excel in all areas of their lives.
          </motion.p>
        </div>
      </section>

      {/* 2. Opportunities Section */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-bg text-ink overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute -left-[10%] top-40 text-[20rem] font-serif text-bg-subtle select-none z-0 -rotate-6 whitespace-nowrap">
          Careers
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-24"
          >
            {/* Lawyers */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
              <div className="md:w-5/12 shrink-0">
                <div className="sticky top-32 bg-bg-subtle border border-border p-8 md:p-12 shadow-xl">
                  <Briefcase className="w-12 h-12 text-accent mb-6 stroke-[1.5]" />
                  <h2 className="text-3xl md:text-4xl font-serif mb-4">Lawyers</h2>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink/40">Experienced & Associates</p>
                </div>
              </div>
              
              <div className="md:w-7/12 py-4 md:py-8 prose prose-lg md:prose-xl text-ink-muted leading-relaxed font-light">
                <p>
                  At Alzina Attorneys, we recognise that exceptional service is only possible if we employ the right people. We, therefore, aim to attract individuals with the necessary skills, aspirations and drive to excel in all areas of their lives.
                </p>
                <p>
                  We are looking for lawyers with strong academic achievements, confident legal skills and excellent communication skills.
                </p>
                <p>
                  Alzina Attorneys offers the opportunity to further develop your legal skills while working on exciting and cutting edge issues of law. We provide training in various practice areas and a chance to continually learn from contemporaries and partners through regular networking events, training and seminars.
                </p>
                
                <div className="mt-12 pt-8 border-t border-border/50">
                  <Link 
                    to="/contact#consultation" 
                    className="inline-flex items-center gap-4 group"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest text-accent group-hover:text-oxblood-700 transition-colors">
                      Apply for a position
                    </span>
                    <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all text-accent">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Interns */}
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-12 lg:gap-24 items-start">
              <div className="md:w-5/12 shrink-0">
                <div className="sticky top-32 bg-bg-subtle border border-border p-8 md:p-12 shadow-xl">
                  <GraduationCap className="w-12 h-12 text-accent mb-6 stroke-[1.5]" />
                  <h2 className="text-3xl md:text-4xl font-serif mb-4">Internships</h2>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-ink/40">Students & Undergraduates</p>
                </div>
              </div>
              
              <div className="md:w-7/12 py-4 md:py-8 prose prose-lg md:prose-xl text-ink-muted leading-relaxed font-light">
                <p>
                  Considering a career in Law? Our secondary school and undergraduate internship programme provides just the right exposure to legal matters, legal research and client advisory that relates to our various practice areas. 
                </p>
                <p>
                  Our programmes are a blend of practical and theoretical experiences that expose interns to diverse developments in the legal industry.
                </p>
                <p>
                  We are currently accepting applications for our upcoming internship cycle.
                </p>
                
                <div className="mt-12 pt-8 border-t border-border/50">
                  <Link 
                    to="/contact#consultation" 
                    className="inline-flex items-center gap-4 group"
                  >
                    <span className="text-sm font-bold uppercase tracking-widest text-accent group-hover:text-oxblood-700 transition-colors">
                      Apply for internship
                    </span>
                    <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all text-accent">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
}
