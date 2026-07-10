import React from 'react'
import { useParams } from 'wouter'
import Layout from '@/components/layout'
import { BookingForm } from '@/components/booking-form'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { useGetActivity, getGetActivityQueryKey } from '@workspace/api-client-react'
import { Clock, Users, Star, CheckCircle, Info, ChevronRight, XCircle } from 'lucide-react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'

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

export default function ActivityPage() {
  const params = useParams()
  // If no params.slug, use the pathname as slug (e.g. /desert-safari -> desert-safari)
  const pathSlug = window.location.pathname.replace(/^\//, '')
  const slug = params.slug || pathSlug

  const { data: activity, isLoading, isError } = useGetActivity(slug, {
    query: { enabled: !!slug, retry: 1, queryKey: getGetActivityQueryKey(slug) }
  })

  // Fallback data if API doesn't have this specific activity
  const displayData = activity || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: 'Activity',
    description: `Experience the ultimate ${slug.replace('-', ' ')} with Rayna Tours. We offer premium packages tailored to your needs, ensuring an unforgettable Dubai experience.`,
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
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-foreground overflow-hidden">
        <img src={heroImg} alt={displayData.title} className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-4 text-primary font-medium tracking-widest uppercase text-sm">
              <span>Dubai Activities</span>
              <ChevronRight className="w-4 h-4" />
              <span>{displayData.category || 'Experience'}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-medium mb-6 leading-tight">{displayData.title}</h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm font-medium">
              <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> {displayData.duration}</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-primary" /> Group / Private</span>
              <span className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full"><Star className="w-4 h-4 text-primary fill-primary" /> 4.8/5 Reviews</span>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-16">
          
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <FadeIn>
              <h2 className="text-3xl font-serif font-medium mb-6">Overview</h2>
              <div className="prose prose-lg text-muted-foreground prose-p:leading-relaxed max-w-none mb-12">
                <p>{displayData.description}</p>
              </div>
            </FadeIn>

            {/* Package Options */}
            {displayData.options && displayData.options.length > 0 && (
              <FadeIn delay={0.1} className="mb-16">
                <h2 className="text-3xl font-serif font-medium mb-8">Package Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {displayData.options.map((opt: any, i: number) => (
                    <Card key={i} className="border-border hover:border-primary/50 transition-colors shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                      <CardContent className="p-6">
                        <h3 className="font-serif text-xl font-medium mb-2">{opt.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4 h-10">{opt.description}</p>
                        <div className="pt-4 border-t border-border flex items-end justify-between">
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">Price per person</span>
                            <span className="text-2xl font-serif font-medium text-foreground">AED {opt.priceAed}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </FadeIn>
            )}

            {/* Inclusions & Exclusions */}
            <FadeIn delay={0.2} className="mb-16">
              <div className="grid md:grid-cols-2 gap-8 bg-secondary/50 p-8 rounded-xl border border-border">
                <div>
                  <h3 className="font-serif text-xl font-medium mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" /> What's Included
                  </h3>
                  <ul className="space-y-3">
                    {(displayData.inclusions || []).map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium mb-6 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-muted-foreground" /> What's Not Included
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                      <span>Gratuities (optional)</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <XCircle className="w-4 h-4 text-muted-foreground/50 shrink-0 mt-0.5" />
                      <span>Personal expenses</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            {/* FAQs */}
            {displayData.faqs && displayData.faqs.length > 0 && (
              <FadeIn delay={0.3} className="mb-12">
                <h2 className="text-3xl font-serif font-medium mb-8">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  {displayData.faqs.map((faq: any, i: number) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left font-medium text-base hover:text-primary">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </FadeIn>
            )}
            
            {/* Important Info */}
            <FadeIn delay={0.4}>
              <div className="bg-muted p-6 rounded-lg border border-border flex gap-4">
                <Info className="w-6 h-6 text-muted-foreground shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-1">Important Information</p>
                  <p>Please carry a valid ID/Passport during the tour. Timings may vary slightly depending on traffic and weather conditions. Pregnant women and guests with back/neck problems should consult before booking adventure activities.</p>
                </div>
              </div>
            </FadeIn>

          </div>

          {/* Sidebar Booking Form */}
          <div className="w-full lg:w-[400px]">
            <BookingForm activityOrPackage={displayData.title} />
          </div>

        </div>
      </div>
    </Layout>
  )
}
