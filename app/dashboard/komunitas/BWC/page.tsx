'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type MenuType = 'home' | 'daftar' | 'jadwal' | 'event' | 'bayar'

export default function BWCPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState<MenuType>('home')
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    nomorWa: '',
    alamat: '',
    jenisKelamin: '',
    usia: '',
    motivasi: ''
  })
  const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const menuItems = [
    { id: 'daftar', name: 'Daftar BWC', icon: '📝', color: 'from-green-500 to-emerald-600', description: 'Daftar jadi member BWC' },
    { id: 'jadwal', name: 'Jadwal BWC', icon: '📅', color: 'from-blue-500 to-cyan-600', description: 'Lihat jadwal kegiatan' },
    { id: 'event', name: 'Event BWC', icon: '🎉', color: 'from-purple-500 to-violet-600', description: 'Event spesial BWC' },
    { id: 'bayar', name: 'Bayar Member', icon: '💳', color: 'from-yellow-500 to-amber-600', description: 'Pembayaran iuran member' }
  ]

  const jadwalKegiatan = [
    {
      hari: 'Minggu',
      waktu: '06:00 - 09:00',
      kegiatan: 'Jalan Pagi Rutin',
      lokasi: 'Dago, Bandung',
      jarak: '5-7 km',
      status: 'Rutin'
    },
    {
      hari: 'Minggu',
      waktu: '07:00 - 10:00',
      kegiatan: 'City Walk Heritage',
      lokasi: 'Braga, Bandung',
      jarak: '3-5 km',
      status: 'Bulanan'
    },
    {
      hari: 'Sabtu',
      waktu: '06:00 - 09:00',
      kegiatan: 'Nature Walk',
      lokasi: 'Tahura, Bandung',
      jarak: '8-10 km',
      status: 'Bulanan'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      nama: 'BWC Anniversary 2026',
      tanggal: '15 Maret 2026',
      waktu: '06:00 WIB',
      lokasi: 'GOR Saparua, Bandung',
      kuota: 500,
      terdaftar: 387,
      harga: 150000,
      kategori: 'Special Event',
      benefit: ['Jersey Eksklusif', 'Medali', 'Sertifikat', 'Goodie Bag', 'Makan Siang']
    },
    {
      id: 2,
      nama: 'Heritage Walk Braga',
      tanggal: '22 Februari 2026',
      waktu: '07:00 WIB',
      lokasi: 'Braga, Bandung',
      kuota: 100,
      terdaftar: 78,
      harga: 50000,
      kategori: 'Monthly Event',
      benefit: ['T-Shirt', 'Snack', 'Tour Guide', 'Sertifikat']
    },
    {
      id: 3,
      nama: 'Mountain Trek Tangkuban Perahu',
      tanggal: '8 Maret 2026',
      waktu: '05:00 WIB',
      lokasi: 'Tangkuban Perahu',
      kuota: 50,
      terdaftar: 42,
      harga: 200000,
      kategori: 'Adventure',
      benefit: ['Jersey', 'Transportasi', 'Makan', 'Guide', 'Dokumentasi']
    }
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBuktiPembayaran(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleDaftarSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('✅ Pendaftaran berhasil! Tim kami akan menghubungi Anda segera.')
    setActiveMenu('home')
  }

  const handlePembayaranSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('✅ Pembayaran berhasil dikirim! Menunggu verifikasi.')
    setActiveMenu('home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      {/* Animated CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .pulse-ring {
          animation: pulse-ring 1.5s ease-out infinite;
        }
      `}</style>

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-lime-400 to-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-xl ring-4 ring-green-500/20 bg-white p-2">
                <Image 
                  src="/logo3.png" 
                  alt="BWC Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  BWC - Bandung Walking Community
                </h1>
                <p className="text-xs font-semibold text-gray-600">Jalan Sehat, Hidup Lebih Baik 🚶‍♂️</p>
              </div>
            </div>
            <Link 
              href="/dashboard/komunitas"
              className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Home / Menu Selection */}
        {activeMenu === 'home' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="text-8xl mb-4 animate-float">🚶</div>
              <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                Selamat Datang di BWC
              </h2>
              <p className="text-gray-700 text-xl font-semibold mb-2">
                Komunitas Jalan Santai Terbesar di Bandung
              </p>
              <p className="text-gray-500 text-sm">
                2,500+ Member Aktif • Sejak 2018 • Kegiatan Rutin Setiap Minggu
              </p>
            </div>

            {/* Main Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {menuItems.map((menu, index) => (
                <div
                  key={menu.id}
                  onClick={() => setActiveMenu(menu.id as MenuType)}
                  className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${menu.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  </div>

                  <div className="relative p-8 text-center">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform">
                      {menu.icon}
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-2">
                      {menu.name}
                    </h3>
                    
                    <p className="text-white/90 text-sm font-semibold mb-6">
                      {menu.description}
                    </p>

                    <div className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl group-hover:scale-105 transition-all shadow-lg">
                      Buka Menu →
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Info Section */}
            <div className="glass-effect rounded-3xl p-10 border border-green-200">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-black text-gray-900 mb-2">Tentang BWC</h3>
                <p className="text-gray-600 font-semibold">Bandung Walking Community</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <h4 className="font-black text-gray-900 mb-2">Visi</h4>
                  <p className="text-sm text-gray-700 font-semibold">Menjadikan jalan kaki sebagai gaya hidup sehat masyarakat Bandung</p>
                </div>
                
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-2">💪</div>
                  <h4 className="font-black text-gray-900 mb-2">Misi</h4>
                  <p className="text-sm text-gray-700 font-semibold">Mengadakan kegiatan jalan sehat rutin dan edukatif untuk semua kalangan</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-100 to-violet-100 p-6 rounded-2xl text-center">
                  <div className="text-4xl mb-2">🤝</div>
                  <h4 className="font-black text-gray-900 mb-2">Komunitas</h4>
                  <p className="text-sm text-gray-700 font-semibold">Membangun kebersamaan dan pertemanan melalui aktivitas jalan kaki</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Daftar BWC */}
        {activeMenu === 'daftar' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Daftar Jadi Member BWC
              </h2>
              <p className="text-gray-600 font-semibold">Isi form di bawah untuk bergabung dengan BWC</p>
            </div>

            <form onSubmit={handleDaftarSubmit} className="space-y-6">
              <div className="glass-effect rounded-3xl p-8 border border-green-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Data Pribadi
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                      placeholder="Nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      No. WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.nomorWa}
                      onChange={(e) => setFormData({...formData, nomorWa: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                      placeholder="08123456789"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Usia <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.usia}
                      onChange={(e) => setFormData({...formData, usia: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                      placeholder="25"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Jenis Kelamin <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.jenisKelamin}
                      onChange={(e) => setFormData({...formData, jenisKelamin: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                    >
                      <option value="">Pilih</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Alamat <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.alamat}
                      onChange={(e) => setFormData({...formData, alamat: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                      placeholder="Alamat lengkap"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Motivasi Bergabung <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      value={formData.motivasi}
                      onChange={(e) => setFormData({...formData, motivasi: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                      placeholder="Ceritakan motivasi Anda bergabung dengan BWC"
                      rows={4}
                    />
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-3xl p-8 border border-green-200">
                <h3 className="text-2xl font-black text-gray-900 mb-4">💰 Biaya Pendaftaran</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">Biaya Admin Pendaftaran:</span>
                    <span className="text-3xl font-black text-green-600">Rp 50.000</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 font-semibold space-y-1">
                  <p>✅ Jersey BWC Official</p>
                  <p>✅ Member Card</p>
                  <p>✅ Goodie Bag Welcome Kit</p>
                  <p>✅ Akses ke semua kegiatan rutin</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveMenu('home')}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  ✅ Daftar Sekarang
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Jadwal BWC */}
        {activeMenu === 'jadwal' && (
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">📅</div>
              <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Jadwal Kegiatan BWC
              </h2>
              <p className="text-gray-600 font-semibold">Kegiatan rutin dan bulanan BWC</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {jadwalKegiatan.map((jadwal, idx) => (
                <div key={idx} className="glass-effect rounded-3xl p-6 border border-blue-200 hover:shadow-xl transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-black ${
                      jadwal.status === 'Rutin' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-blue-500 text-white'
                    }`}>
                      {jadwal.status}
                    </span>
                    <span className="text-3xl">🚶</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 mb-3">{jadwal.kegiatan}</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">{jadwal.hari}, {jadwal.waktu}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">{jadwal.lokasi}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-700">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">Jarak: {jadwal.jarak}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                    Ikut Kegiatan
                  </button>
                </div>
              ))}
            </div>

            <div className="glass-effect rounded-3xl p-8 border border-blue-200 text-center">
              <h3 className="text-2xl font-black text-gray-900 mb-4">📢 Informasi Penting</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <p className="font-bold text-gray-800">⏰ Kumpul 15 menit sebelum waktu mulai</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <p className="font-bold text-gray-800">👕 Wajib menggunakan jersey BWC</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <p className="font-bold text-gray-800">💧 Bawa air minum sendiri</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <p className="font-bold text-gray-800">📱 Join grup WhatsApp untuk update</p>
                </div>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setActiveMenu('home')}
                className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                ← Kembali ke Menu
              </button>
            </div>
          </div>
        )}

        {/* Event BWC */}
        {activeMenu === 'event' && (
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Event Spesial BWC
              </h2>
              <p className="text-gray-600 font-semibold">Event mendatang dan kesempatan spesial</p>
            </div>

            <div className="space-y-6 mb-8">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="glass-effect rounded-3xl overflow-hidden border border-purple-200 hover:shadow-xl transition-all">
                  <div className="bg-gradient-to-r from-purple-500 to-violet-500 p-4">
                    <div className="flex items-center justify-between">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-black text-white">
                        {event.kategori}
                      </span>
                      <span className="text-white font-black">
                        {event.terdaftar}/{event.kuota} peserta
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-3xl font-black text-gray-900 mb-4">{event.nama}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                          <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">Tanggal</p>
                            <p className="font-bold">{event.tanggal}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">Waktu</p>
                            <p className="font-bold">{event.waktu}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-700">
                          <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">Lokasi</p>
                            <p className="font-bold">{event.lokasi}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center text-gray-700">
                          <svg className="w-6 h-6 mr-3 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-sm text-gray-500">Biaya</p>
                            <p className="font-bold text-purple-600">Rp {event.harga.toLocaleString('id-ID')}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-4 mb-6">
                      <h4 className="font-black text-gray-900 mb-3">🎁 Yang Kamu Dapat:</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {event.benefit.map((item, idx) => (
                          <div key={idx} className="flex items-center text-sm">
                            <svg className="w-4 h-4 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold text-gray-800">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                        🎫 Daftar Event
                      </button>
                      <button className="px-6 py-4 glass-effect border-2 border-purple-500 text-purple-700 font-bold rounded-xl hover:shadow-xl transition-all">
                        Info Lengkap
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setActiveMenu('home')}
                className="px-8 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
              >
                ← Kembali ke Menu
              </button>
            </div>
          </div>
        )}

        {/* Bayar Member */}
        {activeMenu === 'bayar' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💳</div>
              <h2 className="text-4xl font-black mb-2 bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                Pembayaran Iuran Member
              </h2>
              <p className="text-gray-600 font-semibold">Bayar iuran member bulanan atau tahunan</p>
            </div>

            <form onSubmit={handlePembayaranSubmit} className="space-y-6">
              <div className="glass-effect rounded-3xl p-8 border border-yellow-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6">💰 Pilih Paket Iuran</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-6 rounded-2xl border-4 border-yellow-400 cursor-pointer hover:scale-105 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-2xl font-black text-gray-900">Bulanan</h4>
                        <p className="text-sm text-gray-600 font-semibold">Iuran per bulan</p>
                      </div>
                      <input type="radio" name="paket" value="bulanan" className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-black text-yellow-600 mb-2">Rp 25.000</div>
                    <p className="text-sm font-bold text-gray-700">Per bulan</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-6 rounded-2xl border-4 border-yellow-400 cursor-pointer hover:scale-105 transition-all relative">
                    <div className="absolute -top-3 -right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-black">
                      HEMAT 20%
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-2xl font-black text-gray-900">Tahunan</h4>
                        <p className="text-sm text-gray-600 font-semibold">Iuran per tahun</p>
                      </div>
                      <input type="radio" name="paket" value="tahunan" className="w-6 h-6" />
                    </div>
                    <div className="text-4xl font-black text-yellow-600 mb-2">Rp 240.000</div>
                    <p className="text-sm font-bold text-gray-700">
                      <span className="line-through text-gray-500">Rp 300.000</span> Per tahun
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <h4 className="font-black text-gray-900 mb-3">✨ Benefit Member Aktif:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-gray-800">Ikut semua kegiatan rutin</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-gray-800">Diskon event spesial</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-gray-800">Merchandise eksklusif</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-gray-800">Doorprize setiap event</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-effect rounded-3xl p-8 border border-yellow-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Informasi Transfer
                </h3>

                <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-2xl p-6 border-2 border-yellow-200 mb-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Transfer ke:</div>
                    <div className="text-lg font-black text-gray-900 mb-1">Bank BCA</div>
                    <div className="text-3xl font-black text-yellow-600 mb-2">1234567890</div>
                    <div className="text-xl font-black text-gray-900">BWC Official</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Upload Bukti Transfer <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-yellow-500 focus:outline-none font-semibold"
                  />
                  {previewUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden border-2 border-yellow-200">
                      <img src={previewUrl} alt="Preview" className="w-full h-64 object-contain bg-gray-50" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setActiveMenu('home')}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  className="flex-1 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  💳 Kirim Pembayaran
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-effect border-t border-white/30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 font-semibold">
              © 2026 BWC - Bandung Walking Community. Jalan Sehat, Hidup Lebih Baik! 🚶‍♂️💚
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}