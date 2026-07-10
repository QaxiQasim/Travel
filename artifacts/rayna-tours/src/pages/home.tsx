import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Link } from 'wouter'
import { motion } from 'framer-motion'
import Layout from '@/components/layout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Search, MapPin, Calendar, Users, Star, ArrowRight, ShieldCheck, Clock, CheckCircle, Mail } from 'lucide-react'
import { useListFeaturedPackages, useListActivities, useListTestimonials } from '@workspace/api-client-react'

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
  { id: 1, image: heroSkyline, title: 'Discover the extraordinary', subtitle: 'Dubai Skyline Experiences' },
  { id: 2, image: heroDesert, title: 'Adventures beyond imagination', subtitle: 'Premium Desert Safaris' },
  { id: 3, image: heroDhow, title: 'Sail into the starlight', subtitle: 'Luxury Dhow Cruises' },
]

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const { data: featuredPackages, isLoading: loadingPackages } = useListFeaturedPackages()
  const { data: activities, isLoading: loadingActivities } = useListActivities()
  const { data: testimonials } = useListTestimonials()

  React.useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    
    // Autoplay
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 5000)
    
    return () => {
      emblaApi.off('select', onSelect)
      clearInterval(interval)
    }
  }, [emblaApi])

  const popularActivities = activities?.slice(0, 6) || []

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] bg-foreground overflow-hidden">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
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
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center gap-3">
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
        <div className="absolute -bottom-2 left-0 right-0 z-20 hidden md:block">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="bg-white rounded-xl shadow-xl p-4 grid grid-cols-4 gap-4 items-center">
              <div className="flex items-center gap-3 px-4 border-r border-border">
                <MapPin className="text-primary w-5 h-5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Destination</p>
                  <input type="text" placeholder="Where to?" className="w-full text-sm font-medium outline-none placeholder:text-foreground/40" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 border-r border-border">
                <Calendar className="text-primary w-5 h-5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Date</p>
                  <input type="text" placeholder="Select dates" className="w-full text-sm font-medium outline-none placeholder:text-foreground/40" />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4">
                <Users className="text-primary w-5 h-5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Guests</p>
                  <input type="text" placeholder="1 Room, 2 Guests" className="w-full text-sm font-medium outline-none placeholder:text-foreground/40" />
                </div>
              </div>
              <div>
                <Button className="w-full h-12">Search Now</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pt-8 pb-24 bg-background">
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
                  <Link href={`/${activity.slug}`}>
                    <Card className="group cursor-pointer border-none shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={resolveActivityImage(activity.slug, activity.imageUrl)} 
                          alt={activity.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Star className="w-3 h-3 text-primary fill-primary" />
                          <span>{activity.rating} ({activity.reviewCount})</span>
                        </div>
                      </div>
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <p className="text-primary text-xs font-medium uppercase tracking-wider mb-2">{activity.category.replace('-', ' ')}</p>
                        <h3 className="font-serif text-xl font-medium mb-2 group-hover:text-primary transition-colors">{activity.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">{activity.shortDescription}</p>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">From</span>
                            <span className="font-medium">AED {activity.priceAed}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
              {featuredPackages?.slice(0, 3).map((pkg, idx) => (
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

      {/* About Section Split */}
      <section className="py-24 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <FadeIn className="flex-1">
              <img src={aboutImg} alt="Concierge" className="rounded-lg shadow-2xl object-cover w-full h-[500px]" />
            </FadeIn>
            <FadeIn className="flex-1" delay={0.2}>
              <p className="text-primary font-medium tracking-widest uppercase mb-3 text-sm">Our Story</p>
              <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6">Crafting Memories Since 2009</h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Rayna Tours is more than a travel agency; we are your personal concierge to the wonders of Dubai. We believe that true luxury lies in seamless experiences, where every detail is anticipated and every expectation exceeded.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                From the golden dunes of the Arabian desert to the sky-high dining of Burj Khalifa, our local experts ensure your journey is nothing short of extraordinary.
              </p>
              <Button asChild>
                <Link href="/about">Read Our Story</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary text-primary-foreground text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <FadeIn>
            <Mail className="w-12 h-12 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Join The Insider List</h2>
            <p className="text-primary-foreground/80 mb-8 leading-relaxed">
              Subscribe to receive exclusive offers, early access to new experiences, and our curated Dubai luxury guide.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 focus-visible:ring-white"
              />
              <Button variant="secondary" className="h-12 px-8 whitespace-nowrap bg-white text-primary hover:bg-white/90">
                Subscribe
              </Button>
            </form>
          </FadeIn>
        </div>
      </section>
    </Layout>
  )
}
