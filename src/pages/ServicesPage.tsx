import { useEffect, useRef } from 'react'
import { useBooking } from '../BookingContext'

const services = [
  {
    number: '01',
    title: 'Utvändig Tvätt & Skum',
    description: 'Skonsam högtryckstvätt med pH-neutralt skumtvätt som lyfter smuts utan att skada lacken.',
    detail: 'Inkl. fälgar, sill & underrede',
  },
  {
    number: '02',
    title: 'Invändig Rengöring',
    description: 'Grundlig damsugning, rengöring av alla ytor, plast, läder och tyg. Fönster och speglar ingår.',
    detail: 'Inkl. bagageutrymme',
  },
  {
    number: '03',
    title: 'Lackpolering',
    description: 'Maskinpolering i ett eller två steg som tar bort repor, virvelmarkeringar och matt lack.',
    detail: 'Gör lacken spegelblankt igen',
  },
  {
    number: '04',
    title: 'Keramisk Coating',
    description: 'Permanent skyddsskikt som repeller vatten, smuts och UV-strålning i upp till 5 år.',
    detail: 'Certifierad applikation',
  },
  {
    number: '05',
    title: 'Lackskydd Folie',
    description: 'Självläkande PPF-folie på utsatta ytor. Osynlig och effektiv mot stenskott och repor.',
    detail: 'Framskt, speglar & tröskel',
  },
  {
    number: '06',
    title: 'Komplett Rekond',
    description: 'Vår mest populära tjänst. Allt från tvätt till polish och skydd — bilen lämnas som ny.',
    detail: '6–8 timmar arbete',
  },
]

export default function ServicesPage() {
  const { open } = useBooking()
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'))
      }),
      { threshold: 0.04 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="page-enter" style={{ paddingTop: 66 }}>
        {/* Page header */}
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          padding: '5rem 2rem 4rem',
          borderBottom: '1px solid var(--border)',
        }}>
          <p className="section-label reveal" style={{ marginBottom: '1rem' }}>Tjänster</p>
          <h1 className="font-display reveal reveal-delay-1" style={{
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 400, lineHeight: 1.05,
            color: 'var(--text)', marginBottom: '1.25rem',
          }}>
            Allt din bil behöver,
            <br />
            <em style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>på ett ställe</em>
          </h1>
          <p className="reveal reveal-delay-2" style={{
            maxWidth: 480, fontWeight: 300, fontSize: '1rem',
            lineHeight: 1.75, color: 'var(--text-muted)',
          }}>
            Vi erbjuder ett komplett utbud av rekonditioneringstjänster med
            professionell utrustning och certifierade produkter.
          </p>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}>
            {services.map((s, i) => (
              <div key={s.number} className={`service-card reveal reveal-delay-${Math.min(i+1,6)}`}>
                <span style={{
                  display: 'block',
                  fontFamily: "'Cormorant', serif",
                  fontSize: '2.8rem', fontWeight: 300,
                  lineHeight: 1, color: 'var(--text-dim)',
                  marginBottom: '1.5rem',
                }}>{s.number}</span>
                <h3 style={{
                  fontFamily: "'Jost', sans-serif", fontWeight: 500,
                  fontSize: '1rem', letterSpacing: '0.03em',
                  color: 'var(--text)', marginBottom: '0.85rem',
                }}>{s.title}</h3>
                <p style={{
                  fontWeight: 300, fontSize: '0.88rem', lineHeight: 1.7,
                  color: 'var(--text-muted)', marginBottom: '1.25rem',
                }}>{s.description}</p>
                <p style={{
                  fontSize: '0.68rem', fontWeight: 500,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--text-dim)',
                }}>{s.detail}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal" style={{ marginTop: '3.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={open}>
              Boka Tid Nu
            </button>
            <p style={{ fontWeight: 300, fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Gratis offert · Ingen bindningstid · 100% nöjd-kund-garanti
            </p>
          </div>
        </div>
      </div>
  )
}
