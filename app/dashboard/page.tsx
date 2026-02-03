'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type Registration = {
  id: string
  user_id: string
  nama_zin: string
  asal_kota: string
  nomor_wa_aktif: string
  booking_tiket_vip: number
  booking_tiket_reguler: number
  bukti_transfer_url: string | null
  payment_status: string
  created_at: string
}

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loadingData, setLoadingData] = useState(true)
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'paid'>('all')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  
  // Admin specific states
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [updating, setUpdating] = useState(false)

  // Check if user is admin
  const isAdmin = user?.user_metadata?.full_name?.toLowerCase() === 'admin' ||
                  user?.email?.includes('admin')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchRegistrations() {
      if (!user) return

      const supabase = createClient()
      
      // Admin bisa lihat semua registrasi, user biasa hanya punya mereka
      let query = supabase
        .from('event_registrations')
        .select('*')
        .order('created_at', { ascending: false })

      if (!isAdmin) {
        query = query.eq('user_id', user.id)  // ← Assign ulang query
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching registrations:', error)
      } else {
        setRegistrations(data || [])
      }
      setLoadingData(false)
    }

    fetchRegistrations()
  }, [user, isAdmin])

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  // Admin function to update payment status
  const handleUpdateStatus = async (registrationId: string, newStatus: 'pending' | 'paid') => {
    setUpdating(true)
    const supabase = createClient()
    
    const { error } = await supabase
      .from('event_registrations')
      .update({ payment_status: newStatus })
      .eq('id', registrationId)

    if (error) {
      console.error('Error updating status:', error)
      alert('Gagal mengupdate status!')
    } else {
      // Update local state
      setRegistrations(prev => 
        prev.map(reg => 
          reg.id === registrationId 
            ? { ...reg, payment_status: newStatus } 
            : reg
        )
      )
      setShowModal(false)
      alert('Status berhasil diupdate!')
    }
    
    setUpdating(false)
  }

  // Calculate statistics
  const totalVipTickets = registrations.reduce((sum, reg) => sum + reg.booking_tiket_vip, 0)
  const totalRegularTickets = registrations.reduce((sum, reg) => sum + reg.booking_tiket_reguler, 0)
  const totalTickets = totalVipTickets + totalRegularTickets
  const pendingRegistrations = registrations.filter(r => r.payment_status === 'pending').length
  const paidRegistrations = registrations.filter(r => r.payment_status === 'paid').length
  const totalRevenue = registrations.reduce((sum, reg) => 
    sum + (reg.booking_tiket_vip * 350000) + (reg.booking_tiket_reguler * 200000), 0
  )

  // Filter registrations based on selected tab
  const filteredRegistrations = registrations.filter(reg => {
    if (selectedTab === 'pending') return reg.payment_status === 'pending'
    if (selectedTab === 'paid') return reg.payment_status === 'paid'
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-white mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-white/20 mx-auto animate-pulse"></div>
          </div>
          <div className="text-2xl text-white font-bold tracking-wide animate-pulse">Loading Dashboard...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-display {
          font-family: 'Sora', sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
        
        .card-hover-effect:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .stat-card {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-violet-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-fuchsia-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header Navigation */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-xl ring-4 ring-purple-500/20 transition-transform hover:scale-110 hover:rotate-6 bg-white p-2">
                <Image 
                  src="/logo.png" 
                  alt="DougStax Hub Logo" 
                  width={64} 
                  height={64}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent leading-tight">
                  DougStax Hub
                </h1>
                <p className="text-xs text-gray-600 font-medium leading-tight mt-0.5">Sport Event Dashboard</p>
              </div>
            </div>
            
            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-purple-100 to-fuchsia-100 rounded-2xl border border-purple-200/50 shadow-md">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {user?.user_metadata?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-gray-900">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-purple-600 font-semibold">
                    {isAdmin ? '👑 Dashboard Admin' : '👤 Dashboard User'}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleSignOut}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 rounded-xl transition-all shadow-lg hover:shadow-xl hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent animate-gradient">
            {isAdmin ? 'Admin Panel 👑' : 'Welcome Back! 👋'}
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            Hi, <span className="font-bold text-purple-600">{user?.user_metadata?.full_name || 'Sport Lover'}</span>
          </p>
          <p className="text-gray-600 mt-2">
            {isAdmin ? 'Kelola semua pendaftaran event dari users' : 'Kelola event dan tiket Sport Anda dengan mudah'}
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Total Events Card */}
          <div 
            className="stat-card card-hover-effect bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-display font-black mb-1">{registrations.length}</div>
                  <div className="text-sm font-medium opacity-90">{isAdmin ? 'Total' : 'Events'}</div>
                </div>
              </div>
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs font-semibold mt-3 opacity-90">
                {isAdmin ? 'Total Registrasi Users' : 'Total Event Terdaftar'}
              </p>
            </div>
          </div>

          {/* Total Tickets Card */}
          <div 
            className="stat-card card-hover-effect bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-display font-black mb-1">{totalTickets}</div>
                  <div className="text-sm font-medium opacity-90">Tickets</div>
                </div>
              </div>
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-xs font-semibold mt-3 opacity-90">VIP: {totalVipTickets} • Regular: {totalRegularTickets}</p>
            </div>
          </div>

          {/* Pending Payments Card */}
          <div 
            className="stat-card card-hover-effect bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-display font-black mb-1">{pendingRegistrations}</div>
                  <div className="text-sm font-medium opacity-90">Pending</div>
                </div>
              </div>
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full animate-pulse" style={{ width: `${registrations.length > 0 ? (pendingRegistrations / registrations.length) * 100 : 0}%` }}></div>
              </div>
              <p className="text-xs font-semibold mt-3 opacity-90">Menunggu Konfirmasi</p>
            </div>
          </div>

          {/* Paid Payments Card */}
          <div 
            className="stat-card card-hover-effect bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 shadow-2xl text-white relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-display font-black mb-1">{paidRegistrations}</div>
                  <div className="text-sm font-medium opacity-90">Paid</div>
                </div>
              </div>
              <div className="h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white/70 rounded-full" style={{ width: `${registrations.length > 0 ? (paidRegistrations / registrations.length) * 100 : 0}%` }}></div>
              </div>
              <p className="text-xs font-semibold mt-3 opacity-90">Pembayaran Lunas</p>
            </div>
          </div>
        </div>

        {/* Revenue Card */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-10 shadow-2xl text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent shimmer-effect"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-lg font-semibold mb-2 opacity-90">Total Revenue</h3>
                <div className="text-5xl md:text-6xl font-display font-black mb-2">
                  Rp {totalRevenue.toLocaleString('id-ID')}
                </div>
                <p className="text-sm opacity-80">
                  {isAdmin ? 'Total pendapatan dari semua users' : 'Total pendapatan dari semua event'}
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl">
                  <div className="text-3xl font-bold">{paidRegistrations}</div>
                  <div className="text-xs opacity-80 mt-1">Lunas</div>
                </div>
                <div className="text-center px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl">
                  <div className="text-3xl font-bold">{pendingRegistrations}</div>
                  <div className="text-xs opacity-80 mt-1">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Button - Only for regular users */}
        {!isAdmin && (
          <div className="mb-10 flex justify-center">
            <Link
              href="/dashboard/register-event"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white text-lg font-bold rounded-2xl shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105"
            >
              <svg className="w-6 h-6 mr-3 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
              </svg>
              Daftar Event Baru
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        )}

        {/* Registration History */}
        <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden border border-white/30">
          <div className="px-8 py-6 bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 border-b border-purple-200/30">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-display font-bold text-gray-900 mb-2">
                  {isAdmin ? '🛡️ Kelola Registrasi' : '📋 Riwayat Pendaftaran'}
                </h3>
                <p className="text-sm text-gray-600 font-medium">
                  {isAdmin ? 'Verifikasi dan kelola pembayaran users' : 'Kelola semua pendaftaran event Anda'}
                </p>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex space-x-3 mt-6 md:mt-0">
                <button
                  onClick={() => setSelectedTab('all')}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedTab === 'all'
                      ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Semua ({registrations.length})
                </button>
                <button
                  onClick={() => setSelectedTab('pending')}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedTab === 'pending'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Pending ({pendingRegistrations})
                </button>
                <button
                  onClick={() => setSelectedTab('paid')}
                  className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                    selectedTab === 'paid'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  Lunas ({paidRegistrations})
                </button>
              </div>
            </div>
          </div>
          
          {/* Table Content */}
          <div className="p-8">
            {loadingData ? (
              <div className="text-center py-20">
                <div className="relative inline-block">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto mb-6"></div>
                  <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-200 animate-pulse"></div>
                </div>
                <p className="text-gray-600 font-semibold text-lg">Memuat data...</p>
              </div>
            ) : filteredRegistrations.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <svg className="w-12 h-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-3">
                  {selectedTab === 'all' 
                    ? 'Belum ada pendaftaran event' 
                    : selectedTab === 'pending'
                    ? 'Tidak ada pembayaran pending'
                    : 'Tidak ada pembayaran lunas'}
                </h4>
                <p className="text-gray-600 mb-8 text-lg">
                  {selectedTab === 'all' && !isAdmin && 'Mulai daftar event Zumba untuk melihat riwayat di sini'}
                </p>
                {selectedTab === 'all' && !isAdmin && (
                  <Link
                    href="/dashboard/register-event"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white text-lg rounded-2xl hover:from-purple-700 hover:to-fuchsia-700 transition-all font-bold shadow-xl hover:shadow-2xl hover:scale-105"
                  >
                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    Daftar Event Sekarang
                  </Link>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-50 to-fuchsia-50 border-b-2 border-purple-200">
                      <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">Nama ZIN</th>
                      <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">Kota</th>
                      <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">No. WA</th>
                      <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">Tiket VIP</th>
                      <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">Tiket Reguler</th>
                      <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">Total</th>
                      <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">Status</th>
                      {isAdmin && (
                        <th className="text-left text-xs font-bold text-purple-900 uppercase tracking-wider py-5 px-6">Aksi</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-100">
                    {filteredRegistrations.map((reg, index) => (
                      <tr 
                        key={reg.id} 
                        className="hover:bg-purple-50/50 transition-all group cursor-pointer"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="py-5 px-6">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center text-white font-bold mr-3 shadow-md group-hover:scale-110 transition-transform">
                              {reg.nama_zin.charAt(0)}
                            </div>
                            <div className="font-bold text-gray-900">{reg.nama_zin}</div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="text-sm font-medium text-gray-700">{reg.asal_kota}</div>
                        </td>
                        <td className="py-5 px-6">
                          <div className="text-sm font-medium text-gray-700">{reg.nomor_wa_aktif}</div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-700 shadow-sm">
                            {reg.booking_tiket_vip} tiket
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 shadow-sm">
                            {reg.booking_tiket_reguler} tiket
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="font-black text-gray-900 text-lg">
                            Rp {((reg.booking_tiket_vip * 350000) + (reg.booking_tiket_reguler * 200000)).toLocaleString('id-ID')}
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span
                            className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-bold shadow-md ${
                              reg.payment_status === 'pending'
                                ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800'
                                : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800'
                            }`}
                          >
                            {reg.payment_status === 'pending' ? (
                              <>
                                <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                Pending
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Lunas ✓
                              </>
                            )}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="py-5 px-6">
                            <button
                              onClick={() => {
                                setSelectedRegistration(reg)
                                setShowModal(true)
                              }}
                              className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg hover:scale-105"
                            >
                              Lihat Detail
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Admin Modal for Payment Details */}
      {isAdmin && showModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-effect rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-1">
                    Detail Pembayaran
                  </h3>
                  <p className="text-sm text-white/80">Verifikasi bukti transfer dan status</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* User Info */}
              <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-6 border border-purple-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Informasi Pendaftar
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Nama ZIN</p>
                    <p className="text-sm font-bold text-gray-900">{selectedRegistration.nama_zin}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Asal Kota</p>
                    <p className="text-sm font-bold text-gray-900">{selectedRegistration.asal_kota}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">No. WhatsApp</p>
                    <p className="text-sm font-bold text-gray-900">{selectedRegistration.nomor_wa_aktif}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-semibold mb-1">Tanggal Daftar</p>
                    <p className="text-sm font-bold text-gray-900">
                      {new Date(selectedRegistration.created_at).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Ticket Info */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Detail Tiket
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Tiket VIP</span>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-bold">
                      {selectedRegistration.booking_tiket_vip} × Rp 350.000
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 font-medium">Tiket Reguler</span>
                    <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold">
                      {selectedRegistration.booking_tiket_reguler} × Rp 200.000
                    </span>
                  </div>
                  <div className="border-t-2 border-blue-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                    <span className="text-2xl font-black text-gray-900">
                      Rp {((selectedRegistration.booking_tiket_vip * 350000) + (selectedRegistration.booking_tiket_reguler * 200000)).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Proof */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Bukti Transfer
                </h4>
                {selectedRegistration.bukti_transfer_url ? (
                  <div className="space-y-4">
                    <div className="w-full" style={{ maxHeight: '500px' }}>
                    <Image
                      src={selectedRegistration.bukti_transfer_url}
                      alt="Bukti Transfer"
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      style={{ maxHeight: '500px' }}
                    />
                    </div>
                    <a
                      href={selectedRegistration.bukti_transfer_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-all font-semibold text-sm"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Buka di Tab Baru
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-600 font-semibold">Belum ada bukti transfer</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Status Pembayaran</h4>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleUpdateStatus(selectedRegistration.id, 'pending')}
                    disabled={updating || selectedRegistration.payment_status === 'pending'}
                    className={`flex-1 px-6 py-4 rounded-xl font-bold text-sm transition-all shadow-md ${
                      selectedRegistration.payment_status === 'pending'
                        ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                        : 'bg-white text-amber-700 border-2 border-amber-300 hover:bg-amber-50 hover:scale-105'
                    } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {selectedRegistration.payment_status === 'pending' && '✓ '}
                    Tandai Pending
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedRegistration.id, 'paid')}
                    disabled={updating || selectedRegistration.payment_status === 'paid'}
                    className={`flex-1 px-6 py-4 rounded-xl font-bold text-sm transition-all shadow-md ${
                      selectedRegistration.payment_status === 'paid'
                        ? 'bg-emerald-500 text-white border-2 border-emerald-600'
                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 hover:scale-105'
                    } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {updating ? 'Updating...' : selectedRegistration.payment_status === 'paid' ? '✓ Sudah Lunas' : 'Tandai Lunas'}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 px-8 py-4 rounded-b-3xl border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="glass-effect border-t border-white/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              © 2026 DougStax Hub. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">Made with ❤️ for Sports Lovers</p>
          </div>
        </div>
      </footer>
    </div>
  )
}