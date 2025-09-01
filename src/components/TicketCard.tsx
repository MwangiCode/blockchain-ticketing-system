import { Ticket } from '@prisma/client';

interface TicketCardProps {
  ticket: Ticket & {
    event: {
      name: string;
      date: Date;
      venue: string;
    };
  };
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-2 border-green-200">
      <h3 className="text-xl font-bold mb-2">{ticket.event.name}</h3>
      <p className="text-gray-600 mb-2">
        {new Date(ticket.event.date).toLocaleDateString()} • {ticket.event.venue}
      </p>
      <p className="text-sm text-gray-500 mb-4">Ticket ID: {ticket.id}</p>
      
      {ticket.seatNumber && (
        <p className="text-lg font-semibold mb-4">Seat: {ticket.seatNumber}</p>
      )}

      <div className="bg-gray-100 p-3 rounded mb-4">
        <p className="text-xs font-mono break-all">Token: {ticket.token}</p>
      </div>

      <div className="flex justify-between items-center">
        <span className={`px-3 py-1 rounded-full text-sm ${
          ticket.isUsed ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {ticket.isUsed ? 'Used' : 'Valid'}
        </span>
        
        {!ticket.isUsed && (
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Show QR Code
          </button>
        )}
      </div>
    </div>
  );
}