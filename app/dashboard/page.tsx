'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

type Registration = {
  id: string
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

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    async function fetchRegistrations() {
      if (!user) return

      const supabase = createClient()
      const { data, error } = await supabase
        .from('event_registrations')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching registrations:', error)
      } else {
        setRegistrations(data || [])
      }
      setLoadingData(false)
    }

    fetchRegistrations()
  }, [user])

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  // Calculate statistics
  const totalVipTickets = registrations.reduce((sum, reg) => sum + reg.booking_tiket_vip, 0)
  const totalRegularTickets = registrations.reduce((sum, reg) => sum + reg.booking_tiket_reguler, 0)
  const totalTickets = totalVipTickets + totalRegularTickets
  const pendingRegistrations = registrations.filter(r => r.payment_status === 'pending').length
  const paidRegistrations = registrations.filter(r => r.payment_status === 'paid').length

  // Filter registrations based on selected tab
  const filteredRegistrations = registrations.filter(reg => {
    if (selectedTab === 'pending') return reg.payment_status === 'pending'
    if (selectedTab === 'paid') return reg.payment_status === 'paid'
    return true
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-900 font-semibold">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">DS</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Doug Stax
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.user_metadata?.full_name?.charAt(0) || 'U'}
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.user_metadata?.full_name || 'User'}
                </span>
              </div>
              
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 rounded-3xl p-8 md:p-12 text-white mb-8 shadow-2xl relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-3 animate-fade-in">
              Selamat Datang! 💃
            </h2>
            <p className="text-xl text-purple-100 mb-6">
              Halo, {user?.user_metadata?.full_name || 'Zumba Lover'}
            </p>
            <p className="text-purple-50 text-lg">
              Siap untuk event Zumba berikutnya? Mari kita dance! 🎵
            </p>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Events */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📅</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                {registrations.length}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Events</h3>
            <p className="text-gray-400 text-xs">Event terdaftar</p>
          </div>

          {/* Total Tickets */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">🎫</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
                {totalTickets}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Tiket</h3>
            <p className="text-gray-400 text-xs">VIP: {totalVipTickets} • Regular: {totalRegularTickets}</p>
          </div>

          {/* Pending Payments */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {pendingRegistrations}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Menunggu</h3>
            <p className="text-gray-400 text-xs">Pembayaran pending</p>
          </div>

          {/* Paid */}
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {paidRegistrations}
              </span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Lunas</h3>
            <p className="text-gray-400 text-xs">Pembayaran selesai</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/dashboard/register-event"
            className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 transform hover:-translate-y-2"
          >
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎫</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
              Daftar Event Baru
            </h3>
            <p className="text-gray-600">Daftar event Zumba terbaru dan dapatkan tiketmu!</p>
            <div className="mt-4 flex items-center text-purple-600 font-semibold">
              <span>Daftar Sekarang</span>
              <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
            </div>
          </Link>

          <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl shadow-lg text-white transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Total Investasi</h3>
            <p className="text-purple-100 mb-4">
              Rp {((totalVipTickets * 350000) + (totalRegularTickets * 200000)).toLocaleString('id-ID')}
            </p>
            <div className="text-sm bg-white/20 rounded-lg p-3 backdrop-blur-sm">
              <p className="text-purple-50">Nilai total dari semua tiket yang dibeli</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-purple-100 transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Komunitas ZIN</h3>
            <p className="text-gray-600 mb-4">Bergabung dengan komunitas Zumba Instructor</p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition">
              Join Community
            </button>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-purple-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Riwayat Pendaftaran</h3>
            
            {/* Filter Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'all'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Semua ({registrations.length})
              </button>
              <button
                onClick={() => setSelectedTab('pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'pending'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pending ({pendingRegistrations})
              </button>
              <button
                onClick={() => setSelectedTab('paid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'paid'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lunas ({paidRegistrations})
              </button>
            </div>
          </div>
          
          {loadingData ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Memuat data...</p>
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 text-lg mb-6">
                {selectedTab === 'all' 
                  ? 'Belum ada pendaftaran event' 
                  : selectedTab === 'pending'
                  ? 'Tidak ada pembayaran pending'
                  : 'Tidak ada pembayaran lunas'}
              </p>
              {selectedTab === 'all' && (
                <Link
                  href="/dashboard/register-event"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition font-semibold shadow-lg hover:shadow-xl"
                >
                  Daftar Event Sekarang
                </Link>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left text-gray-700 font-semibold py-4 px-4">Nama ZIN</th>
                    <th className="text-left text-gray-700 font-semibold py-4 px-4">Kota</th>
                    <th className="text-left text-gray-700 font-semibold py-4 px-4">No. WA</th>
                    <th className="text-left text-gray-700 font-semibold py-4 px-4">Tiket VIP</th>
                    <th className="text-left text-gray-700 font-semibold py-4 px-4">Tiket Reguler</th>
                    <th className="text-left text-gray-700 font-semibold py-4 px-4">Total</th>
                    <th className="text-left text-gray-700 font-semibold py-4 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((reg, index) => (
                    <tr 
                      key={reg.id} 
                      className="border-b border-gray-100 hover:bg-purple-50 transition-colors"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="text-gray-800 py-4 px-4 font-medium">{reg.nama_zin}</td>
                      <td className="text-gray-600 py-4 px-4">{reg.asal_kota}</td>
                      <td className="text-gray-600 py-4 px-4">{reg.nomor_wa_aktif}</td>
                      <td className="text-gray-800 py-4 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                          {reg.booking_tiket_vip} tiket
                        </span>
                      </td>
                      <td className="text-gray-800 py-4 px-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                          {reg.booking_tiket_reguler} tiket
                        </span>
                      </td>
                      <td className="text-gray-800 py-4 px-4 font-semibold">
                        Rp {((reg.booking_tiket_vip * 350000) + (reg.booking_tiket_reguler * 200000)).toLocaleString('id-ID')}
                      </td>
                      <td className="text-gray-700 py-4 px-4">
                        <span
                          className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold shadow-sm ${
                            reg.payment_status === 'pending'
                              ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white'
                              : 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
                          }`}
                        >
                          {reg.payment_status === 'pending' ? '⏳ Menunggu' : '✅ Lunas'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}