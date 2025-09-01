import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Dashboard</h1>
        <Link 
          href="/events" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Browse Events
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">My Tickets</h3>
          <p className="text-3xl font-bold text-blue-600">0</p>
          <p className="text-sm text-gray-500">Total tickets purchased</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
          <p className="text-3xl font-bold text-green-600">0</p>
          <p className="text-sm text-gray-500">Events you&#39;re attending</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Spent</h3>
          <p className="text-3xl font-bold text-purple-600">$0.00</p>
          <p className="text-sm text-gray-500">On tickets</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Recent Tickets</h2>
        
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          <p className="text-gray-500">You haven&#39;t purchased any tickets yet.</p>
          <Link 
            href="/events" 
            className="inline-block mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Browse Events
          </Link>
        </div>
      </div>
    </div>
  );
}