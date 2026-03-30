'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, ZoomIn } from 'lucide-react';
import { galleryImages } from '@/lib/data';

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#DDA651] text-xs tracking-[0.35em] uppercase font-medium mb-3">Galerie Foto</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
            Imagini din paradisul nostru
          </h2>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 space-y-3">
          {galleryImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="relative group cursor-pointer rounded-xl overflow-hidden break-inside-avoid"
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={400}
                height={i % 3 === 0 ? 500 : 300}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
              onClick={() => setLightbox(null)}
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[lightbox].src}
                alt={galleryImages[lightbox].alt}
                width={1200}
                height={800}
                className="object-contain max-h-[85vh] mx-auto rounded-xl"
              />
              <p className="text-white/40 text-sm text-center mt-3">{lightbox + 1} / {galleryImages.length}</p>
              {/* Navigation */}
              <div className="absolute inset-y-0 -left-12 flex items-center">
                <button onClick={() => setLightbox((l) => l !== null ? (l - 1 + galleryImages.length) % galleryImages.length : 0)}
                  className="text-white/50 hover:text-white text-3xl">‹</button>
              </div>
              <div className="absolute inset-y-0 -right-12 flex items-center">
                <button onClick={() => setLightbox((l) => l !== null ? (l + 1) % galleryImages.length : 0)}
                  className="text-white/50 hover:text-white text-3xl">›</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
