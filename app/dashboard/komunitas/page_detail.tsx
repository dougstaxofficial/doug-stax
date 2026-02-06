'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

// Example for community detail page
// File path: app/komunitas/[id]/page.tsx

export default function KomunitasDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const router = useRouter()
  const [isJoined, setIsJoined] = useState(false)
  const [activeTab, setActiveTab] = useState<'about' | 'activities' | 'members'>('about')

  // Mock data - in real app, fetch based on params.id
  const community = {
    id: 'bwc',
    name: 'BWC',
    fullName: 'Bandung Walking Community',
    description: 'Komunitas jalan santai dan eksplorasi kota Bandung yang didirikan sejak 2018. Kami mengajak semua kalangan untuk menikmati keindahan kota dengan cara yang sehat dan menyenangkan.',
    color: 'green',
    gradient: 'from-green-500 to-emerald-600',
    icon: '🚶',
    members: 2500,
    category: 'outdoor',
    founded: '2018',
    nextEvent: 'Minggu, 15 Februari 2026',
    location: 'Bandung, Jawa Barat',
    schedule: 'Setiap Minggu pagi, 06:00 - 09:00',
    activities: [
      { name: 'Jalan Pagi', description: 'Jalan santai di pagi hari', frequency: 'Setiap Minggu' },
      { name: 'City Walk', description: 'Eksplorasi sudut kota Bandung', frequency: '2x Sebulan' },
      { name: 'Heritage Tour', description: 'Wisata heritage dan sejarah', frequency: '1x Sebulan' },
      { name: 'Nature Walk', description: 'Jalan di alam terbuka', frequency: '1x Sebulan' }
    ],
    photos: [
      '/community/bwc-1.jpg',
      '/community/bwc-2.jpg',
      '/community/bwc-3.jpg',
      '/community/bwc-4.jpg'
    ],
    benefits: [
      'Hidup lebih sehat dengan jalan rutin',
      'Kenalan baru dan pertemanan',
      'Eksplorasi kota gratis',
      'Event dan gathering rutin',
      'Merchandise eksklusif member',
      'Doorprize setiap event'
    ],
    socialMedia: {
      instagram: '@bwc.bandung',
      whatsapp: '+62812345678',
      telegram: 't.me/bwcbandung'
    }
  }

  const handleJoinCommunity = () => {
    if (!user) {
      alert('Silakan login terlebih dahulu')
      router.push('/login')
      return
    }
    
    // In real app, send API request to join community
    setIsJoined(true)
    alert(`🎉 Selamat! Kamu berhasil bergabung dengan ${community.name}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 relative overflow-hidden">
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
      `}</style>

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-xl ring-4 ring-green-500/20 bg-white p-2">
                <Image 
                  src="/logo.png" 
                  alt="DougStax Hub Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {community.name}
                </h1>
                <p className="text-xs font-semibold text-gray-600">{community.fullName}</p>
              </div>
            </div>
            <Link 
              href="/komunitas"
              className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Banner */}
        <div className={`glass-effect rounded-3xl p-10 border border-green-200 mb-8 relative overflow-hidden`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${community.gradient} opacity-10`}></div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="text-9xl transform hover:scale-110 transition-transform">
                {community.icon}
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                  {community.name}
                </h2>
                <p className="text-xl font-bold text-gray-600 mb-2">
                  {community.fullName}
                </p>
                <div className="flex items-center space-x-4 text-sm font-bold text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    {community.members.toLocaleString('id-ID')} Anggota
                  </span>
                  <span>•</span>
                  <span>📍 {community.location}</span>
                  <span>•</span>
                  <span>📅 Sejak {community.founded}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3">
              {!isJoined ? (
                <button
                  onClick={handleJoinCommunity}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
                >
                  ➕ Gabung Komunitas
                </button>
              ) : (
                <div className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl text-center">
                  ✅ Sudah Bergabung
                </div>
              )}
              <button className="px-8 py-4 glass-effect border-2 border-green-500 text-green-700 font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                💬 Hubungi Admin
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 glass-effect rounded-2xl p-2 border border-white/30 inline-flex">
            <button
              onClick={() => setActiveTab('about')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'about'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              📖 Tentang
            </button>
            <button
              onClick={() => setActiveTab('activities')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'activities'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              🎯 Aktivitas
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'members'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              👥 Anggota
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Tab */}
            {activeTab === 'about' && (
              <>
                <div className="glass-effect rounded-3xl p-8 border border-green-200">
                  <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center">
                    <span className="text-3xl mr-3">📝</span>
                    Deskripsi Komunitas
                  </h3>
                  <p className="text-gray-700 font-semibold leading-relaxed">
                    {community.description}
                  </p>
                </div>

                <div className="glass-effect rounded-3xl p-8 border border-green-200">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">🎁</span>
                    Keuntungan Bergabung
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {community.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                        <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-bold text-gray-800">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-effect rounded-3xl p-8 border border-green-200">
                  <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                    <span className="text-3xl mr-3">📸</span>
                    Galeri Kegiatan
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square bg-gradient-to-br from-green-200 to-emerald-200 rounded-2xl flex items-center justify-center text-6xl">
                        📷
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <div className="glass-effect rounded-3xl p-8 border border-green-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">🎯</span>
                  Jadwal Aktivitas
                </h3>
                <div className="space-y-4">
                  {community.activities.map((activity, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-xl font-black text-gray-900">{activity.name}</h4>
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                          {activity.frequency}
                        </span>
                      </div>
                      <p className="text-gray-700 font-semibold">{activity.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
              <div className="glass-effect rounded-3xl p-8 border border-green-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <span className="text-3xl mr-3">👥</span>
                  Anggota Komunitas
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Array.from({ length: 9 }).map((_, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl text-white font-black">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <p className="font-bold text-gray-800 text-sm">Member {idx + 1}</p>
                      <p className="text-xs text-gray-600">Aktif</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                    Lihat Semua Anggota →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Next Event */}
            <div className="glass-effect rounded-3xl p-6 border border-green-200">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">📅</span>
                Event Mendatang
              </h3>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border-2 border-green-200 mb-4">
                <p className="font-bold text-gray-800 mb-1">{community.nextEvent}</p>
                <p className="text-sm text-gray-600 font-semibold">{community.schedule}</p>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
                Daftar Event
              </button>
            </div>

            {/* Social Media */}
            <div className="glass-effect rounded-3xl p-6 border border-green-200">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">💬</span>
                Ikuti Kami
              </h3>
              <div className="space-y-3">
                <a href="#" className="flex items-center p-3 bg-gradient-to-r from-pink-100 to-rose-100 rounded-xl hover:shadow-lg transition-all">
                  <span className="text-2xl mr-3">📷</span>
                  <div>
                    <p className="font-bold text-gray-800">Instagram</p>
                    <p className="text-xs text-gray-600">{community.socialMedia.instagram}</p>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl hover:shadow-lg transition-all">
                  <span className="text-2xl mr-3">💬</span>
                  <div>
                    <p className="font-bold text-gray-800">WhatsApp</p>
                    <p className="text-xs text-gray-600">{community.socialMedia.whatsapp}</p>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl hover:shadow-lg transition-all">
                  <span className="text-2xl mr-3">✈️</span>
                  <div>
                    <p className="font-bold text-gray-800">Telegram</p>
                    <p className="text-xs text-gray-600">{community.socialMedia.telegram}</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Stats */}
            <div className="glass-effect rounded-3xl p-6 border border-green-200">
              <h3 className="text-xl font-black text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">📊</span>
                Statistik
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Total Anggota</span>
                  <span className="text-xl font-black text-green-600">{community.members.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Event Bulan Ini</span>
                  <span className="text-xl font-black text-green-600">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Tahun Berdiri</span>
                  <span className="text-xl font-black text-green-600">{community.founded}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}