// @ts-nocheck
import React, { useState } from 'react'
import { useParams } from 'wouter'
import Layout from '@/components/layout'
import { BookingForm } from '@/components/booking-form'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

import { Clock, Users, Star, CheckCircle, Info, ChevronRight, XCircle, X, ChevronLeft } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

// Static mapping to fallback generated images if API image fails or is generic
import imgDesert from '@assets/generated_images/hero-desert-safari.jpg'
import imgWater from '@assets/generated_images/water-sports-dubai.jpg'
import imgSkydive from '@assets/generated_images/skydiving-palm.jpg'
import imgCity from '@assets/generated_images/city-tour-dubai.jpg'
import imgBurj from '@assets/generated_images/burj-khalifa-view.jpg'
import imgDhow from '@assets/generated_images/hero-dhow-cruise.jpg'
import imgTheme from '@assets/generated_images/theme-parks-dubai.jpg'
import imgCar from '@assets/generated_images/car-rental-dubai.jpg'

const imageMap: Record<string, string> = {
  'desert-safari': imgDesert,
  'water-activities': imgWater,
  'skydiving': imgSkydive,
  'city-tour': imgCity,
  'burj-khalifa': imgBurj,
  'dhow-cruise': imgDhow,
  'theme-parks': imgTheme,
  'car-rental': imgCar,
}

import { activities, packages } from '@/data/mockData'

export default function ActivityPage() {
  const params = useParams()
  const [selectedPackageName, setSelectedPackageName] = useState('')
  const [openDialogIndex, setOpenDialogIndex] = useState<number | null>(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // If no params.slug, use the pathname as slug (e.g. /desert-safari -> desert-safari)
  const pathSlug = window.location.pathname.replace(/^\//, '')
  const slug = params.slug || pathSlug

  const activity = activities.find(a => a.slug === slug) || packages.find(p => p.slug === slug)
  const isLoading = false
  const isError = false

  // Fallback data if API doesn't have this specific activity
  const displayData = activity || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: 'Activity',
    description: `Experience the ultimate ${slug.replace('-', ' ')} with DONNVAY. We offer premium packages tailored to your needs, ensuring an unforgettable Dubai experience.`,
    priceAed: 199,
    duration: '4-6 Hours',
    inclusions: ['Hotel Pickup & Drop-off', 'Professional Guide', 'Complimentary Refreshments', 'All Taxes & Fees'],
    imageUrl: imageMap[slug] || imgDesert,
    options: [
      { name: 'Standard Package', priceAed: 199, description: 'The classic experience for everyone.' },
      { name: 'Premium Package', priceAed: 299, description: 'Upgraded experience with fast-track access.' },
      { name: 'VIP Exclusive', priceAed: 499, description: 'Private vehicle and dedicated concierge.' }
    ],
    faqs: [
      { question: 'What should I wear?', answer: 'Comfortable casual clothing is recommended. Avoid high heels for desert activities.' },
      { question: 'Is pickup included?', answer: 'Yes, we provide pickup and drop-off from centrally located hotels in Dubai.' },
      { question: 'Can I cancel my booking?', answer: 'Free cancellation up to 24 hours before the scheduled activity time.' }
    ]
  }

  const heroImg = imageMap[slug] || displayData.imageUrl || imgDesert

  const gallery = displayData.galleryImages?.length >= 5 ? displayData.galleryImages : [
    heroImg, imgCity, imgWater, imgSkydive, imgTheme
  ]

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setIsLightboxOpen(true)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev + 1) % gallery.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setLightboxIndex((prev) => (prev - 1 + gallery.length) % gallery.length)
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="h-[60vh] bg-muted animate-pulse" />
        <div className="container mx-auto px-4 py-20 flex gap-12">
          <div className="flex-1 space-y-8">
            <div className="h-12 bg-muted w-2/3 animate-pulse" />
            <div className="h-32 bg-muted w-full animate-pulse" />
          </div>
          <div className="w-96 hidden lg:block h-[500px] bg-muted animate-pulse" />
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4 text-muted-foreground text-sm">
          <span>Home</span> <ChevronRight className="w-4 h-4" /> <span>Activities</span> <ChevronRight className="w-4 h-4" /> <span className="text-foreground">{displayData.title}</span>
        </div>
        
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[500px] rounded-xl overflow-hidden mb-8">
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer" onClick={() => openLightbox(0)}>
            <img src={gallery[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          {gallery.slice(1, 4).map((img, idx) => (
            <div key={idx + 1} className="relative group cursor-pointer overflow-hidden" onClick={() => openLightbox(idx + 1)}>
              <img src={img} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
          <div className="relative group cursor-pointer overflow-hidden" onClick={() => openLightbox(4)}>
            <img src={gallery[4]} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            {gallery.length > 5 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-100 transition-opacity">
                <span className="text-white font-medium text-lg">+{gallery.length - 5} More</span>
              </div>
            )}
            {gallery.length <= 5 && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white font-medium">View Photos</span>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox Modal */}
        {isLightboxOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95">
            <button 
              className="absolute top-4 right-4 p-2 text-white/70 hover:text-white z-50 transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-8 h-8" />
            </button>
            <button 
              className="absolute left-4 p-4 text-white/70 hover:text-white z-50 transition-colors"
              onClick={prevImage}
            >
              <ChevronLeft className="w-10 h-10" />
            </button>
            <div className="w-full h-full max-w-5xl max-h-[80vh] flex items-center justify-center p-4">
              <img 
                src={gallery[lightboxIndex]} 
                alt="Gallery preview" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <button 
              className="absolute right-4 p-4 text-white/70 hover:text-white z-50 transition-colors"
              onClick={nextImage}
            >
              <ChevronRight className="w-10 h-10" />
            </button>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center text-white/80">
              {lightboxIndex + 1} / {gallery.length}
            </div>
          </div>
        )}

        {/* Title and Quick Info */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-border pb-8">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-3">{displayData.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="font-medium text-foreground">{displayData.rating || '4.8'}</span>
              <span>({displayData.reviewCount || 100} Reviews)</span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {displayData.operatingHours && (
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="block text-muted-foreground text-xs">Operating Hours</span>
                    <span className="font-medium">{displayData.operatingHours}</span>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs">Confirmation</span>
                  <span className="font-medium">Instant</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs">Voucher</span>
                  <span className="font-medium">Mobile Accepted</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="block text-muted-foreground text-xs">Language</span>
                  <span className="font-medium">English</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <FadeIn>
              <Accordion type="multiple" defaultValue={['highlights', 'inclusions']} className="w-full space-y-4">
                
                {/* Highlights */}
                {displayData.highlights && displayData.highlights.length > 0 && (
                  <AccordionItem value="highlights" className="bg-card border border-border rounded-lg overflow-hidden px-6">
                    <AccordionTrigger className="font-serif text-xl font-medium hover:no-underline py-6">Highlights</AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-3 pl-2">
                        {displayData.highlights.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Inclusions */}
                {displayData.inclusions && displayData.inclusions.length > 0 && (
                  <AccordionItem value="inclusions" className="bg-card border border-border rounded-lg overflow-hidden px-6">
                    <AccordionTrigger className="font-serif text-xl font-medium hover:no-underline py-6">Inclusions</AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-3 pl-2">
                        {displayData.inclusions.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* How to Redeem */}
                {displayData.howToRedeem && displayData.howToRedeem.length > 0 && (
                  <AccordionItem value="howToRedeem" className="bg-card border border-border rounded-lg overflow-hidden px-6">
                    <AccordionTrigger className="font-serif text-xl font-medium hover:no-underline py-6">How to Redeem</AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-3 pl-2">
                        {displayData.howToRedeem.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {/* Overview */}
                <AccordionItem value="overview" className="bg-card border border-border rounded-lg overflow-hidden px-6">
                  <AccordionTrigger className="font-serif text-xl font-medium hover:no-underline py-6">Overview</AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="prose prose-sm md:prose-base text-muted-foreground max-w-none leading-relaxed">
                      <p>{displayData.description}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Important Information */}
                {displayData.importantInfo && displayData.importantInfo.length > 0 && (
                  <AccordionItem value="importantInfo" className="bg-card border border-border rounded-lg overflow-hidden px-6">
                    <AccordionTrigger className="font-serif text-xl font-medium hover:no-underline py-6">Important Information</AccordionTrigger>
                    <AccordionContent className="pb-6">
                      <ul className="space-y-3 pl-2">
                        {displayData.importantInfo.map((item: string, i: number) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                            <span className="leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

              </Accordion>
            </FadeIn>

            {/* Location */}
            {displayData.location && (
              <FadeIn delay={0.1} className="mt-8 mb-12">
                <h3 className="font-serif text-xl font-medium mb-4">Location</h3>
                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{displayData.location.title}</h4>
                      <p className="text-sm text-muted-foreground">{displayData.location.address}</p>
                    </div>
                  </div>
                  {displayData.location.mapUrl && (
                    <div className="w-full h-[300px] rounded-lg overflow-hidden border border-border relative bg-muted">
                      <iframe 
                        src={displayData.location.mapUrl}
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  )}
                </div>
              </FadeIn>
            )}

            {/* Package Options */}
            {displayData.options && displayData.options.length > 0 && (
              <FadeIn delay={0.2} className="mt-12 mb-16">
                <h2 className="text-3xl font-serif font-medium mb-8">Package Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayData.options.map((opt: any, i: number) => (
                    <Dialog key={i} open={openDialogIndex === i} onOpenChange={(open) => setOpenDialogIndex(open ? i : null)}>
                      <Card className="border-border hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden group flex flex-col h-full">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                        <CardContent className="p-6 flex flex-col flex-1">
                          <h3 className="font-serif text-xl font-medium mb-2">{opt.name}</h3>
                          <p className="text-sm text-muted-foreground mb-4 flex-1">{opt.description}</p>
                          <div className="pt-4 border-t border-border flex items-end justify-between mt-auto">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">Price per person</span>
                              <span className="text-2xl font-serif font-medium text-foreground">AED {opt.priceAed}</span>
                            </div>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">View Details</Button>
                            </DialogTrigger>
                          </div>
                        </CardContent>
                      </Card>
                      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-serif">{opt.name}</DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-6">
                          <div>
                            <span className="text-sm text-muted-foreground block">Price</span>
                            <span className="text-2xl font-medium">AED {opt.priceAed} <span className="text-sm font-normal text-muted-foreground">per person</span></span>
                          </div>
                          <p className="text-muted-foreground">{opt.longDescription || opt.description}</p>
                          
                          {opt.highlights && opt.highlights.length > 0 && (
                            <div>
                              <h4 className="font-medium text-lg mb-3">Highlights</h4>
                              <ul className="space-y-2">
                                {opt.highlights.map((hlt: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                                    <span>{hlt}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {opt.inclusions && opt.inclusions.length > 0 && (
                            <div>
                              <h4 className="font-medium text-lg mb-3">Inclusions</h4>
                              <ul className="space-y-2">
                                {opt.inclusions.map((inc: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{inc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {opt.exclusions && opt.exclusions.length > 0 && (
                            <div>
                              <h4 className="font-medium text-lg mb-3">Exclusions</h4>
                              <ul className="space-y-2">
                                {opt.exclusions.map((exc: string, idx: number) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                    <span>{exc}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="pt-4 border-t border-border flex justify-end">
                            <Button onClick={() => {
                              setSelectedPackageName(`${displayData.title} - ${opt.name}`)
                              setOpenDialogIndex(null)
                              document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })
                            }}>Select Package & Book</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* FAQs */}
            {displayData.faqs && displayData.faqs.length > 0 && (
              <FadeIn delay={0.3} className="mb-12">
                <h2 className="text-3xl font-serif font-medium mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {displayData.faqs.map((faq: any, i: number) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-border">
                      <AccordionTrigger className="text-left font-medium text-base hover:text-primary">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </FadeIn>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[400px]" id="booking-section">
            <div className="sticky top-24 space-y-6">
              <BookingForm 
                activityOrPackage={selectedPackageName || (displayData.options && displayData.options.length > 0 ? `${displayData.title} - ${displayData.options[0].name}` : displayData.title)} 
                packageOptions={displayData.options}
              />
              
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h3 className="font-serif text-lg font-medium mb-4 pb-4 border-b border-border">Why choose DONNVAY?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Best Price Guarantee</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">We offer the best deals and prices</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Secure Online Transaction</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">100% secure booking process</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">24/7 Support</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">Always here to help you</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
