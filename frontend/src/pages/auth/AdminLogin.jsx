import { Link, useNavigate } from 'react-router-dom';
import { Layers } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Layers className="text-primary-600 w-8 h-8" />
          <span>FeedbackLens</span>
        </Link>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Portal</h1>
        <p className="text-slate-500">Login to access the admin dashboard</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <div className="relative">
            <input 
              type="email" 
              placeholder="admin@acme.com" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <div className="relative">
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-colors"
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-primary-600 hover:text-primary-700 font-medium">Forgot password?</a>
        </div>

        <button type="submit" className="w-full py-3.5 px-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white rounded-xl font-medium shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98]">
          Login
        </button>
      </form>
      
      <div className="mt-6 flex items-center justify-center">
        <Link to="/login" className="text-sm text-slate-500 hover:text-slate-700">
          User login?
        </Link>
      </div>
    </div>
  );
}
