'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Image from 'next/image'

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
  user_id: string
  users: {
    email: string
    user_metadata: {
      full_name: string
    }
  }
}

type AdminData = {
  id: string
  username: string
  full_name: string
}

export default function AdminDashboardPage() {
  const router = useRouter()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(true)
  const [adminData, setAdminData] = useState<AdminData | null>(null)
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'paid'>('pending')
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [processingId, setProcessingId] = useState<string | null>(null)

  useEffect(() => {
    // Cek admin token
    const token = localStorage.getItem('adminToken')
    const admin = localStorage.getItem('adminData')

    if (!token || !admin) {
      router.push('/admin/login')
      return
    }

    setAdminData(JSON.parse(admin) as AdminData)
    fetchRegistrations()
  }, [router])

  const fetchRegistrations = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('event_registrations')
        .select(`
          *,
          users:user_id (
            email,
            user_metadata
          )
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setRegistrations(data || [])
    } catch (error) {
      console.error('Error fetching registrations:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'paid') => {
    setProcessingId(id)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('event_registrations')
        .update({ payment_status: newStatus })
        .eq('id', id)

      if (error) throw error

      // Update local state
      setRegistrations(registrations.map(reg => 
        reg.id === id ? { ...reg, payment_status: newStatus } : reg
      ))

      alert(`Status berhasil diubah menjadi ${newStatus === 'paid' ? 'LUNAS' : 'PENDING'}`)
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Gagal mengubah status')
    } finally {
      setProcessingId(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    router.push('/admin/login')
  }

  const filteredRegistrations = registrations.filter(reg => {
    if (selectedTab === 'pending') return reg.payment_status === 'pending'
    if (selectedTab === 'paid') return reg.payment_status === 'paid'
    return true
  })

  const stats = {
    total: registrations.length,
    pending: registrations.filter(r => r.payment_status === 'pending').length,
    paid: registrations.filter(r => r.payment_status === 'paid').length,
    totalRevenue: registrations
      .filter(r => r.payment_status === 'paid')
      .reduce((sum, r) => sum + (r.booking_tiket_vip * 350000) + (r.booking_tiket_reguler * 200000), 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-900 font-semibold">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">🔐</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
                <p className="text-xs text-gray-500">Doug Stax Management</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 bg-purple-50 px-4 py-2 rounded-lg">
                <span className="text-2xl">👨‍💼</span>
                <span className="text-sm font-medium text-gray-700">
                  {adminData?.full_name || adminData?.username}
                </span>
              </div>
              
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <span className="text-3xl font-bold text-blue-600">{stats.total}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Total Registrasi</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-yellow-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏳</span>
              </div>
              <span className="text-3xl font-bold text-yellow-600">{stats.pending}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Menunggu Approval</h3>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <span className="text-3xl font-bold text-green-600">{stats.paid}</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium">Sudah Lunas</h3>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
            <h3 className="text-purple-100 text-sm font-medium mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold">Rp {stats.totalRevenue.toLocaleString('id-ID')}</p>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-purple-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Kelola Registrasi</h3>
            
            {/* Filter Tabs */}
            <div className="flex space-x-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setSelectedTab('pending')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'pending'
                    ? 'bg-white text-yellow-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setSelectedTab('paid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'paid'
                    ? 'bg-white text-green-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Lunas ({stats.paid})
              </button>
              <button
                onClick={() => setSelectedTab('all')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedTab === 'all'
                    ? 'bg-white text-purple-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Semua ({stats.total})
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">User Info</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">Nama ZIN</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">Kota</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">No. WA</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">Tiket</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">Total Bayar</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">Bukti Transfer</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">Status</th>
                  <th className="text-left text-gray-700 font-semibold py-4 px-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-800">{reg.users?.user_metadata?.full_name || 'N/A'}</p>
                        <p className="text-sm text-gray-500">{reg.users?.email}</p>
                      </div>
                    </td>
                    <td className="text-gray-800 py-4 px-4 font-medium">{reg.nama_zin}</td>
                    <td className="text-gray-600 py-4 px-4">{reg.asal_kota}</td>
                    <td className="text-gray-600 py-4 px-4">{reg.nomor_wa_aktif}</td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <span className="block text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          VIP: {reg.booking_tiket_vip}
                        </span>
                        <span className="block text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Regular: {reg.booking_tiket_reguler}
                        </span>
                      </div>
                    </td>
                    <td className="text-gray-800 py-4 px-4 font-bold">
                      Rp {((reg.booking_tiket_vip * 350000) + (reg.booking_tiket_reguler * 200000)).toLocaleString('id-ID')}
                    </td>
                    <td className="py-4 px-4">
                      {reg.bukti_transfer_url ? (
                        <button
                          onClick={() => setSelectedImage(reg.bukti_transfer_url)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                        >
                          👁️ Lihat
                        </button>
                      ) : (
                        <span className="text-gray-400 text-sm">Tidak ada</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                          reg.payment_status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {reg.payment_status === 'pending' ? '⏳ Pending' : '✅ Lunas'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        {reg.payment_status === 'pending' ? (
                          <button
                            onClick={() => handleUpdateStatus(reg.id, 'paid')}
                            disabled={processingId === reg.id}
                            className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium disabled:opacity-50"
                          >
                            ✓ Approve
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUpdateStatus(reg.id, 'pending')}
                            disabled={processingId === reg.id}
                            className="px-3 py-1 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm font-medium disabled:opacity-50"
                          >
                            ↻ Pending
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRegistrations.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">Tidak ada data</p>
            </div>
          )}
        </div>
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl font-bold"
            >
              ✕ Tutup
            </button>
            <Image
              src={selectedImage}
              alt="Bukti Transfer"
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  )
}