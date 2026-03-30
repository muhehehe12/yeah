'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { ro } from 'date-fns/locale';
import { Calendar, Users, X, ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { useBookingStore } from '@/lib/bookingStore';
import { rooms } from '@/lib/data';
import Image from 'next/image';

const STEPS = ['Date', 'Cameră', 'Detalii', 'Confirmat'];

export default function BookingWizard() {
  const {
    isOpen, step, checkIn, checkOut, guests, selectedRoom, customerDetails,
    setStep, setCheckIn, setCheckOut, setGuests, setSelectedRoom,
    setCustomerDetails, closeBooking, resetBooking, getTotalPrice, getNights,
  } = useBookingStore();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const nights = getNights();
  const total = getTotalPrice();

  const handleNext = async () => {
    if (step === 1) {
      if (!checkIn || !checkOut) {
        setErrors({ dates: 'Selectați datele de check-in și check-out.' });
        return;
      }
      setErrors({});
      setStep(2);
    } else if (step === 2) {
      if (!selectedRoom) {
        setErrors({ room: 'Selectați o cameră.' });
        return;
      }
      setErrors({});
      setStep(3);
    } else if (step === 3) {
      const newErrors: Record<string, string> = {};
      if (!customerDetails.firstName) newErrors.firstName = 'Câmp obligatoriu';
      if (!customerDetails.lastName) newErrors.lastName = 'Câmp obligatoriu';
      if (!customerDetails.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerDetails.email)) newErrors.email = 'Email invalid';
      if (!customerDetails.phone) newErrors.phone = 'Câmp obligatoriu';
      if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
      setErrors({});
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1500));
      setLoading(false);
      setStep(4);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
        onClick={(e) => { if (e.target === e.currentTarget) closeBooking(); }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
        >
          {/* Header */}
          <div className="sticky top-0 bg-[#111] border-b border-white/10 px-6 py-4 z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {step === 4 ? 'Rezervare Confirmată! 🎉' : 'Rezervare Cameră'}
                </h2>
                {step < 4 && <p className="text-white/50 text-xs mt-0.5">Pasul {step} din 3</p>}
              </div>
              <button onClick={closeBooking} className="text-white/40 hover:text-white transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            {/* Stepper */}
            {step < 4 && (
              <div className="flex items-center gap-2">
                {STEPS.slice(0, 3).map((label, i) => {
                  const s = i + 1;
                  return (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all ${
                        step > s ? 'bg-[#DDA651] text-white' : step === s ? 'bg-[#DDA651] text-white' : 'bg-white/10 text-white/40'
                      }`}>
                        {step > s ? <Check size={13} /> : s}
                      </div>
                      <span className={`text-xs hidden sm:block ${step >= s ? 'text-[#DDA651]' : 'text-white/30'}`}>{label}</span>
                      {i < 2 && <div className={`h-px flex-1 transition-all ${step > s ? 'bg-[#DDA651]' : 'bg-white/10'}`} />}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 && <Step1 checkIn={checkIn} checkOut={checkOut} guests={guests} setCheckIn={setCheckIn} setCheckOut={setCheckOut} setGuests={setGuests} errors={errors} />}
            {step === 2 && <Step2 selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} checkIn={checkIn} checkOut={checkOut} guests={guests} errors={errors} nights={nights} />}
            {step === 3 && <Step3 customerDetails={customerDetails} setCustomerDetails={setCustomerDetails} errors={errors} selectedRoom={selectedRoom} checkIn={checkIn} checkOut={checkOut} nights={nights} total={total} />}
            {step === 4 && <Step4 selectedRoom={selectedRoom} checkIn={checkIn} checkOut={checkOut} nights={nights} total={total} customerDetails={customerDetails} guests={guests} resetBooking={resetBooking} closeBooking={closeBooking} />}
          </div>

          {/* Footer */}
          {step < 4 && (
            <div className="sticky bottom-0 bg-[#111] border-t border-white/10 px-6 py-4 flex items-center justify-between">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : closeBooking()}
                className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1"
              >
                <ChevronLeft size={16} /> {step > 1 ? 'Înapoi' : 'Anulează'}
              </button>
              <div className="text-right">
                {selectedRoom && nights > 0 && (
                  <p className="text-xs text-white/50 mb-1">{nights} nopți · {total.toLocaleString()} RON total</p>
                )}
                <button
                  onClick={handleNext}
                  disabled={loading}
                  className="btn-gold px-6 py-2.5 rounded-lg text-sm flex items-center gap-2"
                >
                  {loading && <Loader2 size={14} className="animate-spin" />}
                  {step === 3 ? 'Confirmă Rezervarea' : 'Continuă'}
                  {!loading && <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Step 1: Dates & Guests ───────────────────────────────────────────────────

function Step1({ checkIn, checkOut, guests, setCheckIn, setCheckOut, setGuests, errors }: any) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-white font-semibold mb-4">Selectați datele sejurului</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Check-in</label>
            <input
              type="date"
              min={format(today, 'yyyy-MM-dd')}
              value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''}
              onChange={(e) => {
                const d = e.target.value ? new Date(e.target.value) : null;
                setCheckIn(d);
                if (d && checkOut && checkOut <= d) setCheckOut(addDays(d, 1));
              }}
              className="input-dark w-full px-3 py-3 rounded-lg text-sm"
              style={{ colorScheme: 'dark' }}
            />
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1.5">Check-out</label>
            <input
              type="date"
              min={checkIn ? format(addDays(checkIn, 1), 'yyyy-MM-dd') : format(addDays(today, 1), 'yyyy-MM-dd')}
              value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''}
              onChange={(e) => setCheckOut(e.target.value ? new Date(e.target.value) : null)}
              className="input-dark w-full px-3 py-3 rounded-lg text-sm"
              style={{ colorScheme: 'dark' }}
            />
          </div>
        </div>
        {checkIn && checkOut && (
          <div className="mt-2 p-3 bg-[#DDA651]/10 border border-[#DDA651]/20 rounded-lg">
            <p className="text-[#DDA651] text-sm text-center">
              {Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000*60*60*24))} nopți
              · {format(checkIn, 'dd MMM', { locale: ro })} → {format(checkOut, 'dd MMM yyyy', { locale: ro })}
            </p>
          </div>
        )}
        {errors.dates && <p className="text-red-400 text-xs mt-2">{errors.dates}</p>}
      </div>

      <div>
        <h3 className="text-white font-semibold mb-4">Oaspeți</h3>
        <div className="space-y-3">
          {[
            { label: 'Adulți', key: 'adults', min: 1, max: 4 },
            { label: 'Copii (0-12 ani)', key: 'children', min: 0, max: 3 },
          ].map(({ label, key, min, max }) => (
            <div key={key} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-white/70 text-sm">{label}</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests({ ...guests, [key]: Math.max(min, guests[key] - 1) })}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#DDA651] text-white flex items-center justify-center transition-colors text-sm font-bold"
                >−</button>
                <span className="text-white w-4 text-center font-semibold">{guests[key as keyof typeof guests]}</span>
                <button
                  onClick={() => setGuests({ ...guests, [key]: Math.min(max, guests[key] + 1) })}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#DDA651] text-white flex items-center justify-center transition-colors text-sm font-bold"
                >+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Room Selection ───────────────────────────────────────────────────

function Step2({ selectedRoom, setSelectedRoom, checkIn, checkOut, guests, errors, nights }: any) {
  const totalGuests = guests.adults + guests.children;

  return (
    <div className="space-y-4">
      <p className="text-white/50 text-sm">
        {nights > 0 ? `${nights} nopți · ${guests.adults} adulți${guests.children > 0 ? ` + ${guests.children} copii` : ''}` : 'Selectați camerele disponibile'}
      </p>
      {errors.room && <p className="text-red-400 text-xs">{errors.room}</p>}
      {rooms.map((room) => {
        const isSelected = selectedRoom?.id === room.id;
        const isCompatible = room.capacity >= guests.adults;
        return (
          <motion.div
            key={room.id}
            whileHover={{ scale: 1.005 }}
            onClick={() => {
              if (!isCompatible) return;
              setSelectedRoom({ id: room.id, name: room.name, price: room.price, nights, image: room.images[0] });
            }}
            className={`border rounded-xl overflow-hidden cursor-pointer transition-all ${
              isSelected ? 'border-[#DDA651] bg-[#DDA651]/5' : isCompatible ? 'border-white/10 hover:border-white/20' : 'border-white/5 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex">
              <div className="relative w-28 h-24 shrink-0">
                <Image src={room.images[0]} alt={room.name} fill className="object-cover" />
                {!isCompatible && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white/70 text-xs text-center px-1">Capacitate insuficientă</span>
                  </div>
                )}
              </div>
              <div className="flex-1 p-3 flex justify-between items-start">
                <div>
                  <p className="text-white text-sm font-semibold leading-tight">{room.name}</p>
                  <p className="text-white/40 text-xs mt-1">{room.size}m² · {room.beds}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {room.amenities.slice(0, 3).map((a: string) => (
                      <span key={a} className="text-xs bg-white/5 text-white/50 px-1.5 py-0.5 rounded">{a}</span>
                    ))}
                    {room.amenities.length > 3 && <span className="text-xs text-white/30">+{room.amenities.length - 3}</span>}
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-[#DDA651] font-bold text-lg leading-none">{room.price}</p>
                  <p className="text-white/40 text-xs">RON/noapte</p>
                  {nights > 0 && <p className="text-white/60 text-xs mt-1">{(room.price * nights).toLocaleString()} total</p>}
                  {isSelected && (
                    <div className="mt-2 w-5 h-5 rounded-full bg-[#DDA651] flex items-center justify-center ml-auto">
                      <Check size={11} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Step 3: Customer Details ─────────────────────────────────────────────────

function Step3({ customerDetails, setCustomerDetails, errors, selectedRoom, checkIn, checkOut, nights, total }: any) {
  return (
    <div className="space-y-6">
      {/* Booking summary */}
      {selectedRoom && (
        <div className="bg-[#DDA651]/10 border border-[#DDA651]/20 rounded-xl p-4">
          <p className="text-[#DDA651] text-xs font-semibold mb-2">Sumar rezervare</p>
          <div className="flex justify-between text-sm">
            <span className="text-white/70">{selectedRoom.name}</span>
            <span className="text-white">{total.toLocaleString()} RON</span>
          </div>
          <div className="flex justify-between text-xs text-white/40 mt-1">
            <span>{nights} nopți × {selectedRoom.price} RON</span>
            <span>{checkIn && format(checkIn, 'dd MMM')} → {checkOut && format(checkOut, 'dd MMM yyyy')}</span>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-white/50 block mb-1.5">Prenume *</label>
          <input value={customerDetails.firstName} onChange={(e) => setCustomerDetails({ firstName: e.target.value })}
            className={`input-dark w-full px-3 py-2.5 rounded-lg text-sm ${errors.firstName ? 'border-red-500' : ''}`} placeholder="Ion" />
          {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="text-xs text-white/50 block mb-1.5">Nume *</label>
          <input value={customerDetails.lastName} onChange={(e) => setCustomerDetails({ lastName: e.target.value })}
            className={`input-dark w-full px-3 py-2.5 rounded-lg text-sm ${errors.lastName ? 'border-red-500' : ''}`} placeholder="Popescu" />
          {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
        </div>
      </div>
      <div>
        <label className="text-xs text-white/50 block mb-1.5">Email *</label>
        <input type="email" value={customerDetails.email} onChange={(e) => setCustomerDetails({ email: e.target.value })}
          className={`input-dark w-full px-3 py-2.5 rounded-lg text-sm ${errors.email ? 'border-red-500' : ''}`} placeholder="ion.popescu@email.ro" />
        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-xs text-white/50 block mb-1.5">Telefon *</label>
        <input type="tel" value={customerDetails.phone} onChange={(e) => setCustomerDetails({ phone: e.target.value })}
          className={`input-dark w-full px-3 py-2.5 rounded-lg text-sm ${errors.phone ? 'border-red-500' : ''}`} placeholder="+40 740 000 000" />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
      </div>
      <div>
        <label className="text-xs text-white/50 block mb-1.5">Cerințe speciale (opțional)</label>
        <textarea value={customerDetails.specialRequests} onChange={(e) => setCustomerDetails({ specialRequests: e.target.value })}
          rows={3} className="input-dark w-full px-3 py-2.5 rounded-lg text-sm resize-none" placeholder="Ex: cameră la etaj superior, pat suplimentar pentru copil..." />
      </div>
      <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
        <Check size={15} className="text-green-400 mt-0.5 shrink-0" />
        <p className="text-green-300 text-xs">Anulare gratuită până la 7 zile înainte · Plata la recepție</p>
      </div>
    </div>
  );
}

// ─── Step 4: Confirmation ─────────────────────────────────────────────────────

function Step4({ selectedRoom, checkIn, checkOut, nights, total, customerDetails, guests, resetBooking, closeBooking }: any) {
  const refCode = `HB-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return (
    <div className="text-center py-4">
      <div className="w-16 h-16 bg-[#DDA651]/20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check size={28} className="text-[#DDA651]" />
      </div>
      <h3 className="text-xl font-bold text-white mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Rezervare confirmată!</h3>
      <p className="text-white/50 text-sm mb-2">Cod rezervare: <span className="text-[#DDA651] font-mono font-bold">{refCode}</span></p>
      <p className="text-white/40 text-xs mb-6">Un email de confirmare a fost trimis la <span className="text-white">{customerDetails.email}</span></p>

      <div className="bg-white/5 rounded-xl p-4 text-left space-y-3 mb-6">
        <div className="flex justify-between text-sm"><span className="text-white/50">Cameră</span><span className="text-white">{selectedRoom?.name}</span></div>
        <div className="flex justify-between text-sm"><span className="text-white/50">Check-in</span><span className="text-white">{checkIn && format(checkIn, 'dd MMMM yyyy', { locale: ro })}</span></div>
        <div className="flex justify-between text-sm"><span className="text-white/50">Check-out</span><span className="text-white">{checkOut && format(checkOut, 'dd MMMM yyyy', { locale: ro })}</span></div>
        <div className="flex justify-between text-sm"><span className="text-white/50">Oaspeți</span><span className="text-white">{guests.adults} adulți{guests.children > 0 ? ` + ${guests.children} copii` : ''}</span></div>
        <div className="flex justify-between text-sm border-t border-white/10 pt-3"><span className="text-white font-semibold">Total</span><span className="text-[#DDA651] font-bold">{total.toLocaleString()} RON</span></div>
      </div>

      <div className="flex gap-3">
        <button onClick={() => { closeBooking(); resetBooking(); }} className="flex-1 btn-gold py-3 rounded-xl font-semibold">Închide</button>
      </div>
      <p className="text-white/30 text-xs mt-3">Pentru modificări: +40 740 000 000</p>
    </div>
  );
}
