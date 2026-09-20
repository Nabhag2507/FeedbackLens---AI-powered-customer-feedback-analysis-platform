import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function AdminReviewDetail() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/admin/reviews" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Reviews
      </Link>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 w-full bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Review #RV-2024-00123</h1>
              <p className="text-sm text-slate-500">Submitted on Mar 15, 2024 • 10:24 AM</p>
            </div>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wider">Pending</span>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Customer Information</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-lg">
                P
              </div>
              <div>
                <p className="font-bold text-slate-900">Priya Mehta</p>
                <p className="text-sm text-slate-500 mb-1">priya@example.com</p>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded uppercase tracking-wider">Customer</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Review Content</h3>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative">
              <div className="absolute top-4 left-4 text-slate-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 11L8.5 16H5.5L7 11H5V5H10V11ZM19 11L17.5 16H14.5L16 11H14V5H19V11Z" />
                </svg>
              </div>
              <p className="pl-8 text-slate-700 italic text-lg leading-relaxed">
                The payment page is extremely slow and sometimes shows an error. Please fix this issue soon.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">AI Analysis</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase">Predicted Category</p>
                  <p className="font-bold text-slate-900">Complaint</p>
                </div>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 font-medium uppercase mb-1">Sentiment</p>
                <p className="font-bold text-red-600">Negative</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                <p className="text-xs text-slate-500 font-medium uppercase mb-1">Confidence</p>
                <p className="font-bold text-slate-900">94%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:w-80 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Classification</label>
              <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 font-medium text-slate-900">
                <option>Complaint</option>
                <option>Praise</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Suggestion</option>
                <option>Question</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Status</label>
              <select className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary-500 font-medium text-slate-900">
                <option>Pending</option>
                <option>Reviewed</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Ignored</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Admin Notes</label>
              <textarea 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none text-sm"
                rows="4"
                placeholder="Add notes about this review..."
              ></textarea>
            </div>

            <button className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
