import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Car, Plus, Settings2, Trash2 } from 'lucide-react';

export default function ChauffeurModule() {
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const queryClient = useQueryClient();
  
  const { data, isLoading } = useQuery({
    queryKey: ['admin-chauffeur'],
    queryFn: async () => {
      const res = await fetch('/api/chauffeur');
      return res.json();
    }
  });

  const seedMutation = useMutation({
    mutationFn: async () => {
      // In a real scenario, this would call an API endpoint to seed data.
      // Since we don't have a dedicated seed endpoint, the backend could handle it,
      // but for this UI, we'll just show the cards. If they want to add cars, they can use the UI (if implemented)
      // or we can just rely on the API. 
      return true;
    }
  });

  if (isLoading) return <div className="text-text-muted">Loading chauffeur matrix...</div>;

  const vehicles = data?.vehicles || [];
  const locations = data?.locations || [];
  const pricing = data?.pricing || [];

  if (selectedVehicle) {
    return (
      <VehicleDetailView 
        vehicle={selectedVehicle} 
        locations={locations} 
        pricing={pricing} 
        onBack={() => setSelectedVehicle(null)} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-text-muted">Select a vehicle to manage its pricing across different locations.</p>
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Vehicle
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle: any) => (
          <div 
            key={vehicle.id} 
            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group flex flex-col"
            onClick={() => setSelectedVehicle(vehicle)}
          >
            <div className="aspect-video w-full bg-border/50 relative overflow-hidden flex items-center justify-center">
              {vehicle.imageUrl ? (
                <img src={vehicle.imageUrl} alt={vehicle.vehicleType} className="w-full h-full object-cover" />
              ) : (
                <Car className="w-10 h-10 text-text-muted" />
              )}
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-primary transition-colors">{vehicle.vehicleType}</h3>
                <p className="text-sm text-text-muted line-clamp-2">Capacity: {vehicle.capacity} Pax, {vehicle.luggage} Luggage</p>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-sm">
                <span className="text-success">Active</span>
                <Settings2 className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        ))}
        {vehicles.length === 0 && (
          <div className="col-span-full text-center py-12 bg-surface border border-dashed border-border rounded-xl">
            <Car className="w-12 h-12 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Vehicles Found</h3>
            <p className="text-text-muted mb-4">You need to add vehicles to the database to manage pricing.</p>
            <p className="text-xs text-text-muted">Note: Please create an API seed script or use the Add Vehicle button to populate.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function VehicleDetailView({ vehicle, locations, pricing, onBack }: { vehicle: any, locations: any[], pricing: any[], onBack: () => void }) {
  const queryClient = useQueryClient();
  const [localPricing, setLocalPricing] = useState<any[]>(pricing);

  const mutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await fetch('/api/chauffeur/pricing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-chauffeur'] });
    }
  });

  const getPrice = (locationId: string) => {
    const p = localPricing.find(pr => pr.vehicleId === vehicle.id && pr.locationId === locationId);
    return p ? p.price : '';
  };

  const isDirty = (locationId: string) => {
    const p = localPricing.find(pr => pr.vehicleId === vehicle.id && pr.locationId === locationId);
    return p?._isDirty;
  };

  const updatePriceLocal = (locationId: string, val: string) => {
    const num = parseFloat(val);
    if (isNaN(num)) return;
    
    setLocalPricing(prev => {
      const existing = prev.find(p => p.vehicleId === vehicle.id && p.locationId === locationId);
      if (existing) {
        return prev.map(p => p.id === existing.id ? { ...p, price: num, _isDirty: true } : p);
      } else {
        return [...prev, { id: 'temp-'+Date.now(), vehicleId: vehicle.id, locationId, price: num, _isDirty: true }];
      }
    });
  };

  const savePrice = (locationId: string) => {
    const p = localPricing.find(pr => pr.vehicleId === vehicle.id && pr.locationId === locationId);
    if (p) {
      mutation.mutate({ vehicleId: vehicle.id, locationId, price: p.price });
      setLocalPricing(prev => prev.map(pr => pr.id === p.id ? { ...pr, _isDirty: false } : pr));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="bg-surface border-border text-white hover:bg-white/5">
          ← Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">{vehicle.vehicleType}</h2>
          <p className="text-text-muted">Manage pricing for this vehicle across all locations</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Location Pricing</h3>
          <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <Plus className="w-4 h-4 mr-2" /> Add Location
          </Button>
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {locations.map(loc => (
            <div key={loc.id} className="bg-bg border border-border rounded-lg p-4 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-white">{loc.locationName}</h4>
              </div>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="w-40">
                  <span className="text-xs text-text-muted block mb-1">Price (AED)</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">AED</span>
                    <Input 
                      type="number"
                      value={getPrice(loc.id)}
                      onChange={(e) => updatePriceLocal(loc.id, e.target.value)}
                      className="bg-surface border-border text-white pl-12 h-10"
                      placeholder="—"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 self-end pb-0.5 mt-auto">
                  <Button 
                    disabled={!isDirty(loc.id) || mutation.isPending}
                    onClick={() => savePrice(loc.id)}
                    className="bg-success/20 text-success hover:bg-success/30 border border-success/30 h-10"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {locations.length === 0 && (
            <div className="text-center py-8 text-text-muted border border-dashed border-border rounded-lg">
              No locations found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
