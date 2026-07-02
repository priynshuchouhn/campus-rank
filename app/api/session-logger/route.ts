// app/api/session-logger/route.ts
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  if (process.env.ENABLE_SESSION_LOGGING !== 'true') {
    return NextResponse.json({ success: true, skipped: true })
  }

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ success: false }, { status: 401 })
  }

  const body = await req.json()
  const duration = Number(body.duration)
  const pagePath = typeof body.pagePath === 'string' ? body.pagePath.slice(0, 300) : ''

  if (!pagePath || !Number.isFinite(duration) || duration < 30) {
    return NextResponse.json({ success: true, skipped: true })
  }

  await prisma.userSession.create({
    data: {
      userId: session.user.id,
      pagePath,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      duration,
    },
  })

  return NextResponse.json({ success: true })
}
