import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Plus, Settings2, Trash2 } from 'lucide-react';

import imgDesert from '@assets/generated_images/hero-desert-safari.jpg'
import imgWater from '@assets/generated_images/water-sports-dubai.jpg'
import imgSkydive from '@assets/generated_images/skydiving-palm.jpg'
import imgCityAtlantis from '@assets/generated_images/atlantis-palm-tour.png'
import imgBurj from '@assets/generated_images/burj-khalifa-view.jpg'
import imgDhow from '@assets/generated_images/hero-dhow-cruise.jpg'
import imgTheme from '@assets/generated_images/theme-parks-dubai.jpg'
import imgCar from '@assets/generated_images/car-rental-dubai.jpg'

const imageMap: Record<string, string> = {
  'desert-safari': imgDesert,
  'water-activities': imgWater,
  'skydiving': imgSkydive,
  'city-tour': imgCityAtlantis,
  'burj-khalifa': imgBurj,
  'dhow-cruise': imgDhow,
  'theme-parks': imgTheme,
  'car-rental': imgCar,
}

export default function ActivitiesModule() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  
  const queryClient = useQueryClient();
  const { data: activities, isLoading } = useQuery({
    queryKey: ['admin-activities'],
    queryFn: async () => {
      const res = await fetch('/api/activities');
      return res.json();
    }
  });

  const createActivityMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "New Activity",
          description: "Enter description here...",
          category: "Tours",
          packages: []
        })
      });
      if (!res.ok) throw new Error("Failed to create activity");
      return res.json();
    },
    onSuccess: (newActivity) => {
      queryClient.invalidateQueries({ queryKey: ['admin-activities'] });
      setSelectedActivity(newActivity);
    }
  });

  if (isLoading) return <div className="text-text-muted">Loading activities...</div>;

  if (selectedActivity) {
    return <ActivityDetailView activity={selectedActivity} onBack={() => setSelectedActivity(null)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-text-muted">Select an activity to manage its details and pricing packages.</p>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={() => createActivityMutation.mutate()}
          disabled={createActivityMutation.isPending}
        >
          <Plus className="w-4 h-4 mr-2" /> {createActivityMutation.isPending ? "Adding..." : "Add Activity"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activities?.map((activity: any) => (
          <div 
            key={activity.id} 
            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer group flex flex-col hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
            onClick={() => setSelectedActivity(activity)}
          >
            <div className="aspect-video w-full bg-border/50 relative overflow-hidden">
              {activity.coverImageUrl || imageMap[activity.slug] ? (
                <img src={activity.coverImageUrl || imageMap[activity.slug]} alt={activity.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-text-muted transition-transform duration-500 group-hover:scale-125 group-hover:text-primary" />
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                <span className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg flex items-center gap-2">
                  <Settings2 className="w-4 h-4" /> Manage
                </span>
              </div>

              <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-md text-xs font-semibold text-white shadow-sm z-10 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-colors">
                {activity.packages?.length || 0} Packages
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between relative bg-surface z-10">
              <div>
                <h3 className="font-bold text-lg text-white mb-2 group-hover:text-primary transition-colors">{activity.name}</h3>
                <p className="text-sm text-text-muted line-clamp-2">{activity.description || 'No description'}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-sm">
                <span className={activity.isActive ? "text-success" : "text-text-muted"}>
                  {activity.isActive ? 'Active' : 'Inactive'}
                </span>
                <Settings2 className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityDetailView({ activity, onBack }: { activity: any, onBack: () => void }) {
  const queryClient = useQueryClient();
  const [packages, setPackages] = useState<any[]>(activity.packages || []);

  const [details, setDetails] = useState({
    name: activity.name || '',
    description: activity.description || '',
    category: activity.category || '',
    coverImageUrl: activity.coverImageUrl || '',
    images: activity.images || []
  });
  const [detailsDirty, setDetailsDirty] = useState(false);

  const updateDetailsMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await fetch(`/api/activities/${activity.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      setDetailsDirty(false);
    }
  });

  const deleteActivityMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/activities/${activity.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error("Failed to delete activity");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      onBack();
    }
  });

  const handleDetailChange = (field: string, value: any) => {
    setDetails(prev => ({ ...prev, [field]: value }));
    setDetailsDirty(true);
  };

  const saveDetails = () => {
    updateDetailsMutation.mutate(details);
  };

  const mutation = useMutation({
    mutationFn: async (pkgData: any) => {
      const res = await fetch(`/api/activities/packages/${pkgData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pkgData)
      });
      if (!res.ok) throw new Error("Failed to save");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-activities'] });
      queryClient.invalidateQueries({ queryKey: ['activities'] });
      // In a real app we might show a toast here
    }
  });

  const createPackageMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/activities/${activity.id}/packages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "New Package",
          price: "0",
          description: "Package description"
        })
      });
      if (!res.ok) throw new Error("Failed to create package");
      return res.json();
    },
    onSuccess: (newPkg) => {
      queryClient.invalidateQueries({ queryKey: ['admin-activities'] });
      setPackages([...packages, newPkg]);
    }
  });

  const updatePackageLocal = (pkgId: string, field: string, value: any) => {
    setPackages(packages.map(p => p.id === pkgId ? { ...p, [field]: value, _isDirty: true } : p));
  };

  const savePackage = (pkg: any) => {
    mutation.mutate(pkg);
    setPackages(packages.map(p => p.id === pkg.id ? { ...p, _isDirty: false } : p));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack} className="bg-surface border-border text-white hover:bg-white/5">
            ← Back
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-white">{details.name || activity.name}</h2>
            <p className="text-text-muted">{details.category || activity.category || 'Uncategorized'}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          onClick={() => {
            if (confirm('Are you sure you want to delete this activity?')) {
              deleteActivityMutation.mutate();
            }
          }}
          disabled={deleteActivityMutation.isPending}
          className="text-danger hover:bg-danger/10 hover:text-danger border-danger/30"
        >
          <Trash2 className="w-4 h-4 mr-2" /> {deleteActivityMutation.isPending ? "Deleting..." : "Delete Activity"}
        </Button>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Activity Details & Images</h3>
          <Button 
            size="sm" 
            onClick={saveDetails}
            disabled={!detailsDirty || updateDetailsMutation.isPending}
            className="bg-success/20 text-success hover:bg-success/30 border border-success/30"
          >
            {updateDetailsMutation.isPending ? "Saving..." : "Save Details"}
          </Button>
        </div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-text-muted block mb-1">Name</span>
              <Input value={details.name} onChange={(e) => handleDetailChange('name', e.target.value)} className="bg-bg border-border text-white" />
            </div>
            <div>
              <span className="text-xs text-text-muted block mb-1">Category</span>
              <Input value={details.category} onChange={(e) => handleDetailChange('category', e.target.value)} className="bg-bg border-border text-white" />
            </div>
            <div className="md:col-span-2">
              <span className="text-xs text-text-muted block mb-1">Description</span>
              <Input value={details.description} onChange={(e) => handleDetailChange('description', e.target.value)} className="bg-bg border-border text-white" />
            </div>
            <div className="md:col-span-2">
              <span className="text-xs text-text-muted block mb-1">Cover Image URL</span>
              <Input value={details.coverImageUrl} onChange={(e) => handleDetailChange('coverImageUrl', e.target.value)} placeholder="/assets/generated_images/example.jpg" className="bg-bg border-border text-white" />
            </div>
            <div className="md:col-span-2">
              <span className="text-xs text-text-muted block mb-1">Gallery Image URLs (comma separated)</span>
              <Input 
                value={details.images.join(', ')} 
                onChange={(e) => handleDetailChange('images', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} 
                placeholder="/assets/generated_images/1.jpg, /assets/generated_images/2.jpg" 
                className="bg-bg border-border text-white" 
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Pricing Packages</h3>
          <Button 
            size="sm" 
            className="bg-white/10 hover:bg-white/20 text-white border border-white/10"
            onClick={() => createPackageMutation.mutate()}
            disabled={createPackageMutation.isPending}
          >
            <Plus className="w-4 h-4 mr-2" /> {createPackageMutation.isPending ? "Adding..." : "Add Package"}
          </Button>
        </div>

        <div className="space-y-4">
          {packages.map(pkg => (
            <div key={pkg.id} className="bg-bg border border-border rounded-lg p-4 flex flex-col lg:flex-row gap-6 items-start lg:items-center">
              <div className="flex-1">
                <Input 
                  value={pkg.name} 
                  onChange={(e) => updatePackageLocal(pkg.id, 'name', e.target.value)}
                  className="bg-transparent border-none text-lg font-semibold text-white px-0 focus-visible:ring-0 h-auto pb-1 mb-1" 
                />
                <Input 
                  value={pkg.description || ''} 
                  onChange={(e) => updatePackageLocal(pkg.id, 'description', e.target.value)}
                  placeholder="Package description"
                  className="bg-transparent border-none text-sm text-text-muted px-0 focus-visible:ring-0 h-auto" 
                />
              </div>
              
              <div className="flex items-center gap-4 w-full lg:w-auto">
                <div className="w-32">
                  <span className="text-xs text-text-muted block mb-1">Price (AED)</span>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">AED</span>
                    <Input 
                      type="number"
                      value={pkg.price}
                      onChange={(e) => updatePackageLocal(pkg.id, 'price', parseFloat(e.target.value) || 0)}
                      className="bg-surface border-border text-white pl-12 h-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2 self-end pb-0.5 mt-auto">
                  <Button 
                    disabled={!pkg._isDirty || mutation.isPending}
                    onClick={() => savePackage(pkg)}
                    className="bg-success/20 text-success hover:bg-success/30 border border-success/30 h-10"
                  >
                    Save
                  </Button>
                  <Button variant="ghost" className="h-10 text-danger hover:bg-danger/10 hover:text-danger">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {packages.length === 0 && (
            <div className="text-center py-8 text-text-muted border border-dashed border-border rounded-lg">
              No packages found for this activity.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
