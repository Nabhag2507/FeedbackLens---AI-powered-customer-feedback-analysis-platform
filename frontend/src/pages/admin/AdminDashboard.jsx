import React, { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/feedback')
      .then(res => res.json())
      .then(data => {
        setFeedbacks(data.feedbacks || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center font-bold text-slate-500">Loading real-time data...</div>;

  const totalReviews = feedbacks.length;
  const positiveCount = feedbacks.filter(f => f.ai_analysis?.sentiment === "positive").length;
  const negativeCount = feedbacks.filter(f => f.ai_analysis?.sentiment === "negative").length;
  const neutralCount = feedbacks.filter(f => f.ai_analysis?.sentiment === "neutral").length;

  const posPct = totalReviews ? Math.round((positiveCount/totalReviews)*100) : 0;
  const negPct = totalReviews ? Math.round((negativeCount/totalReviews)*100) : 0;
  const neuPct = totalReviews ? Math.round((neutralCount/totalReviews)*100) : 0;

  const categories = {};
  feedbacks.forEach(f => {
    const cat = f.ai_analysis?.category || "unknown";
    categories[cat] = (categories[cat] || 0) + 1;
  });
  const sortedCategories = Object.entries(categories).sort((a,b) => b[1]-a[1]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, Admin!</h1>
          <p className="text-slate-500">Here is the real-time feedback data from MongoDB.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Total Reviews</span>
          </div>
          <span className="text-3xl font-extrabold text-slate-900">{totalReviews}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Positive</span>
          </div>
          <span className="text-3xl font-extrabold text-green-600">{positiveCount}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Negative</span>
          </div>
          <span className="text-3xl font-extrabold text-red-600">{negativeCount}</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Neutral</span>
          </div>
          <span className="text-3xl font-extrabold text-slate-400">{neutralCount}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Sentiment Distribution</h2>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="space-y-2 w-full max-w-xs">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span>Positive</span>
                <span className="font-medium">{posPct}% ({positiveCount})</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span>Negative</span>
                <span className="font-medium">{negPct}% ({negativeCount})</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-400"></span>Neutral</span>
                <span className="font-medium">{neuPct}% ({neutralCount})</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Category Distribution</h2>
          <div className="space-y-4">
            {sortedCategories.map(([cat, count]) => {
              const pct = totalReviews ? Math.round((count/totalReviews)*100) : 0;
              return (
                <div key={cat}>
                  <div className="flex justify-between text-sm mb-1 capitalize">
                    <span className="text-slate-600">{cat}</span>
                    <span className="font-medium">{count} ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${pct}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Feedback Logs</h2>
        <div className="space-y-4">
          {feedbacks.slice(0, 10).map((f) => (
            <div key={f._id} className="p-4 border border-slate-100 rounded-lg bg-slate-50">
               <div className="flex justify-between mb-2">
                 <span className="text-sm font-semibold capitalize px-2 py-1 bg-white rounded shadow-sm border border-slate-200">{f.ai_analysis?.category}</span>
                 <span className={`text-sm font-bold capitalize ${f.ai_analysis?.sentiment === 'positive' ? 'text-green-600' : f.ai_analysis?.sentiment === 'negative' ? 'text-red-600' : 'text-slate-500'}`}>{f.ai_analysis?.sentiment}</span>
               </div>
               <p className="text-slate-700">"{f.raw_text}"</p>
               <p className="text-xs text-slate-400 mt-2">{new Date(f.submitted_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
