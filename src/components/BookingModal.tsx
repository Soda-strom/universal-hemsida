import { useEffect, useRef } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="modal-backdrop"
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(13,13,13,0.65)',
      }}
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* modal-panel — transform-origin: center is correct for modals */}
      <div
        className="modal-panel"
        style={{
          width: '100%', maxWidth: 660,
          background: '#ffffff',
          border: '1px solid var(--border)',
          boxShadow: '0 32px 80px rgba(0,0,0,0.2)',
          transformOrigin: 'center',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <p className="section-label" style={{ marginBottom: '0.2rem' }}>Boka Tid</p>
            <p style={{ fontWeight: 300, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Välj tjänst, dag och tid nedan
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Stäng"
            style={{
              width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--surface)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', cursor: 'pointer',
              fontSize: '1.1rem', lineHeight: 1,
              transition: 'all 160ms ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}
            onMouseDown={e => { e.currentTarget.style.transform = 'scale(0.95)' }}
            onMouseUp={e => { e.currentTarget.style.transform = '' }}
          >
            ×
          </button>
        </div>

        {/* Iframe */}
        <div style={{ padding: '1.25rem' }}>
          <iframe
            src="https://www.bookd.se/book/bd1f2c21?embed=1"
            style={{
              width: '100%', height: 620,
              border: '1px solid var(--border)',
              borderRadius: 2,
              display: 'block',
            }}
            loading="eager"
            allow="fullscreen"
            title="Boka tid"
          />
        </div>
      </div>
    </div>
  )
}
