import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/react';

export default function UserDashboard() {
  const { user } = useUser();
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [feedbacks, setFeedbacks] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchFeedbacks = () => {
    if (!user) return;
    fetch(`https://feedbacklens-ai-powered-customer.onrender.com/api/feedback?user_id=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data.feedbacks || []);
        setFetching(false);
      })
      .catch(err => {
        console.error(err);
        setFetching(false);
      });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) return;
    
    setLoading(true);
    try {
      await fetch('https://feedbacklens-ai-powered-customer.onrender.com/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          text: feedback
        })
      });
      setFeedback(''); // clear input
      fetchFeedbacks(); // instantly refresh the list!
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const totalReviews = feedbacks.length;
  const positiveCount = feedbacks.filter(f => f.ai_analysis?.sentiment === "positive").length;
  const negativeCount = feedbacks.filter(f => f.ai_analysis?.sentiment === "negative").length;
  const neutralCount = feedbacks.filter(f => f.ai_analysis?.sentiment === "neutral").length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/40 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Hi, {user?.firstName}! 👋</h1>
        <p className="text-slate-500 mb-6">How was your experience today? Our AI will analyze your feedback instantly.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <textarea
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px] resize-none"
              placeholder="E.g. The app is really fast but the dark mode hurts my eyes..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              disabled={loading || !feedback.trim()}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-xl font-medium shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing AI...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-sm font-semibold text-slate-500 block mb-2">My Total Reviews</span>
          <span className="text-3xl font-extrabold text-slate-900">{fetching ? '-' : totalReviews}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-sm font-semibold text-slate-500 block mb-2">Positive</span>
          <span className="text-3xl font-extrabold text-green-600">{fetching ? '-' : positiveCount}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-sm font-semibold text-slate-500 block mb-2">Negative</span>
          <span className="text-3xl font-extrabold text-red-600">{fetching ? '-' : negativeCount}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-slate-100 shadow-sm">
          <span className="text-sm font-semibold text-slate-500 block mb-2">Neutral</span>
          <span className="text-3xl font-extrabold text-slate-400">{fetching ? '-' : neutralCount}</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">My Feedback History</h2>
        {fetching ? (
          <p className="text-slate-500 text-center py-4">Loading...</p>
        ) : feedbacks.length === 0 ? (
          <p className="text-slate-500 text-center py-4">You haven't submitted any feedback yet.</p>
        ) : (
          <div className="space-y-4">
            {feedbacks.map((f) => (
              <div key={f._id} className="p-4 border border-slate-100 rounded-lg bg-slate-50 flex flex-col gap-2">
                 <div className="flex justify-between items-center">
                   <span className="text-sm font-semibold capitalize px-2 py-1 bg-white rounded shadow-sm border border-slate-200">
                     {f.ai_analysis?.category}
                   </span>
                   <span className={`text-sm font-bold capitalize ${f.ai_analysis?.sentiment === 'positive' ? 'text-green-600' : f.ai_analysis?.sentiment === 'negative' ? 'text-red-600' : 'text-slate-500'}`}>
                     {f.ai_analysis?.sentiment} ({Math.round(f.ai_analysis?.confidence * 100)}%)
                   </span>
                 </div>
                 <p className="text-slate-700">"{f.raw_text}"</p>
                 <p className="text-xs text-slate-400">{new Date(f.submitted_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
