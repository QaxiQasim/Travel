import React from 'react'
import Layout from '@/components/layout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { useListPackages } from '@workspace/api-client-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Clock, MapPin } from 'lucide-react'
import { Link } from 'wouter'

// Specific Hero image for Packages
import heroHolidays from '@assets/generated_images/hero-dubai-skyline.jpg'
import heroDesert from '@assets/generated_images/hero-desert-safari.jpg'
import heroDhow from '@assets/generated_images/hero-dhow-cruise.jpg'
import imgBurj from '@assets/generated_images/burj-khalifa-view.jpg'
import imgCity from '@assets/generated_images/city-tour-dubai.jpg'

const packageImageMap: Record<number, string> = {
  1: heroHolidays, 2: heroDesert, 3: imgBurj,
  4: imgCity, 5: heroDhow, 6: heroDhow,
  7: heroDesert, 8: heroHolidays,
}

function resolvePackageImage(id: number, fallback: string) {
  return packageImageMap[id] || fallback || heroHolidays
}

import { packages } from '@/data/mockData'

export default function DubaiHolidays() {
  const isLoading = false;

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-foreground overflow-hidden">
        <img src={heroHolidays} alt="Dubai Holidays" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <FadeIn>
            <p className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">Curated Itineraries</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-medium mb-6">Dubai Holiday Packages</h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Experience the perfect blend of modern luxury and Arabian tradition with our expertly crafted multi-day itineraries.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {isLoading ? (
          <div className="grid grid-cols-1 gap-12">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <StaggerContainer className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
            {(Array.isArray(packages) ? packages : []).map((pkg) => (
              <StaggerItem key={pkg.id}>
                <Card className="overflow-hidden border-border shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-2/5 relative h-64 md:h-auto">
                      <img 
                        src={resolvePackageImage(pkg.id, pkg.imageUrl)} 
                        alt={pkg.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      {pkg.isFeatured && (
                        <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium tracking-wider uppercase rounded-sm">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    <div className="md:w-3/5 flex flex-col p-6 md:p-8">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-primary" /> {pkg.days} Days / {pkg.nights} Nights</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-primary" /> Dubai, UAE</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">{pkg.title}</h2>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3">
                        {pkg.description || pkg.shortDescription}
                      </p>
                      
                      <div className="mb-8">
                        <h4 className="text-sm font-medium mb-3 uppercase tracking-wider">Package Highlights</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pkg.highlights?.slice(0, 4).map((highlight, i) => (
                            <div key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="text-muted-foreground">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-auto pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-center sm:text-left flex-1">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting Price</p>
                          <p className="text-2xl font-serif font-medium text-foreground">AED {pkg.priceAed}</p>
                        </div>
                        <div className="flex items-center gap-2 mr-4 hidden md:flex">
                          <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors" title="WhatsApp">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                          </a>
                          <a href="tel:+971501234567" className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors" title="Call">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                          </a>
                          <a href="mailto:info@donnvay.com" className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors" title="Inquiry">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                          </a>
                        </div>
                        <div className="flex gap-3 w-full sm:w-auto">
                          <Button variant="outline" className="flex-1 sm:flex-none">Download PDF</Button>
                          <Button className="flex-1 sm:flex-none" asChild>
                            <Link href={`/contact?package=${pkg.slug}`}>Enquire Now</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </Layout>
  )
}
