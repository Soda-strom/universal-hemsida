import { useEffect, useRef } from 'react'

const items = [
  { label: 'Lackpolering',       bg: '#1a1a1c', span: 'tall'   },
  { label: 'Invändig Rengöring', bg: '#141416', span: 'normal' },
  { label: 'Keramisk Coating',   bg: '#111113', span: 'normal' },
  { label: 'Komplett Rekond',    bg: '#161614', span: 'normal' },
  { label: 'Stenskottsskydd',    bg: '#131315', span: 'normal' },
]

function Placeholder({ label, bg }: { label: string; bg: string }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: bg, overflow: 'hidden' }}>
      <svg viewBox="0 0 200 80" style={{
        position: 'absolute', bottom: '22%', left: '50%',
        transform: 'translateX(-50%)', width: '60%', opacity: 0.05,
      }} fill="#ffffff">
        <path d="M170 55 L175 45 L155 30 L130 25 L100 22 L70 25 L45 30 L25 45 L30 55 Z M30 55 L170 55 L172 60 L28 60 Z M45 60 A10 10 0 1 0 65 60 A10 10 0 1 0 45 60 M130 60 A10 10 0 1 0 150 60 A10 10 0 1 0 130 60" />
      </svg>
      <div style={{
        position: 'absolute', bottom: '1.25rem', left: '1.25rem',
        fontFamily: "'Jost', sans-serif", fontSize: '0.65rem',
        fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.3)',
      }}>{label}</div>
    </div>
  )
}

export default function GalleriPage() {
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
    <div ref={ref} className="page-enter" style={{ paddingTop: 66 }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '5rem 2rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <p className="section-label reveal" style={{ marginBottom: '1rem' }}>Galleri</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <h1 className="font-display reveal reveal-delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 400, lineHeight: 1.05, color: 'var(--text)',
          }}>
            Resultaten talar
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>för sig själva</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{
            maxWidth: 280, fontWeight: 300, fontSize: '0.88rem',
            lineHeight: 1.7, color: 'var(--text-muted)',
          }}>
            Varje bil vi behandlar lämnar oss i showroom-skick.
            Lägg till dina egna bilder i galleriet.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1px',
          background: 'var(--border)',
          border: '1px solid var(--border)',
        }}>
          {/* Tall left */}
          <div className="gallery-item" style={{ gridRow: 'span 2', height: 560 }}>
            <Placeholder {...items[0]} />
          </div>
          {[1,2,3,4].map(i => (
            <div key={i} className="gallery-item" style={{ height: 278 }}>
              <Placeholder {...items[i]} />
            </div>
          ))}
        </div>

        <p style={{
          marginTop: '1.25rem', fontWeight: 300, fontSize: '0.78rem',
          color: 'var(--text-dim)', letterSpacing: '0.04em',
        }}>
          Ersätt platshållarbilderna med riktiga foton av ditt arbete
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .gallery-item[style*="grid-row: span 2"] { grid-row: span 1 !important; height: 260px !important; }
          div[style*="grid-template-columns: repeat(3"] { grid-template-columns: 1fr !important; }
          .gallery-item { height: 220px !important; }
        }
      `}</style>
    </div>
  )
}
