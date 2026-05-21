import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BookingProvider } from './BookingContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useBooking } from './BookingContext'
import HomePage    from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import GalleriPage  from './pages/GalleriPage'
import AboutPage    from './pages/AboutPage'
import ContactPage  from './pages/ContactPage'
import './index.css'

function SiteLayout({ children }: { children: React.ReactNode }) {
  const { open } = useBooking()
  return (
    <>
      <Navbar onBooking={open} />
      <main>{children}</main>
      <Footer onBooking={open} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <BookingProvider>
        <Routes>
          <Route path="/" element={
            <SiteLayout>
              <HomePage />
            </SiteLayout>
          } />
          <Route path="/tjanster" element={<SiteLayout><ServicesPage /></SiteLayout>} />
          <Route path="/galleri"  element={<SiteLayout><GalleriPage /></SiteLayout>}  />
          <Route path="/om-oss"   element={<SiteLayout><AboutPage /></SiteLayout>}    />
          <Route path="/kontakt"  element={<SiteLayout><ContactPage /></SiteLayout>}  />
        </Routes>
      </BookingProvider>
    </BrowserRouter>
  )
}
