import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Car, MapPin, Plus } from 'lucide-react';

export default function ChauffeurModule() {
  const queryClient = useQueryClient();
  const [selectedVehicle, setSelectedVehicle] = useState<string | 'all'>('all');
  
  const { data, isLoading } = useQuery({
    queryKey: ['admin-chauffeur'],
    queryFn: async () => {
      const res = await fetch('/api/chauffeur');
      return res.json();
    }
  });

  const mutation = useMutation({
    mutationFn: async (pricing: any) => {
      const res = await fetch('/api/chauffeur/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricing)
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chauffeur'] });
    }
  });

  if (isLoading) return <div className="text-text-muted">Loading chauffeur matrix...</div>;

  const { vehicles, locations, pricing } = data || { vehicles: [], locations: [], pricing: [] };

  const getPrice = (vehicleId: string, locationId: string) => {
    const p = pricing.find((pr: any) => pr.vehicleId === vehicleId && pr.locationId === locationId);
    return p ? p.price : '';
  };

  const handlePriceChange = (vehicleId: string, locationId: string, val: string) => {
    const price = parseFloat(val);
    if (isNaN(price)) return;
    mutation.mutate({ vehicleId, locationId, price });
  };

  const filteredVehicles = selectedVehicle === 'all' 
    ? vehicles 
    : vehicles.filter((v: any) => v.id === selectedVehicle);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Pricing Matrix</h2>
          <p className="text-text-muted text-sm">Manage dynamic transfer rates across all locations and vehicle classes.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
            <SelectTrigger className="w-[200px] bg-surface border-border text-white">
              <SelectValue placeholder="Filter by vehicle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Vehicles</SelectItem>
              {vehicles.map((v: any) => (
                <SelectItem key={v.id} value={v.id}>{v.vehicleType}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button className="bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <Plus className="w-4 h-4 mr-2" /> Add Location
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-bg/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-medium text-text-muted">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Location
                  </div>
                </th>
                {filteredVehicles.map((v: any) => (
                  <th key={v.id} className="px-6 py-4 font-medium text-white text-center border-l border-border/50">
                    <div className="flex flex-col items-center gap-1">
                      <Car className="w-5 h-5 text-text-muted" />
                      <span>{v.vehicleType}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {locations.map((loc: any) => (
                <tr key={loc.id} className="hover:bg-bg/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {loc.locationName}
                  </td>
                  {filteredVehicles.map((v: any) => (
                    <td key={`${loc.id}-${v.id}`} className="px-6 py-3 border-l border-border/50 text-center">
                      <div className="relative inline-block w-24">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-text-muted">AED</span>
                        <Input 
                          type="number"
                          defaultValue={getPrice(v.id, loc.id)}
                          onBlur={(e) => handlePriceChange(v.id, loc.id, e.target.value)}
                          className="bg-transparent border-transparent hover:border-border focus:border-primary text-center pl-8 text-white h-9 rounded-md"
                          placeholder="—"
                        />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              {locations.length === 0 && (
                <tr>
                  <td colSpan={vehicles.length + 1} className="px-6 py-12 text-center text-text-muted">
                    No locations defined.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
