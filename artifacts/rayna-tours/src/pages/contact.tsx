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
                    <p className="text-sm text-muted-foreground mb-1">+971 55 121 3793</p>
                    <p className="text-sm text-muted-foreground">+971 55 121 3793 (WhatsApp)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2 font-serif text-lg">Email</h4>
                    <p className="text-sm text-muted-foreground mb-1">info@donnvay.com</p>
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
      
      {/* Map Placeholder */}
      <div className="w-full h-[400px] bg-muted relative">
        <div className="absolute inset-0 flex items-center justify-center flex-col text-muted-foreground">
          <MapPin className="w-12 h-12 mb-4 opacity-50" />
          <p className="font-medium">Interactive Map Placeholder</p>
          <p className="text-sm">Deira, Dubai</p>
        </div>
      </div>
    </Layout>
  )
}
