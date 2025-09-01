import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: {
        date: {
          gte: new Date()
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Events fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json(
        { error: 'Authorization required' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded || decoded.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    const { name, description, date, venue, totalTickets, price } = await request.json();

    const event = await prisma.event.create({
      data: {
        name,
        description,
        date: new Date(date),
        venue,
        totalTickets,
        availableTickets: totalTickets,
        price
      }
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('Event creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}