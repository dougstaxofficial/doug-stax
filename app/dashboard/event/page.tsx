'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function EventPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null)

  const handleSignOut = async () => {
    await signOut()
    router.push('/login')
  }

  const events = [
    {
      id: 1,
      name: 'Power Duo Zumba Bandung',
      date: '15 Maret 2026',
      location: 'GOR Saparua, Bandung',
      category: 'Zumba',
      gradient: 'from-pink-500 to-rose-600',
      icon: '💃',
      participants: '150+',
      price: 'Rp 185.000 - Rp 1.200.000',
      link: '/dashboard/event/pdzumbabandung'
    },
    {
      id: 2,
      name: 'Power Duo Zumba Bali',
      date: '22 Maret 2026',
      location: 'Bali Nusa Dua Convention Center',
      category: 'Zumba',
      gradient: 'from-purple-500 to-violet-600',
      icon: '🌺',
      participants: '200+',
      price: 'Rp 185.000 - Rp 1.200.000',
      link: '/dashboard/event/pdzumbabali'
    },
    {
      id: 3,
      name: 'Fun Run TSM',
      date: '5 April 2026',
      location: 'Trans Studio Mall Bandung',
      category: 'Running',
      gradient: 'from-blue-500 to-cyan-600',
      icon: '🏃‍♂️',
      participants: '300+',
      price: 'Rp 150.000'
    },
    {
      id: 4,
      name: 'Padel Fun Dago',
      date: '12 April 2026',
      location: 'Dago Sport Center',
      category: 'Padel',
      gradient: 'from-green-500 to-emerald-600',
      icon: '🎾',
      participants: '80+',
      price: 'Rp 200.000'
    },
    {
      id: 5,
      name: 'Pound Fit BEC',
      date: '20 April 2026',
      location: 'Bandung Exhibition Center',
      category: 'Fitness',
      gradient: 'from-orange-500 to-amber-600',
      icon: '🥁',
      participants: '120+',
      price: 'Rp 250.000'
    },
    {
      id: 6,
      name: 'Softex Tennis',
      date: '28 April 2026',
      location: 'Lapangan Tennis Dago',
      category: 'Tennis',
      gradient: 'from-indigo-500 to-blue-600',
      icon: '🎾',
      participants: '60+',
      price: 'Rp 300.000'
    },
    {
      id: 7,
      name: 'Lomba Foto CFD',
      date: '5 Mei 2026',
      location: 'Car Free Day Dago',
      category: 'Photography',
      gradient: 'from-teal-500 to-cyan-600',
      icon: '📸',
      participants: '100+',
      price: 'Gratis'
    },
    {
      id: 8,
      name: 'Charity Car Wash',
      date: '10 Mei 2026',
      location: 'Parking Lot TSM',
      category: 'Charity',
      gradient: 'from-fuchsia-500 to-pink-600',
      icon: '🚗',
      participants: 'Unlimited',
      price: 'Donasi'
    }
  ]

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
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  DougStax Hub
                </h1>
                <p className="text-xs font-semibold text-gray-600">Events Portal</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <Link 
                href="/dashboard"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
              >
                ← Back to Dashboard
              </Link>
              <button
                onClick={handleSignOut}
                className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
              >
                Sign Out
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h2 className="text-5xl md:text-6xl font-display font-extrabold mb-4 bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent animate-gradient">
            Pilih Event Favoritmu! 🎉
          </h2>
          <p className="text-xl text-gray-700 font-medium">
            Hi, <span className="font-bold text-purple-600">{user?.user_metadata?.full_name || 'Sport Lover'}</span>
          </p>
          <p className="text-gray-600 mt-2">
            Temukan event seru dan daftar sekarang untuk pengalaman tak terlupakan!
          </p>
        </div>

        {/* Event Categories Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="glass-effect rounded-2xl p-6 border border-purple-200 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl mb-2">🏃‍♀️</div>
            <div className="text-2xl font-black text-purple-600">8</div>
            <div className="text-sm font-semibold text-gray-600">Total Events</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-pink-200 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-2xl font-black text-pink-600">1,210+</div>
            <div className="text-sm font-semibold text-gray-600">Participants</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-blue-200 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl mb-2">📅</div>
            <div className="text-2xl font-black text-blue-600">Mar-May</div>
            <div className="text-sm font-semibold text-gray-600">2026 Season</div>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-green-200 text-center transform hover:scale-105 transition-all">
            <div className="text-4xl mb-2">⭐</div>
            <div className="text-2xl font-black text-green-600">New</div>
            <div className="text-sm font-semibold text-gray-600">This Month</div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
              onMouseEnter={() => setHoveredEvent(index)}
              onMouseLeave={() => setHoveredEvent(null)}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12 group-hover:scale-150 transition-transform duration-500"></div>
              </div>

              {/* Content */}
              <div className="relative p-6 h-full flex flex-col">
                {/* Icon & Category Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="text-6xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform">
                    {event.icon}
                  </div>
                  <span className="px-3 py-1 bg-white/30 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                    {event.category}
                  </span>
                </div>

                {/* Event Name */}
                <h3 className="text-xl font-black text-white mb-3 leading-tight group-hover:scale-105 transition-transform">
                  {event.name}
                </h3>

                {/* Event Details */}
                <div className="space-y-2 mb-4 flex-grow">
                  <div className="flex items-center text-white/90">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">{event.date}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">{event.location}</span>
                  </div>
                  <div className="flex items-center text-white/90">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                    <span className="text-sm font-semibold">{event.participants} Peserta</span>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white">
                      <div className="text-xs font-semibold opacity-90">Harga</div>
                      <div className="text-1xl font-black">{event.price}</div>
                    </div>
                  </div>
                  
                <Link 
                    href={event.link || '#'}
                    className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all transform group-hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
                >
                    <span>Daftar Sekarang</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
                </div>

                {/* Hover Overlay Effect */}
                {hoveredEvent === index && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action Banner */}
        <div className="mt-16 glass-effect rounded-3xl p-8 md:p-12 border border-purple-200 text-center">
          <div className="text-5xl mb-4">🎊</div>
          <h3 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent mb-4">
            Tidak Menemukan Event yang Cocok?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Hubungi kami untuk event khusus atau grup booking dengan harga spesial!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
              💬 Hubungi Kami
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all">
              📱 WhatsApp
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/30 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              © 2026 DoConnect. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">Made with ❤️ for Sports Lovers</p>
          </div>
        </div>
      </footer>
    </div>
  )
}