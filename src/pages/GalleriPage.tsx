import { useEffect, useRef } from 'react'

/**
 * Gallery images — save these files to public/ to replace the placeholders:
 *   public/gallery-glass.jpg     — sprucken ruta / stenskott
 *   public/gallery-folie.jpg     — PPF-folie på blå bil
 *   public/gallery-interior.jpg  — invändig rengöring
 *   public/gallery-polishing.jpg — polering av BMW-grill
 *   public/gallery-detail.jpg    — instrumentbräda rengöring
 *   public/gallery-machine.jpg   — maskinpolering Mercedes
 */
const images = [
  {
    src:     '/gallery-folie.jpg',
    label:   'Lackskydd Folie',
    caption: 'PPF-folie applikation',
    size:    'tall',   // spans 2 rows
  },
  {
    src:     '/gallery-interior.jpg',
    label:   'Invändig Rengöring',
    caption: 'Läder & klädsel',
    size:    'normal',
  },
  {
    src:     '/gallery-glass.jpg',
    label:   'Glasreparation',
    caption: 'Stenskott & sprickor',
    size:    'normal',
  },
  {
    src:     '/gallery-machine.jpg',
    label:   'Maskinpolering',
    caption: 'Lackåterställning',
    size:    'normal',
  },
  {
    src:     '/gallery-polishing.jpg',
    label:   'Detaljpolering',
    caption: 'Handpolering grill & detaljer',
    size:    'normal',
  },
  {
    src:     '/gallery-detail.jpg',
    label:   'Interiör Detaljvård',
    caption: 'Instrumentbräda & plast',
    size:    'wide',   // spans 2 cols
  },
]

// Placeholder gradient when image not found
function Placeholder({ label }: { label: string }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #141416 0%, #0e0e10 100%)',
      display: 'flex', alignItems: 'flex-end',
      padding: '1.25rem',
      position: 'relative',
    }}>
      <svg viewBox="0 0 200 80" style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)', width: '55%', opacity: 0.05,
      }} fill="#fff">
        <path d="M170 55L175 45 155 30 130 25 100 22 70 25 45 30 25 45 30 55ZM30 55L170 55 172 60 28 60ZM45 60A10 10 0 1 0 65 60A10 10 0 1 0 45 60M130 60A10 10 0 1 0 150 60A10 10 0 1 0 130 60" />
      </svg>
      <span style={{
        fontFamily: "'Jost', sans-serif", fontSize: '0.65rem',
        fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.28)',
      }}>{label}</span>
    </div>
  )
}

function GalleryItem({
  src, label, caption, style,
}: {
  src: string; label: string; caption: string; style?: React.CSSProperties
}) {
  const [hasImg, setHasImg] = React.useState(true)

  return (
    <div className="gallery-item" style={style}>
      {hasImg ? (
        <img
          src={src}
          alt={label}
          onError={() => setHasImg(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      ) : (
        <Placeholder label={label} />
      )}
      <div className="gallery-label">
        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 500,
          fontSize: '0.78rem', color: '#ffffff', marginBottom: '0.15rem',
        }}>{label}</p>
        <p style={{
          fontFamily: "'Jost', sans-serif", fontWeight: 300,
          fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)',
        }}>{caption}</p>
      </div>
    </div>
  )
}

import React from 'react'

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
      {/* Header */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '5rem 2rem 4rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div>
          <p className="section-label reveal" style={{ marginBottom: '1rem' }}>Galleri</p>
          <h1 className="font-display reveal reveal-delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 400, lineHeight: 1.05, color: 'var(--text)',
          }}>
            Resultaten talar
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>för sig själva</em>
          </h1>
        </div>
        <p className="reveal reveal-delay-2" style={{
          maxWidth: 280, fontWeight: 300, fontSize: '0.88rem',
          lineHeight: 1.75, color: 'var(--text-muted)',
        }}>
          Varje bil vi behandlar lämnar oss i showroom-skick. Ersätt bilderna
          med foton från ditt eget arbete.
        </p>
      </div>

      {/* Main gallery grid */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem 2rem' }}>
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: 'auto',
            gap: '4px',
          }}
        >
          {/* Tall left — spans 2 rows */}
          <GalleryItem
            {...images[0]}
            style={{ gridRow: 'span 2', height: 580 }}
          />
          {/* Top-right two */}
          <GalleryItem {...images[1]} style={{ height: 286 }} />
          <GalleryItem {...images[2]} style={{ height: 286 }} />
          {/* Middle row */}
          <GalleryItem {...images[3]} style={{ height: 286 }} />
          <GalleryItem {...images[4]} style={{ height: 286 }} />
        </div>

        {/* Wide bottom */}
        <div style={{ marginTop: 4 }}>
          <GalleryItem
            {...images[5]}
            style={{ height: 360, width: '100%' }}
          />
        </div>
      </div>

      {/* Second row — hero shot repeated at full width */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem 6rem' }}>
        <p style={{
          marginTop: '1.5rem', fontWeight: 300, fontSize: '0.75rem',
          color: 'var(--text-dim)', letterSpacing: '0.04em',
        }}>
          Spara bilder i <code style={{ fontSize: '0.7rem', background: 'var(--surface)', padding: '1px 5px' }}>public/</code> med
          namnen: gallery-folie.jpg, gallery-interior.jpg, gallery-glass.jpg,
          gallery-machine.jpg, gallery-polishing.jpg, gallery-detail.jpg
        </p>
      </div>

      <style>{`
        @media (max-width: 640px) {
          [style*="grid-template-columns: repeat(3"] {
            grid-template-columns: 1fr !important;
          }
          .gallery-item[style*="grid-row: span 2"] {
            grid-row: span 1 !important;
            height: 280px !important;
          }
          .gallery-item { height: 220px !important; }
        }
      `}</style>
    </div>
  )
}
