'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: '🎫',
      title: 'Tiket Digital',
      description: 'Dapatkan tiket langsung di email Anda',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: '📅',
      title: 'Event Terbaru',
      description: 'Update event Zumba setiap minggu',
      color: 'from-purple-500 to-pink-400'
    },
    {
      icon: '👥',
      title: 'Komunitas',
      description: 'Bertemu dengan ZIN dan Zumba lovers',
      color: 'from-orange-500 to-red-400'
    }
  ]

  const activities = [
    { name: 'Zumba', emoji: '💃', color: 'bg-pink-500' },
    { name: 'Padel', emoji: '🎾', color: 'bg-blue-500' },
    { name: 'Running', emoji: '🏃', color: 'bg-green-500' },
    { name: 'Tenis', emoji: '🎾', color: 'bg-yellow-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-600 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="text-center text-white max-w-6xl">
          {/* Logo - Ukuran diperkecil untuk mobile */}
          <div className="mb-6 md:mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 mx-auto mb-3 md:mb-4">
              <Image 
                src="/logo3.png" 
                alt="DougStax Hub Logo"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <div className="flex justify-center gap-2 mb-4 md:mb-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Tagline - Ukuran text diperkecil untuk mobile */}
          <p className="text-xl sm:text-2xl md:text-4xl mb-4 md:mb-6 font-bold text-yellow-200 animate-pulse">
            Platform Komunitas DougStax Indonesia
          </p>
          
          <p className="text-sm sm:text-base md:text-2xl mb-8 md:mb-12 text-purple-100 max-w-3xl mx-auto leading-relaxed px-2">
            Bergabung dengan komunitas DougStax Hub terbesar di Indonesia. 
            Daftar event, dapatkan tiket, dan nikmati pengalaman yang luar biasa!
          </p>

          {/* Activity Pills - Ukuran diperkecil */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-12">
            {activities.map((activity, index) => (
              <div
                key={index}
                className={`${activity.color} px-4 py-2 md:px-6 md:py-3 rounded-full font-bold text-white text-sm md:text-base shadow-lg transform hover:scale-110 transition-all duration-300 hover:rotate-3 cursor-pointer`}
              >
                <span className="mr-1 md:mr-2">{activity.emoji}</span>
                {activity.name}
              </div>
            ))}
          </div>
          
          {/* CTA Buttons - Ukuran diperkecil untuk mobile */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center mb-12 md:mb-20">
            <Link
              href="/register"
              className="group relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-black text-base md:text-xl hover:shadow-2xl transition-all transform hover:scale-110 overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Daftar Sekarang 🚀
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 md:px-10 md:py-5 bg-white/20 backdrop-blur-lg border-2 md:border-3 border-white text-white rounded-full font-black text-base md:text-xl hover:bg-white hover:text-purple-600 transition-all transform hover:scale-110 shadow-xl w-full sm:w-auto"
            >
              Login ✨
            </Link>
          </div>

          {/* Features Grid - Padding dan text diperkecil */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto mb-12 md:mb-0">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative bg-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-white/30 transform transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'ring-2 md:ring-4 ring-yellow-400 scale-105' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 hover:opacity-20 transition-opacity rounded-2xl md:rounded-3xl`}></div>
                
                <div className="relative z-10">
                  <div className="text-4xl md:text-6xl mb-3 md:mb-4 animate-bounce">{feature.icon}</div>
                  <h3 className="text-lg md:text-2xl font-black mb-2 md:mb-3 text-yellow-200">{feature.title}</h3>
                  <p className="text-purple-100 text-sm md:text-lg">{feature.description}</p>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-3 right-3 md:top-4 md:right-4 w-6 h-6 md:w-8 md:h-8 bg-yellow-400 rounded-full opacity-50"></div>
              </div>
            ))}
          </div>

          {/* Stats Section - Ukuran diperkecil */}
          <div className="mt-12 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: 'Members' },
              { number: '50+', label: 'Events' },
              { number: '20+', label: 'Instructors' },
              { number: '4', label: 'Activities' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-110 transition-transform"
              >
                <div className="text-2xl sm:text-3xl md:text-5xl font-black text-yellow-300 mb-1 md:mb-2">
                  {stat.number}
                </div>
                <div className="text-purple-200 font-semibold text-xs sm:text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Scroll Indicator - Ukuran diperkecil */}
          <div className="mt-12 md:mt-16 animate-bounce">
            <div className="text-white text-xs md:text-sm mb-2">Scroll untuk lebih banyak</div>
            <div className="mx-auto w-5 h-8 md:w-6 md:h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-2 md:h-3 bg-white rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}