// Secure admin authentication API
import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Store active sessions (in production, use Redis or database)
const activeSessions = new Map();

// Admin password hash (strax1507)
const ADMIN_PASSWORD_HASH = crypto.createHash('sha256').update('strax1507').digest('hex');

export async function POST(request) {
  try {
    const { password } = await request.json();
    
    if (!password) {
      return NextResponse.json({ success: false, error: 'Password required' }, { status: 400 });
    }
    
    // Hash the provided password and compare
    const providedPasswordHash = crypto.createHash('sha256').update(password).digest('hex');
    
    if (providedPasswordHash !== ADMIN_PASSWORD_HASH) {
      return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
    }
    
    // Generate a secure session token
    const sessionToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 hours
    
    // Store session
    activeSessions.set(sessionToken, {
      authenticated: true,
      expiresAt: expiresAt,
      createdAt: Date.now()
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Authentication successful',
      sessionToken: sessionToken
    });
    
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json({ success: false, error: 'Authentication failed' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionToken = searchParams.get('token');
    
    if (!sessionToken) {
      return NextResponse.json({ success: false, error: 'No session token' }, { status: 400 });
    }
    
    const session = activeSessions.get(sessionToken);
    
    if (!session) {
      return NextResponse.json({ success: false, error: 'Invalid session' }, { status: 401 });
    }
    
    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      activeSessions.delete(sessionToken);
      return NextResponse.json({ success: false, error: 'Session expired' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      success: true, 
      authenticated: true,
      expiresAt: session.expiresAt
    });
    
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ success: false, error: 'Session check failed' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionToken = searchParams.get('token');
    
    if (sessionToken) {
      activeSessions.delete(sessionToken);
    }
    
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
    
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ success: false, error: 'Logout failed' }, { status: 500 });
  }
}

