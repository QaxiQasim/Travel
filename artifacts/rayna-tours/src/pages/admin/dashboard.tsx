import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('activities')
  const [, setLocation] = useLocation()
  const queryClient = useQueryClient()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      setLocation('/admin/login')
    }
  }, [setLocation])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    setLocation('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
        <Button variant="outline" onClick={handleLogout}>Logout</Button>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          {['activities', 'chauffeur', 'bookings'].map(tab => (
            <button
              key={tab}
              className={`pb-4 px-2 capitalize font-medium ${
                activeTab === tab 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'chauffeur' ? 'Chauffeur Rates' : tab}
            </button>
          ))}
        </div>

        {activeTab === 'activities' && <ActivitiesTab />}
        {activeTab === 'chauffeur' && <ChauffeurTab />}
        {activeTab === 'bookings' && <BookingsTab />}
      </div>
    </div>
  )
}

function ActivitiesTab() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['admin-activities'],
    queryFn: async () => {
      const res = await fetch('/api/activities')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading activities...</div>

  return (
    <div className="space-y-4">
      {activities?.map((activity: any) => (
        <ActivityRow key={activity.id} activity={activity} />
      ))}
    </div>
  )
}

function ActivityRow({ activity }: { activity: any }) {
  const queryClient = useQueryClient()
  const [priceAed, setPriceAed] = useState(activity.priceAed)
  const [imageUrl, setImageUrl] = useState(activity.imageUrl || "")
  
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/activities/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error("Failed to save")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-activities'] })
      alert("Successfully saved!")
    },
    onError: () => {
      alert("Failed to save changes.")
    }
  })

  const hasChanges = priceAed !== activity.priceAed || imageUrl !== (activity.imageUrl || "");

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{activity.title}</h3>
        <p className="text-sm text-gray-500">{activity.category}</p>
      </div>
      <div className="flex space-x-4 items-end">
        <div>
          <span className="text-xs text-gray-500 block mb-1">Price (AED)</span>
          <Input 
            type="number" 
            value={priceAed} 
            onChange={(e) => setPriceAed(parseInt(e.target.value) || 0)}
            className="w-24"
          />
        </div>
        <div>
          <span className="text-xs text-gray-500 block mb-1">Main Image URL</span>
          <Input 
            type="text" 
            value={imageUrl} 
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-48"
          />
        </div>
        <Button 
          disabled={!hasChanges || mutation.isPending} 
          onClick={() => mutation.mutate({ id: activity.id, priceAed, imageUrl })}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  )
}

function ChauffeurTab() {
  const { data: rates, isLoading } = useQuery({
    queryKey: ['admin-chauffeur-rates'],
    queryFn: async () => {
      const res = await fetch('/api/chauffeur-rates')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading rates...</div>

  return (
    <div className="space-y-4">
      {rates?.map((rate: any) => (
        <ChauffeurRow key={rate.id} rate={rate} />
      ))}
    </div>
  )
}

function ChauffeurRow({ rate }: { rate: any }) {
  const queryClient = useQueryClient()
  const [transferPrice, setTransferPrice] = useState(rate.transferPrice)
  
  const mutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/chauffeur-rates/${data.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error("Failed to save")
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chauffeur-rates'] })
      alert("Successfully saved!")
    },
    onError: () => {
      alert("Failed to save changes.")
    }
  })

  const hasChanges = transferPrice !== rate.transferPrice;

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{rate.vehicleName}</h3>
        <p className="text-sm text-gray-500">Pax: {rate.pax} | Luggage: {rate.luggage}</p>
      </div>
      <div className="flex space-x-4 items-end">
        <div>
          <span className="text-xs text-gray-500 block mb-1">Transfer Price (AED)</span>
          <Input 
            type="number" 
            value={transferPrice} 
            onChange={(e) => setTransferPrice(parseInt(e.target.value) || 0)}
            className="w-24"
          />
        </div>
        <Button 
          disabled={!hasChanges || mutation.isPending} 
          onClick={() => mutation.mutate({ id: rate.id, transferPrice })}
        >
          {mutation.isPending ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  )
}

function BookingsTab() {
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await fetch('/api/enquiries')
      return res.json()
    }
  })

  if (isLoading) return <div>Loading bookings...</div>

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 font-medium text-gray-900">Name</th>
            <th className="px-4 py-3 font-medium text-gray-900">Contact</th>
            <th className="px-4 py-3 font-medium text-gray-900">Package</th>
            <th className="px-4 py-3 font-medium text-gray-900">Travel Date</th>
            <th className="px-4 py-3 font-medium text-gray-900">Guests</th>
            <th className="px-4 py-3 font-medium text-gray-900">Date Logged</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {bookings?.map((booking: any) => (
            <tr key={booking.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">{booking.name}</td>
              <td className="px-4 py-3">
                <div className="flex flex-col">
                  <span>{booking.phone}</span>
                  <span className="text-gray-500 text-xs">{booking.email}</span>
                </div>
              </td>
              <td className="px-4 py-3">{booking.activityOrPackage}</td>
              <td className="px-4 py-3">{booking.travelDate}</td>
              <td className="px-4 py-3">{booking.guests}</td>
              <td className="px-4 py-3">{new Date(booking.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
          {bookings?.length === 0 && (
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                No bookings found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
