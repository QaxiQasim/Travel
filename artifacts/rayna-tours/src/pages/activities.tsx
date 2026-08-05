import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import Layout from '@/components/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Clock, Users, Star, MapPin, CheckCircle, ChevronRight, Filter, Search } from 'lucide-react'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'

import { useQuery } from '@tanstack/react-query'

// Fallback images for existing activities
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

// Hero image for activities page
import heroBg from '@assets/generated_images/hero-desert-safari.jpg'

export default function ActivitiesPage() {
  const [, setLocation] = useLocation()
  const [priceRange, setPriceRange] = useState([0, 1500])
  const [committedPrice, setCommittedPrice] = useState([0, 1500])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const { data: activities = [], isLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const res = await fetch('/api/activities')
      return res.json()
    }
  })

  // Get unique categories
  const categories = Array.from(new Set(activities.map((a: any) => a.category)))

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const filteredActivities = activities.filter((activity: any) => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(activity.category)
    const matchesPrice = activity.priceAed >= committedPrice[0] && activity.priceAed <= committedPrice[1]
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesPrice && matchesSearch
  })

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex flex-col justify-end pb-12 bg-foreground overflow-hidden">
        <img src={heroBg} alt="Activities in Dubai" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif text-white font-medium mb-2">Best Recommendation Destination For You</h1>
            <p className="text-white/80 text-lg max-w-2xl">
              Discover the most unforgettable experiences in Dubai, hand-picked for your perfect holiday.
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                <Filter className="w-4 h-4" />
                {showMobileFilters ? "Hide Filters" : "Show Filters"}
              </Button>
            </div>

            {/* Sidebar Filters */}
            <aside className={`w-full lg:w-1/4 space-y-8 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
              <div className="bg-card border border-border/50 rounded-xl p-6 sticky top-24">
                <h3 className="font-serif text-xl mb-6 flex items-center justify-between">
                  Search Filter
                </h3>
                
                {/* Search Bar */}
                <div className="mb-8 relative">
                  <Input 
                    placeholder="Search activities..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                
                {/* Categories */}
                <div className="mb-8">
                  <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">Category</h4>
                  <div className="space-y-3">
                    {categories.map(cat => (
                      <div key={cat} className="flex items-center space-x-3">
                        <Checkbox 
                          id={`cat-${cat}`} 
                          checked={selectedCategories.includes(cat)}
                          onCheckedChange={() => toggleCategory(cat)}
                        />
                        <Label htmlFor={`cat-${cat}`} className="capitalize cursor-pointer font-normal">
                          {cat.replace('-', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                    Price Range (AED)
                  </h4>
                  <div className="mb-6">
                    <Slider 
                      defaultValue={[0, 1500]} 
                      max={2000} 
                      step={50}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      onValueCommit={setCommittedPrice}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>AED {priceRange[0]}</span>
                      <span>AED {priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Activities Grid */}
            <div className="w-full lg:w-3/4">
              <div className="mb-6 flex justify-between items-center">
                <p className="text-muted-foreground">
                  Showing <span className="font-medium text-foreground">{filteredActivities.length}</span> activities
                </p>
              </div>

              {filteredActivities.length === 0 ? (
                <div className="text-center py-20 bg-muted/30 rounded-xl border border-border/50">
                  <p className="text-muted-foreground text-lg">No activities match your filters.</p>
                  <Button 
                    variant="link" 
                    onClick={() => { setPriceRange([0, 1500]); setSelectedCategories([]); }}
                    className="mt-2 text-primary"
                  >
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredActivities.map((activity) => (
                    <StaggerItem key={activity.id}>
                      <Card 
                        className="h-full group overflow-hidden border-border/50 hover:border-primary/50 transition-colors bg-card hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                        onClick={() => setLocation(`/${activity.slug}`)}
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={activity.imageUrl || imageMap[activity.slug] || heroBg} 
                            alt={activity.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          {activity.category && (
                            <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                              {activity.category.replace('-', ' ')}
                            </div>
                          )}
                          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground text-sm font-medium px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
                            <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                            {activity.rating}
                          </div>
                        </div>
                        
                        <CardContent className="p-5 flex flex-col h-[calc(100%-12rem)]">
                          <div className="mb-2 text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> Dubai, UAE
                          </div>
                          
                          <h3 className="font-serif text-lg font-medium leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                            {activity.title}
                          </h3>
                          
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {activity.duration.split(' ')[0]} {activity.duration.split(' ')[1] || 'Hours'}
                            </div>
                          </div>
                          
                          <ul className="space-y-1.5 mb-6 text-sm text-muted-foreground flex-grow">
                            {activity.inclusions.slice(0, 3).map((inc, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{inc}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="pt-4 border-t border-border/50 mt-auto flex items-end justify-between">
                            <div>
                              <p className="text-xs text-muted-foreground mb-0.5">Starting from</p>
                              <p className="font-serif text-xl font-medium text-foreground">
                                <span className="text-sm font-sans font-normal text-muted-foreground mr-1">AED</span>
                                {activity.priceAed}
                              </p>
                            </div>
                            <Button size="sm" className="rounded-full px-5">
                              Book
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
