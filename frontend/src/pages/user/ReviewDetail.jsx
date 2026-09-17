import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, User, Sparkles } from 'lucide-react';

export default function ReviewDetail() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/dashboard/reviews" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to My Reviews
      </Link>

      <div className="bg-white p-6 md:p-8 rounded-xl border border-slate-200 shadow-sm space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Review Details</h1>
          <p className="text-sm text-slate-500">Submitted on Mar 15, 2024 • 10:24 AM</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Your Feedback</h3>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 relative">
            <div className="absolute top-4 left-4 text-slate-300">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11L8.5 16H5.5L7 11H5V5H10V11ZM19 11L17.5 16H14.5L16 11H14V5H19V11Z" />
              </svg>
            </div>
            <p className="pl-8 text-slate-700 italic text-lg leading-relaxed">
              Please add dark mode to the application. It would be much easier on the eyes during night time.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">AI Analysis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium uppercase">Predicted Category</p>
                <p className="font-semibold text-slate-900">Complaint</p>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase mb-1">Sentiment</p>
              <p className="font-semibold text-slate-900">Neutral</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-xs text-slate-500 font-medium uppercase mb-1">Confidence</p>
              <p className="font-semibold text-slate-900">67%</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Final Classification</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-primary-50 border border-primary-100 p-4 rounded-lg flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary-600 shadow-sm">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-primary-600 font-medium uppercase">Your Selection</p>
                <p className="font-bold text-primary-900">Feature Request</p>
              </div>
            </div>
            <div className="flex-1 bg-green-50 border border-green-100 p-4 rounded-lg flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-green-600 font-medium uppercase">Verified By Admin</p>
                <p className="font-bold text-green-900">Yes</p>
              </div>
            </div>
            <div className="flex-1 bg-slate-50 border border-slate-200 p-4 rounded-lg flex items-center gap-4">
               <div>
                <p className="text-xs text-slate-500 font-medium uppercase">Final Category</p>
                <p className="font-bold text-slate-900">Feature Request</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Timeline</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
            
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-slate-900">Feedback submitted</div>
                  <time className="text-xs font-medium text-slate-500">Mar 15, 10:24 AM</time>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-slate-900">AI analysis completed</div>
                  <time className="text-xs font-medium text-slate-500">Mar 15, 10:24 AM</time>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <User className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-slate-900">You updated the category</div>
                  <time className="text-xs font-medium text-slate-500">Mar 15, 10:26 AM</time>
                </div>
              </div>
            </div>

            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-primary-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-primary-100 bg-primary-50 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <div className="font-bold text-primary-900">Verified by admin</div>
                  <time className="text-xs font-medium text-primary-700">Mar 16, 08:12 AM</time>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
