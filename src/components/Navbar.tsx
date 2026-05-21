import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface NavbarProps {
  onBooking: () => void
}

const links = [
  { to: '/',         label: 'Hem'      },
  { to: '/tjanster', label: 'Tjänster' },
  { to: '/galleri',  label: 'Galleri'  },
  { to: '/om-oss',   label: 'Om Oss'   },
  { to: '/kontakt',  label: 'Kontakt'  },
]

export default function Navbar({ onBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  const onHero = isHome && !scrolled
  return (
    <header
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 40,
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
        background: onHero ? 'transparent' : 'rgba(255,255,255,0.94)',
        borderBottom: onHero ? '1px solid transparent' : '1px solid var(--border)',
        backdropFilter: onHero ? 'none' : 'blur(14px)',
        WebkitBackdropFilter: onHero ? 'none' : 'blur(14px)',
      }}
    >
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 66,
      }}>
        {/* Logo */}
        <NavLink to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <div style={{
            width: 32, height: 32,
            border: `1.5px solid ${onHero ? 'rgba(255,255,255,0.6)' : 'var(--border-hover)'}`,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.3s ease',
          }}>
            <div style={{
              width: 14, height: 14,
              border: `1.5px solid ${onHero ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)'}`,
              borderRadius: '50%',
              transition: 'border-color 0.3s ease',
            }} />
          </div>
          <div>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 600, fontSize: '0.86rem',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: onHero ? '#ffffff' : 'var(--text)',
              lineHeight: 1.1, transition: 'color 0.3s ease',
            }}>Ditt Företag</p>
            <p style={{
              fontFamily: "'Jost', sans-serif", fontWeight: 300, fontSize: '0.58rem',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: onHero ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)',
              lineHeight: 1, transition: 'color 0.3s ease',
            }}>Bilrekond</p>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="nav-desktop">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `nav-link${onHero ? ' nav-link-light' : ''}${isActive ? ' active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className={onHero ? 'btn-primary-light nav-desktop' : 'btn-primary nav-desktop'}
            onClick={onBooking}
          >
            Boka Nu
          </button>

          <button
            aria-label="Meny"
            onClick={() => setMenuOpen(!menuOpen)}
            className="nav-mobile"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '5px', padding: '4px',
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5,
                background: onHero ? '#ffffff' : 'var(--text)',
                transition: 'all 0.22s var(--ease-out)',
                transform: menuOpen
                  ? i === 0 ? 'translateY(6.5px) rotate(45deg)'
                  : i === 2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(255,255,255,0.97)',
          borderTop: '1px solid var(--border)',
          backdropFilter: 'blur(16px)',
        }}>
          <div style={{ padding: '1rem 2rem 1.75rem' }}>
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                style={({ isActive }) => ({
                  display: 'block', padding: '0.9rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontFamily: "'Jost', sans-serif", fontWeight: isActive ? 500 : 400,
                  fontSize: '0.95rem', letterSpacing: '0.04em',
                  color: isActive ? 'var(--text)' : 'var(--text-muted)',
                  textDecoration: 'none', transition: 'color 0.18s ease',
                })}
              >
                {l.label}
              </NavLink>
            ))}
            <button
              className="btn-primary"
              style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}
              onClick={() => { setMenuOpen(false); onBooking() }}
            >
              Boka Nu
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
          .nav-desktop { display: flex; }
        }
      `}</style>
    </header>
  )
}
