import { createContext, useContext, useState } from 'react'

const BookingCtx = createContext<{ open: () => void }>({ open: () => {} })

export function useBooking() {
  return useContext(BookingCtx)
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <BookingCtx.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {/* Lazy import to keep bundle clean */}
      <ModalSlot isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </BookingCtx.Provider>
  )
}

import BookingModal from './components/BookingModal'
function ModalSlot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return <BookingModal isOpen={isOpen} onClose={onClose} />
}
