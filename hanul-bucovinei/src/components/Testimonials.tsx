'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section id="reviews" className="section-padding" style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #0a1a0a 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#DDA651] text-xs tracking-[0.35em] uppercase font-medium mb-3">Recenzii Oaspeți</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Ce spun oaspeții noștri
          </h2>
          {/* Rating summary */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((s) => (
                <Star key={s} size={18} className="text-[#DDA651] fill-[#DDA651]" />
              ))}
            </div>
            <span className="text-white font-bold text-xl">4.9</span>
            <span className="text-white/40 text-sm">bazat pe 300+ recenzii</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#151515] border border-white/5 rounded-2xl p-6 relative card-hover"
            >
              <Quote size={20} className="text-[#DDA651]/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={12} className="text-[#DDA651] fill-[#DDA651]" />
                ))}
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-4 line-clamp-4">"{t.text}"</p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-[#DDA651]/20 text-[#DDA651] flex items-center justify-center font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.location} · {t.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <a
            href="https://g.page/r/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#DDA651] text-sm transition-colors border border-white/10 hover:border-[#DDA651]/30 px-5 py-2.5 rounded-xl"
          >
            <span>⭐</span> Lasă o recenzie pe Google
          </a>
        </motion.div>
      </div>
    </section>
  );
}
