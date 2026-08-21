import React from 'react'
import Layout from '@/components/layout'
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Use a generated image for the header
import contactBg from '@assets/generated_images/about-us-concierge.jpg'

export default function ContactPage() {
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We will get back to you shortly.",
    })
    const form = e.target as HTMLFormElement;
    form.reset()
  }

  return (
    <Layout>
      {/* Slim Header Banner */}
      <div className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-foreground overflow-hidden">
        <img src={contactBg} alt="Contact DONNVAY" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <FadeIn>
            <h1 className="text-4xl md:text-5xl font-serif text-white font-medium mb-4">Contact Us</h1>
            <p className="text-white/80 text-lg">
              Our travel concierges are available to assist you 24/7.
            </p>
          </FadeIn>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl mx-auto">
          
          {/* Contact Details */}
          <div className="lg:w-1/3 space-y-10">
            <FadeIn>
              <h2 className="text-3xl font-serif font-medium mb-8">Get in Touch</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 font-serif text-lg">Dubai Office</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      M4 Al Owais Building,<br />
                      Al Khabaisi, Dubai, UAE
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 font-serif text-lg">Ras Al Khaimah Office</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      RAK 6267 Compass Building,<br />
                      Ras Al Khaimah, UAE
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 font-serif text-lg">Phone</h4>
                    <p className="text-sm text-muted-foreground">+971 55 121 3793 (Phone & WhatsApp)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 font-serif text-lg">Email</h4>
                    <p className="text-sm text-muted-foreground">info@donnvay.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 font-serif text-lg">Business Hours</h4>
                    <p className="text-sm text-muted-foreground mb-1">Monday - Sunday</p>
                    <p className="text-sm text-muted-foreground">9:00 AM - 9:00 PM (GST)</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3">
            <FadeIn delay={0.2}>
              <Card className="border-border shadow-lg">
                <CardContent className="p-8 md:p-10">
                  <h3 className="font-serif text-2xl font-medium mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" required className="h-12" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required className="h-12" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" className="h-12" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" required className="h-12" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" required className="min-h-[150px] resize-y" />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto h-12 px-8 text-base">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

        </div>
      </div>
      
      {/* Dubai Office Location Map */}
      <div className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center gap-3">
            <MapPin className="w-6 h-6 text-primary" />
            <div>
              <h3 className="font-serif text-2xl font-medium">Dubai Office Location</h3>
              <p className="text-sm text-muted-foreground">M4 Al Owais Building, Al Khabaisi, Dubai, UAE</p>
            </div>
          </div>
          <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-border shadow-lg relative bg-muted">
            <iframe 
              src="https://maps.google.com/maps?q=Al+Owais+Building,+Al+Khabaisi,+Dubai,+UAE&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Dubai Office Location Map - Al Owais Building"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  )
}
