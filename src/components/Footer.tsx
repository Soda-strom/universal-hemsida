import { Link } from 'react-router-dom'

interface FooterProps {
  onBooking: () => void
}

export default function Footer({ onBooking }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
      {/* CTA strip */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '4rem 2rem',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem', flexWrap: 'wrap',
        }}>
          <div>
            <h3 className="font-display" style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)',
              fontWeight: 400, lineHeight: 1.2,
              color: 'var(--text)', marginBottom: '0.5rem',
            }}>
              Redo att ge din bil
              <br />
              <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                det den förtjänar?
              </em>
            </h3>
            <p style={{ fontWeight: 300, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Boka en tid idag — enkelt, snabbt och utan bindning.
            </p>
          </div>
          <button className="btn-primary" onClick={onBooking}>
            Boka Nu &rarr;
          </button>
        </div>
      </div>

      {/* Links */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '3rem 2rem',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '3rem',
      }} className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
            <div style={{
              width: 28, height: 28, border: '1.5px solid var(--border-hover)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <div style={{ width: 11, height: 11, border: '1.5px solid var(--border-hover)', borderRadius: '50%', opacity: 0.6 }} />
            </div>
            <span style={{ fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text)' }}>
              Ditt Företag
            </span>
          </div>
          <p style={{ fontWeight: 300, fontSize: '0.84rem', lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 220 }}>
            Professionell bilrekond och lackskydd. Vi tar hand om din bil med precision och passion.
          </p>
        </div>

        {[
          {
            heading: 'Tjänster',
            items: [
              { label: 'Utvändig Tvätt', to: '/tjanster' },
              { label: 'Lackpolering',   to: '/tjanster' },
              { label: 'Keramisk Coating', to: '/tjanster' },
              { label: 'Lackskydd',      to: '/tjanster' },
            ],
          },
          {
            heading: 'Navigera',
            items: [
              { label: 'Hem',     to: '/'         },
              { label: 'Galleri', to: '/galleri'  },
              { label: 'Om Oss',  to: '/om-oss'   },
              { label: 'Kontakt', to: '/kontakt'  },
            ],
          },
          {
            heading: 'Kontakt',
            items: [
              { label: 'Exempelgatan 12', to: null },
              { label: '123 45 Stad',     to: null },
              { label: '070-000 00 00',   to: null },
              { label: 'info@dittforetag.se', to: null },
            ],
          },
        ].map(col => (
          <div key={col.heading}>
            <p style={{
              fontSize: '0.66rem', fontWeight: 500, letterSpacing: '0.2em',
              textTransform: 'uppercase', color: 'var(--text-dim)', marginBottom: '1.25rem',
            }}>{col.heading}</p>
            {col.items.map((item, i) => (
              item.to ? (
                <Link key={i} to={item.to} style={{
                  display: 'block', fontWeight: 300, fontSize: '0.84rem',
                  color: 'var(--text-muted)', textDecoration: 'none',
                  marginBottom: '0.6rem', transition: 'color 0.18s ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                >{item.label}</Link>
              ) : (
                <p key={i} style={{ fontWeight: 300, fontSize: '0.84rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                  {item.label}
                </p>
              )
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '1.2rem 2rem',
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '0.75rem',
      }}>
        <p style={{ fontWeight: 300, fontSize: '0.74rem', color: 'var(--text-dim)', letterSpacing: '0.04em' }}>
          © {year} Ditt Företag. Alla rättigheter förbehållna.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Integritetspolicy', 'Cookies'].map(t => (
            <a key={t} href="#" style={{ fontWeight: 300, fontSize: '0.74rem', color: 'var(--text-dim)', textDecoration: 'none', transition: 'color 0.18s ease' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-dim)')}
            >{t}</a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
