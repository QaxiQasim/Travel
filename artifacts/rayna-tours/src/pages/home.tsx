import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Link, useLocation } from 'wouter'
import { motion, AnimatePresence } from 'framer-motion'
import Layout from '@/components/layout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, Clock, CheckCircle, Mail, ChevronDown, Minus, Plus, BadgeDollarSign, Zap } from 'lucide-react'
import { packages, activities, testimonials } from '@/data/mockData'

// Local imports for generated images
import heroSkyline from '@assets/generated_images/hero-dubai-skyline.jpg'
import heroDesert from '@assets/generated_images/hero-desert-safari.jpg'
import heroDhow from '@assets/generated_images/hero-dhow-cruise.jpg'
import aboutImg from '@assets/generated_images/about-us-concierge.jpg'
import imgBurj from '@assets/generated_images/burj-khalifa-view.jpg'
import imgWater from '@assets/generated_images/water-sports-dubai.jpg'
import imgSkydive from '@assets/generated_images/skydiving-palm.jpg'
import imgCity from '@assets/generated_images/city-tour-dubai.jpg'
import imgTheme from '@assets/generated_images/theme-parks-dubai.jpg'
import imgCar from '@assets/generated_images/car-rental-dubai.jpg'

// New high resolution slider images
import sliderYacht from '@assets/generated_images/dubai_yacht_slider.jpg'
import sliderDesert from '@assets/generated_images/dubai_desert_slider.jpg'
import sliderBalloon from '@assets/generated_images/dubai_balloon_slider.jpg'
import sliderSkydive from '@assets/generated_images/dubai_skydive_slider.jpg'

const activityImageMap: Record<string, string> = {
  'desert-safari': heroDesert,
  'water-activities': imgWater,
  'skydiving': imgSkydive,
  'car-rental': imgCar,
  'city-tour': imgCity,
  'burj-khalifa': imgBurj,
  'dhow-cruise': heroDhow,
  'theme-parks': imgTheme,
}

const packageImageMap: Record<number, string> = {
  1: heroSkyline, 2: heroDesert, 3: imgBurj,
  4: imgCity, 5: heroDhow, 6: heroDhow,
  7: heroDesert, 8: heroSkyline,
}

function resolveActivityImage(slug: string, fallback: string) {
  return activityImageMap[slug] || fallback || heroSkyline
}
function resolvePackageImage(id: number, fallback: string) {
  return packageImageMap[id] || fallback || heroSkyline
}

const slides = [
  { id: 1, image: sliderYacht, title: 'Discover the extraordinary', subtitle: 'Dubai Marina Luxury Cruises' },
  { id: 2, image: sliderDesert, title: 'Adventures beyond imagination', subtitle: 'Premium Desert Safaris' },
  { id: 3, image: sliderSkydive, title: 'Defy Gravity', subtitle: 'Skydiving over Palm Jumeirah' },
  { id: 4, image: sliderBalloon, title: 'Sail into the sunrise', subtitle: 'Hot Air Balloon Adventures' },
]

const DESTINATIONS = [
  { label: 'Desert Safari', slug: 'desert-safari' },
  { label: 'Water Activities', slug: 'water-activities' },
  { label: 'Skydiving', slug: 'skydiving' },
  { label: 'Burj Khalifa', slug: 'burj-khalifa' },
  { label: 'Dhow Cruise', slug: 'dhow-cruise' },
  { label: 'City Tour', slug: 'city-tour' },
  { label: 'Theme Parks', slug: 'theme-parks' },
  { label: 'Car Rental', slug: 'car-rental' },
  { label: 'All Packages', slug: '' },
]

export default function Home() {
  const [, navigate] = useLocation()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  // Search bar state
  const [destination, setDestination] = React.useState('')
  const [destinationLabel, setDestinationLabel] = React.useState('')
  const [date, setDate] = React.useState('')
  const [guests, setGuests] = React.useState(2)
  const [showDestDrop, setShowDestDrop] = React.useState(false)
  const destRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(e.target as Node)) {
        setShowDestDrop(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = () => {
    if (destination) {
      navigate(`/${destination}`)
    } else {
      navigate('/dubai-holidays')
    }
  }

  const featuredPackages = packages.filter(p => p.isFeatured);
  const loadingPackages = false;
  const loadingActivities = false;
  
  // Testimonials are imported directly
  
  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    const interval = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(interval)
    }
  }, [emblaApi])

  const popularActivities = activities.slice(0, 6)

  return (
    <Layout>
      {/* Hero Slider */}
      <section className="relative h-[85vh] min-h-[600px] bg-foreground">
        <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, i) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative h-full">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                
                <div className="absolute inset-0 flex items-center justify-center text-center">
                  <div className="container px-4 max-w-4xl mx-auto">
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: i === selectedIndex ? 1 : 0, y: i === selectedIndex ? 0 : 20 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-primary font-medium tracking-widest uppercase mb-4 text-sm md:text-base"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: i === selectedIndex ? 1 : 0, y: i === selectedIndex ? 0 : 20 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-medium leading-tight mb-8"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: i === selectedIndex ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Button size="lg" className="h-14 px-8 text-lg" asChild>
                        <Link href="/dubai-holidays">Explore Packages</Link>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Slider Controls */}
        <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === selectedIndex ? 'bg-primary w-8' : 'bg-white/50'}`}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Search Bar Floating */}
        <div className="absolute bottom-12 left-0 right-0 z-20 hidden md:block">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-xl shadow-xl p-4 grid grid-cols-4 gap-4 items-center">

              {/* Destination */}
              <div className="relative" ref={destRef}>
                <button
                  type="button"
                  onClick={() => setShowDestDrop(v => !v)}
                  className="flex items-center gap-3 px-4 w-full border-r border-border text-left"
                >
                  <MapPin className="text-primary w-5 h-5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Destination</p>
                    <p className={`text-sm font-medium truncate ${destinationLabel ? 'text-foreground' : 'text-foreground/40'}`}>
                      {destinationLabel || 'Where to?'}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${showDestDrop ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showDestDrop && (
                    <motion.ul
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-white border border-border rounded-lg shadow-xl z-50 overflow-hidden"
                    >
                      {DESTINATIONS.map(d => (
                        <li key={d.slug}>
                          <button
                            type="button"
                            onClick={() => {
                              setDestination(d.slug)
                              setDestinationLabel(d.label)
                              setShowDestDrop(false)
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-primary/10 hover:text-primary transition-colors ${destination === d.slug ? 'bg-primary/10 text-primary font-medium' : ''}`}
                          >
                            {d.label}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 px-4 border-r border-border">
                <Calendar className="text-primary w-5 h-5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Date</p>
                  <input
                    type="date"
                    value={date}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setDate(e.target.value)}
                    className="w-full text-sm font-medium outline-none bg-transparent text-foreground [color-scheme:light] cursor-pointer"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-3 px-4">
                <Users className="text-primary w-5 h-5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Guests</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <button
                      type="button"
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{guests}</span>
                    <button
                      type="button"
                      onClick={() => setGuests(g => Math.min(20, g + 1))}
                      className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-xs text-muted-foreground">Guest{guests !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <div>
                <Button className="w-full h-12 text-base" onClick={handleSearch}>
                  Search Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pt-16 pb-24 bg-background">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Trusted Agency", desc: "Over a decade of excellence in Dubai tourism" },
              { icon: MapPin, title: "Local Experts", desc: "Deep knowledge of the UAE's hidden gems" },
              { icon: CheckCircle, title: "Best Price Guarantee", desc: "Premium experiences without the markup" },
              { icon: Clock, title: "24/7 Concierge", desc: "Round-the-clock support for our guests" },
            ].map((feature, i) => (
              <StaggerItem key={i} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-medium mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Popular Activities */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <FadeIn className="flex justify-between items-end mb-16">
            <div>
              <p className="text-primary font-medium tracking-widest uppercase mb-3 text-sm">Dubai Attractions</p>
              <h2 className="text-4xl md:text-5xl font-serif font-medium">Popular Activities</h2>
            </div>
            <Link href="/desert-safari" className="hidden md:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>

          {loadingActivities ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {popularActivities.map((activity) => (
                <StaggerItem key={activity.id}>
                  <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden relative">
                    <Link href={`/${activity.slug}`} className="block relative h-64 overflow-hidden">
                      <img 
                        src={resolveActivityImage(activity.slug, activity.imageUrl)} 
                        alt={activity.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Star className="w-3 h-3 text-primary fill-primary" />
                        <span>{activity.rating} ({activity.reviewCount})</span>
                      </div>
                    </Link>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <p className="text-primary text-xs font-medium uppercase tracking-wider mb-2">{activity.category.replace('-', ' ')}</p>
                      <Link href={`/${activity.slug}`}>
                        <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-primary transition-colors cursor-pointer">{activity.title}</h3>
                      </Link>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">{activity.shortDescription}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                        <div className="flex flex-col">
                          <span className="text-xs text-muted-foreground">From</span>
                          <span className="font-medium">AED {activity.priceAed}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a href="https://wa.me/971524204409" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors" title="WhatsApp">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                          </a>
                          <a href="tel:+971501234567" className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors" title="Call">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                          </a>
                          <a href="mailto:info@donnvay.com" className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors" title="Inquiry">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-primary font-medium tracking-widest uppercase mb-3 text-sm">Curated Itineraries</p>
            <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">Featured Packages</h2>
            <p className="text-muted-foreground leading-relaxed">
              Carefully crafted multi-day experiences designed to showcase the very best of Dubai, from luxury accommodations to exclusive excursions.
            </p>
          </FadeIn>

          {loadingPackages ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {featuredPackages.slice(0, 3).map((pkg, idx) => (
                <FadeIn key={pkg.id} delay={idx * 0.1}>
                  <Link href={`/dubai-holidays`}>
                    <Card className="group overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={resolvePackageImage(pkg.id, pkg.imageUrl)} 
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                          <h3 className="font-serif text-2xl font-medium text-white mb-1">{pkg.title}</h3>
                          <p className="text-white/80 text-sm">{pkg.days} Days / {pkg.nights} Nights</p>
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <ul className="space-y-3 mb-6">
                          {pkg.highlights?.slice(0, 3).map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between pt-6 border-t border-border">
                          <div>
                            <p className="text-xs text-muted-foreground mb-0.5">Starting from</p>
                            <p className="font-serif text-xl font-medium">AED {pkg.priceAed}</p>
                          </div>
                          <Button variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            View Itinerary
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/dubai-holidays">View All Packages</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4 text-foreground">Your Journey, Our Commitment</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              From booking to the experience, we're here to make every step smooth, safe, and memorable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FadeIn delay={0.1}>
              <div className="bg-background border border-border/50 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-6 shadow-sm border border-amber-100/50">
                  <BadgeDollarSign className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Best Price Guarantee</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Find a lower price? We'll refund 110% of the difference. Our price match guarantee ensures you always get the best deal.
                </p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <div className="bg-background border border-border/50 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-6 shadow-sm border border-emerald-100/50">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Secure & Safe Booking</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is protected with 256-bit SSL encryption. We never share your personal information with third parties.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="bg-background border border-border/50 rounded-2xl p-8 h-full hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 flex items-center justify-center mb-6 shadow-sm border border-rose-100/50">
                  <Zap className="w-8 h-8 text-rose-600" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Confirmation</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get your tickets delivered instantly via email. No waiting, no hassle - just book and go.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* About Section Split */}
      <section className="py-32 relative overflow-hidden bg-transparent text-foreground">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 -z-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <FadeIn className="flex-1 relative group">
              <div className="absolute -inset-4 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={aboutImg} 
                  alt="Concierge" 
                  className="w-full h-[500px] object-cover transition-transform duration-1000 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-background p-6 rounded-xl shadow-xl border border-primary/20 animate-in slide-in-from-bottom-10 fade-in duration-1000 delay-300 group-hover:-translate-y-2 transition-transform">
                <div className="text-center">
                  <div className="text-4xl font-serif font-bold text-primary mb-1">15+</div>
                  <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Years of<br/>Excellence</div>
                </div>
              </div>
            </FadeIn>
            
            <FadeIn className="flex-1 lg:pl-8" delay={0.2}>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-[1px] w-8 bg-primary"></span>
                <p className="text-primary font-medium tracking-widest uppercase text-sm">Our Story</p>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium mb-8 leading-tight">
                Crafting Memories <br/><span className="text-primary italic">Since 2009</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6 text-lg">
                DONNVAY is more than a travel agency; we are your personal concierge to the wonders of Dubai. We believe that true luxury lies in seamless experiences, where every detail is anticipated and every expectation exceeded.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                From the golden dunes of the Arabian desert to the sky-high dining of Burj Khalifa, our local experts ensure your journey is nothing short of extraordinary.
              </p>
              
              <div className="flex items-center gap-6">
                <Button size="lg" className="group" asChild>
                  <Link href="/about">
                    Read Our Story 
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </Button>
                
                <div className="flex -space-x-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-muted flex items-center justify-center text-xs font-medium">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-2 border-background overflow-hidden bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold z-10">
                    5k+
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 relative overflow-hidden bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent -z-10"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative group">
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-primary/10 to-primary/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative bg-background/40 backdrop-blur-xl border border-primary/20 p-12 md:p-20 rounded-3xl text-center overflow-hidden shadow-2xl">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

              <FadeIn className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8 border border-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
                  <Mail className="w-10 h-10 text-primary animate-pulse" />
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">Join The Insider List</h2>
                <p className="text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto text-lg">
                  Subscribe to receive exclusive VIP offers, early access to new desert experiences, and our curated Dubai luxury guide delivered straight to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative" onSubmit={e => e.preventDefault()}>
                  <div className="relative flex-1 group/input">
                    <div className="absolute inset-0 bg-primary/20 rounded-md blur opacity-0 group-focus-within/input:opacity-100 transition-opacity"></div>
                    <Input 
                      type="email" 
                      placeholder="Enter your email address..." 
                      className="relative bg-background/80 border-primary/30 text-foreground placeholder:text-muted-foreground h-14 px-6 rounded-lg focus-visible:ring-primary focus-visible:border-primary transition-all shadow-inner"
                    />
                  </div>
                  <Button size="lg" className="h-14 px-10 whitespace-nowrap bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all shadow-lg rounded-lg text-base font-semibold">
                    Subscribe Now
                  </Button>
                </form>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
