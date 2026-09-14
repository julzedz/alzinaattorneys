import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function HomeOverview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-12 bg-bg text-ink relative overflow-hidden flex items-center justify-center"
      ref={ref}
    >
      {/* Subtle Logo Watermark */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.03] dark:opacity-[0.05] z-0">
        <Logo className="w-[120%] md:w-150" />
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.span
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
          initial="hidden"
          animate={controls}
          className="uppercase tracking-widest text-accent text-sm font-bold mb-6 block"
        >
          Our Ethos
        </motion.span>

        <motion.h2
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.1 },
            },
          }}
          initial="hidden"
          animate={controls}
          className="text-title-2 font-serif mb-10 leading-snug"
        >
          Delivering trusted legal representation and business solutions for our clients'
          legal challenges across Nigeria.
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.2 },
            },
          }}
          initial="hidden"
          animate={controls}
          className="text-lg text-ink-muted leading-relaxed mb-12"
        >
          <span id="alzina-ethos" className="text-2xl font-serif text-accent tracking-wide font-medium">Alzina Attorneys</span> is a premier corporate and commercial law
          practice located in Onitsha, Nigeria. We operate at the intersection of complex legal frameworks
          and dynamic business environments, representing our clients to execute
          transactions and resolve disputes with absolute confidence.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, delay: 0.3 },
            },
          }}
          initial="hidden"
          animate={controls}
        >
          <Link
            to="/about"
            className="group inline-flex items-center gap-3 text-accent font-serif text-lg md:text-xl capitalize italic hover:text-oxblood-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2 py-1"
          >
            Learn more
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
