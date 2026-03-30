'use client';

import { motion } from 'framer-motion';
import { facilities } from '@/lib/data';

export default function Facilities() {
  return (
    <section id="facilities" className="section-padding" style={{ background: 'linear-gradient(180deg, #0D0D0D 0%, #111a11 50%, #0D0D0D 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#DDA651] text-xs tracking-[0.35em] uppercase font-medium mb-3">Servicii & Facilități</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Tot ce ai nevoie,
            <br />
            <span className="text-gradient-gold italic">într-un singur loc</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Oferim o gamă completă de facilități pentru a face sejurul tău perfect.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {facilities.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="group p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-[#DDA651]/5 hover:border-[#DDA651]/20 transition-all cursor-default"
            >
              <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base mb-1 group-hover:text-[#DDA651] transition-colors">
                {item.title}
              </h3>
              <p className="text-white/40 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Benefits strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
        >
          {[
            { icon: '🛡️', title: 'Anulare Gratuită', desc: 'Până la 7 zile înainte' },
            { icon: '💳', title: 'Rezervați & Plătiți Mai Târziu', desc: 'Flexibilitate maximă' },
            { icon: '🗺️', title: 'Stațiune Turistică', desc: 'Descoperă frumuseța Carpaților' },
            { icon: '🤝', title: 'Servicii Ospitaliere', desc: 'Personal dedicat 24/7' },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3 p-4 glass rounded-xl">
              <span className="text-2xl shrink-0">{b.icon}</span>
              <div>
                <p className="text-white text-sm font-semibold leading-tight">{b.title}</p>
                <p className="text-white/40 text-xs mt-0.5">{b.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
