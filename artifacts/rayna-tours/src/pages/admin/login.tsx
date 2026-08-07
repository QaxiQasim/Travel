import React, { useState } from 'react'
import { useLocation } from 'wouter'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@supabase/supabase-js'
import { Map, Lock, User, Activity, Mail } from 'lucide-react'

// You should normally put these in your .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://peqlupbkjtxlarbmhewm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_VOeStgAWq2bicW-Gzw5faQ_4fbYGRAe';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [, setLocation] = useLocation()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Supabase Authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw new Error(error.message)
      }

      if (data.session) {
        localStorage.setItem('adminToken', data.session.access_token)
        setLocation('/admin/dashboard')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-bg text-text">
      {/* Left Pane - Branding / Hero */}
      <div className="hidden lg:flex w-1/2 bg-surface flex-col justify-center items-center p-12 border-r border-border relative overflow-hidden">
        {/* Subtle glow effect using primary color */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--color-primary)_0%,_transparent_70%)]" />
        
        <div className="z-10 text-center max-w-md">
          <img src="/logo.png" alt="DONNVAY" className="h-16 w-auto object-contain mx-auto mb-6" style={{ filter: 'brightness(0) invert(1)' }} />
          <p className="text-text-muted text-lg">
            Destination Management Control Panel. Sign in to manage activities, chauffeur matrices, and customer bookings seamlessly.
          </p>
        </div>
      </div>

      {/* Right Pane - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg">
        <div className="max-w-md w-full">
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-text-muted">Enter your credentials to access the admin dashboard.</p>
          </div>
          
          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger p-4 rounded-lg text-sm mb-6 flex items-start">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-text-muted">Email Address</Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-text-muted" />
                </div>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="pl-10 bg-surface border-border text-white placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-text-muted">Password</Label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-text-muted" />
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-surface border-border text-white focus:border-primary focus:ring-1 focus:ring-primary h-12"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium text-lg rounded-xl transition-all shadow-[0_4px_14px_0_rgba(14,124,134,0.39)]" 
              disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
