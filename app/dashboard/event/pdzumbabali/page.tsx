'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

type TicketCategory = {
  id: string
  name: string
  price: number
  color: string
  gradient: string
  icon: string
  features: string[]
}

export default function PowerDuoZumbaBaliPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [step, setStep] = useState<'category' | 'form'>('category')
  const [selectedCategory, setSelectedCategory] = useState<TicketCategory | null>(null)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  
  // Form states
  const [formData, setFormData] = useState({
    nama: '',
    asalKota: '',
    nomorWa: '',
    jumlahTiket: 1
  })
  const [buktiTransfer, setBuktiTransfer] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const ticketCategories: TicketCategory[] = [
    {
      id: 'platinum',
      name: 'Platinum VVIP',
      price: 1200000,
      color: 'purple',
      gradient: 'from-purple-500 to-violet-700',
      icon: '👑',
      features: ['Front Row Seat', 'Exclusive Merchandise', 'Meet & Greet', 'Photo Session', 'VIP Lounge Access', 'Premium Goodie Bag']
    },
    {
      id: 'gold',
      name: 'Gold VIP',
      price: 500000,
      color: 'yellow',
      gradient: 'from-yellow-500 to-amber-600',
      icon: '⭐',
      features: ['VIP Seat', 'Official Merchandise', 'VIP Lounge Access', 'Goodie Bag', 'Priority Entry']
    },
    {
      id: 'blue',
      name: 'Blue Cat BEC',
      price: 300000,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600',
      icon: '💎',
      features: ['Regular Seat', 'Event T-Shirt', 'Snack & Drink', 'Certificate']
    },
    {
      id: 'green',
      name: 'Green Cat',
      price: 185000,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      icon: '🎫',
      features: ['Standing Area', 'Event T-Shirt', 'Mineral Water']
    }
  ]

  const handleCategorySelect = (category: TicketCategory) => {
    setSelectedCategory(category)
    setStep('form')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBuktiTransfer(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const totalBiaya = selectedCategory ? selectedCategory.price * formData.jumlahTiket : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedCategory || !buktiTransfer || !user) {
      alert('Mohon lengkapi semua data!')
      return
    }

    setLoading(true)
    const supabase = createClient()

    try {
      // Upload bukti transfer
      setUploading(true)
      const fileExt = buktiTransfer.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const filePath = `bukti-transfer/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('event-registrations')
        .upload(filePath, buktiTransfer)

      if (uploadError) throw uploadError

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('event-registrations')
        .getPublicUrl(filePath)

      setUploading(false)

      // Save to database
      const { error: dbError } = await supabase
        .from('zumba_registrations')
        .insert({
          user_id: user.id,
          event_name: 'Power Duo Zumba Bali',
          ticket_category: selectedCategory.name,
          ticket_price: selectedCategory.price,
          nama: formData.nama,
          asal_kota: formData.asalKota,
          nomor_wa: formData.nomorWa,
          jumlah_tiket: formData.jumlahTiket,
          total_biaya: totalBiaya,
          bukti_transfer_url: publicUrl,
          payment_status: 'pending'
        })

      if (dbError) throw dbError

      alert('✅ Pendaftaran berhasil! Menunggu verifikasi pembayaran.')
      router.push('/dashboard')

    } catch (error) {
      console.error('Error:', error)
      alert('❌ Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
      setUploading(false)
    }
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
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-violet-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-xl ring-4 ring-purple-500/20 bg-white p-2">
                <Image 
                  src="/logo3.png" 
                  alt="DougStax Hub Logo" 
                  width={64} 
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Power Duo Zumba Bali 🌺
                </h1>
                <p className="text-xs font-semibold text-gray-600">22 Maret 2026 • Bali Nusa Dua Convention Center</p>
              </div>
            </div>
            <Link 
              href="/dashboard/event"
              className="px-6 py-2.5 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all"
            >
              ← Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center space-x-2 px-6 py-3 rounded-full ${step === 'category' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white' : 'glass-effect text-gray-600'} font-bold transition-all`}>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">1</span>
              <span>Pilih Kategori</span>
            </div>
            <div className="w-12 h-1 bg-gray-300 rounded"></div>
            <div className={`flex items-center space-x-2 px-6 py-3 rounded-full ${step === 'form' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white' : 'glass-effect text-gray-600'} font-bold transition-all`}>
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">2</span>
              <span>Isi Data & Bayar</span>
            </div>
          </div>
        </div>

        {/* Step 1: Category Selection */}
        {step === 'category' && (
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Pilih Kategori Tiket 🎫
              </h2>
              <p className="text-gray-700 text-lg">
                Pilih kategori yang sesuai dengan kebutuhanmu!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ticketCategories.map((category) => (
                <div
                  key={category.id}
                  className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                  onMouseEnter={() => setHoveredCategory(category.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                  
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
                  </div>

                  <div className="relative p-6">
                    <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform">
                      {category.icon}
                    </div>
                    
                    <h3 className="text-2xl font-black text-white mb-2">
                      {category.name}
                    </h3>
                    
                    <div className="text-3xl font-black text-white mb-4">
                      Rp {category.price.toLocaleString('id-ID')}
                    </div>

                    <div className="space-y-2 mb-6">
                      {category.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start text-white/90 text-sm">
                          <svg className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-all transform group-hover:scale-105 shadow-lg">
                      Pilih Kategori Ini
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Form */}
        {step === 'form' && selectedCategory && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                Form Pendaftaran 📝
              </h2>
              <div className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${selectedCategory.gradient} text-white rounded-2xl font-bold shadow-xl`}>
                <span className="text-2xl">{selectedCategory.icon}</span>
                <span>{selectedCategory.name}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="glass-effect rounded-3xl p-8 border border-purple-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  Data Pribadi
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nama}
                      onChange={(e) => setFormData({...formData, nama: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none font-semibold"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Asal Kota <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.asalKota}
                      onChange={(e) => setFormData({...formData, asalKota: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none font-semibold"
                      placeholder="Contoh: Jakarta"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      No. WhatsApp Aktif <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.nomorWa}
                      onChange={(e) => setFormData({...formData, nomorWa: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none font-semibold"
                      placeholder="Contoh: 08123456789"
                    />
                  </div>
                </div>
              </div>

              {/* Ticket Quantity */}
              <div className="glass-effect rounded-3xl p-8 border border-blue-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                  Jumlah Tiket
                </h3>

                <div className="flex items-center space-x-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, jumlahTiket: Math.max(1, formData.jumlahTiket - 1)})}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-bold text-2xl hover:shadow-xl hover:scale-110 transition-all"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={formData.jumlahTiket}
                    onChange={(e) => setFormData({...formData, jumlahTiket: parseInt(e.target.value) || 1})}
                    className="w-24 text-center text-3xl font-black py-3 rounded-xl border-2 border-gray-300 focus:border-purple-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, jumlahTiket: formData.jumlahTiket + 1})}
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white rounded-xl font-bold text-2xl hover:shadow-xl hover:scale-110 transition-all"
                  >
                    +
                  </button>
                  <span className="text-gray-600 font-semibold">Tiket</span>
                </div>

                {/* Calculation */}
                <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Harga per Tiket:</span>
                      <span className="text-xl font-black text-gray-900">Rp {selectedCategory.price.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Jumlah Tiket:</span>
                      <span className="text-xl font-black text-gray-900">{formData.jumlahTiket}x</span>
                    </div>
                    <div className="border-t-2 border-purple-300 pt-3 flex justify-between items-center">
                      <span className="text-2xl font-black text-gray-900">Total Biaya:</span>
                      <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                        Rp {totalBiaya.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="glass-effect rounded-3xl p-8 border border-green-200">
                <h3 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                  <svg className="w-7 h-7 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Informasi Transfer
                </h3>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 mb-6">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-gray-600 mb-2">Transfer ke:</div>
                    <div className="text-lg font-black text-gray-900 mb-1">Bank BCA</div>
                    <div className="text-3xl font-black text-green-600 mb-2">7747030705</div>
                    <div className="text-xl font-black text-gray-900">ROELLY RIVAI ANDRIAN</div>
                    <div className="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-bold">
                      ⚠️ Transfer sejumlah: Rp {totalBiaya.toLocaleString('id-ID')}
                    </div>
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
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 focus:border-green-500 focus:outline-none font-semibold"
                  />
                  {previewUrl && (
                    <div className="mt-4 rounded-xl overflow-hidden border-2 border-green-200">
                      <img src={previewUrl} alt="Preview" className="w-full h-64 object-contain bg-gray-50" />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('category')}
                  className="flex-1 py-4 bg-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-300 transition-all"
                >
                  ← Kembali
                </button>
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-bold rounded-xl hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Menyimpan...' : uploading ? 'Upload Bukti...' : '💾 Simpan Pendaftaran'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}