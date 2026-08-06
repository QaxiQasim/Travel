import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity, Plus, Settings2, Trash2 } from 'lucide-react';

export default function ActivitiesModule() {
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  
  const { data: activities, isLoading } = useQuery({
    queryKey: ['admin-activities'],
    queryFn: async () => {
      const res = await fetch('/api/activities');
      return res.json();
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
        <Button className="bg-primary hover:bg-primary/90 text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Activity
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {activities?.map((activity: any) => (
          <div 
            key={activity.id} 
            className="bg-surface border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors cursor-pointer group flex flex-col"
            onClick={() => setSelectedActivity(activity)}
          >
            <div className="aspect-video w-full bg-border/50 relative overflow-hidden">
              {activity.coverImageUrl ? (
                <img src={activity.coverImageUrl} alt={activity.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-text-muted" />
                </div>
              )}
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-xs font-medium text-white">
                {activity.packages?.length || 0} Pkg
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-primary transition-colors">{activity.name}</h3>
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
      // In a real app we might show a toast here
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
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="bg-surface border-border text-white hover:bg-white/5">
          ← Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">{activity.name}</h2>
          <p className="text-text-muted">{activity.category || 'Uncategorized'}</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Pricing Packages</h3>
          <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border border-white/10">
            <Plus className="w-4 h-4 mr-2" /> Add Package
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
