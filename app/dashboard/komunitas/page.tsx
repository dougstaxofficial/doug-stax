'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

type Community = {
  id: string
  name: string
  description: string
  color: string
  gradient: string
  icon: string
  members: number
  category: string
  activities: string[]
}

export default function KomunitasPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [hoveredCommunity, setHoveredCommunity] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const communities: Community[] = [
    {
      id: 'BWC',
      name: 'BWC',
      description: 'Bandung Walking Community - Komunitas jalan santai dan eksplorasi kota',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      icon: '🚶',
      members: 2500,
      category: 'outdoor',
      activities: ['Jalan Pagi', 'City Walk', 'Heritage Tour', 'Nature Walk'],
    },
    {
      id: 'pound',
      name: 'Pound Community',
      description: 'Workout dengan drumstick! Energi musik dan kebugaran dalam satu aktivitas',
      color: 'red',
      gradient: 'from-red-500 to-rose-600',
      icon: '🥁',
      members: 1800,
      category: 'fitness',
      activities: ['Pound Class', 'Cardio Drumming', 'Group Workout', 'Music Fitness']
    },
    {
      id: 'padel',
      name: 'Padel Genk',
      description: 'Komunitas pecinta Padel Tennis - Olahraga raket yang seru dan menantang',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      icon: '🎾',
      members: 950,
      category: 'sports',
      activities: ['Padel Match', 'Training Session', 'Tournament', 'Social Play']
    },
    {
      id: 'lari-santai',
      name: 'Komunitas Lari Santai',
      description: 'Lari santai bareng untuk kesehatan dan kebersamaan',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      icon: '🏃',
      members: 3200,
      category: 'running',
      activities: ['Morning Run', 'Fun Run', 'Trail Run', 'Social Running']
    },
    {
      id: 'run-dha',
      name: 'RUN DHA',
      description: 'Dago Heritage Area Running - Lari di jalur heritage Bandung',
      color: 'purple',
      gradient: 'from-purple-500 to-violet-600',
      icon: '👟',
      members: 1500,
      category: 'running',
      activities: ['Heritage Run', 'Hill Training', 'Speed Work', 'Long Run']
    },
    {
      id: 'nobar',
      name: 'NOBAR Bandung',
      description: 'Nonton Bareng - Komunitas pecinta film dan olahraga',
      color: 'pink',
      gradient: 'from-pink-500 to-fuchsia-600',
      icon: '🎬',
      members: 2100,
      category: 'entertainment',
      activities: ['Movie Night', 'Sports Viewing', 'Film Discussion', 'Theme Party']
    },
    {
      id: 'foto-bdg',
      name: 'Foto BDG Club',
      description: 'Komunitas fotografi Bandung - Abadikan momen indah kota kembang',
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-500',
      icon: '📸',
      members: 1600,
      category: 'creative',
      activities: ['Photo Walk', 'Workshop', 'Exhibition', 'Photo Hunt']
    },
    {
      id: 'gowes-ontel',
      name: 'Gowes Ontel',
      description: 'Komunitas sepeda onthel klasik - Nostalgia berkeliling kota',
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      icon: '🚲',
      members: 1200,
      category: 'cycling',
      activities: ['Sunday Ride', 'Heritage Tour', 'Vintage Meet', 'Slow Cycling']
    }
  ]

  const categories = [
    { id: 'all', name: 'Semua', icon: '🌟' },
    { id: 'running', name: 'Lari', icon: '🏃' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'sports', name: 'Olahraga', icon: '⚽' },
    { id: 'outdoor', name: 'Outdoor', icon: '🌲' },
    { id: 'creative', name: 'Kreatif', icon: '🎨' },
    { id: 'cycling', name: 'Sepeda', icon: '🚴' },
    { id: 'entertainment', name: 'Hiburan', icon: '🎉' }
  ]

  const filteredCommunities = selectedCategory === 'all' 
    ? communities 
    : communities.filter(c => c.category === selectedCategory)

  const handleCommunityClick = (community: Community) => {
    // Navigate to community detail page
    router.push(`/dashboard/komunitas/${community.id}`)
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
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-violet-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-xl ring-4 ring-purple-500/20 bg-white p-2">
                <Image 
                  src="/logo.png" 
                  alt="DougStax Hub Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Komunitas DougStax
                </h1>
                <p className="text-xs font-semibold text-gray-600">Temukan komunitasmu di sini! 🎉</p>
              </div>
            </div>
            <Link 
              href="/dashboard"
              className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
            Jelajahi Komunitas 🌈
          </h2>
          <p className="text-gray-700 text-xl font-semibold mb-2">
            Bergabung dengan komunitas yang sesuai dengan minat dan hobi kamu!
          </p>
          <p className="text-gray-500 text-sm">
            {communities.length} komunitas aktif • {communities.reduce((acc, c) => acc + c.members, 0).toLocaleString('id-ID')} total anggota
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white scale-105'
                    : 'glass-effect text-gray-700 hover:shadow-xl'
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredCommunities.map((community, index) => (
            <div
              key={community.id}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredCommunity(community.id)}
              onMouseLeave={() => setHoveredCommunity(null)}
              onClick={() => handleCommunityClick(community)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${community.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              
              {/* Decorative Circle */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              {/* Content */}
              <div className="relative p-6">
                {/* Icon with pulse effect */}
                <div className="relative mb-4">
                  <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform">
                    {community.icon}
                  </div>
                  {hoveredCommunity === community.id && (
                    <div className="absolute inset-0 bg-white/20 rounded-full pulse-ring"></div>
                  )}
                </div>
                
                {/* Community Name */}
                <h3 className="text-2xl font-black text-white mb-2 group-hover:scale-105 transition-transform">
                  {community.name}
                </h3>
                
                {/* Description */}
                <p className="text-white/90 text-sm font-semibold mb-4 line-clamp-2">
                  {community.description}
                </p>

                {/* Members Count */}
                <div className="flex items-center text-white/90 text-sm font-bold mb-4">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  {community.members.toLocaleString('id-ID')} Anggota
                </div>

                {/* Activities */}
                <div className="space-y-2 mb-6">
                  {community.activities.slice(0, 3).map((activity, idx) => (
                    <div key={idx} className="flex items-start text-white/90 text-xs">
                      <svg className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="font-semibold">{activity}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <button className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all transform group-hover:scale-105 shadow-lg">
                  Lihat Detail →
                </button>
              </div>

              {/* Hover Effect Border */}
              {hoveredCommunity === community.id && (
                <div className="absolute inset-0 border-4 border-white/30 rounded-3xl pointer-events-none"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCommunities.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-gray-600 mb-2">Komunitas Tidak Ditemukan</h3>
            <p className="text-gray-500">Coba pilih kategori lain atau lihat semua komunitas</p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              Lihat Semua Komunitas
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 glass-effect rounded-3xl p-10 border border-purple-200 text-center">
          <div className="text-6xl mb-4">🎊</div>
          <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Tidak Menemukan Komunitasmu?
          </h3>
          <p className="text-gray-700 font-semibold mb-6 max-w-2xl mx-auto">
            Buat komunitas baru dan ajak teman-temanmu untuk bergabung! Bersama kita lebih kuat dan lebih seru.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
            ➕ Buat Komunitas Baru
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-effect border-t border-white/30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600 font-semibold">
              © 2026 DougStax Hub. Bergabunglah dan temukan komunitas terbaikmu! 💖
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}