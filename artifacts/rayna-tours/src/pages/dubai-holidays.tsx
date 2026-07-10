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

export default function DubaiHolidays() {
  const { data: packages, isLoading } = useListPackages()

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
            {packages?.map((pkg) => (
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
                        <div className="text-center sm:text-left">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Starting Price</p>
                          <p className="text-2xl font-serif font-medium text-foreground">AED {pkg.priceAed}</p>
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
