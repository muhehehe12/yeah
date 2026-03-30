'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, Wifi, Bath, Mountain, Snowflake, Tv, Coffee } from 'lucide-react';
import { rooms } from '@/lib/data';
import { useBookingStore } from '@/lib/bookingStore';

const amenityIcons: Record<string, React.ReactNode> = {
  'WiFi Gratuit': <Wifi size={12} />,
  'Sistem Climatizare': <Snowflake size={12} />,
  'TV Smart': <Tv size={12} />,
  'Minibar': <Coffee size={12} />,
  'Balcon Privat': <Mountain size={12} />,
  'Cadă Free-standing': <Bath size={12} />,
};

export default function Rooms() {
  const { openBooking } = useBookingStore();

  return (
    <section id="rooms" className="section-padding bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#DDA651] text-xs tracking-[0.35em] uppercase font-medium mb-3">Camerele noastre</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Bucură-te de o ședere memorabilă
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Camerele de hotel de recepție, amplasate într-o pădure din inima Bucovinei. 
            Fiecare cameră spune o poveste unică.
          </p>
        </motion.div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {rooms.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-[#151515] rounded-2xl overflow-hidden border border-white/5 card-hover"
            >
              {/* Featured badge */}
              {room.featured && (
                <div className="absolute top-4 left-4 z-10 bg-[#DDA651] text-white text-xs font-bold px-3 py-1 rounded-full">
                  ✦ Recomandat
                </div>
              )}

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                
                {/* Price overlay */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                  <span className="text-[#DDA651] font-bold text-lg leading-none">{room.price}</span>
                  <span className="text-white/50 text-xs"> RON/noapte</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <Star size={12} className="text-[#DDA651] fill-[#DDA651]" />
                    <span className="text-white/70 text-xs">{room.rating}</span>
                    <span className="text-white/30 text-xs">({room.reviews})</span>
                  </div>
                </div>

                {/* Specs */}
                <div className="flex gap-4 text-xs text-white/40 mb-3">
                  <span>📐 {room.size}m²</span>
                  <span>👥 {room.capacity} oaspeți</span>
                  <span>🛏 {room.beds}</span>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">{room.description}</p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {room.amenities.slice(0, 5).map((amenity) => (
                    <span key={amenity} className="text-xs bg-white/5 text-white/50 px-2 py-1 rounded-lg border border-white/5 flex items-center gap-1">
                      {amenityIcons[amenity] || null}
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 5 && (
                    <span className="text-xs text-white/30 px-2 py-1">+{room.amenities.length - 5} mai multe</span>
                  )}
                </div>

                <button
                  onClick={() => openBooking(room.id)}
                  className="w-full btn-gold py-3 rounded-xl text-sm font-semibold"
                >
                  Rezervă această cameră
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
