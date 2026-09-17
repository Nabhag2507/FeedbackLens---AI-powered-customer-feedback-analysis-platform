import { Link } from 'react-router-dom';
import { Search, Eye } from 'lucide-react';

export default function MyReviews() {
  const reviews = [
    { id: 1, text: 'Please add dark mode...', category: 'Feature Request', sentiment: 'Neutral', confidence: '67%', date: 'Mar 15, 2024', status: 'Verified', statusColor: 'text-green-600 bg-green-50', catColor: 'text-primary-700 bg-primary-50' },
    { id: 2, text: 'The app is really easy...', category: 'Praise', sentiment: 'Positive', confidence: '92%', date: 'Mar 12, 2024', status: 'Verified', statusColor: 'text-green-600 bg-green-50', catColor: 'text-green-700 bg-green-50' },
    { id: 3, text: 'Sometimes the app crashes...', category: 'Bug Report', sentiment: 'Negative', confidence: '88%', date: 'Mar 10, 2024', status: 'Pending', statusColor: 'text-yellow-600 bg-yellow-50', catColor: 'text-red-700 bg-red-50' },
    { id: 4, text: 'Great customer support!', category: 'Praise', sentiment: 'Positive', confidence: '95%', date: 'Mar 08, 2024', status: 'Verified', statusColor: 'text-green-600 bg-green-50', catColor: 'text-green-700 bg-green-50' },
    { id: 5, text: 'The payment page is slow.', category: 'Complaint', sentiment: 'Negative', confidence: '76%', date: 'Mar 05, 2024', status: 'Verified', statusColor: 'text-green-600 bg-green-50', catColor: 'text-red-700 bg-red-50' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">My Reviews</h1>
        <p className="text-slate-500">Here are all the feedback you have submitted.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium bg-white border border-slate-200 shadow-sm rounded-md text-slate-900">All</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Complaints</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Praise</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Feature Requests</button>
            <button className="px-3 py-1.5 text-sm font-medium hover:bg-slate-200/50 rounded-md text-slate-600">Bug Reports</button>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search your reviews..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-white border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-4">Feedback</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Sentiment</th>
                <th className="px-6 py-4">Confidence</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reviews.map((review) => (
                <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{review.text}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${review.catColor}`}>{review.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${review.sentiment === 'Positive' ? 'text-green-600' : review.sentiment === 'Negative' ? 'text-red-600' : 'text-slate-600'}`}>{review.sentiment}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-700">{review.confidence}</td>
                  <td className="px-6 py-4 text-slate-500">{review.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${review.statusColor}`}>{review.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/dashboard/reviews/${review.id}`} className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
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
          </div>
          <button className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:text-primary-700">Next</button>
        </div>
      </div>
    </div>
  );
}
