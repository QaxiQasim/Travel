import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Shield, Plus, ShieldCheck, Mail } from 'lucide-react';

export default function UsersModule() {
  const queryClient = useQueryClient();
  const [isInviting, setIsInviting] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Editor');
  const [newPassword, setNewPassword] = useState('');
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await fetch('/api/admin/users');
      return res.json();
    }
  });

  const inviteMutation = useMutation({
    mutationFn: async (userData: any) => {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to invite user");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setIsInviting(false);
      setNewEmail('');
      setNewName('');
      setNewPassword('');
    },
    onError: (error: any) => {
      alert(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Failed to update user");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
    }
  });

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    inviteMutation.mutate({ email: newEmail, fullName: newName, role: newRole, password: newPassword });
  };

  if (isLoading) return <div className="text-text-muted">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">User Access</h2>
          <p className="text-text-muted text-sm">Manage who has access to the admin dashboard.</p>
        </div>
        {!isInviting && (
          <Button onClick={() => setIsInviting(true)} className="bg-primary hover:bg-primary/90 text-white">
            <Plus className="w-4 h-4 mr-2" /> Invite User
          </Button>
        )}
      </div>

      {isInviting && (
        <div className="bg-surface border border-border rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">Invite New User</h3>
            <Button variant="ghost" onClick={() => setIsInviting(false)} className="text-text-muted hover:text-white">Cancel</Button>
          </div>
          
          <form onSubmit={handleInvite} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs text-text-muted block">Full Name</label>
              <Input 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                required 
                className="bg-bg border-border text-white h-10"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-text-muted block">Email</label>
              <Input 
                type="email" 
                value={newEmail} 
                onChange={e => setNewEmail(e.target.value)} 
                required 
                className="bg-bg border-border text-white h-10"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-text-muted block">Password</label>
              <Input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                required 
                className="bg-bg border-border text-white h-10"
                placeholder="Required for login"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-text-muted block">Role</label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger className="bg-bg border-border text-white h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" disabled={inviteMutation.isPending} className="bg-primary hover:bg-primary/90 text-white h-10">
              {inviteMutation.isPending ? 'Sending...' : 'Send Invite'}
            </Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user: any) => (
          <div key={user.id} className="bg-surface border border-border rounded-xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                {user.fullName?.charAt(0) || 'U'}
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                user.isActive ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'
              }`}>
                {user.isActive ? 'Active' : 'Suspended'}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-1">{user.fullName}</h3>
            
            <div className="flex items-center gap-2 mt-4 text-sm">
              <Shield className="w-4 h-4 text-text-muted" />
              <Select 
                value={user.role} 
                onValueChange={(val) => updateMutation.mutate({ id: user.id, data: { role: val } })}
              >
                <SelectTrigger className="w-[120px] h-7 text-xs bg-transparent border-border text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                  <SelectItem value="Viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center">
              <Button 
                variant="ghost" 
                size="sm"
                className={user.isActive ? 'text-danger hover:text-danger hover:bg-danger/10' : 'text-success hover:text-success hover:bg-success/10'}
                onClick={() => updateMutation.mutate({ id: user.id, data: { isActive: !user.isActive } })}
              >
                {user.isActive ? 'Suspend User' : 'Restore User'}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
