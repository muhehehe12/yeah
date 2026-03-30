'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, MessageCircle, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/5">
      {/* Map Section */}
      <div className="w-full h-64 bg-[#1a1a1a] relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d87067.84!2d25.5!3d47.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zQ8OibXB1bHVuZyBNb2xkb3ZlbmVzYw!5e0!3m2!1sro!2sro!4v1"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-xs tracking-[0.25em] text-[#DDA651] uppercase font-medium">Hanul</span>
              <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Bucovinei</h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
              Un loc ideal pentru relaxare în inima Bucovinei. De trei generații, oferim ospitalitate autentică și experiențe de neuitat.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#DDA651] flex items-center justify-center text-white/60 hover:text-white transition-all">
                <Facebook size={15} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#DDA651] flex items-center justify-center text-white/60 hover:text-white transition-all">
                <Instagram size={15} />
              </a>
              <a href="https://wa.me/40740000000" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#25D366] flex items-center justify-center text-white/60 hover:text-white transition-all">
                <MessageCircle size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase mb-5">Navigare</h3>
            <ul className="space-y-3">
              {['Camere & Tarife', 'Facilități', 'Galerie Foto', 'Recenzii Oaspeți', 'FAQ', 'Rezervă Online'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/50 hover:text-[#DDA651] text-sm transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#DDA651] shrink-0 mt-0.5" />
                <span className="text-white/50 text-sm">Câmpulung Moldovenesc, Bucovina, România</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#DDA651] shrink-0" />
                <a href="tel:+40740000000" className="text-white/50 hover:text-white text-sm transition-colors">+40 740 000 000</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#DDA651] shrink-0" />
                <a href="mailto:contact@hanul-bucovinei.ro" className="text-white/50 hover:text-white text-sm transition-colors">contact@hanul-bucovinei.ro</a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-widest uppercase mb-5">Program Recepție</h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-white/50">Check-in</span>
                <span className="text-white">15:00</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-white/50">Check-out</span>
                <span className="text-white">12:00</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-white/50">Recepție</span>
                <span className="text-white">24/7</span>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-white/30 mb-3">Plăți acceptate</p>
              <div className="flex gap-2 items-center flex-wrap">
                {['VISA', 'MC', 'AMEX', 'Cash'].map((card) => (
                  <span key={card} className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded border border-white/10">{card}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© 2025 Hanul Bucovinei. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">Politica de Confidențialitate</a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">Termeni și Condiții</a>
            <a href="#" className="text-white/30 hover:text-white text-xs transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
