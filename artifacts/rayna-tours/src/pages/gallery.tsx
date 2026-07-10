import React from 'react'
import Layout from '@/components/layout'
import { FadeIn } from '@/components/animations'

import img1 from '@assets/generated_images/hero-dubai-skyline.jpg'
import img2 from '@assets/generated_images/hero-desert-safari.jpg'
import img3 from '@assets/generated_images/hero-dhow-cruise.jpg'
import img4 from '@assets/generated_images/skydiving-palm.jpg'
import img5 from '@assets/generated_images/burj-khalifa-view.jpg'
import img6 from '@assets/generated_images/water-sports-dubai.jpg'
import img7 from '@assets/generated_images/theme-parks-dubai.jpg'
import img8 from '@assets/generated_images/city-tour-dubai.jpg'
import img9 from '@assets/generated_images/car-rental-dubai.jpg'

const images = [
  { src: img1, alt: "Dubai Skyline", category: "City" },
  { src: img2, alt: "Desert Safari", category: "Adventure" },
  { src: img3, alt: "Dhow Cruise", category: "Water" },
  { src: img4, alt: "Skydiving", category: "Adventure" },
  { src: img5, alt: "Burj Khalifa", category: "City" },
  { src: img6, alt: "Water Sports", category: "Water" },
  { src: img7, alt: "Theme Parks", category: "Entertainment" },
  { src: img8, alt: "City Tour", category: "City" },
  { src: img9, alt: "Luxury Cars", category: "Lifestyle" },
]

const categories = ["All", "City", "Adventure", "Water", "Entertainment", "Lifestyle"]

export default function GalleryPage() {
  const [filter, setFilter] = React.useState("All")

  const filteredImages = filter === "All" 
    ? images 
    : images.filter(img => img.category === filter)

  return (
    <Layout>
      <div className="bg-foreground py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-serif text-white font-medium mb-4 mt-10">Our Gallery</h1>
        <p className="text-white/70 max-w-2xl mx-auto">Visual stories from our unforgettable Dubai experiences.</p>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid Simulation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((img, idx) => (
            <FadeIn key={idx} delay={idx * 0.05}>
              <div className="group relative overflow-hidden rounded-lg cursor-pointer bg-muted aspect-square">
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-primary font-medium text-sm tracking-wider uppercase mb-1">{img.category}</p>
                    <h3 className="text-white font-serif text-xl">{img.alt}</h3>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </Layout>
  )
}
