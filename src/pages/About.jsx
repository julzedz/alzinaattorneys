import { useRef } from 'react';
import { motion } from 'motion/react';
import principalImg from '../assets/principal-1-desktop.webp';
import onitshaImg from '../assets/onitsha.webp';

export default function About() {
  const containerRef = useRef(null);

  return (
    <div className="w-full bg-bg" ref={containerRef}>
      {/* 1. Hero Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={onitshaImg} 
            alt="Alzina Attorneys Office" 
            className="w-full h-full object-cover object-center opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-oxblood-900/80 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-bg/20"></div>
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10 pb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-display font-serif text-white drop-shadow-md"
          >
            About Our Firm
          </motion.h1>
        </div>
      </section>

      {/* 2. Firm History Narrative */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-bg overflow-hidden">
        {/* Subtle Watermark */}
        <div className="absolute right-[-20%] top-20 text-[20rem] font-serif text-bg-subtle select-none z-0 rotate-12 whitespace-nowrap">
          Alzina
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg md:prose-xl text-ink-muted leading-relaxed font-light"
          >
            <p className="text-2xl md:text-3xl text-ink font-serif leading-snug mb-10 text-center">
              Alzina Attorneys was established to provide sophisticated legal solutions that help our clients navigate complexity, manage risks, and make informed business decisions.
            </p>
            <p className="mb-6">
              Our practice is founded on the principles of excellence, commercial pragmatism, and a deep understanding of the regulatory landscapes in which our clients operate. We approach every legal challenge not just as lawyers, but as strategic partners dedicated to your long-term success.
            </p>
            <p>
              By combining rigorous legal scholarship with practical business acumen, we ensure that our representation is both formidable in dispute resolution and highly effective in corporate negotiations. At Alzina Attorneys, our commitment is simple: we deliver results when it matters most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Principal Profile (Pinned Layout) */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 bg-oxblood-900 text-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-oxblood-900/90"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            
            {/* Left: Image & Sticky info */}
            <div className="md:w-5/12 shrink-0 md:sticky md:top-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-3/4 overflow-hidden rounded-sm mb-8 border border-white/10 shadow-2xl relative group">
                  <div className="absolute inset-0 bg-oxblood-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <img 
                    src={principalImg} 
                    alt="Paschal Alzina, Esq." 
                    className="w-full h-full object-cover object-top scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <h2 className="text-4xl font-serif mb-3">Pascal Zimuzo Ozuligbo, Esq.</h2>
                <p className="text-accent text-sm uppercase tracking-[0.2em] font-bold">Principal Partner</p>
              </motion.div>
            </div>

            {/* Right: Bio & Details */}
            <div className="md:w-7/12 py-4 md:py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-16"
              >
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/50 mb-8">Biography</h3>
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                      Pascal Zimuzo Ozuligbo is a highly regarded legal practitioner known for his sharp commercial insight and unwavering dedication to his clients. With extensive experience across multiple practice areas, he brings a strategic and results-driven approach to every mandate.
                    </p>
                    <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                      Under his leadership, Alzina Attorneys has grown into a formidable practice, recognized for setting bold new levels of legal excellence. His counsel is sought after by corporations, high-net-worth individuals, and emerging enterprises navigating complex legal and regulatory environments.
                    </p>
                  </div>
                </div>

                {/* Education & Certifications */}
                <div className="border-t border-white/20 pt-10">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-muted mb-8">Education & Certifications</h3>
                  <div className="space-y-6">
                    <p className="text-xl md:text-2xl text-white/90 font-serif italic border-l-[3px] border-accent pl-6">
                      LL.B, Chukwuemeka Odumegwu Ojukwu University, Igbariam
                    </p>
                    <p className="text-xl md:text-2xl text-white/90 font-serif italic border-l-[3px] border-accent pl-6">
                      B.A (International Relations), Nnamdi Azikiwe University, Awka
                    </p>
                    <p className="text-xl md:text-2xl text-white/90 font-serif italic border-l-[3px] border-accent pl-6">
                      Diploma in French, Université D’Abomey Calavi, Benin Republic
                    </p>
                  </div>
                </div>

                {/* Professional Associations */}
                <div className="border-t border-white/20 pt-10">
                  <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-muted mb-8">Professional Associations</h3>
                  <div className="space-y-6">
                    <p className="text-xl md:text-2xl text-white/90 font-serif italic border-l-[3px] border-accent pl-6">
                      Nigerian Bar Association
                    </p>
                    <p className="text-xl md:text-2xl text-white/90 font-serif italic border-l-[3px] border-accent pl-6">
                      Chartered Institute of Arbitrators, UK
                    </p>
                  </div>
                </div>

              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values Section */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-bg-subtle relative overflow-hidden">
        <div className="absolute left-[-10%] bottom-[-10%] text-[40rem] font-serif text-border/40 select-none z-0 rotate-12 whitespace-nowrap">
          &
        </div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 text-center md:text-left"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-ink mb-6">Our Core Values</h2>
            <div className="w-24 h-1 bg-accent mx-auto md:mx-0"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
            {[
              {
                title: "Commercial Pragmatism",
                desc: "We provide solutions that are not just legally sound, but commercially viable, understanding that business realities drive legal decisions."
              },
              {
                title: "Relentless Advocacy",
                desc: "Whether in the boardroom or the courtroom, we represent our clients with formidable tenacity and an unwavering commitment to their success."
              },
              {
                title: "Excellence & Integrity",
                desc: "We hold ourselves to the highest ethical and professional standards, building long-term relationships based on trust and exceptional service."
              }
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="border-t border-border pt-8"
              >
                <h3 className="text-2xl font-serif text-ink mb-4">{value.title}</h3>
                <p className="text-ink-muted font-light leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
