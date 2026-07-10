import React from 'react'
import { Link, useLocation } from 'wouter'
import { cn } from '@/lib/utils'
import { Phone, Mail, Menu, X } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [location] = useLocation()

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false)
    window.scrollTo(0, 0)
  }, [location])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Dubai Holidays', href: '/dubai-holidays' },
    { name: 'Activities', href: '#', isDropdown: true },
    { name: 'About Us', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ]

  const activityLinks = [
    { name: 'Desert Safari', href: '/desert-safari' },
    { name: 'Water Activities', href: '/water-activities' },
    { name: 'Skydiving', href: '/skydiving' },
    { name: 'Car Rental', href: '/car-rental' },
    { name: 'City Tour', href: '/city-tour' },
    { name: 'Burj Khalifa', href: '/burj-khalifa' },
    { name: 'Dhow Cruise', href: '/dhow-cruise' },
    { name: 'Theme Parks', href: '/theme-parks' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      {/* Top Slim Bar */}
      <div className="bg-foreground text-white py-2 text-xs">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a href="tel:+97140000000" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" />
              <span>+971-4-XXX-XXXX</span>
            </a>
            <a href="mailto:info@raynatours.com" className="flex items-center gap-2 hover:text-primary transition-colors hidden sm:flex">
              <Mail className="w-3 h-3" />
              <span>info@raynatours.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/97140000000" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <SiWhatsapp className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300 bg-background/95 backdrop-blur-md border-b",
          isScrolled ? "py-3 shadow-md border-transparent" : "py-5 border-transparent"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              Rayna<span className="text-primary">Tours</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                {link.isDropdown ? (
                  <span className={cn(
                    "text-sm font-medium tracking-wide hover:text-primary cursor-pointer py-2 transition-colors",
                    activityLinks.some(a => a.href === location) ? "text-primary" : "text-foreground/80"
                  )}>
                    {link.name}
                  </span>
                ) : (
                  <Link href={link.href} className={cn(
                    "text-sm font-medium tracking-wide hover:text-primary transition-colors py-2",
                    location === link.href ? "text-primary border-b-2 border-primary" : "text-foreground/80"
                  )}>
                    {link.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {link.isDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      {activityLinks.map((activity) => (
                        <Link
                          key={activity.name}
                          href={activity.href}
                          className="block px-4 py-2 text-sm text-foreground/80 hover:bg-muted hover:text-primary transition-colors"
                        >
                          {activity.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-background pt-32 px-6 overflow-y-auto">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <div key={link.name}>
                {link.isDropdown ? (
                  <div className="flex flex-col gap-4">
                    <span className="text-xl font-serif text-foreground/50">{link.name}</span>
                    <div className="pl-4 border-l border-border flex flex-col gap-4">
                      {activityLinks.map((activity) => (
                        <Link
                          key={activity.name}
                          href={activity.href}
                          className="text-lg text-foreground hover:text-primary transition-colors"
                        >
                          {activity.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className={cn(
                      "text-xl font-serif hover:text-primary transition-colors",
                      location === link.href ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white pt-20 pb-10 hairline-top">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <span className="font-serif text-3xl font-bold tracking-tight text-white mb-6 block">
                Rayna<span className="text-primary">Tours</span>
              </span>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Dubai's trusted travel authority. We curate premium desert adventures, skyline experiences, and unforgettable Arabian nights with white-glove service.
              </p>
            </div>
            
            <div>
              <h4 className="font-serif text-lg font-medium mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-white/70 hover:text-primary transition-colors text-sm">Home</Link></li>
                <li><Link href="/about" className="text-white/70 hover:text-primary transition-colors text-sm">About Us</Link></li>
                <li><Link href="/dubai-holidays" className="text-white/70 hover:text-primary transition-colors text-sm">Dubai Holidays</Link></li>
                <li><Link href="/gallery" className="text-white/70 hover:text-primary transition-colors text-sm">Gallery</Link></li>
                <li><Link href="/contact" className="text-white/70 hover:text-primary transition-colors text-sm">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg font-medium mb-6">Activities</h4>
              <ul className="space-y-3 grid grid-cols-2 lg:grid-cols-1">
                {activityLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-white/70 hover:text-primary transition-colors text-sm">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-serif text-lg font-medium mb-6">Contact Info</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-white/70 text-sm">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+971-4-XXX-XXXX<br/>Mon-Sun: 9:00 AM - 9:00 PM</span>
                </li>
                <li className="flex items-start gap-3 text-white/70 text-sm">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>info@raynatours.com</span>
                </li>
                <li className="flex items-start gap-3 text-white/70 text-sm">
                  <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>ACICO Business Park Building,<br/>Office # X, Port Saeed Road,<br/>Deira, Dubai, UAE</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Rayna Tours. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-white/50 hover:text-primary transition-colors text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/97140000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        <SiWhatsapp className="w-7 h-7 relative z-10" />
      </a>
    </div>
  )
}
