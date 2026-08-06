import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import { Map, Car, BookOpen, Users, LogOut, Activity } from 'lucide-react'
import { createClient } from '@supabase/supabase-js'
import ActivitiesModule from '../../components/admin/ActivitiesModule'
import ChauffeurModule from '../../components/admin/ChauffeurModule'
import BookingsModule from '../../components/admin/BookingsModule'
import UsersModule from '../../components/admin/UsersModule'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://peqlupbkjtxlarbmhewm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_VOeStgAWq2bicW-Gzw5faQ_4fbYGRAe';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('activities')
  const [, setLocation] = useLocation()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setLocation('/admin/login')
      }
    }
    checkAuth()
  }, [setLocation])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('adminToken')
    setLocation('/admin/login')
  }

  const tabs = [
    { id: 'activities', label: 'Activities', icon: Activity },
    { id: 'chauffeur', label: 'Chauffeur Rates', icon: Car },
    { id: 'bookings', label: 'Bookings Feed', icon: BookOpen },
    { id: 'users', label: 'User Access', icon: Users },
  ]

  return (
    <div className="flex h-screen bg-bg text-text overflow-hidden">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-surface border-r border-border flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Map className="w-8 h-8 text-primary" />
          <h2 className="text-xl font-serif text-white font-semibold">Dubai Classic</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                  isActive 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'text-text-muted hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-20 bg-surface border-b border-border flex items-center px-8 flex-shrink-0 shadow-sm">
          <h1 className="text-2xl font-semibold text-white">
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
        </header>
        
        {/* Module View */}
        <main className="flex-1 overflow-y-auto p-8 bg-bg relative">
          {activeTab === 'activities' && <ActivitiesModule />}
          {activeTab === 'chauffeur' && <ChauffeurModule />}
          {activeTab === 'bookings' && <BookingsModule />}
          {activeTab === 'users' && <UsersModule />}
        </main>
      </div>
    </div>
  )
}
