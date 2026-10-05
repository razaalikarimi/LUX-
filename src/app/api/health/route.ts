import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    platform: 'LUXÉ Next.js App Router Enterprise',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
}
