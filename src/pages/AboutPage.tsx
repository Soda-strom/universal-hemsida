import { useEffect, useRef } from 'react'

const values = [
  {
    title: 'Kvalitet Utan Kompromiss',
    body: 'Vi använder enbart certifierade produkter från världsledande varumärken som Gyeon, Koch-Chemie och 3M.',
  },
  {
    title: 'Transparent Prissättning',
    body: 'Du vet alltid vad du betalar för. Tydliga prislistor och ingen dold kostnad.',
  },
  {
    title: 'Nöjd-Kund-Garanti',
    body: 'Inte nöjd? Vi åtgärdar det gratis. Varje gång, utan diskussion.',
  },
]

export default function AboutPage() {
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
      {/* Page header */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '5rem 2rem 4rem',
        borderBottom: '1px solid var(--border)',
      }}>
        <p className="section-label reveal" style={{ marginBottom: '1rem' }}>Om Oss</p>
        <h1 className="font-display reveal reveal-delay-1" style={{
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: 400, lineHeight: 1.05, color: 'var(--text)',
        }}>
          Passion för
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>perfektion</em>
        </h1>
      </div>

      {/* Two-column body */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '5rem 2rem 7rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '6rem',
        alignItems: 'start',
      }} className="about-grid">

        {/* Quote card */}
        <div className="reveal">
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: '#0d0d0d',
            padding: '3rem',
          }}>
            <blockquote className="font-display" style={{
              fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
              fontWeight: 400, fontStyle: 'italic',
              lineHeight: 1.5, color: '#ffffff',
              marginBottom: '2rem',
            }}>
              "Vi behandlar varje bil som om den vore vår egen — med omsorg,
              precision och stolthet i varje detalj."
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Cormorant', serif", fontSize: '0.9rem',
                fontWeight: 500, color: 'rgba(255,255,255,0.6)',
              }}>DF</div>
              <div>
                <p style={{ fontWeight: 500, fontSize: '0.85rem', color: '#ffffff', marginBottom: '0.15rem' }}>
                  Grundaren, Ditt Företag
                </p>
                <p style={{ fontWeight: 300, fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                  5 års erfarenhet av professionell bilrekond
                </p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(2,1fr)',
            gap: '1px', background: 'var(--border)',
            border: '1px solid var(--border)',
            marginTop: '1px',
          }}>
            {[
              { n: '5+',     l: 'Års erfarenhet'    },
              { n: '2 000+', l: 'Bilar rekondade'   },
            ].map((s, i) => (
              <div key={i} style={{ padding: '1.5rem', background: 'var(--surface)' }}>
                <div className="font-display" style={{
                  fontSize: '2.4rem', fontWeight: 600, lineHeight: 1,
                  color: 'var(--text)', marginBottom: '0.3rem',
                }}>{s.n}</div>
                <p style={{ fontWeight: 300, fontSize: '0.75rem', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: 'var(--text-muted)' }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="reveal" style={{
            fontWeight: 300, fontSize: '0.98rem', lineHeight: 1.82,
            color: 'var(--text-muted)', marginBottom: '2.5rem',
          }}>
            Vi grundades med en enkel övertygelse: din bil förtjänar professionell
            omsorg. Med mer än 5 års erfarenhet och 2 000+ behandlade bilar har vi
            finslipat varje steg i processen för att leverera ett resultat som
            överstiger alla förväntningar.
            <br /><br />
            Vår workshop är utrustad med senaste teknologi och vi håller oss
            ständigt uppdaterade med nya metoder och produkter.
          </p>

          <div className="reveal reveal-delay-1">
            {values.map((v, i) => (
              <div key={i} style={{
                padding: '1.5rem 0',
                borderBottom: i < values.length - 1 ? '1px solid var(--border)' : 'none',
                display: 'flex', gap: '1.25rem', alignItems: 'flex-start',
              }}>
                <span style={{
                  flexShrink: 0, width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--text)', marginTop: '0.5rem',
                }} />
                <div>
                  <p style={{ fontWeight: 500, fontSize: '0.88rem', color: 'var(--text)', marginBottom: '0.3rem' }}>
                    {v.title}
                  </p>
                  <p style={{ fontWeight: 300, fontSize: '0.84rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </div>
  )
}
