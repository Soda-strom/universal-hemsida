import { useEffect, useRef } from 'react'
import { useBooking } from '../BookingContext'

const stats = [
  { value: '5+',     label: 'Års erfarenhet'    },
  { value: '2 000+', label: 'Bilar rekondade'   },
  { value: '1 500+', label: 'Nöjda kunder'      },
  { value: '100%',   label: 'Nöjd-kund-garanti' },
]

const featured = [
  {
    n: '01',
    title: 'Lackpolering',
    body: 'Maskinpolering i 1–2 steg som eliminerar repor, virvelmarkeringar och oxideringar. Lacken återfår sin ursprungliga spegel-finish.',
    tag: 'Mest populär',
  },
  {
    n: '02',
    title: 'Keramisk Coating',
    body: 'Permanent hydrofobiskt skyddsskikt som håller upp till 5 år. Repeller vatten, smuts och UV — och gör bilen lättare att hålla ren.',
    tag: 'Längst skydd',
  },
  {
    n: '03',
    title: 'Komplett Rekond',
    body: 'Vår mest heltäckande tjänst: tvätt, lera, polish och skydd i ett. Bilen lämnas i showroom-skick — garanterat.',
    tag: '6–8 tim arbete',
  },
]

const process = [
  { step: '01', title: 'Bokning',      body: 'Du bokar enkelt online. Vi bekräftar tid och tjänst inom 24 timmar.' },
  { step: '02', title: 'Insläpp',      body: 'Lämna bilen hos oss. Vi gör en besiktning och går igenom jobbet tillsammans.' },
  { step: '03', title: 'Behandling',   body: 'Professionell behandling med certifierade produkter och rätt utrustning.' },
  { step: '04', title: 'Klart',        body: 'Du hämtar en bil som ser ut som ny — med garanti på utfört arbete.' },
]

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      }),
      { threshold: 0.05 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}

export default function HomePage() {
  const { open } = useBooking()

  const heroContentRef  = useRef<HTMLDivElement>(null)
  const featuredRef     = useRef<HTMLElement>(null)
  const processRef      = useRef<HTMLElement>(null)
  const ctaRef          = useRef<HTMLElement>(null)

  useReveal(featuredRef)
  useReveal(processRef)
  useReveal(ctaRef)

  // Hero entrance animation
  useEffect(() => {
    const el = heroContentRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(18px)'
    const id = setTimeout(() => {
      el.style.transition = 'opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 80)
    return () => clearTimeout(id)
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section">
        <div className="hero-bg-img" />

        {/* Grain texture */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E\")",
        }} />

        {/* LEFT-ALIGNED content */}
        <div style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div
            ref={heroContentRef}
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              padding: '0 2rem',
            }}
          >
            {/* Max width on text column */}
            <div style={{ maxWidth: 680 }}>
              {/* Eyebrow */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                marginBottom: '2rem',
              }}>
                <span style={{ width: 2, height: 22, background: 'var(--red)', display: 'inline-block', flexShrink: 0 }} />
                <span style={{
                  fontFamily: "'Jost', sans-serif", fontSize: '0.68rem', fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.52)',
                }}>Professionell Bilrekond</span>
              </div>

              <h1
                className="font-display"
                style={{
                  fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
                  fontWeight: 500, lineHeight: 1.03,
                  color: '#ffffff', letterSpacing: '-0.01em',
                  marginBottom: '1.75rem',
                }}
              >
                Vi återställer
                <br />
                <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
                  din bil till ny
                </em>
              </h1>

              <p style={{
                fontWeight: 300, fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
                lineHeight: 1.75, color: 'rgba(255,255,255,0.52)',
                maxWidth: 440, marginBottom: '2.75rem',
              }}>
                Från snabb utvändig tvätt till komplett lackskydd med keramisk
                coating — vi ger din bil den behandling den förtjänar.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button className="btn-primary-light" onClick={open}>Boka Nu</button>
                <a className="btn-outline-light" href="/tjanster">Våra Tjänster</a>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.45)',
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
      </section>

      {/* ── FEATURED SERVICES ── */}
      <section ref={featuredRef} style={{ padding: '7rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem',
          }}>
            <div>
              <p className="section-label reveal" style={{ marginBottom: '0.9rem' }}>Populärast</p>
              <h2 className="font-display reveal reveal-delay-1" style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 400, lineHeight: 1.1, color: 'var(--text)',
              }}>
                Våra mest valda
                <br />
                <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>behandlingar</em>
              </h2>
            </div>
            <a href="/tjanster" className="btn-outline reveal reveal-delay-2">
              Alla tjänster
            </a>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}>
            {featured.map((f, i) => (
              <div
                key={f.n}
                className={`service-card reveal reveal-delay-${i + 1}`}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                  <span style={{
                    fontFamily: "'Cormorant', serif",
                    fontSize: '2.6rem', fontWeight: 300,
                    lineHeight: 1, color: 'var(--text-dim)',
                  }}>{f.n}</span>
                  <span style={{
                    fontSize: '0.62rem', fontWeight: 500,
                    letterSpacing: '0.16em', textTransform: 'uppercase',
                    color: 'var(--red)', border: '1px solid var(--red)',
                    padding: '0.25rem 0.6rem', opacity: 0.8,
                  }}>{f.tag}</span>
                </div>
                <h3 style={{
                  fontWeight: 500, fontSize: '1rem', letterSpacing: '0.03em',
                  color: 'var(--text)', marginBottom: '0.85rem',
                }}>{f.title}</h3>
                <p style={{
                  fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.72,
                  color: 'var(--text-muted)',
                }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section
        ref={processRef}
        style={{
          padding: '7rem 2rem',
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="section-label reveal" style={{ marginBottom: '0.9rem' }}>Hur det går till</p>
          <h2 className="font-display reveal reveal-delay-1" style={{
            fontSize: 'clamp(2rem, 4vw, 3.25rem)',
            fontWeight: 400, lineHeight: 1.1, color: 'var(--text)',
            marginBottom: '4rem',
          }}>
            Enkelt från start
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>till mål</em>
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: '0',
          }} className="process-grid">
            {process.map((p, i) => (
              <div
                key={p.step}
                className={`reveal reveal-delay-${i + 1}`}
                style={{
                  padding: '2rem 2rem 2rem 0',
                  borderRight: i < process.length - 1 ? '1px solid var(--border)' : 'none',
                  paddingRight: i < process.length - 1 ? '2rem' : '0',
                  paddingLeft: i > 0 ? '2rem' : '0',
                }}
              >
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem',
                  marginBottom: '1.5rem',
                }}>
                  <div style={{
                    width: 36, height: 36, border: '1.5px solid var(--red)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: "'Jost', sans-serif", fontWeight: 500,
                      fontSize: '0.7rem', letterSpacing: '0.06em', color: 'var(--red)',
                    }}>{p.step}</span>
                  </div>
                  <div style={{ height: 1, flex: 1, background: i < process.length - 1 ? 'var(--border)' : 'transparent' }} />
                </div>
                <h3 style={{
                  fontWeight: 500, fontSize: '0.95rem',
                  color: 'var(--text)', marginBottom: '0.7rem', letterSpacing: '0.02em',
                }}>{p.title}</h3>
                <p style={{
                  fontWeight: 300, fontSize: '0.85rem', lineHeight: 1.7,
                  color: 'var(--text-muted)',
                }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RED CTA STRIP ── */}
      <section ref={ctaRef} className="cta-red" style={{ padding: '5rem 2rem' }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap',
        }}>
          <div className="reveal">
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '0.68rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)', marginBottom: '0.75rem',
            }}>Redo att boka?</p>
            <h2 className="font-display" style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 400, lineHeight: 1.15,
              color: '#ffffff',
            }}>
              Ge din bil den
              <em style={{ fontStyle: 'italic' }}> behandling</em>
              <br />den förtjänar
            </h2>
          </div>
          <button
            className="reveal reveal-delay-2"
            onClick={open}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#ffffff', color: 'var(--red)',
              fontFamily: "'Jost', sans-serif", fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.72rem',
              padding: '1rem 2.5rem', border: 'none', cursor: 'pointer',
              transition: 'transform 160ms var(--ease-out), background 160ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f0f0f0')}
            onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
            onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
            onMouseUp={e => (e.currentTarget.style.transform = '')}
          >
            Boka Nu &rarr;
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 580px) {
          .hero-section [style*="grid-template-columns: repeat(4"] {
            grid-template-columns: repeat(2,1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .process-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .process-grid { grid-template-columns: 1fr !important; }
          [style*="grid-template-columns: repeat(3,1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
