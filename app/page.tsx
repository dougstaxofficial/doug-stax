'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const slides = [
    {
      title: "Jual tiket, booking tiket",
      desc: "Beli tiket dengan mudah, semua komunitas bisa!",
      icon: "🎫",
      color: "from-pink-400 to-pink-600"
    },
    {
      title: "Event & Partnership",
      desc: "Temukan event terbaru dan kemitraan eksklusif",
      icon: "🤝",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Komunitas Aktif",
      desc: "Bergabung dengan ribuan member aktif",
      icon: "👥",
      color: "from-blue-400 to-blue-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-40 blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-40 blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-30 blur-3xl animate-float-slow"></div>
      </div>

      {/* Main Card */}
      <div 
        className="relative w-full md:max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden animate-card-entrance"
      >
        {/* Decorative Top Border */}
        <div className="h-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"></div>

        {/* Desktop & Mobile Layout */}
        <div className="md:grid md:grid-cols-2 md:gap-8">
          {/* Left Section - Header & Logo */}
          <div className="relative pt-8 pb-6 px-6 bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 md:flex md:flex-col md:justify-center md:min-h-[600px]">
          {/* Floating Circles Decoration */}
          <div className="absolute top-4 right-4 flex gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              {/* Glow Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 rounded-full blur-2xl opacity-50 animate-glow-pulse"></div>
              
              {/* Rotating Ring */}
              <div className="absolute inset-0 -m-4">
                <div className="w-full h-full border-4 border-dashed border-pink-300/30 rounded-full animate-spin-slow"></div>
              </div>
              
              {/* Logo Container */}
              <div className="relative w-24 h-24 md:w-40 md:h-40 transform hover:scale-110 transition-all duration-500 animate-float-logo group cursor-pointer">
                {/* Sparkle Effects */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-sparkle opacity-0"></div>
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-sparkle-delayed opacity-0"></div>
                <div className="absolute top-0 left-0 w-2 h-2 bg-purple-400 rounded-full animate-sparkle-slow opacity-0"></div>
                
                {/* Logo Image */}
                <div className="relative w-full h-full group-hover:rotate-12 transition-transform duration-500">
                  <Image 
                    src="/logo3.png" 
                    alt="DoConnect Logo"
                    fill
                    className="object-contain drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-5xl font-black text-center bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            DoConnect
          </h1>

          {/* Desktop Only - Additional Info */}
          <div className="hidden md:block mt-8 px-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/50 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-black text-orange-600">1000+</div>
                <div className="text-sm text-gray-600 font-semibold">Members</div>
              </div>
              <div className="bg-white/50 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-black text-pink-600">50+</div>
                <div className="text-sm text-gray-600 font-semibold">Events</div>
              </div>
              <div className="bg-white/50 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-black text-purple-600">20+</div>
                <div className="text-sm text-gray-600 font-semibold">Instructors</div>
              </div>
              <div className="bg-white/50 rounded-xl p-4 text-center backdrop-blur-sm">
                <div className="text-3xl font-black text-blue-600">4</div>
                <div className="text-sm text-gray-600 font-semibold">Activities</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Main Content */}
        <div className="px-6 py-8 md:flex md:flex-col md:justify-center md:py-12 md:px-10">
          {/* Subtitle */}
          <h2 className="text-xl md:text-3xl font-bold text-gray-800 text-center mb-2">
            Platform Komunitas
          </h2>
          <p className="text-base md:text-xl text-gray-600 text-center mb-6 md:mb-8 leading-relaxed">
            untuk Connect ke Hobby dan Kebutuhan kamu
          </p>

          {/* Carousel Slides */}
          <div className="relative h-48 md:h-64 mb-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-inner">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-700 ${
                  activeSlide === index 
                    ? 'opacity-100 translate-x-0' 
                    : index < activeSlide 
                      ? 'opacity-0 -translate-x-full' 
                      : 'opacity-0 translate-x-full'
                }`}
              >
                <div className={`text-6xl md:text-7xl mb-4 animate-bounce`}>
                  {slide.icon}
                </div>
                <h3 className={`text-lg md:text-2xl font-bold text-center mb-2 bg-gradient-to-r ${slide.color} bg-clip-text text-transparent`}>
                  {slide.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 text-center">
                  {slide.desc}
                </p>
              </div>
            ))}

            {/* Slide Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    activeSlide === index 
                      ? 'w-8 h-2 bg-gradient-to-r from-pink-500 to-purple-500' 
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 rounded-xl p-4 md:p-6 mb-6 md:mb-8 border border-pink-200">
            <p className="text-sm md:text-base text-gray-700 text-center leading-relaxed">
              Jual tiket, booking tiket bukan komunitas saja. 
              Beli tiket dong, semua bisa! Cari event, dapatkan partner, 
              daftar event, partnership
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 md:space-y-4">
            <Link
              href="/register"
              className="group relative block w-full overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-size-200 animate-gradient"></div>
              <div className="relative px-8 py-4 md:py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-black text-white text-center text-lg md:text-xl shadow-lg transform group-hover:scale-[1.02] transition-all duration-300 group-hover:shadow-xl">
                <span className="flex items-center justify-center gap-2">
                  DAFTAR SEKARANG
                  <span className="group-hover:translate-x-1 transition-transform">🚀</span>
                </span>
              </div>
            </Link>

            <Link
              href="/login"
              className="block w-full px-8 py-4 md:py-5 bg-white border-2 border-purple-500 rounded-xl font-bold text-purple-600 text-center text-lg md:text-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-lg"
            >
              LOG IN
            </Link>
          </div>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-sm md:text-base text-purple-600 hover:text-purple-700 font-semibold hover:underline transition-all"
            >
              Forgot Password?
            </a>
          </div>
        </div>
        {/* End of Grid */}
      </div>

        {/* Decorative Bottom */}
        <div className="h-1 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500"></div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-logo {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes glow-pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        @keyframes sparkle-delayed {
          0%, 100% {
            opacity: 0;
            transform: scale(0) translateY(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) translateY(-5px);
          }
        }

        @keyframes sparkle-slow {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }

        .animate-float-logo {
          animation: float-logo 3s ease-in-out infinite;
        }

        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }

        .animate-sparkle-delayed {
          animation: sparkle-delayed 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-sparkle-slow {
          animation: sparkle-slow 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        @keyframes card-entrance {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-card-entrance {
          animation: card-entrance 0.6s ease-out forwards;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(-40px, 30px) scale(1.15);
          }
          66% {
            transform: translate(25px, -25px) scale(0.85);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(20px, -20px) rotate(5deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  )
}