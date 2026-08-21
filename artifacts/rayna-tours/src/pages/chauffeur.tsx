import React, { useState } from 'react'
import { Link, useLocation } from 'wouter'
import { Check, Star, CheckCircle, MessageCircle, MapPin, Users, Briefcase, DoorOpen, Settings, Clock } from 'lucide-react'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { transferRates as fallbackTransferRates } from '@/data/transferRates'
import { chauffeurCars, fromLocations as staticFromLocations, toLocations as staticToLocations } from '@/data/chauffeurCars';
import { hourlyRates, hourlyPackages } from '@/data/hourlyRates';
import { useQuery } from '@tanstack/react-query';

import heroBg from '@assets/generated_images/car-rental-dubai.jpg'

export default function ChauffeurPage() {
  const [, setLocation] = useLocation();
  
  const { data: dbData } = useQuery({
    queryKey: ['public-chauffeur'],
    queryFn: async () => {
      const res = await fetch('/api/chauffeur', { cache: 'no-store' });
      return res.json();
    }
  });

  const transferRates = React.useMemo(() => {
    if (!dbData?.pricing) return fallbackTransferRates;
    const map: any = {};
    
    dbData.pricing.forEach((p: any) => {
      const fromLoc = dbData.locations.find((l: any) => l.id === p.fromLocationId)?.locationName;
      const toLoc = dbData.locations.find((l: any) => l.id === p.toLocationId)?.locationName;
      const vehicle = dbData.vehicles.find((v: any) => v.id === p.vehicleId)?.vehicleType;

      if (!fromLoc || !toLoc || !vehicle) return;

      if (!map[fromLoc]) map[fromLoc] = {};
      if (!map[fromLoc][toLoc]) map[fromLoc][toLoc] = {};
      map[fromLoc][toLoc][vehicle] = Number(p.price);
    });

    return Object.keys(map).length > 0 ? map : fallbackTransferRates;
  }, [dbData]);

  const fromLocations = React.useMemo(() => Object.keys(transferRates), [transferRates]);

  const [serviceType, setServiceType] = useState<'transfer' | 'hourly'>('transfer');
  
  // Transfer States
  const [fromLocation, setFromLocation] = useState<string>('');
  const [toLocation, setToLocation] = useState<string>('');
  
  // Hourly States
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  
  // Common State
  const [selectedCar, setSelectedCar] = useState<string>('');
  const [appliedFilters, setAppliedFilters] = useState<{ 
    type: 'transfer' | 'hourly', 
    from?: string, 
    to?: string, 
    pkg?: string,
    car: string 
  } | null>(null);
  
  const handleCheckPrice = () => {
    if (serviceType === 'transfer') {
      if (!fromLocation || !toLocation) {
        alert("Please select both Pick-up and Drop-off locations.");
        return;
      }
      setAppliedFilters({ 
        type: 'transfer',
        from: fromLocation, 
        to: toLocation, 
        car: selectedCar || 'all' 
      });
    } else {
      if (!selectedPackage) {
        alert("Please select an hourly package.");
        return;
      }
      setAppliedFilters({
        type: 'hourly',
        pkg: selectedPackage,
        car: selectedCar || 'all'
      });
    }
  };

  return (
    <Layout>
      <div className="relative h-[60vh] min-h-[500px] flex flex-col justify-center items-start bg-black overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="Luxury Chauffeur Service" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 max-w-7xl mt-16">
          <FadeIn>
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-semibold tracking-wider mb-4 uppercase">
              Premium Transfers
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight max-w-3xl">
              Arrive in <span className="text-primary italic">Style</span> & Comfort
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl font-light mb-8">
              Experience the ultimate in luxury travel with our professional chauffeur services across the UAE.
            </p>
          </FadeIn>
        </div>
      </div>

      <section className="relative z-20 -mt-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-white/90 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.12)] transition-all duration-500 rounded-2xl p-4 sm:p-6 border border-white/20">
          
          <div className="flex justify-center gap-4 mb-6 pb-6 border-b border-gray-100 flex-wrap">
            <Button 
              variant={serviceType === 'transfer' ? 'default' : 'outline'}
              onClick={() => setServiceType('transfer')}
              className={`rounded-full px-8 h-10 tracking-widest uppercase text-xs font-bold transition-all ${serviceType === 'transfer' ? 'bg-black text-white hover:bg-black' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              Point-to-Point Transfer
            </Button>
            <Button 
              variant={serviceType === 'hourly' ? 'default' : 'outline'}
              onClick={() => setServiceType('hourly')}
              className={`rounded-full px-8 h-10 tracking-widest uppercase text-xs font-bold transition-all ${serviceType === 'hourly' ? 'bg-black text-white hover:bg-black' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}
            >
              Hourly / Daily Packages
            </Button>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-${serviceType === 'transfer' ? '4' : '3'} gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100 items-end`}>
            
            {serviceType === 'transfer' ? (
              <>
                <div className="space-y-3 px-4 group">
                  <label className="text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors group-hover:text-primary">
                    <MapPin className="w-4 h-4 text-primary" /> From
                  </label>
                  <Select value={fromLocation || undefined} onValueChange={(val) => {
                    setFromLocation(val);
                    setToLocation('');
                  }}>
                    <SelectTrigger className="w-full h-12 bg-transparent border-0 shadow-none focus:ring-0 text-gray-600 font-medium px-0 hover:bg-gray-50/50 transition-colors rounded-lg">
                      <SelectValue placeholder="Pick-up location" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-2xl border border-gray-200 max-h-64 overflow-y-auto bg-white z-[100]">
                      {fromLocations.map(loc => (
                        <SelectItem key={loc} value={loc} className="rounded-lg my-1 cursor-pointer">{loc}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 px-4 group pt-4 md:pt-0">
                  <label className="text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors group-hover:text-primary">
                    <MapPin className="w-4 h-4 text-primary" /> To
                  </label>
                  <Select key={fromLocation || 'empty'} value={toLocation || undefined} onValueChange={setToLocation}>
                    <SelectTrigger className="w-full h-12 bg-transparent border-0 shadow-none focus:ring-0 text-gray-600 font-medium px-0 hover:bg-gray-50/50 transition-colors rounded-lg">
                      <SelectValue placeholder="Drop-off location" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl shadow-2xl border border-gray-200 max-h-64 overflow-y-auto bg-white z-[100]">
                      {fromLocation && transferRates[fromLocation] ? Object.keys(transferRates[fromLocation]).map(loc => (
                        <SelectItem key={loc} value={loc} className="rounded-lg my-1 cursor-pointer">{loc}</SelectItem>
                      )) : <SelectItem value="none" disabled>Select pick-up first</SelectItem>}
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <div className="space-y-3 px-4 group">
                <label className="text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors group-hover:text-primary">
                  <Clock className="w-4 h-4 text-primary" /> Package Duration
                </label>
                <Select value={selectedPackage || undefined} onValueChange={setSelectedPackage}>
                  <SelectTrigger className="w-full h-12 bg-transparent border-0 shadow-none focus:ring-0 text-gray-600 font-medium px-0 hover:bg-gray-50/50 transition-colors rounded-lg">
                    <SelectValue placeholder="Select package" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl shadow-2xl border border-gray-200 max-h-64 overflow-y-auto bg-white z-[100]">
                    {hourlyPackages.map(pkg => (
                      <SelectItem key={pkg} value={pkg} className="rounded-lg my-1 cursor-pointer">{pkg}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-3 px-4 group pt-4 md:pt-0">
              <label className="text-sm font-semibold text-gray-800 flex items-center gap-2 transition-colors group-hover:text-primary">
                <Star className="w-4 h-4 text-primary" /> Model
              </label>
              <Select value={selectedCar || undefined} onValueChange={setSelectedCar}>
                <SelectTrigger className="w-full h-12 bg-transparent border-0 shadow-none focus:ring-0 text-gray-600 font-medium px-0 hover:bg-gray-50/50 transition-colors rounded-lg">
                  <SelectValue placeholder="All Models" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-2xl border border-gray-200 max-h-64 overflow-y-auto bg-white z-[100]">
                  <SelectItem value="all" className="rounded-lg my-1 cursor-pointer">All Models</SelectItem>
                  {Array.from(new Set(chauffeurCars.map(car => car.name))).map(carName => (
                    <SelectItem key={carName} value={carName} className="rounded-lg my-1 cursor-pointer">{carName}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 md:pt-0 px-4 pb-1">
              <Button 
                onClick={handleCheckPrice}
                className="w-full h-12 bg-black text-white hover:bg-primary hover:text-black font-semibold rounded-xl uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Check Price
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-black font-medium mb-4">Our Premium Fleet</h2>
            <div className="w-24 h-1 bg-primary mx-auto"></div>
            <p className="text-gray-500 mt-6 max-w-2xl mx-auto">
              Choose from our exquisite collection of luxury vehicles, each maintained to the highest standards for your comfort and safety.
            </p>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {chauffeurCars.filter(car => {
              if (!appliedFilters) return true; // Show all by default
              if (appliedFilters.car === 'all') return true;
              return car.name === appliedFilters.car;
            }).map((car) => {
              
              let dynamicPrice = null;
              let labelPrice = "Starting From";

              if (appliedFilters) {
                if (appliedFilters.type === 'transfer' && appliedFilters.from && appliedFilters.to) {
                  dynamicPrice = transferRates[appliedFilters.from]?.[appliedFilters.to]?.[car.name];
                  if (dynamicPrice) labelPrice = "Exact Route Rate";
                } else if (appliedFilters.type === 'hourly' && appliedFilters.pkg) {
                  const rate = hourlyRates[car.name]?.[appliedFilters.pkg as keyof typeof hourlyRates[string]];
                  if (rate) {
                    dynamicPrice = rate;
                    labelPrice = "Package Rate";
                  }
                }
              }

              const displayPrice = dynamicPrice || car.price;

              return (
                <StaggerItem key={car.id}>
                  <Card className="h-full bg-white text-black overflow-hidden border border-gray-100 rounded-xl group hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] transition-all duration-500">
                    <div className="relative h-64 overflow-hidden bg-[#f8f9fa] p-8 flex items-center justify-center">
                      <img 
                        src={car.image} 
                        alt={car.name}
                        className="w-full h-full object-cover rounded-md transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        {car.type}
                      </div>
                    </div>
                    
                    <CardContent className="p-8">
                      <h3 className="font-serif text-2xl font-semibold mb-6 text-black">
                        {car.name}
                      </h3>
                      
                      <div className="grid grid-cols-4 gap-4 mb-8 border-y border-gray-100 py-4">
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Users className="w-5 h-5 mb-2 text-primary" />
                          <span className="text-xs font-medium">{car.pax} Pax</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Briefcase className="w-5 h-5 mb-2 text-primary" />
                          <span className="text-xs font-medium">{car.luggage} Lugg</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <DoorOpen className="w-5 h-5 mb-2 text-primary" />
                          <span className="text-xs font-medium">{car.doors} Doors</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <Settings className="w-5 h-5 mb-2 text-primary" />
                          <span className="text-xs font-medium">{car.transmission}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-8">
                        <div>
                          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{labelPrice}</p>
                          <p className="font-serif text-2xl font-bold text-black">
                            AED {displayPrice}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button 
                          onClick={() => setLocation(`/chauffeur-services/${car.slug}?type=${appliedFilters?.type || 'transfer'}&pkg=${appliedFilters?.pkg || ''}`)}
                          className="w-full rounded-md bg-black text-white hover:bg-primary hover:text-black uppercase tracking-widest text-sm font-semibold h-12 transition-all duration-300"
                        >
                          Book Now
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            const message = `Hello, I am interested in booking the ${car.name} for AED ${displayPrice}. Can you provide more details?`;
                            window.open(`https://wa.me/971551213793?text=${encodeURIComponent(message)}`, '_blank');
                          }}
                          className="w-full rounded-md border-green-500 text-green-600 hover:bg-green-50 uppercase tracking-widest text-sm font-semibold h-12 transition-all duration-300 flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" /> WhatsApp
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </Layout>
  )
}
