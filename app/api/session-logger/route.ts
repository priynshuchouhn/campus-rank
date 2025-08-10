// app/api/session-logger/route.ts
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  await prisma.userSession.create({
    data: {
      userId: body.userId,
      pagePath: body.pagePath,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
      duration: body.duration,
    },
  })

  return NextResponse.json({ success: true })
}
