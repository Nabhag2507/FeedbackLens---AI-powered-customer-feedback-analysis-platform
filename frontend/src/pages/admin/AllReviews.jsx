import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';

export default function AllReviews() {
  const reviews = [
    { id: 'RV-2024-00123', user: 'Priya Mehta', email: 'priya@example.com', text: 'The payment page is extremely slow and sometimes shows an error.', category: 'Complaint', sentiment: 'Negative', confidence: '94%', date: 'Mar 15', status: 'Pending', statusColor: 'text-yellow-600 bg-yellow-50', catColor: 'text-red-700 bg-red-50' },
    { id: 'RV-2024-00122', user: 'Amit Kumar', email: 'amit@example.com', text: 'Great app! Really love the UI.', category: 'Praise', sentiment: 'Positive', confidence: '99%', date: 'Mar 15', status: 'Verified', statusColor: 'text-green-600 bg-green-50', catColor: 'text-green-700 bg-green-50' },
    { id: 'RV-2024-00121', user: 'Sneha Patel', email: 'sneha@example.com', text: 'Please add dark mode...', category: 'Feature Request', sentiment: 'Neutral', confidence: '82%', date: 'Mar 14', status: 'Verified', statusColor: 'text-green-600 bg-green-50', catColor: 'text-primary-700 bg-primary-50' },
    { id: 'RV-2024-00120', user: 'Vikram Singh', email: 'vikram@example.com', text: 'App crashes on login...', category: 'Bug Report', sentiment: 'Negative', confidence: '88%', date: 'Mar 14', status: 'In Progress', statusColor: 'text-blue-600 bg-blue-50', catColor: 'text-red-700 bg-red-50' },
    { id: 'RV-2024-00119', user: 'Neha Joshi', email: 'neha@example.com', text: 'Customer support was very helpful.', category: 'Praise', sentiment: 'Positive', confidence: '96%', date: 'Mar 12', status: 'Verified', statusColor: 'text-green-600 bg-green-50', catColor: 'text-green-700 bg-green-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Reviews</h1>
        <p className="text-slate-500">Manage and classify customer feedback.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex flex-col gap-4 bg-slate-50">
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium bg-white border border-slate-200 shadow-sm rounded-md text-slate-900">All</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Pending</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Reviewed</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Resolved</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Ignored</button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search reviews, users, emails..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500">
                <option>All Categories</option>
                <option>Complaints</option>
                <option>Feature Requests</option>
              </select>
              <select className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500">
                <option>All Sentiments</option>
                <option>Positive</option>
                <option>Negative</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Feedback</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Sentiment</th>
                <th className="px-6 py-4">Conf.</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                        {review.user.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{review.user}</p>
                        <p className="text-xs text-slate-500">{review.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-700 max-w-xs truncate">{review.text}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${review.catColor}`}>{review.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${review.sentiment === 'Positive' ? 'text-green-600' : review.sentiment === 'Negative' ? 'text-red-600' : 'text-slate-600'}`}>{review.sentiment}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{review.confidence}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${review.statusColor}`}>{review.status}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{review.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/admin/reviews/${review.id}`} className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 flex items-center justify-center gap-2">
          <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-50">Previous</button>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-md bg-primary-600 text-white font-medium">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-700 font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-700 font-medium">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-500">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-700 font-medium">12</button>
          </div>
          <button className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">Next</button>
        </div>
      </div>
    </div>
  );
}
