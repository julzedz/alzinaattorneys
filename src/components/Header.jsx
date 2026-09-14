import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Practice Areas', path: '/practice-areas' },
  { name: 'Insights', path: '/insights' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-100 transition-all duration-300 bg-bg/95 backdrop-blur-md shadow-sm flex items-center ${
          isScrolled ? 'py-1' : 'py-2 md:py-3'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm" onClick={() => setMobileMenuOpen(false)}>
            <motion.div
              animate={{ scale: isScrolled ? 0.85 : 1, transformOrigin: 'left center' }}
              transition={{ duration: 0.3 }}
              className="w-16 md:w-24 origin-left"
            >
              <Logo />
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/about" className="text-ink font-serif text-lg hover:text-accent hover:italic transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2">
              About Us
            </Link>
            <Link to="/practice-areas" className="text-ink font-serif text-lg hover:text-accent hover:italic transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2">
              Practice Areas
            </Link>
            <Link to="/insights" className="text-ink font-serif text-lg hover:text-accent hover:italic transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm px-2">
              Insights
            </Link>
            
            <ThemeToggle />
            
            <Link to="/contact" className="px-6 py-2.5 bg-ink text-bg font-serif text-lg italic hover:bg-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
              Contact
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4 z-50">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay (Moved outside the transform container) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 pt-24 bg-bg z-90 flex flex-col px-6 pb-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 mt-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-3xl font-serif font-medium transition-colors ${
                      isActive ? 'text-accent' : 'text-ink'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>
            <div className="mt-auto pt-8 border-t border-border">
              <p className="text-sm text-ink-muted mb-4 uppercase tracking-widest font-bold">Get in touch</p>
              <a href="mailto:alzinaattorneys@gmail.com" className="block text-xl font-serif font-medium text-ink hover:text-accent mb-2">
                alzinaattorneys@gmail.com
              </a>
              <a href="tel:+2348032283805" className="block text-xl font-serif font-medium text-ink hover:text-accent">
                +234 803 228 3805
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
