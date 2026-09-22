import { useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const containerRef = useRef(null);

  return (
    <div className="w-full bg-bg" ref={containerRef}>
      {/* 1. Hero Section */}
      <section className="relative py-32 md:py-48 px-6 md:px-12 text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1663773072054-9cb3869c456e?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Alzina Attorneys Contact" 
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
            className="text-display font-serif text-white drop-shadow-md mb-6"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto"
          >
            Reach out to discuss how we can assist you. Our team is ready to provide the strategic counsel you need.
          </motion.p>
        </div>
      </section>

      {/* 2. Main Content (Two Columns) */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-bg text-ink relative">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
            
            {/* Left Column: Contact Details & Map */}
            <div className="lg:w-5/12 flex flex-col gap-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl md:text-4xl font-serif mb-10">Get in Touch</h2>
                
                <div className="space-y-8">
                  {/* Address */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-bg-subtle border border-border flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Office Address</h3>
                      <p className="text-lg text-ink-muted leading-relaxed">
                        60 Old Market Road,<br />
                        Onitsha, Nigeria
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-bg-subtle border border-border flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Phone / WhatsApp</h3>
                      <a href="https://wa.me/2348032283805?text=Hello%20Alzina%20Attorneys,%20I%20would%20like%20to%20schedule%20a%20consultation." 
                         target="_blank" rel="noreferrer"
                         className="text-lg text-ink-muted hover:text-accent transition-colors">
                        +234 803 228 3805
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-bg-subtle border border-border flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Email</h3>
                      <a href="mailto:alzinaattorneys@gmail.com" className="text-lg text-ink-muted hover:text-accent transition-colors">
                        alzinaattorneys@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 bg-bg-subtle border border-border flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-ink/50 mb-2">Office Hours</h3>
                      <p className="text-lg text-ink-muted leading-relaxed">
                        9:00 AM - 5:00 PM<br />
                        Monday to Friday
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Map Embed */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full aspect-4/3 md:aspect-16/10 bg-bg-subtle border border-border p-2"
              >
                <iframe
                  src="https://www.google.com/maps?q=6.1521833,6.7826203&z=16&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Alzina Attorneys Onitsha"
                  className="w-full h-full grayscale contrast-125 opacity-90 hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </motion.div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:w-7/12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-bg-subtle p-8 md:p-12 lg:p-16 border border-border"
              >
                <h2 className="text-3xl font-serif mb-4">Request a Consultation</h2>
                <p className="text-ink-muted font-light mb-10">
                  Please fill out the form below with details about your inquiry, and a member of our team will get back to you shortly.
                </p>

                <form id="consultation" className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-ink/70">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder=" Chiamaka Okonkwo" 
                        required
                        className="w-full bg-bg border-b border-border py-3 px-0 text-ink placeholder:text-ink/30 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-ink/70">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder=" chi.okonkwo@gmail.com" 
                        required
                        className="w-full bg-bg border-b border-border py-3 px-0 text-ink placeholder:text-ink/30 focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest text-ink/70">Subject / Title</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      placeholder=" Community Land Dispute" 
                      required
                      className="w-full bg-bg border-b border-border py-3 px-0 text-ink placeholder:text-ink/30 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest text-ink/70">Message</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows="5"
                      placeholder=" Counsel I need advice on..." 
                      required
                      className="w-full bg-bg border-b border-border py-3 px-0 text-ink placeholder:text-ink/30 focus:outline-none focus:border-accent transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full md:w-auto px-10 py-4 bg-accent text-white font-medium tracking-wide hover:bg-oxblood-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
