import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase-server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function GET() {
  return NextResponse.json({ 
    success: true,
    message: 'Admin Login API is ready',
    endpoint: '/api/admin/login',
    method: 'POST'
  })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log('🔐 Login attempt for username:', body.username)

    const { username, password } = body

    if (!username || !password) {
      console.log('❌ Missing username or password')
      return NextResponse.json(
        { error: 'Username dan password harus diisi' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Cari admin berdasarkan username
    console.log('🔍 Searching for admin in database...')
    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('username', username)
      .single()

    console.log('📊 Query result:', { 
      found: !!admin, 
      error: error?.message 
    })

    if (error || !admin) {
      console.log('❌ Admin not found')
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }

    console.log('✅ Admin found:', admin.username)

    // Verifikasi password
    console.log('🔐 Verifying password...')
    const isPasswordValid = await bcrypt.compare(password, admin.password_hash)
    
    console.log('🔓 Password valid:', isPasswordValid)

    if (!isPasswordValid) {
      console.log('❌ Invalid password')
      return NextResponse.json(
        { error: 'Username atau password salah' },
        { status: 401 }
      )
    }

    console.log('✅ Password verified')

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-this'
    
    const token = jwt.sign(
      { 
        id: admin.id, 
        username: admin.username,
        role: 'admin'
      },
      jwtSecret,
      { expiresIn: '24h' }
    )

    console.log('✅ JWT token generated')

    // Update last login
    await supabase
      .from('admins')
      .update({ last_login: new Date().toISOString() })
      .eq('id', admin.id)

    console.log('✅ Login successful for:', admin.username)

    return NextResponse.json({
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        full_name: admin.full_name,
      }
    })
  } catch (error) {
    console.error('💥 Login error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan server' },
      { status: 500 }
    )
  }
}