import { useEffect, useRef } from 'react'
import { useBooking } from '../BookingContext'

const info = [
  { label: 'Adress',  value: 'Exempelgatan 12, 123 45 Stad'  },
  { label: 'Telefon', value: '070-000 00 00'                  },
  { label: 'E-post',  value: 'info@dittforetag.se'            },
  { label: 'Öppet',   value: 'Mån–Fre 08–18, Lör 09–15'      },
]

export default function ContactPage() {
  const { open } = useBooking()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      }),
      { threshold: 0.04 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={ref} className="page-enter" style={{ paddingTop: 66 }}>
        {/* Header */}
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '5rem 2rem 4rem',
          borderBottom: '1px solid var(--border)',
        }}>
          <p className="section-label reveal" style={{ marginBottom: '1rem' }}>Kontakt</p>
          <h1 className="font-display reveal reveal-delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 400, lineHeight: 1.05, color: 'var(--text)',
          }}>
            Låt oss ta hand
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>om din bil</em>
          </h1>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '5rem 2rem 8rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }} className="contact-grid">

          {/* Info */}
          <div>
            <p className="reveal" style={{
              fontWeight: 300, fontSize: '1rem', lineHeight: 1.8,
              color: 'var(--text-muted)', marginBottom: '2.75rem', maxWidth: 380,
            }}>
              Har du frågor om våra tjänster eller vill boka en tid?
              Ring, maila eller använd vår direktbokning nedan.
            </p>

            <div className="reveal reveal-delay-1">
              {info.map((item, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr',
                  gap: '1rem', padding: '1.1rem 0',
                  borderBottom: i < info.length - 1 ? '1px solid var(--border)' : 'none',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontSize: '0.65rem', fontWeight: 500,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                  }}>{item.label}</span>
                  <span style={{ fontWeight: 300, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Single Boka Nu CTA */}
          <div className="reveal reveal-delay-2" style={{ textAlign: 'center' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              padding: '4rem 3rem',
            }}>
              <p className="section-label" style={{ marginBottom: '1rem' }}>Direktbokning</p>
              <h2 className="font-display" style={{
                fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
                fontWeight: 400, lineHeight: 1.2,
                color: 'var(--text)', marginBottom: '1rem',
              }}>
                Redo att boka?
              </h2>
              <p style={{
                fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.7,
                color: 'var(--text-muted)', marginBottom: '2.5rem',
              }}>
                Välj tjänst, datum och tid direkt i vår bokningskalender.
                Enkelt, snabbt och utan bindning.
              </p>
              <button
                className="btn-primary"
                style={{ padding: '1.1rem 3rem', fontSize: '0.78rem' }}
                onClick={open}
              >
                Boka Nu
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </>
  )
}
