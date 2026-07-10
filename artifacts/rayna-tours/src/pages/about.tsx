import React from 'react'
import Layout from '@/components/layout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

import aboutHero from '@assets/generated_images/about-us-concierge.jpg'
import dubaisky from '@assets/generated_images/hero-dubai-skyline.jpg'

export default function AboutPage() {
  return (
    <Layout>
      <div className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-foreground overflow-hidden">
        <img src={aboutHero} alt="About Rayna Tours" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <FadeIn>
            <p className="text-primary font-medium tracking-widest uppercase mb-4 text-sm">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-serif text-white font-medium mb-6">The Rayna Legacy</h1>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-16 items-center max-w-6xl mx-auto">
          <FadeIn className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 leading-tight">Elevating Dubai Tourism Since 2009</h2>
            <div className="prose prose-lg text-muted-foreground prose-p:leading-relaxed">
              <p>
                Rayna Tours began with a simple vision: to showcase the true grandeur of Dubai through the eyes of locals who love it. What started as a boutique concierge service has grown into the UAE's most trusted premium destination management company.
              </p>
              <p>
                We do not deal in generic itineraries. Every package we design, every desert safari we operate, and every Dhow cruise we sail is meticulously crafted to deliver the classic luxury that Dubai is famous for.
              </p>
              <p>
                Our fleet of premium vehicles, exclusive partnerships with top-tier hotels and attractions, and our dedicated team of multi-lingual guides ensure that your journey is seamless, sophisticated, and unforgettable.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.2} className="lg:w-1/2">
            <div className="relative">
              <img src={dubaisky} alt="Dubai Skyline" className="rounded-lg shadow-xl" />
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-lg shadow-2xl hidden md:block border border-border">
                <p className="text-5xl font-serif font-medium text-primary mb-2">15+</p>
                <p className="text-sm font-medium tracking-wider uppercase text-muted-foreground">Years of Excellence</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <div className="bg-secondary py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">The Rayna Standard</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">We hold ourselves to the highest standards of hospitality.</p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "White-Glove Service", desc: "From the moment you inquire to the end of your journey, expect dedicated, personalized attention." },
              { title: "Owned Operations", desc: "We own our desert camps, Dhow cruise fleet, and vehicles, ensuring absolute quality control over your experience." },
              { title: "Local Authority", desc: "Our deep-rooted relationships in the UAE grant our guests exclusive access and preferential treatment." }
            ].map((feature, i) => (
              <StaggerItem key={i} className="bg-background p-8 rounded-xl border border-border text-center hover:border-primary/50 transition-colors">
                <h3 className="font-serif text-xl font-medium mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </Layout>
  )
}
