'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <Link
              href="/dashboard"
              className="text-purple-600 hover:text-purple-700 mr-4"
            >
              ← Kembali
            </Link>
            <h1 className="text-2xl font-bold text-purple-600">Doug Stax</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Daftar Event Zumba 🎉
          </h2>

          {success ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">✅ Pendaftaran Berhasil!</h3>
              <p>Anda akan dialihkan ke dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nama ZIN */}
              <div>
                <label htmlFor="namaZin" className="block text-sm font-medium text-gray-900 mb-2">
                  NAMA ZIN <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="namaZin"
                  name="namaZin"
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                  placeholder="Your answer"
                />
              </div>

              {/* Asal Kota */}
              <div>
                <label htmlFor="asalKota" className="block text-sm font-medium text-gray-900 mb-2">
                  ASAL KOTA <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="asalKota"
                  name="asalKota"
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                  placeholder="Your answer"
                />
              </div>

              {/* Nomor WA Aktif */}
              <div>
                <label htmlFor="nomorWaAktif" className="block text-sm font-medium text-gray-900 mb-2">
                  NOMOR WA AKTIF <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="nomorWaAktif"
                  name="nomorWaAktif"
                  required
                  className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                  placeholder="Your answer"
                />
              </div>

              {/* Booking Tiket VIP */}
              <div>
                <label htmlFor="bookingTiketVip" className="block text-sm font-medium text-gray-900 mb-2">
                  BOOKING JUMLAH TIKET VIP (jika tidak ada tulis angka 0) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="bookingTiketVip"
                  name="bookingTiketVip"
                  required
                  min="0"
                  defaultValue="0"
                  className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                  placeholder="Your answer"
                />
              </div>

              {/* Booking Tiket Reguler */}
              <div>
                <label htmlFor="bookingTiketReguler" className="block text-sm font-medium text-gray-900 mb-2">
                  BOOKING JUMLAH TIKET REGULER (jika tidak ada tulis angka 0) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="bookingTiketReguler"
                  name="bookingTiketReguler"
                  required
                  min="0"
                  defaultValue="0"
                  className="w-full px-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none placeholder-gray-400"
                  placeholder="Your answer"
                />
              </div>

              {/* Bukti Transfer */}
              <div>
                <label htmlFor="buktiTransfer" className="block text-sm font-medium text-gray-900 mb-2">
                  BUKTI TRANSFER DP TIKET
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-purple-500 transition">
                  <div className="text-sm text-gray-600 mb-2">
                    <p className="font-semibold">PAY TO BANK BCA</p>
                    <p>an. FITRI FATHONAH PURNAMASARI</p>
                    <p>no rek 7750048611</p>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Upload • Supported file: Max 10 MB
                  </div>
                  <input
                    type="file"
                    id="buktiTransfer"
                    name="buktiTransfer"
                    accept="image/*,.pdf"
                    className="w-full text-sm text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  />
                </div>
              </div>

              {/* Info Box */}
              <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">📋 Informasi Penting</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• Tiket VIP: Rp 350.000</li>
                  <li>• Tiket Reguler: Rp 200.000</li>
                  <li>• DP minimal 50% dari total tiket</li>
                  <li>• Konfirmasi pembayaran maks. 1x24 jam</li>
                  <li>• Tiket akan dikirim via WhatsApp setelah pelunasan</li>
                </ul>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || uploadingFile}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {uploadingFile ? 'Mengupload file...' : loading ? 'Memproses...' : 'Daftar Sekarang'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}