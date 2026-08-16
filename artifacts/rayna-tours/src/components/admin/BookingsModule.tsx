import React, { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Calendar, User, Phone, CheckCircle2, XCircle } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://peqlupbkjtxlarbmhewm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_VOeStgAWq2bicW-Gzw5faQ_4fbYGRAe';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BookingsModule() {
  const queryClient = useQueryClient();
  
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['admin-bookings'],
    queryFn: async () => {
      const res = await fetch('/api/bookings');
      return res.json();
    }
  });

  // Subscribe to real-time changes
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        (payload) => {
          console.log('Realtime change received!', payload);
          queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: string }) => {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
    }
  });

  if (isLoading) return <div className="text-text-muted">Loading bookings feed...</div>;

  const getStatusColor = (status: string) => {
    switch(status?.toLowerCase()) {
      case 'new': return 'bg-primary/20 text-primary border-primary/30';
      case 'confirmed': return 'bg-success/20 text-success border-success/30';
      case 'completed': return 'bg-white/10 text-text border-white/20';
      case 'cancelled': return 'bg-danger/20 text-danger border-danger/30';
      default: return 'bg-surface text-text-muted border-border';
    }
  };

  const formatBookingPrice = (booking: any) => {
    if (booking.totalPrice && Number(booking.totalPrice) > 0) {
      return booking.totalPrice;
    }
    const notes = (booking.notes || '') + ' ' + (booking.location || '');
    const pax = Number(booking.persons) || 1;
    if (notes.includes('Private Car (Full Day)')) return (800 * pax).toString();
    if (notes.includes('Private Car (Half Day)')) return (500 * pax).toString();
    if (notes.includes('Full day) SIC')) return (400 * pax).toString();
    if (notes.includes('Half day) SIC')) return (200 * pax).toString();
    return booking.totalPrice || '0';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Live Bookings Feed</h2>
          <p className="text-text-muted text-sm flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
            </span>
            Real-time updates active
          </p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-bg/50 border-b border-border">
            <tr>
              <th className="px-6 py-4 font-medium text-text-muted">Customer</th>
              <th className="px-6 py-4 font-medium text-text-muted">Service Details</th>
              <th className="px-6 py-4 font-medium text-text-muted">Date & Pax</th>
              <th className="px-6 py-4 font-medium text-text-muted">Total</th>
              <th className="px-6 py-4 font-medium text-text-muted">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {bookings?.map((booking: any) => (
              <tr key={booking.id} className="hover:bg-bg/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white flex items-center gap-2">
                      <User className="w-3 h-3 text-text-muted" /> {booking.customerName}
                    </span>
                    <span className="text-text-muted text-xs mt-1 flex items-center gap-2">
                      <Phone className="w-3 h-3" /> {booking.phone}
                    </span>
                    {booking.email && (
                      <span className="text-text-muted text-xs mt-1 flex items-center gap-2">
                        <span className="w-3 h-3 flex items-center justify-center">@</span> {booking.email}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-medium capitalize">{booking.serviceType}</span>
                    <span className="text-text-muted text-xs">
                      {booking.location}
                    </span>
                    {booking.notes && (
                      <span className="text-text-muted text-xs whitespace-pre-wrap mt-1 opacity-80">
                        {booking.notes}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-white flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-text-muted" /> {booking.requestedDate ? new Date(booking.requestedDate).toLocaleDateString() : 'TBD'}
                    </span>
                    <span className="text-text-muted text-xs mt-1 flex items-center gap-2">
                      <User className="w-3 h-3" /> {booking.persons} Pax
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-semibold text-white">AED {formatBookingPrice(booking)}</span>
                </td>
                <td className="px-6 py-4">
                  <Select 
                    value={booking.status || 'New'} 
                    onValueChange={(val) => mutation.mutate({ id: booking.id, status: val })}
                  >
                    <SelectTrigger className={`w-[130px] h-8 text-xs border ${getStatusColor(booking.status || 'New')}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
            {bookings?.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                  No bookings received yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
