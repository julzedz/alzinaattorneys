import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-subtle border-t border-border pt-20 pb-10 px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Blurb */}
          <div className="lg:col-span-4">
            <Link
              to="/"
              className="inline-block mb-8 w-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              <Logo />
            </Link>
            <p className="text-ink-muted text-base font-serif font-light leading-relaxed mb-8 max-w-sm">
              Alzina Attorneys provides trusted, result-driven legal
              representation with dedication and precision. We offer strategic
              counsel across various practice areas, including corporate law,
              litigation, family law, real estate, and more.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://linkedin.com/company/alzinaattorneys"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-border text-ink hover:bg-accent hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a
                href="https://x.com/alzinaattorneys"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-border text-ink hover:bg-accent hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/alzinaattorneys"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-border text-ink hover:bg-accent hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://instagram.com/alzinaattorneys"
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-border text-ink hover:bg-accent hover:text-white rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-xl font-serif text-ink mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Firm
            </h3>
            <ul className="flex flex-col gap-4 mt-4">
              <li>
                <Link
                  to="/about"
                  className="text-ink-muted font-serif text-base hover:text-accent hover:italic transition-all"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/practice-areas"
                  className="text-ink-muted font-serif text-base hover:text-accent hover:italic transition-all"
                >
                  Practice Areas
                </Link>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="text-ink-muted font-serif text-base hover:text-accent hover:italic transition-all"
                >
                  Insights
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-ink-muted font-serif text-base hover:text-accent hover:italic transition-all"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas (Featured) */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-serif text-ink mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Expertise
            </h3>
            <ul className="flex flex-col gap-4 mt-4">
              <li>
                <Link
                  to="/practice-areas#corporate-law"
                  className="text-ink-muted font-serif text-base hover:text-accent hover:italic transition-all"
                >
                  Corporate Law
                </Link>
              </li>
              <li>
                <Link
                  to="/practice-areas#litigation"
                  className="text-ink-muted font-serif text-base hover:text-accent hover:italic transition-all"
                >
                  Litigation & Arbitration
                </Link>
              </li>
              <li>
                <Link
                  to="/practice-areas#real-estate"
                  className="text-ink-muted font-serif text-base hover:text-accent hover:italic transition-all"
                >
                  Real Estate
                </Link>
              </li>
              <li>
                <Link
                  to="/practice-areas"
                  className="text-accent font-serif font-medium text-base hover:italic transition-all mt-2 inline-block"
                >
                  View All Practices &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-serif text-ink mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-accent">
              Contact
            </h3>
            <ul className="flex flex-col gap-6 mt-4">
              <li className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <span className="text-base font-serif font-light text-ink-muted leading-relaxed">
                  60 Old Market Road, <br />
                  Onitsha, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <a
                  href="tel:+2348032283805"
                  className="text-base font-serif font-light text-ink-muted hover:text-accent transition-colors"
                >
                  +234 803 228 3805
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a
                  href="mailto:alzinaattorneys@gmail.com"
                  className="text-base font-serif font-light text-ink-muted hover:text-accent transition-colors"
                >
                  alzinaattorneys@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-ink-muted font-serif uppercase tracking-widest">
            &copy; {currentYear} Alzina Attorneys. All rights reserved.
          </p>
          <p className="text-xs text-ink-muted font-serif uppercase tracking-widest">
            Site by{" "}
            <a
              href="https://github.com/julzedz"
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent transition-colors underline decoration-border underline-offset-4"
            >
              Jules Edozie
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
