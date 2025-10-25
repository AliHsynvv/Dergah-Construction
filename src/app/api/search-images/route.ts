import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Internet search disabled — return empty results for backward compatibility
export async function GET() {
  return NextResponse.json({ success: true, results: [], total: 0, totalPages: 0, provider: 'disabled' });
}

