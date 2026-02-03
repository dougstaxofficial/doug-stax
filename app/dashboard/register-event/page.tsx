'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import Link from 'next/link'

export default function RegisterEventPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [vipTickets, setVipTickets] = useState(0)
  const [regularTickets, setRegularTickets] = useState(0)

  const totalPrice = (vipTickets * 400000) + (regularTickets * 250000)
  const minDP = totalPrice * 0.3

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const formData = new FormData(e.currentTarget)
    
    const namaZin = formData.get('namaZin') as string
    const asalKota = formData.get('asalKota') as string
    const nomorWaAktif = formData.get('nomorWaAktif') as string
    const bookingTiketVipValue = formData.get('bookingTiketVip') as string
    const bookingTiketVip = bookingTiketVipValue ? Number(bookingTiketVipValue) : 0
    const bookingTiketRegulerValue = formData.get('bookingTiketReguler') as string
    const bookingTiketReguler = bookingTiketRegulerValue ? Number(bookingTiketRegulerValue) : 0
    const buktiTransferFile = formData.get('buktiTransfer') as File

    try {
      if (!user) throw new Error('User not authenticated')

      let buktiTransferUrl = ''

      // Upload bukti transfer jika ada file
      if (buktiTransferFile && buktiTransferFile.size > 0) {
        setUploadingFile(true)
        const fileExt = buktiTransferFile.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        const filePath = `bukti-transfer/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('event-files')
          .upload(filePath, buktiTransferFile)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('event-files')
          .getPublicUrl(filePath)

        buktiTransferUrl = urlData.publicUrl
        setUploadingFile(false)
      }

      // Insert registration data
      const { error } = await supabase
        .from('event_registrations')
        .insert([
          {
            user_id: user.id,
            nama_zin: namaZin,
            asal_kota: asalKota,
            nomor_wa_aktif: nomorWaAktif,
            booking_tiket_vip: bookingTiketVip,
            booking_tiket_reguler: bookingTiketReguler,
            bukti_transfer_url: buktiTransferUrl,
            payment_status: 'pending',
          },
        ])
        .select()

      if (error) throw error

      setSuccess(true)
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi kesalahan saat mendaftar event')
      }
    } finally {
      setLoading(false)
      setUploadingFile(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Sora:wght@400;600;700;800&display=swap');
        
        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-display {
          font-family: 'Sora', sans-serif;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 8s ease infinite;
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          opacity: 1;
        }
      `}</style>

      {/* Header */}
      <header className="glass-effect border-b border-white/30 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden relative flex-shrink-0 shadow-xl ring-4 ring-purple-500/20 transition-transform hover:scale-110 hover:rotate-6 bg-white p-2">
                <Image 
                  src="/logo.png" 
                  alt="DougStax Hub Logo" 
                  width={64} 
                  height={64}
                  className="object-contain w-full h-full"
                  priority
                />
              </div>
              <div>
                <h1 className="text-2xl font-display font-black bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  DougStax Hub
                </h1>
                <p className="text-xs font-semibold text-gray-600">Pendaftaran Event</p>
              </div>
            </div>
            
            <Link
              href="/dashboard"
              className="flex items-center px-5 py-2.5 bg-white border-2 border-purple-500 text-purple-600 rounded-xl font-bold text-sm hover:bg-purple-50 hover:scale-105 transition-all shadow-md"
            >
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="glass-effect rounded-3xl p-8 mb-8 border border-white/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-fuchsia-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="relative">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-9 h-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-4xl font-display font-black text-gray-900">
                  Daftar Event Zumba 🎉
                </h2>
                <p className="text-lg text-gray-700 font-semibold mt-1">
                  Isi formulir di bawah untuk bergabung!
                </p>
              </div>
            </div>
          </div>
        </div>

        {success ? (
          <div className="glass-effect rounded-3xl p-12 border border-white/40 shadow-2xl text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-12 h-12 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-4">✨ Pendaftaran Berhasil!</h3>
            <p className="text-lg text-gray-700 font-semibold mb-6">
              Terima kasih telah mendaftar. Kami akan memverifikasi pembayaran Anda segera.
            </p>
            <div className="inline-flex items-center gap-2 text-purple-600 font-bold">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600"></div>
              Mengalihkan ke dashboard...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information Card */}
            <div className="glass-effect rounded-2xl p-8 border border-white/40 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900">Informasi Pribadi</h3>
              </div>

              <div className="space-y-5">
                {/* Nama ZIN */}
                <div>
                  <label htmlFor="namaZin" className="block text-sm font-bold text-gray-900 mb-2">
                    NAMA ZIN <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="namaZin"
                    name="namaZin"
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none placeholder-gray-400 font-semibold transition-all"
                    placeholder="Masukkan nama ZIN Anda"
                  />
                </div>

                {/* Asal Kota */}
                <div>
                  <label htmlFor="asalKota" className="block text-sm font-bold text-gray-900 mb-2">
                    ASAL KOTA <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="asalKota"
                    name="asalKota"
                    required
                    className="w-full px-5 py-4 border-2 border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none placeholder-gray-400 font-semibold transition-all"
                    placeholder="Contoh: Jakarta, Bandung, Surabaya"
                  />
                </div>

                {/* Nomor WA */}
                <div>
                  <label htmlFor="nomorWaAktif" className="block text-sm font-bold text-gray-900 mb-2">
                    NOMOR WHATSAPP AKTIF <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <input
                      type="tel"
                      id="nomorWaAktif"
                      name="nomorWaAktif"
                      required
                      className="w-full pl-14 pr-5 py-4 border-2 border-gray-200 text-gray-900 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none placeholder-gray-400 font-semibold transition-all"
                      placeholder="08123456789"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Booking Card */}
            <div className="glass-effect rounded-2xl p-8 border border-white/40 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900">Booking Tiket</h3>
              </div>

              <div className="space-y-5">
                {/* VIP Ticket */}
                <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-2xl p-6 border-2 border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-purple-900">Tiket VIP</h4>
                        <p className="text-2xl font-black text-purple-600">Rp 400.000</p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    id="bookingTiketVip"
                    name="bookingTiketVip"
                    required
                    min="0"
                    value={vipTickets}
                    onChange={(e) => setVipTickets(Number(e.target.value))}
                    className="w-full px-5 py-4 border-2 border-purple-300 text-gray-900 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none font-bold text-lg transition-all"
                    placeholder="0"
                  />
                </div>

                {/* Regular Ticket */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-blue-900">Tiket Reguler</h4>
                        <p className="text-2xl font-black text-blue-600">Rp 250.000</p>
                      </div>
                    </div>
                  </div>
                  <input
                    type="number"
                    id="bookingTiketReguler"
                    name="bookingTiketReguler"
                    required
                    min="0"
                    value={regularTickets}
                    onChange={(e) => setRegularTickets(Number(e.target.value))}
                    className="w-full px-5 py-4 border-2 border-blue-300 text-gray-900 rounded-xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none font-bold text-lg transition-all"
                    placeholder="0"
                  />
                </div>

                {/* Price Summary */}
                {totalPrice > 0 && (
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border-2 border-gray-300">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-700">Total Harga</span>
                        <span className="text-2xl font-black text-gray-900">
                          Rp {totalPrice.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="border-t-2 border-gray-300 pt-3 flex justify-between items-center">
                        <span className="text-sm font-bold text-purple-700">Minimal DP (30%)</span>
                        <span className="text-xl font-black text-purple-600">
                          Rp {minDP.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Card */}
            <div className="glass-effect rounded-2xl p-8 border border-white/40 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-gray-900">Pembayaran</h3>
              </div>

              {/* Bank Info */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-200 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                    <span className="text-2xl font-black text-white">BCA</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-emerald-900 mb-2">Transfer ke rekening:</p>
                    <p className="text-lg font-black text-gray-900">FITRI FATHONAH PURNAMASARI</p>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-2xl font-black text-emerald-700">7750048611</p>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('7750048611')
                          alert('Nomor rekening berhasil disalin!')
                        }}
                        className="px-3 py-1 bg-emerald-200 text-emerald-800 rounded-lg text-xs font-bold hover:bg-emerald-300 transition-all"
                      >
                        Salin
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  BUKTI TRANSFER DP TIKET
                </label>
                <div className="border-2 border-dashed border-purple-300 rounded-2xl p-8 hover:border-purple-500 hover:bg-purple-50/50 transition-all bg-white">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    {selectedFile ? (
                      <div className="mb-4">
                        <p className="font-bold text-purple-600 mb-1">✓ File terpilih:</p>
                        <p className="text-sm text-gray-700 font-semibold">{selectedFile.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="mb-4">
                        <p className="font-bold text-gray-900 mb-1">Pilih file bukti transfer</p>
                        <p className="text-sm text-gray-600">PNG, JPG, PDF (Max. 10MB)</p>
                      </div>
                    )}
                    <input
                      type="file"
                      id="buktiTransfer"
                      name="buktiTransfer"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="buktiTransfer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-xl font-bold cursor-pointer hover:scale-105 transition-all shadow-lg"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      {selectedFile ? 'Ganti File' : 'Upload File'}
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Box */}
            <div className="glass-effect rounded-2xl p-8 border border-white/40 shadow-xl bg-gradient-to-r from-amber-50/50 to-orange-50/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-black text-gray-900 mb-4">📋 Informasi Penting</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-gray-800">VIP = Rp. 400.000 (Fee Zin 50.000/tiket)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-gray-800">REGULER = Rp. 250.000 (Fee Zin 25.000/tiket)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-gray-800">DP minimal 30% dari total</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-gray-800">Konfirmasi maks. 1x24 jam</span>
                    </div>
                    <div className="flex items-start gap-2 md:col-span-2">
                      <svg className="w-5 h-5 text-fuchsia-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm font-bold text-gray-800">Tiket dikirim via WhatsApp setelah pelunasan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="glass-effect rounded-2xl p-6 border-2 border-red-300 bg-red-50/50 shadow-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-red-900 mb-1">Terjadi Kesalahan</h4>
                    <p className="text-sm font-semibold text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || uploadingFile}
              className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-black py-6 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-2xl hover:scale-[1.02] hover:shadow-purple-500/50 disabled:hover:scale-100"
            >
              {uploadingFile ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Mengupload Bukti Transfer...
                </span>
              ) : loading ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses Pendaftaran...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Daftar Sekarang 🎉
                </span>
              )}
            </button>
          </form>
        )}
      </main>

      {/* Footer */}
      <footer className="glass-effect border-t border-white/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              © 2026 DougStax Hub. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-2">Made with ❤️ for Sports Lovers</p>
          </div>
        </div>
      </footer>
    </div>
  )
}