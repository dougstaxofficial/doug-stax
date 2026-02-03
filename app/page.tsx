import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500">
      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center text-white">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-pulse">
            Doug Stax 💃
          </h1>
          <p className="text-2xl md:text-3xl mb-4 font-light">
            Platform Komunitas Zumba Indonesia
          </p>
          <p className="text-lg md:text-xl mb-12 text-purple-100 max-w-2xl mx-auto">
            Bergabung dengan komunitas Zumba terbesar di Indonesia. 
            Daftar event, dapatkan tiket, dan nikmati pengalaman Zumba yang luar biasa!
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/register"
              className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 shadow-2xl"
            >
              Daftar Sekarang 🚀
            </Link>
            <Link
              href="/login"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105"
            >
              Login
            </Link>
          </div>

          {/* Features */}
          <div className="mt-20 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🎫</div>
              <h3 className="text-xl font-bold mb-2">Tiket Digital</h3>
              <p className="text-purple-100">Dapatkan tiket langsung di email Anda</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Event Terbaru</h3>
              <p className="text-purple-100">Update event Zumba setiap minggu</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-2">Komunitas</h3>
              <p className="text-purple-100">Bertemu dengan ZIN dan Zumba lovers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}