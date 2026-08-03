import { NextResponse } from 'next/server';
import { staticEvents } from '@/data/events';

export const dynamic = 'force-static';

export async function GET() {
  const upcomingEvent = staticEvents.length > 0 ? staticEvents[0] : null;
  
  return NextResponse.json({ event: upcomingEvent });
}
