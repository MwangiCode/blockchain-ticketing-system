import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { TicketTokenization } from '@/lib/tokenization';

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
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const { eventId, quantity = 1, seatNumbers } = await request.json();

    // Check event availability
    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    if (event.availableTickets < quantity) {
      return NextResponse.json(
        { error: 'Not enough tickets available' },
        { status: 400 }
      );
    }

    // Create tickets in a transaction
    const tickets = await prisma.$transaction(async (tx) => {
      const tickets = [];
      
      for (let i = 0; i < quantity; i++) {
        const ticketToken = TicketTokenization.generateTicketToken(
          `temp-${Date.now()}-${i}`,
          eventId,
          decoded.userId
        );

        const ticket = await tx.ticket.create({
          data: {
            eventId,
            userId: decoded.userId,
            seatNumber: seatNumbers?.[i] || null,
            token: ticketToken
          },
          include: {
            event: true
          }
        });

        tickets.push(ticket);
      }

      // Update available tickets
      await tx.event.update({
        where: { id: eventId },
        data: { availableTickets: event.availableTickets - quantity }
      });

      return tickets;
    });

    return NextResponse.json({ tickets });
  } catch (error) {
    console.error('Ticket purchase error:', error);
    return NextResponse.json(
      { error: 'Purchase failed' },
      { status: 500 }
    );
  }
}