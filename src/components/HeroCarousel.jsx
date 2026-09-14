import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    headline: 'Definitive Corporate Counsel',
    subhead: 'Guiding enterprise clients through high-stakes mergers, complex governance, and strategic real estate acquisitions.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 2,
    headline: 'Strategic Dispute Resolution',
    subhead: 'Formidable representation in commercial litigation and alternative dispute resolution, focused on rapid, commercially sensible outcomes.',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 3,
    headline: 'Protecting Your Legacy',
    subhead: 'Confidential, expert support for complex family law, wealth protection, and succession planning matters.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1920&q=80',
  },
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, skipSnaps: false },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative w-full h-[calc(100vh-5rem)] min-h-[600px] overflow-hidden bg-oxblood-900">
      {/* 1. Crossfading High-Quality Background Images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={selectedIndex}
            src={SLIDES[selectedIndex].image}
            alt={SLIDES[selectedIndex].headline}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </AnimatePresence>
        
        {/* Dark overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-oxblood-900/60 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* 2. Embla Swipe Target (Invisible but functional) */}
      <div className="absolute inset-0 z-10" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {SLIDES.map((slide) => (
            <div key={slide.id} className="relative flex-[0_0_100%] h-full" aria-hidden="true" />
          ))}
        </div>
      </div>

      {/* 3. Text Overlay (Animated by Motion) */}
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-center px-16 md:px-24 text-center">
        
        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-4 md:left-8 flex items-center pointer-events-auto">
          <button onClick={scrollPrev} aria-label="Previous slide" className="p-2 md:p-3 text-white/50 hover:text-white bg-black/10 hover:bg-black/30 rounded-full backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-4 md:right-8 flex items-center pointer-events-auto">
          <button onClick={scrollNext} aria-label="Next slide" className="p-2 md:p-3 text-white/50 hover:text-white bg-black/10 hover:bg-black/30 rounded-full backdrop-blur-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-display font-serif text-white mb-6 leading-tight">
              {SLIDES[selectedIndex].headline}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              {SLIDES[selectedIndex].subhead}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 4. Custom Pagination Dots */}
      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center gap-4 pointer-events-auto">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-12 h-1 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              index === selectedIndex ? 'bg-accent' : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
