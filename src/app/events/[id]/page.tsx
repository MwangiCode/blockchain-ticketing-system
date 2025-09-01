'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { use } from 'react';

// Mock data for events
const mockEvents = [
  {
    id: '1',
    name: 'Summer Music Festival',
    description: 'The biggest music festival of the year featuring top artists from around the world. Join us for a weekend of amazing music, food, and fun!',
    date: new Date('2024-07-15T18:00:00Z'),
    venue: 'City Park Amphitheater',
    totalTickets: 5000,
    availableTickets: 3500,
    price: 89.99,
  },
  {
    id: '2',
    name: 'Tech Conference 2024',
    description: 'Annual technology conference showcasing the latest innovations in AI, blockchain, and web development. Network with industry leaders and enthusiasts.',
    date: new Date('2024-08-22T09:00:00Z'),
    venue: 'Convention Center',
    totalTickets: 2000,
    availableTickets: 1200,
    price: 299.99,
  },
  {
    id: '3',
    name: 'Comedy Night Special',
    description: 'An evening of laughter with top comedians from Netflix and Comedy Central. Prepare for a night of non-stop jokes and entertainment.',
    date: new Date('2024-06-30T20:00:00Z'),
    venue: 'Downtown Comedy Club',
    totalTickets: 300,
    availableTickets: 150,
    price: 45.50,
  },
];

interface EventPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function EventPage({ params }: EventPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  // Unwrap the params promise
  const { id } = use(params);
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Event not found</h1>
      </div>
    );
  }

  const handlePurchase = async () => {
    setIsPurchasing(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would call your API
      alert('Tickets purchased successfully!');
      router.push('/dashboard');
    } catch {
      setError('An error occurred during purchase');
    } finally {
      setIsPurchasing(false);
    }
  };

  const eventDate = new Date(event.date);

  return (
    <div className="container mx-auto px-4 py-8">
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
    </div>
  );
}