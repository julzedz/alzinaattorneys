import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import { Link } from 'react-router-dom';
import principalImg from '../assets/principal-1-desktop.webp';
import teamData from '../data/team.json';
import AnimatedBackground from './AnimatedBackground';

export default function PrincipalHighlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const principal = teamData.find(member => member.id === 'paschal-alzina');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section className="relative py-24 px-6 md:px-12 bg-bg text-ink overflow-hidden" ref={ref}>
      <AnimatedBackground />
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
            }}
            initial="hidden"
            animate={controls}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-4/5 w-full max-w-md mx-auto lg:max-w-none">
              {/* Decorative background block */}
              <div className="absolute inset-0 bg-bg-subtle translate-x-6 translate-y-6 rounded-sm border border-border"></div>
              <img 
                src={principalImg} 
                alt={`${principal?.name || 'Principal'} - Alzina Attorneys`} 
                className="absolute inset-0 w-full h-full object-cover rounded-sm shadow-xl z-10"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut', delay: 0.2 } }
            }}
            initial="hidden"
            animate={controls}
            className="w-full lg:w-1/2"
          >
            <h2 className="text-title-2 font-serif mb-6">Leadership & Vision</h2>
            <p className="text-lg text-ink-muted leading-relaxed mb-8">
              "We built Alzina Attorneys on the premise that effective legal counsel must go beyond technical proficiency. It requires a profound understanding of our clients' objectives and the agility to navigate Nigeria's complex legal landscapes. Our commitment is to deliver results that protect and propel your business."
            </p>
            
            <div className="mb-10">
              <p className="font-serif text-2xl text-ink font-medium mb-1">{principal?.name}</p>
              <p className="text-accent uppercase tracking-widest text-sm font-bold">{principal?.role}</p>
            </div>

            <Link 
              to="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-ink text-bg font-serif text-lg tracking-wide hover:bg-accent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <span>Meet the Team</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="transform group-hover:translate-x-1.5 transition-transform duration-300"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
