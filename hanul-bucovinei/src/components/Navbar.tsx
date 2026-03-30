'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { useBookingStore } from '@/lib/bookingStore';

const navLinks = [
  { label: 'Acasă', href: '#hero' },
  { label: 'Camere', href: '#rooms' },
  { label: 'Facilități', href: '#facilities' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Recenzii', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking } = useBookingStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-xl border-b border-white/5 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="text-xs tracking-[0.25em] text-[#DDA651] uppercase font-medium">Hanul</span>
            <span className="text-xl font-bold tracking-wide text-white group-hover:text-[#DDA651] transition-colors" style={{ fontFamily: 'Playfair Display, serif' }}>
              Bucovinei
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-white/70 hover:text-[#DDA651] transition-colors tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+40740000000"
              className="flex items-center gap-2 text-sm text-white/60 hover:text-[#DDA651] transition-colors"
            >
              <Phone size={14} />
              +40 740 000 000
            </a>
            <button
              onClick={() => openBooking()}
              className="btn-gold px-5 py-2.5 rounded-lg text-sm"
            >
              Rezervă Acum
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-6"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-2xl font-semibold text-white/80 hover:text-[#DDA651] text-left transition-colors"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
            <div className="mt-auto pb-12">
              <button
                onClick={() => { openBooking(); setMobileOpen(false); }}
                className="btn-gold w-full py-4 rounded-xl text-base font-semibold"
              >
                Rezervă Acum
              </button>
              <a href="tel:+40740000000" className="flex items-center justify-center gap-2 mt-4 text-white/50 text-sm">
                <Phone size={14} />
                +40 740 000 000
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
