import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Shield, Plus, Mail, Trash2, CheckCircle2, UserPlus } from 'lucide-react';

export default function UsersModule() {
  const queryClient = useQueryClient();
  const [isInviting, setIsInviting] = useState(true); // Open by default for immediate accessibility
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('Editor');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await fetch('/api/admin/users');
      return res.json();
    }
  });

  const inviteMutation = useMutation({
    mutationFn: async (userData: any) => {
      setErrorMsg('');
      setSuccessMsg('');
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to create user");
      }
      return res.json();
    },
    onSuccess: (createdUser) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setSuccessMsg(`User "${createdUser.fullName}" added successfully! They can now log in using ${createdUser.email}`);
      setNewEmail('');
      setNewName('');
      setNewPassword('');
    },
    onError: (error: any) => {
      setErrorMsg(error.message);
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

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error("Failed to delete user");
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

  if (isLoading) return <div className="text-text-muted">Loading user accounts...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-serif font-bold text-white mb-1">User Access</h2>
          <p className="text-text-muted text-sm">Manage dashboard user accounts, credentials, and access roles.</p>
        </div>
        {!isInviting && (
          <Button onClick={() => setIsInviting(true)} className="bg-primary hover:bg-primary/90 text-white">
            <UserPlus className="w-4 h-4 mr-2" /> Add New User
          </Button>
        )}
      </div>

      {successMsg && (
        <div className="bg-success/15 border border-success/30 text-success p-4 rounded-xl text-sm flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSuccessMsg('')} className="text-success hover:bg-success/20">
            Dismiss
          </Button>
        </div>
      )}

      {errorMsg && (
        <div className="bg-danger/15 border border-danger/30 text-danger p-4 rounded-xl text-sm flex items-center justify-between animate-in fade-in">
          <span>{errorMsg}</span>
          <Button variant="ghost" size="sm" onClick={() => setErrorMsg('')} className="text-danger hover:bg-danger/20">
            Dismiss
          </Button>
        </div>
      )}

      {isInviting && (
        <div className="bg-surface border border-border rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4 shadow-xl">
          <div className="flex justify-between items-center mb-4 border-b border-border/50 pb-3">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" /> Add New User
            </h3>
            <Button variant="ghost" size="sm" onClick={() => setIsInviting(false)} className="text-text-muted hover:text-white">
              Hide Form
            </Button>
          </div>
          
          <form onSubmit={handleInvite} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-muted block">Full Name</label>
              <Input 
                value={newName} 
                onChange={e => setNewName(e.target.value)} 
                required 
                className="bg-bg border-border text-white h-10"
                placeholder="e.g. Qasim Mushtaq"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-muted block">Email Address</label>
              <Input 
                type="email" 
                value={newEmail} 
                onChange={e => setNewEmail(e.target.value)} 
                required 
                className="bg-bg border-border text-white h-10"
                placeholder="email@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-muted block">Login Password</label>
              <Input 
                type="password" 
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)} 
                required 
                className="bg-bg border-border text-white h-10"
                placeholder="Set password for login"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-text-muted block">Role</label>
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
            <Button type="submit" disabled={inviteMutation.isPending} className="bg-primary hover:bg-primary/90 text-white h-10 font-medium">
              {inviteMutation.isPending ? 'Adding User...' : 'Add User'}
            </Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users?.map((user: any) => (
          <div key={user.id} className="bg-surface border border-border rounded-xl p-6 flex flex-col hover:border-primary/40 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                {user.fullName?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                user.isActive ? 'bg-success/20 text-success border border-success/30' : 'bg-danger/20 text-danger border border-danger/30'
              }`}>
                {user.isActive ? 'Active' : 'Suspended'}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-0.5">{user.fullName}</h3>
            <p className="text-xs text-text-muted flex items-center gap-1.5 mb-4">
              <Mail className="w-3.5 h-3.5 text-primary/70" /> {user.email}
            </p>
            
            <div className="flex items-center gap-2 text-sm bg-bg/50 p-2.5 rounded-lg border border-border/50">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs text-text-muted">Access Role:</span>
              <Select 
                value={user.role || 'Editor'} 
                onValueChange={(val) => updateMutation.mutate({ id: user.id, data: { role: val } })}
              >
                <SelectTrigger className="w-[110px] h-7 text-xs bg-surface border-border text-white ml-auto">
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

              <Button
                variant="ghost"
                size="sm"
                className="text-text-muted hover:text-danger hover:bg-danger/10"
                onClick={() => {
                  if (confirm(`Are you sure you want to remove user "${user.fullName}"?`)) {
                    deleteMutation.mutate(user.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
