import { useEffect, useRef } from 'react'
import { useBooking } from '../BookingContext'

const stats = [
  { value: '5+',     label: 'Års erfarenhet'    },
  { value: '2 000+', label: 'Bilar rekondade'   },
  { value: '1 500+', label: 'Nöjda kunder'      },
  { value: '100%',   label: 'Nöjd-kund-garanti' },
]

export default function HomePage() {
  const { open } = useBooking()
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'
    const raf = requestAnimationFrame(() => {
      setTimeout(() => {
        if (!el) return
        el.style.transition = 'opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 80)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-bg-img" />

      {/* Grain */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")",
      }} />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative', zIndex: 2,
          maxWidth: 780, textAlign: 'center',
          padding: '0 2rem',
        }}
      >
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
          marginBottom: '1.75rem',
        }}>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(255,255,255,0.35)' }} />
          <span style={{
            fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>Ditt Företag — Bilrekond</span>
          <span style={{ display: 'inline-block', width: 28, height: 1, background: 'rgba(255,255,255,0.35)' }} />
        </div>

        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(3.4rem, 9vw, 7.5rem)',
            fontWeight: 500, lineHeight: 1.02,
            color: '#ffffff', letterSpacing: '-0.01em',
            marginBottom: '1.75rem',
          }}
        >
          Professionell
          <br />
          <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.65)' }}>Bilrekond</em>
        </h1>

        <p style={{
          fontWeight: 300, fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          lineHeight: 1.75, color: 'rgba(255,255,255,0.55)',
          maxWidth: 460, margin: '0 auto 2.75rem',
        }}>
          Vi ger din bil den behandling den förtjänar. Från utvändig polish
          till komplett inre renovering.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary-light" onClick={open}>Boka Nu</button>
          <a className="btn-outline-light" href="/tjanster">Våra Tjänster</a>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        borderTop: '1px solid rgba(255,255,255,0.09)',
        background: 'rgba(0,0,0,0.42)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              padding: '1.6rem 1rem', textAlign: 'center',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            }}>
              <div className="stat-number" style={{ marginBottom: '0.3rem' }}>{s.value}</div>
              <p style={{
                fontFamily: "'Jost', sans-serif", fontWeight: 300,
                fontSize: '0.68rem', letterSpacing: '0.1em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)',
              }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 560px) {
          .hero-section [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2,1fr) !important;
          }
        }
      `}</style>
    </section>
  )
}
