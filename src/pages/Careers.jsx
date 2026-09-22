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
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left Column: Abstract Image */}
            <div className="hidden lg:block lg:w-5/12 shrink-0 sticky top-32">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl relative"
              >
                <div className="absolute inset-0 bg-oxblood-900/10 mix-blend-overlay z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1000&q=80" 
                  alt="Legal Profession Abstract" 
                  className="w-full h-full object-cover object-center grayscale opacity-90 hover:scale-105 hover:grayscale-0 transition-all duration-700 ease-out"
                />
              </motion.div>
            </div>

            {/* Right Column: Content */}
            <div className="lg:w-7/12 w-full py-4 space-y-24">
              
              {/* Lawyers */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="border-b-2 border-border pb-6 mb-8 relative">
                  <h2 className="text-4xl md:text-5xl font-serif text-ink mb-2">Lawyers</h2>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Experienced & Associates</p>
                  <div className="absolute bottom-[-2px] left-0 w-24 h-[2px] bg-accent"></div>
                </div>
                
                <div className="prose prose-lg md:prose-xl text-ink-muted leading-relaxed font-light space-y-6">
                  <p>
                    At Alzina Attorneys, we recognise that exceptional service is only possible if we employ the right people. We, therefore, aim to attract individuals with the necessary skills, aspirations and drive to excel in all areas of their lives.
                  </p>
                  <p>
                    We are looking for lawyers with strong academic achievements, confident legal skills and excellent communication skills.
                  </p>
                  <p>
                    Alzina Attorneys offers the opportunity to further develop your legal skills while working on exciting and cutting edge issues of law. We provide training in various practice areas and a chance to continually learn from contemporaries and partners through regular networking events, training and seminars.
                  </p>
                </div>
                
                <div className="pt-4">
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
              </motion.div>

              {/* Interns */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="border-b-2 border-border pb-6 mb-8 relative">
                  <h2 className="text-4xl md:text-5xl font-serif text-ink mb-2">Internships</h2>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">Students & Undergraduates</p>
                  <div className="absolute bottom-[-2px] left-0 w-24 h-[2px] bg-accent"></div>
                </div>
                
                <div className="prose prose-lg md:prose-xl text-ink-muted leading-relaxed font-light space-y-6">
                  <p>
                    Considering a career in Law? Our secondary school and undergraduate internship programme provides just the right exposure to legal matters, legal research and client advisory that relates to our various practice areas. 
                  </p>
                  <p>
                    Our programmes are a blend of practical and theoretical experiences that expose interns to diverse developments in the legal industry.
                  </p>
                  <p>
                    We are currently accepting applications for our upcoming internship cycle.
                  </p>
                </div>
                
                <div className="pt-4">
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
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
