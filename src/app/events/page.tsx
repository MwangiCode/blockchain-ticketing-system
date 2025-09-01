import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CountdownTimer from '@/components/CountdownTimer';

export default async function EventsPage() {
  // Get upcoming events from database
  const upcomingEvents = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date()
      }
    },
    orderBy: {
      date: 'asc'
    }
  });

  // Categorize events by date
  const thisWeekEvents = upcomingEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return eventDate <= nextWeek;
  });

  const thisMonthEvents = upcomingEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return eventDate > new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) && eventDate <= nextMonth;
  });

  const futureEvents = upcomingEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const nextMonth = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
    return eventDate > nextMonth;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
              <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">TicketSecure</Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/events" className="text-blue-600 font-medium">Events</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Contact</Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 -mr-40 mt-10 opacity-20">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <path fill="currentColor" d="M45.1,-58.2C63.2,-49.4,85.2,-45.2,94.3,-32.5C103.4,-19.8,99.6,1.4,90.8,18.4C82,35.4,68.2,48.2,52.4,58.8C36.6,69.4,18.8,77.8,1.3,76.1C-16.2,74.4,-32.5,62.6,-46.1,49.3C-59.8,36,-70.9,21.2,-75.5,3.8C-80.1,-13.6,-78.3,-33.6,-66.9,-44.7C-55.5,-55.8,-34.6,-58.1,-15.3,-65.8C4,-73.6,27,-86.9,45.1,-58.2Z" transform="translate(100 100)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing <span className="text-yellow-300">Events</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Explore upcoming events and secure your tickets with confidence
            </p>
            <div className="flex justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 inline-flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>100% Secure Ticketing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors">
              All Events
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              This Week
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              This Month
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Music
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Sports
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors">
              Conference
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* This Week Events */}
          {thisWeekEvents.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Happening This Week</h2>
                <div className="flex items-center text-blue-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                  <span className="text-sm font-semibold">Don&#39;t miss out!</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {thisWeekEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* This Month Events */}
          {thisMonthEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">This Month</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {thisMonthEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* Future Events */}
          {futureEvents.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Coming Soon</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {futureEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          )}

          {/* No Events Message */}
          {upcomingEvents.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">No upcoming events</h3>
              <p className="text-gray-500 mb-6">Check back later for exciting events coming your way!</p>
              <Link 
                href="/" 
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Never Miss an Event</h2>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter and be the first to know about upcoming events and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">TicketSecure</span>
              </div>
              <p className="text-gray-400">Secure ticketing for all your favorite events.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/help" className="text-gray-400 hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TicketSecure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Event Card Component
type Event = {
  id: string | number;
  name: string;
  description: string | null;
  venue: string;
  date: string | Date;
  price: number;
  availableTickets: number;
};

function EventCard({ event }: { event: Event }) {
  const eventDate = new Date(event.date);
  const isLowTickets = event.availableTickets < 10;
  const isSoldOut = event.availableTickets === 0;
  const isThisWeek = new Date(event.date).getTime() - new Date().getTime() <= 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
        <div className="absolute top-4 left-4">
          {isSoldOut ? (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Sold Out</span>
          ) : isLowTickets ? (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">Almost Gone</span>
          ) : (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Available</span>
          )}
        </div>
        {isThisWeek && (
          <div className="absolute top-4 right-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">This Week</span>
          </div>
        )}
        <div className="absolute bottom-4 left-4 text-white">
          <p className="text-sm opacity-90">{eventDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          })}</p>
          <h3 className="text-xl font-bold mt-1 group-hover:text-blue-200 transition-colors">{event.name}</h3>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Venue</p>
            <p className="font-semibold">{event.venue}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Time</p>
            <p className="font-semibold">{eventDate.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</p>
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
              isSoldOut ? 'text-red-600' : isLowTickets ? 'text-amber-600' : 'text-green-600'
            }`}>
              {isSoldOut ? 'Sold Out' : `${event.availableTickets} available`}
            </p>
          </div>
        </div>
        
        {isLowTickets && !isSoldOut && (
          <div className="mb-4">
            <CountdownTimer targetDate={eventDate} />
          </div>
        )}
        
        <Link 
          href={`/events/${event.id}`}
          className={`block w-full text-center py-3 px-4 rounded-xl font-semibold transition-all ${
            isSoldOut 
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
          }`}
          onClick={e => isSoldOut && e.preventDefault()}
        >
          {isSoldOut ? 'Sold Out' : 'Get Tickets'}
        </Link>
      </div>
    </div>
  );
}