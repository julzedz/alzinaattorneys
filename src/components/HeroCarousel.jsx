import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    headline: "Securing Your Assets",
    subhead:
      "Comprehensive and seamless property management. We manage your real estate so you can focus on growth.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 2,
    headline: "Protecting Your Rights",
    subhead:
      "Alzina Attorneys brings formidable representation and delivers results when it matter most.",
    image:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=1920&q=80",
  },
  {
    id: 3,
    headline: "Law with Distinction",
    subhead:
      "Setting bold new levels of legal excellence in Nigeria and beyond.",
    image:
      "https://images.unsplash.com/photo-1554457606-ed16c39db884?w=900&auto=format&fit=crop&w=1920&q=80",
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
    <div className="relative w-full h-[calc(100svh-60px)] md:h-[calc(100vh-5rem)] min-h-[500px] md:min-h-[600px] overflow-hidden bg-oxblood-900">
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
        
        {/* Gradient overlays to ensure text contrast on the left without darkening the whole image too much */}
        <div className="absolute inset-0 bg-linear-to-r from-oxblood-900/60 via-oxblood-900/10 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/10 to-transparent"></div>
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
      <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-center items-start px-14 sm:px-20 md:px-28 xl:px-40 text-left">
        
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] drop-shadow-lg" 
              style={{ fontFamily: 'var(--font-hero-serif)' }}
            >
              {SLIDES[selectedIndex].headline}
            </h1>
            <p 
              className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed drop-shadow-md font-light" 
              style={{ fontFamily: 'var(--font-hero-sans)' }}
            >
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
