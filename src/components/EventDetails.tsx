'use client';

import { Event } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EventDetailsProps {
  event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePurchase = async () => {
    setIsPurchasing(true);
    setError('');

    try {
      // In a real app, you would have authentication
      const response = await fetch('/api/tickets/purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}` in a real app
        },
        body: JSON.stringify({
          eventId: event.id,
          quantity,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Tickets purchased successfully!');
        router.push('/dashboard');
      } else {
        setError(data.error || 'Purchase failed');
      }
    } catch (error) {
      setError('An error occurred during purchase');
    } finally {
      setIsPurchasing(false);
    }
  };

  const eventDate = new Date(event.date);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-4">{event.name}</h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Date & Time</h3>
              <p className="text-lg">{eventDate.toLocaleDateString()} at {eventDate.toLocaleTimeString()}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Venue</h3>
              <p className="text-lg">{event.venue}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Price</h3>
              <p className="text-2xl font-bold text-blue-600">${event.price.toFixed(2)}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-500 mb-1">Tickets Available</h3>
              <p className="text-lg">{event.availableTickets} of {event.totalTickets}</p>
            </div>
          </div>
          
          {event.availableTickets > 0 ? (
            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Purchase Tickets</h3>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              <div className="flex items-center gap-4 mb-4">
                <label htmlFor="quantity" className="font-semibold">Quantity:</label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border rounded px-3 py-2"
                >
                  {[...Array(Math.min(10, event.availableTickets)).keys()].map(i => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
                
                <span className="font-semibold">
                  Total: ${(event.price * quantity).toFixed(2)}
                </span>
              </div>
              
              <button
                onClick={handlePurchase}
                disabled={isPurchasing}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {isPurchasing ? 'Processing...' : 'Purchase Tickets'}
              </button>
            </div>
          ) : (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              This event is sold out.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}