import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  activityOrPackage: string;
  defaultDate?: string;
  packageOptions?: { name: string, priceAed?: number }[];
}

export function BookingForm({ activityOrPackage, defaultDate = '', packageOptions }: BookingFormProps) {
  const { toast } = useToast()
  
  const [isPending, setIsPending] = React.useState(false)

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

  const onSubmit = (data: EnquiryFormValues) => {
    setIsPending(true)
    setTimeout(() => {
      setIsPending(false)
      toast({
        title: "Enquiry Submitted",
        description: "Our luxury travel concierge will contact you shortly.",
      })
      form.reset({
        ...data,
        name: '',
        email: '',
        phone: '',
        message: ''
      })
    }, 1000)
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
                  {packageOptions.map((opt, i) => (
                    <SelectItem key={i} value={`${activityOrPackage.split(' - ')[0]} - ${opt.name}`}>
                      {opt.name} {opt.priceAed ? `(AED ${opt.priceAed})` : ''}
                    </SelectItem>
                  ))}
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
