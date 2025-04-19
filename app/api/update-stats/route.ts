import { NextResponse } from 'next/server';
import { updateApplicationStats } from '@/lib/actions/leaderboard';

// GET /api/update-stats
export async function GET() {
  try {
    await updateApplicationStats();
    // Optionally, fetch the updated stats from your database here and return them
    // For now, just return a success message
    return NextResponse.json({ message: 'Stats updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update stats', details: error instanceof Error ? error.message : error }, { status: 500 });
  }
}
