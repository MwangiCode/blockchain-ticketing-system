import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CountdownTimer from '@/components/CountdownTimer';

export default async function Home() {
  // Get upcoming events for the homepage
  const upcomingEvents = await prisma.event.findMany({
    where: {
      date: {
        gte: new Date()
      }
    },
    orderBy: {
      date: 'asc'
    },
    take: 3
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 mx-auto relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 mb-6">
                <span className="mr-2">🎟️</span> Secure Event Ticketing
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Experience Events <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">With Confidence</span>
              </h1>
              
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Advanced tokenization technology ensures every ticket is authentic, secure, and fraud-resistant for peace of mind.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/events" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center flex items-center justify-center"
                >
                  <span>Explore Events</span>
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <Link 
                  href="/about" 
                  className="border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-6 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-center flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Zero Fraud Guarantee</span>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Instant Delivery</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform rotate-1 overflow-hidden">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-5 blur-xl"></div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-bold text-gray-900 dark:text-white">Summer Music Festival</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">July 15, 2024 • City Park Arena</p>
                    </div>
                  </div>
                  <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs font-medium px-3 py-1 rounded-full">Verified</span>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">TICKET HOLDER</span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">SEAT</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white">Alex Johnson</span>
                    <span className="font-semibold text-gray-900 dark:text-white">A-12</span>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">TOKEN ID</p>
                      <p className="font-mono text-sm text-gray-900 dark:text-white">0x8a3b...c7d2</p>
                    </div>
                    <div className="w-16 h-16 bg-white dark:bg-gray-700 p-1 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="w-full h-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center rounded">
                        <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-500 rounded-full opacity-10 blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500 rounded-full opacity-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700">
        <div className="container px-4 mx-auto">
          <p className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 mb-8">TRUSTED BY LEADING EVENT ORGANIZERS</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60">
            {['Live Nation', 'AEG', 'Ticketmaster', 'Eventbrite', 'Festival Republic'].map((company) => (
              <div key={company} className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-900">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Enterprise-Grade Security</h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">Advanced technology ensures every ticket is authentic and protected against fraud.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
              <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 极值-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Blockchain Verification</h3>
              <p className="text-gray-600 dark:text-gray-300">Each ticket is recorded on a distributed ledger, making counterfeiting virtually impossible.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
              <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 极 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Instant Digital Delivery</h3>
              <p className="text-gray-600 dark:text-gray-300">Receive tickets immediately after purchase with secure digital access on any device.</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
              <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Smart Validation</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced QR technology with rotating encryption for secure entry validation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">Featured Events</h2>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">Premium experiences with guaranteed authenticity</p>
            </div>
            <Link 
              href="/events" 
              className="mt-4 md:mt-0 flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold group"
            >
              View All Events
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => {
                const eventDate = new Date(event.date);
                const isLowTickets = event.availableTickets < 10;
                const isSoldOut = event.availableTickets === 0;
                
                return (
                  <div key={event.id} className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group">
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                      <div className="absolute top-4 left-4">
                        {isSoldOut ? (
                          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">Sold Out</span>
                        ) : isLowTickets ? (
                          <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">Limited Tickets</span>
                        ) : (
                          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">Available</span>
                        )}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <p className="text-sm">{eventDate.toLocaleDateString()}</p>
                        <h3 className="text-xl font-bold mt-1">{event.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{event.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Venue</p>
                          <p className="font-semibold text-gray-900 dark:text-white">{event.venue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
                          <p className="font-semibold text-blue-600 dark:text-blue-400">${event.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      {isLowTickets && !isSoldOut && (
                        <div className="mb-4">
                          <CountdownTimer targetDate={eventDate} />
                        </div>
                      )}
                      
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Tickets Left</p>
                          <p className={`font-semibold ${
                            isSoldOut ? 'text-red-600 dark:text-red-400' : 
                            isLowTickets ? 'text-amber-600 dark:text-amber-400' : 
                            'text-green-600 dark:text-green-400'
                          }`}>
                            {isSoldOut ? 'Sold Out' : `${event.availableTickets} available`}
                          </p>
                        </div>
                      </div>
                      
                      <Link 
                        href={`/events/${event.id}`}
                        className={`block w-full text-center py-3 px-4 rounded-xl font-semibold transition-all ${
                          isSoldOut 
                            ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg'
                        }`}
                        onClick={e => isSoldOut && e.preventDefault()}
                      >
                        {isSoldOut ? 'Sold Out' : 'Get Tickets'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No upcoming events</h3>
              <p className="text-gray-500 dark:text-gray-400">Check back later for premium events</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience Secure Ticketing?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of event-goers who trust our platform for guaranteed authenticity and seamless experiences.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Create Account
            </Link>
            <Link 
              href="/events" 
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}