import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BookingGuests {
  adults: number;
  children: number;
}

export interface BookingRoom {
  id: string;
  name: string;
  price: number;
  nights: number;
  image: string;
}

export interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  specialRequests: string;
}

interface BookingStore {
  step: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: BookingGuests;
  selectedRoom: BookingRoom | null;
  customerDetails: CustomerDetails;
  isOpen: boolean;
  
  setStep: (step: number) => void;
  setCheckIn: (date: Date | null) => void;
  setCheckOut: (date: Date | null) => void;
  setGuests: (guests: BookingGuests) => void;
  setSelectedRoom: (room: BookingRoom | null) => void;
  setCustomerDetails: (details: Partial<CustomerDetails>) => void;
  openBooking: (roomId?: string) => void;
  closeBooking: () => void;
  resetBooking: () => void;
  getTotalPrice: () => number;
  getNights: () => number;
}

const defaultCustomerDetails: CustomerDetails = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: 'Romania',
  specialRequests: '',
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      step: 1,
      checkIn: null,
      checkOut: null,
      guests: { adults: 2, children: 0 },
      selectedRoom: null,
      customerDetails: defaultCustomerDetails,
      isOpen: false,

      setStep: (step) => set({ step }),
      setCheckIn: (checkIn) => set({ checkIn }),
      setCheckOut: (checkOut) => set({ checkOut }),
      setGuests: (guests) => set({ guests }),
      setSelectedRoom: (selectedRoom) => set({ selectedRoom }),
      setCustomerDetails: (details) =>
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...details },
        })),
      openBooking: (roomId) => {
        set({ isOpen: true });
        if (roomId) {
          set({ step: 2 });
        } else {
          set({ step: 1 });
        }
      },
      closeBooking: () => set({ isOpen: false }),
      resetBooking: () =>
        set({
          step: 1,
          checkIn: null,
          checkOut: null,
          guests: { adults: 2, children: 0 },
          selectedRoom: null,
          customerDetails: defaultCustomerDetails,
          isOpen: false,
        }),

      getTotalPrice: () => {
        const { selectedRoom, checkIn, checkOut } = get();
        if (!selectedRoom || !checkIn || !checkOut) return 0;
        const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
        return selectedRoom.price * nights;
      },

      getNights: () => {
        const { checkIn, checkOut } = get();
        if (!checkIn || !checkOut) return 0;
        return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      },
    }),
    {
      name: 'hanul-bucovinei-booking',
      partialize: (state) => ({
        checkIn: state.checkIn,
        checkOut: state.checkOut,
        guests: state.guests,
        selectedRoom: state.selectedRoom,
        customerDetails: state.customerDetails,
        step: state.step,
      }),
    }
  )
);
