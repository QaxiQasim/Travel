import React, { useState, useEffect } from 'react'
import { useParams } from 'wouter'
import Layout from '@/components/layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Users, Briefcase, DoorOpen, Settings, CheckCircle, MessageCircle, Info } from 'lucide-react'
import { FadeIn } from '@/components/animations'
import { useToast } from '@/hooks/use-toast'
import { useMutation } from '@tanstack/react-query'

import { chauffeurCars, fromLocations } from '@/data/chauffeurCars'
import { transferRates } from '@/data/transferRates'
import { hourlyRates, hourlyPackages } from '@/data/hourlyRates'

export default function CarDetailsPage() {
  const params = useParams()
  const slug = params.slug
  const car = chauffeurCars.find(c => c.slug === slug)

  // Get initial states from URL query params if any
  const searchParams = new URLSearchParams(window.location.search);
  const initialType = (searchParams.get('type') as 'transfer' | 'hourly') || 'transfer';
  const initialPkg = searchParams.get('pkg') || '';

  const [serviceType, setServiceType] = useState<'transfer' | 'hourly'>(initialType);
  const [fromLocation, setFromLocation] = useState<string>('')
  const [toLocation, setToLocation] = useState<string>('')
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPkg)
  const [activeImage, setActiveImage] = useState<string>('')
  
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Failed to submit booking')
      return res.json()
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Submitted",
        description: "Our team will contact you shortly.",
      })
      setName('')
      setPhone('')
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request.",
        variant: "destructive"
      })
    }
  })
  
  if (!car) {
    return <Layout><div className="py-32 text-center text-2xl">Car not found.</div></Layout>
  }

  let dynamicPrice = null;
  let labelPrice = "Starting From";

  if (serviceType === 'transfer' && fromLocation && toLocation) {
    dynamicPrice = transferRates[fromLocation]?.[toLocation]?.[car.name];
    if (dynamicPrice) labelPrice = "Exact Route Rate";
  } else if (serviceType === 'hourly' && selectedPackage) {
    const rate = hourlyRates[car.name]?.[selectedPackage as keyof typeof hourlyRates[string]];
    if (rate) {
      dynamicPrice = rate;
      labelPrice = "Package Rate";
    }
  }

  const displayPrice = dynamicPrice || car.price;
  const extraHoursPrice = hourlyRates[car.name]?.["EXTRA HOURS"] || 100;

  const handleWhatsApp = () => {
    let message = `Hello, I am interested in booking the ${car.name}.`;
    if (serviceType === 'transfer' && fromLocation && toLocation) {
      message += ` Route: ${fromLocation} to ${toLocation}. Price: AED ${displayPrice}.`;
    } else if (serviceType === 'hourly' && selectedPackage) {
      message += ` Package: ${selectedPackage}. Price: AED ${displayPrice}.`;
    } else {
      message += ` Price: AED ${displayPrice}.`;
    }
    window.open(`https://wa.me/971551213793?text=${encodeURIComponent(message)}`, '_blank');
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    
    let locationDetails = '';
    if (serviceType === 'transfer') {
      if (!fromLocation || !toLocation) {
        toast({ title: "Incomplete", description: "Please select pick-up and drop-off locations.", variant: "destructive" });
        return;
      }
      locationDetails = `Transfer: ${fromLocation} -> ${toLocation}`;
    } else {
      if (!selectedPackage) {
        toast({ title: "Incomplete", description: "Please select a package.", variant: "destructive" });
        return;
      }
      locationDetails = `Hourly Package: ${selectedPackage}`;
    }

    mutation.mutate({
      customerName: name,
      phone: phone,
      serviceType: 'chauffeur',
      location: locationDetails,
      totalPrice: displayPrice?.toString(),
      notes: `Vehicle: ${car.name}`
    });
  }

  const features = ["Leather Seats", "Chauffeur", "Bottled Water", "Free WiFi"];

  return (
    <Layout>
      <div className="bg-[#f8f9fa] min-h-screen pb-20">
        <div className="bg-black text-white pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <FadeIn>
              <div className="inline-block bg-primary/20 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                {car.type}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-light mb-2">{car.name}</h1>
              <p className="text-gray-400 text-lg">Chauffeur Driven Premium Service</p>
            </FadeIn>
          </div>
        </div>

        <div className="container mx-auto max-w-6xl px-4 -mt-10">
          <div className="flex flex-col lg:flex-row gap-8">
            
            <div className="w-full lg:w-2/3 space-y-8">
              <Card className="border-none shadow-xl overflow-hidden rounded-xl">
                <div className="h-[400px] w-full bg-white flex items-center justify-center p-8 transition-opacity duration-300">
                  <img src={activeImage || car.image} alt={car.name} className="max-w-full max-h-full object-contain" />
                </div>
                {car.extraImages && car.extraImages.length > 0 && (
                  <div className="flex gap-4 p-4 bg-gray-50 border-t border-gray-100 overflow-x-auto">
                    <button 
                      onClick={() => setActiveImage(car.image)} 
                      className={`h-20 w-32 flex-shrink-0 bg-white border-2 rounded-lg overflow-hidden transition-all ${activeImage === car.image || (!activeImage) ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={car.image} alt={`${car.name} Front`} className="w-full h-full object-cover" />
                    </button>
                    {car.extraImages.map((imgUrl, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImage(imgUrl)} 
                        className={`h-20 w-32 flex-shrink-0 bg-white border-2 rounded-lg overflow-hidden transition-all ${activeImage === imgUrl ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                      >
                        <img src={imgUrl} alt={`${car.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                <CardContent className="bg-white p-8 border-t border-gray-100">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-serif">Specifications</h3>
                    <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium">
                      <Info className="w-4 h-4" />
                      Extra Hours Rate: AED {extraHoursPrice} / hr
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-3 rounded-full"><Users className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-sm text-gray-500">Passengers</p>
                        <p className="font-medium">{car.pax} Max</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-3 rounded-full"><Briefcase className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-sm text-gray-500">Luggage</p>
                        <p className="font-medium">{car.luggage} Bags</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-3 rounded-full"><DoorOpen className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-sm text-gray-500">Doors</p>
                        <p className="font-medium">{car.doors}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-3 rounded-full"><Settings className="w-5 h-5 text-primary" /></div>
                      <div>
                        <p className="text-sm text-gray-500">Gear</p>
                        <p className="font-medium">{car.transmission}</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif mb-4 mt-10">Features Included</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl overflow-hidden rounded-xl bg-white">
                <CardContent className="p-8">
                  <h3 className="text-xl font-serif mb-4 uppercase text-gray-800 tracking-wider">Terms & Condition</h3>
                  <div className="text-sm text-gray-600 space-y-4 leading-relaxed">
                    <p>Airport parking charges for Sedan cars are included for Terminal 1 & 3. Aed.30/- will be charged for Terminal 2 & Aed.40/- for Sharjah & Abu Dhabi Airport Arrival. DWC Airports will be as per actual parking charges whenever applicable. Rates are not applicable for events such as Airshow/formula 1 and other major event. 5% VAT Applicable on the Charges.</p>
                    <p>Maximum 90 minutes waiting period for all arrival there after additional hours will be applicable. Mercedes Sprinter / 35/50Seater Coach Airport parking charges of Aed.250/- for Dubai Terminal and other Airports charges will be in actual.</p>
                    <p>Full Day vehicles are booked for 10 hours & Half Day vehicles are booked for 5 Hours thereafter extra hours applicable as per the tariff. Full Charge applicable for No Show. All Reservation should be cancelled before 6 Hours to the service.</p>
                  </div>
                </CardContent>
              </Card>

            </div>

            <div className="w-full lg:w-1/3">
              <Card className="sticky top-24 border-none shadow-xl rounded-xl">
                <CardContent className="p-8">
                  <div className="mb-6 pb-6 border-b border-gray-100">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">{labelPrice}</p>
                    <p className="text-4xl font-serif font-bold text-black">AED {displayPrice}</p>
                  </div>

                  <div className="flex gap-2 mb-6 bg-gray-50 p-1 rounded-lg">
                    <button 
                      onClick={() => setServiceType('transfer')}
                      className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${serviceType === 'transfer' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                    >
                      Transfer
                    </button>
                    <button 
                      onClick={() => setServiceType('hourly')}
                      className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-md transition-all ${serviceType === 'hourly' ? 'bg-white shadow text-black' : 'text-gray-500 hover:text-black'}`}
                    >
                      Hourly
                    </button>
                  </div>

                  <h3 className="text-xl font-serif mb-6">Booking Inquiry</h3>
                  
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    
                    {serviceType === 'transfer' ? (
                      <>
                        <div className="space-y-2">
                          <Label>Pick-up Location</Label>
                          <Select value={fromLocation} onValueChange={(val) => { setFromLocation(val); setToLocation(''); }}>
                            <SelectTrigger className="w-full bg-gray-50 h-11">
                              <SelectValue placeholder="Select From" />
                            </SelectTrigger>
                            <SelectContent>
                              {fromLocations.map(loc => (
                                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Drop-off Location</Label>
                          <Select key={fromLocation || 'empty'} value={toLocation || undefined} onValueChange={setToLocation}>
                            <SelectTrigger className="w-full bg-gray-50 h-11">
                              <SelectValue placeholder="Select To" />
                            </SelectTrigger>
                            <SelectContent>
                              {fromLocation && transferRates[fromLocation] ? Object.keys(transferRates[fromLocation]).map(loc => (
                                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                              )) : <SelectItem value="none" disabled>Select pick-up first</SelectItem>}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label>Package Duration</Label>
                        <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                          <SelectTrigger className="w-full bg-gray-50 h-11">
                            <SelectValue placeholder="Select Package" />
                          </SelectTrigger>
                          <SelectContent>
                            {hourlyPackages.map(pkg => (
                              <SelectItem key={pkg} value={pkg}>{pkg}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required className="bg-gray-50 h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+971 50 000 0000" required className="bg-gray-50 h-11" />
                    </div>
                    
                    <Button disabled={mutation.isPending} type="submit" className="w-full h-12 bg-black text-white hover:bg-primary hover:text-black uppercase tracking-widest text-sm font-semibold mt-4 transition-all duration-300">
                      {mutation.isPending ? "Submitting..." : "Submit Inquiry"}
                    </Button>
                  </form>

                  <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-500 mb-4">Or book instantly via WhatsApp</p>
                    <Button 
                      onClick={handleWhatsApp}
                      className="w-full h-12 bg-[#25D366] hover:bg-[#128C7E] text-white uppercase tracking-widest text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  )
}
