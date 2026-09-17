export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Welcome back, Admin!</h1>
          <p className="text-slate-500">Here's what's happening with your feedback.</p>
        </div>
        <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm outline-none focus:ring-2 focus:ring-primary-500">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>All time</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Total Reviews</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">+12%</span>
          </div>
          <span className="text-3xl font-extrabold text-slate-900">1,248</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Positive</span>
            <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full">+5%</span>
          </div>
          <span className="text-3xl font-extrabold text-green-600">642</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Negative</span>
            <span className="text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">+18%</span>
          </div>
          <span className="text-3xl font-extrabold text-red-600">406</span>
        </div>
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-slate-500">Pending</span>
            <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2.5 py-1 rounded-full">-5%</span>
          </div>
          <span className="text-3xl font-extrabold text-yellow-600">200</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Sentiment Distribution</h2>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="w-48 h-48 rounded-full border-[16px] border-slate-100 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border-[16px] border-green-500" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%)' }}></div>
              <div className="absolute inset-0 rounded-full border-[16px] border-red-500" style={{ clipPath: 'polygon(50% 50%, 50% 100%, 0% 100%, 0% 50%)' }}></div>
              <div className="absolute inset-0 rounded-full border-[16px] border-slate-400" style={{ clipPath: 'polygon(50% 50%, 0% 50%, 0% 0%, 50% 0%)' }}></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900">1,248</div>
                <div className="text-xs text-slate-500">Reviews</div>
              </div>
            </div>
            <div className="space-y-2 w-full max-w-xs">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span>Positive</span>
                <span className="font-medium">51% (642)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span>Negative</span>
                <span className="font-medium">33% (406)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-slate-400"></span>Neutral</span>
                <span className="font-medium">16% (200)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Category Distribution</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Complaint</span>
                <span className="font-medium">380</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Praise</span>
                <span className="font-medium">240</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-primary-400 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Feature Request</span>
                <span className="font-medium">180</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-primary-300 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Bug Report</span>
                <span className="font-medium">160</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-slate-400 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Suggestion</span>
                <span className="font-medium">150</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-slate-300 h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-600">Question</span>
                <span className="font-medium">80</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-slate-200 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
