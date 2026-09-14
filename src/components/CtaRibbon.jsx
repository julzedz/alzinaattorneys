import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


export default function CtaRibbon() {
  return (
    <section className="relative py-24 md:py-32 px-6 bg-accent text-white overflow-hidden flex items-center justify-center">
      
      {/* Artsy Textured Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1920&q=80" 
          alt="Abstract textured background" 
          className="w-full h-full object-cover opacity-30 mix-blend-luminosity grayscale"
        />
        {/* Dark radial gradient overlay so the oxblood shows through clearly but gets darker at the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-oxblood-900)_100%)] opacity-90"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-display font-serif mb-8 leading-tight drop-shadow-sm">
          Ready to Discuss Your Legal Needs?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 font-serif font-light italic mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
          Schedule a confidential consultation with us to explore how we can support your objectives.
        </p>
        
        <Link 
          to="/contact#consultation" 
          className="group inline-flex items-center justify-center gap-4 px-10 py-5 bg-transparent border-2 border-white/40 text-white font-serif text-xl tracking-wide hover:bg-white hover:text-accent hover:border-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
        >
          <span>Book a Consultation</span>
          <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
        </Link>
      </div>
    </section>
  );
}
