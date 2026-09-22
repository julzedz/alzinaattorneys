import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Scale } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-oxblood-900 flex items-center justify-center relative overflow-hidden px-6 pt-24">
      {/* Background Image / Texture */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1920&q=80" 
          alt="Abstract legal scales" 
          className="w-full h-full object-cover object-center opacity-10 mix-blend-overlay grayscale"
        />
        <div className="absolute inset-0 bg-oxblood-900/95"></div>
      </div>

      {/* Large subtle watermark text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] md:text-[40rem] font-serif text-white/5 select-none z-0 pointer-events-none whitespace-nowrap">
        404
      </div>

      <div className="container mx-auto max-w-2xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="w-20 h-20 mx-auto mb-8 rounded-full border border-accent/30 flex items-center justify-center bg-oxblood-900">
            <Scale className="w-10 h-10 text-accent stroke-[1.5]" />
          </div>
          
          <h1 className="text-display font-serif text-white mb-6">
            Objection!
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-white/80 font-serif italic mb-8">
            This page has left the jurisdiction.
          </h2>
          
          <p className="text-lg text-white/60 font-light mb-12 max-w-md mx-auto leading-relaxed">
            The link you followed may be broken, or the page may have been removed. Let's get you back to familiar territory.
          </p>

          <Link 
            to="/" 
            className="inline-flex items-center gap-4 group bg-accent hover:bg-oxblood-700 text-white px-8 py-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">
              Return to Chambers
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
