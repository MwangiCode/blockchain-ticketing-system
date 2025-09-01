import { Event } from '@prisma/client';
import Link from 'next/link';
import CountdownTimer from './CountdownTimer';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date);
  const isLowTickets = event.availableTickets < 10;
  const isSoldOut = event.availableTickets === 0;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        {isLowTickets && !isSoldOut && (
          <div className="mb-4">
            <CountdownTimer targetDate={eventDate} />
          </div>
        )}

        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold">{eventDate.toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Venue</p>
            <p className="font-semibold">{event.venue}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-semibold text-blue-600">${event.price.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tickets Left</p>
            <p className={`font-semibold ${
              isSoldOut ? 'text-red-600' : isLowTickets ? 'text-orange-600' : 'text-green-600'
            }`}>
              {isSoldOut ? 'Sold Out' : `${event.availableTickets} available`}
            </p>
          </div>
        </div>
        
        <Link 
          href={`/events/${event.id}`}
          className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
            isSoldOut 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
          onClick={e => isSoldOut && e.preventDefault()}
        >
          {isSoldOut ? 'Sold Out' : 'View Details'}
        </Link>
      </div>
    </div>
  );
}