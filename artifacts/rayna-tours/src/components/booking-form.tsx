import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number is required'),
  activityOrPackage: z.string().min(1, 'Activity/Package is required'),
  travelDate: z.string().min(1, 'Travel date is required'),
  guests: z.coerce.number().min(1, 'At least 1 guest required'),
  message: z.string().optional()
})

type EnquiryFormValues = z.infer<typeof enquirySchema>

interface BookingFormProps {
  activityTitle?: string;
  activityOrPackage: string;
  defaultDate?: string;
  packageOptions?: { name: string, priceAed?: number }[];
}

export function BookingForm({ activityTitle, activityOrPackage, defaultDate = '', packageOptions }: BookingFormProps) {
  const { toast } = useToast()
  
  const form = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      activityOrPackage: activityOrPackage,
      travelDate: defaultDate,
      guests: 1,
      message: ''
    }
  })

  // Ensure default value is respected if activityOrPackage changes
  React.useEffect(() => {
    form.setValue('activityOrPackage', activityOrPackage)
  }, [activityOrPackage, form])

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
        title: "Enquiry Submitted",
        description: "Our luxury travel concierge will contact you shortly.",
      })
      form.reset({
        ...form.getValues(),
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive"
      })
    }
  })

  const isPending = mutation.isPending;

  const onSubmit = (data: EnquiryFormValues) => {
    let totalPrice: number | undefined = undefined;
    if (packageOptions && packageOptions.length > 0) {
      // 1. Exact match
      let selectedPkg = packageOptions.find(p => p.name === data.activityOrPackage);
      
      // 2. Substring match (e.g. if activityOrPackage is "Dubai City Tour - Dubai City Tour with Private Car (Full Day)")
      if (!selectedPkg) {
        selectedPkg = packageOptions.find(p => 
          data.activityOrPackage.toLowerCase().includes(p.name.toLowerCase()) ||
          p.name.toLowerCase().includes(data.activityOrPackage.toLowerCase())
        );
      }

      // 3. Fallback if single package option exists
      if (!selectedPkg && packageOptions.length === 1) {
        selectedPkg = packageOptions[0];
      }

      if (selectedPkg && selectedPkg.priceAed) {
        totalPrice = Number(selectedPkg.priceAed) * Number(data.guests || 1);
      }
    }

    mutation.mutate({
      customerName: data.name,
      email: data.email,
      phone: data.phone,
      serviceType: 'activity',
      location: activityTitle || 'Activity Inquiry',
      persons: data.guests,
      requestedDate: data.travelDate,
      totalPrice: totalPrice !== undefined ? totalPrice.toString() : '0',
      notes: `Package/Activity: ${data.activityOrPackage}\nMessage: ${data.message || 'None'}`
    })
  }

  return (
    <Card className="border-border shadow-lg sticky top-32">
      <CardHeader className="bg-muted/50 border-b border-border/50 pb-6">
        <CardTitle className="text-xl">Enquire Now</CardTitle>
        <CardDescription>
          Request a callback from our Dubai travel experts.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          
          {packageOptions && packageOptions.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="packageSelect">Package Options</Label>
              <Select
                value={form.watch('activityOrPackage')}
                onValueChange={(val) => form.setValue('activityOrPackage', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  {packageOptions.map((opt, i) => {
                    const optValue = activityTitle ? `${activityTitle} - ${opt.name}` : `${activityOrPackage.split(' - ')[0]} - ${opt.name}`;
                    return (
                    <SelectItem key={i} value={optValue}>
                      {opt.name} {opt.priceAed ? `(AED ${opt.priceAed})` : ''}
                    </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
              {form.formState.errors.activityOrPackage && <p className="text-sm text-destructive">{form.formState.errors.activityOrPackage.message}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...form.register('name')} />
            {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" {...form.register('email')} />
              {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <Input id="phone" placeholder="+XX XXXXXXXX" {...form.register('phone')} />
              {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="travelDate">Travel Date</Label>
              <Input id="travelDate" type="date" {...form.register('travelDate')} />
              {form.formState.errors.travelDate && <p className="text-sm text-destructive">{form.formState.errors.travelDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Input id="guests" type="number" min="1" {...form.register('guests')} />
              {form.formState.errors.guests && <p className="text-sm text-destructive">{form.formState.errors.guests.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Special Requests (Optional)</Label>
            <Textarea id="message" placeholder="Any dietary requirements or special occasions?" {...form.register('message')} />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-base mt-2" 
            disabled={isPending}
          >
            {isPending ? 'Sending...' : 'Request Booking'}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            No payment required at this stage.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
