import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function FeedbackAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Review Analysis</h1>
        <p className="text-slate-500">Our AI has analyzed your feedback. You can edit the category if needed.</p>
      </div>

      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
        <p className="text-slate-700 italic">"Please add dark mode to the application. It would be much easier on the eyes during night time."</p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-tr from-primary-600 to-primary-400 rounded-lg shadow-lg shadow-primary-500/30">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            AI Analysis Result
          </h2>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">Moderate Confidence</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Predicted Category</p>
            <p className="font-semibold text-slate-900">Complaint</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Sentiment</p>
            <p className="font-semibold text-slate-900">Neutral</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <p className="text-xs text-slate-500 font-medium mb-1 uppercase tracking-wider">Confidence</p>
            <p className="font-semibold text-slate-900">67%</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Select or modify category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="category" className="text-primary-600 focus:ring-primary-500 w-4 h-4" />
            <span className="font-medium text-slate-700 text-sm">Complaint</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="category" className="text-primary-600 focus:ring-primary-500 w-4 h-4" />
            <span className="font-medium text-slate-700 text-sm">Praise</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="category" className="text-primary-600 focus:ring-primary-500 w-4 h-4" />
            <span className="font-medium text-slate-700 text-sm">Bug Report</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border-2 border-primary-500 bg-primary-50 cursor-pointer">
            <input type="radio" name="category" className="text-primary-600 focus:ring-primary-500 w-4 h-4" defaultChecked />
            <span className="font-medium text-slate-900 text-sm">Feature Request</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="category" className="text-primary-600 focus:ring-primary-500 w-4 h-4" />
            <span className="font-medium text-slate-700 text-sm">Suggestion</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="category" className="text-primary-600 focus:ring-primary-500 w-4 h-4" />
            <span className="font-medium text-slate-700 text-sm">Question</span>
          </label>
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
            <input type="radio" name="category" className="text-primary-600 focus:ring-primary-500 w-4 h-4" />
            <span className="font-medium text-slate-700 text-sm">Other</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Your notes (optional)</label>
          <textarea 
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows="3"
            placeholder="Add any additional context..."
            defaultValue="I think this is more of a feature request."
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <button type="button" onClick={() => navigate('/dashboard')} className="px-5 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">
            Cancel
          </button>
          <button type="button" onClick={() => navigate('/dashboard/reviews')} className="px-6 py-2.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium rounded-xl shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98]">
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}
