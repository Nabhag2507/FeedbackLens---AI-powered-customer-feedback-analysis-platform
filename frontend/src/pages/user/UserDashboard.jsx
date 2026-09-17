import { Link, useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const navigate = useNavigate();

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard/feedback/analysis');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Hello, Rahul! 👋</h1>
        <p className="text-slate-500">Your feedback helps us build a better product.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Reviews', value: '12', color: 'text-primary-600', bg: 'bg-primary-50' },
          { label: 'Compliments', value: '5', color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Complaints', value: '4', color: 'text-red-600', bg: 'bg-red-50' },
          { label: 'Feature Requests', value: '3', color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center justify-center hover:-translate-y-1 transition-transform duration-300">
            <div className={`w-14 h-14 rounded-full ${stat.bg} flex items-center justify-center mb-3`}>
              <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
            </div>
            <span className="text-sm text-slate-500 font-semibold">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Share Your Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <textarea 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4 resize-none"
            rows="4"
            placeholder="How was your experience? Tell us what you think..."
            required
          ></textarea>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 cursor-pointer hover:bg-slate-50">Bug Report</span>
            <span className="px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 cursor-pointer hover:bg-slate-50">Feature Request</span>
            <span className="px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 cursor-pointer hover:bg-slate-50">Complaint</span>
            <span className="px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 cursor-pointer hover:bg-slate-50">Praise</span>
            <span className="px-3 py-1 rounded-full border border-slate-200 text-sm text-slate-600 cursor-pointer hover:bg-slate-50">Other</span>
          </div>
          
          <button type="submit" className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors">
            Analyze & Submit
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Recent Reviews</h2>
          <Link to="/dashboard/reviews" className="text-sm font-medium text-primary-600 hover:text-primary-700">View All</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {[
            { text: 'Please add dark mode, it would be great!', category: 'Feature Request', date: 'Mar 15, 2024', status: 'Pending', statusColor: 'bg-yellow-100 text-yellow-700', catColor: 'bg-primary-50 text-primary-700' },
            { text: 'The app is really easy to use. Great work!', category: 'Praise', date: 'Mar 12, 2024', status: 'Verified', statusColor: 'bg-green-100 text-green-700', catColor: 'bg-green-50 text-green-700' },
            { text: 'Sometimes the app crashes on login.', category: 'Bug Report', date: 'Mar 10, 2024', status: 'Verified', statusColor: 'bg-green-100 text-green-700', catColor: 'bg-red-50 text-red-700' },
          ].map((review, i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-slate-700 flex-1 truncate pr-4">{review.text}</p>
              <div className="flex flex-wrap items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${review.catColor}`}>{review.category}</span>
                <span className="text-sm text-slate-500 whitespace-nowrap">{review.date}</span>
                <Link to={`/dashboard/reviews/${i}`} className="text-sm font-medium text-primary-600 hover:text-primary-700">View</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
