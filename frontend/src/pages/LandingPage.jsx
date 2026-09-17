import { Link } from 'react-router-dom';
import { Layers, Zap, Shield, BarChart3, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-slate-900 text-slate-50 min-h-[calc(100vh-76px)] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-b from-primary-600/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-blue-600/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>
      
      <div className="container mx-auto px-6 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-md text-primary-300 text-sm font-medium border border-slate-700/50 shadow-xl shadow-primary-500/10">
              <Zap className="w-4 h-4 text-primary-400" />
              <span>AI-Powered • Multi-Tenant • Easy to Integrate</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight">
              Turn Feedback into <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-purple-400 to-blue-400">
                Meaningful Insights
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Collect, classify and analyze customer feedback using AI. 
              Help your users, improve your product, and make data-driven decisions seamlessly.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/login" className="px-6 py-3.5 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white rounded-xl font-medium shadow-lg shadow-primary-500/30 transition-all active:scale-[0.98] flex items-center gap-2">
                Get Started
                <ChevronRight className="w-4 h-4" />
              </Link>
              <button className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md border border-slate-700 rounded-xl font-medium transition-all active:scale-[0.98] flex items-center gap-2 shadow-lg">
                <BarChart3 className="w-4 h-4 text-slate-400" />
                Watch Demo
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-800/50">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">AI Classification</h3>
                  <p className="text-sm text-slate-400">Accurate & fast analysis</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-200">Rich Analytics</h3>
                  <p className="text-sm text-slate-400">Understand your users</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative lg:ml-10">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/30 via-purple-500/20 to-blue-500/30 rounded-[2rem] blur-3xl transform rotate-3"></div>
            <div className="relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center gap-2 mb-6 border-b border-slate-700/50 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
              </div>
              <div className="space-y-4">
                <div className="bg-slate-700/50 backdrop-blur-md rounded-xl p-4 flex gap-4 items-center border border-slate-600/30">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-bold border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">P</div>
                  <div className="flex-1">
                    <div className="h-2.5 w-24 bg-slate-600 rounded-full mb-2.5"></div>
                    <div className="h-2.5 w-full bg-slate-600 rounded-full"></div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold tracking-wide">Positive</div>
                </div>
                <div className="bg-slate-700/50 backdrop-blur-md rounded-xl p-4 flex gap-4 items-center border border-slate-600/30 transform scale-[1.02] shadow-lg shadow-black/20">
                  <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400 font-bold border border-primary-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]">F</div>
                  <div className="flex-1">
                    <div className="h-2.5 w-32 bg-slate-600 rounded-full mb-2.5"></div>
                    <div className="h-2.5 w-4/5 bg-slate-600 rounded-full"></div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-semibold tracking-wide">Feature Request</div>
                </div>
                <div className="bg-slate-700/50 backdrop-blur-md rounded-xl p-4 flex gap-4 items-center border border-slate-600/30">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 font-bold border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]">B</div>
                  <div className="flex-1">
                    <div className="h-2.5 w-16 bg-slate-600 rounded-full mb-2.5"></div>
                    <div className="h-2.5 w-2/3 bg-slate-600 rounded-full"></div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold tracking-wide">Bug Report</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-32 text-center">
          <p className="text-sm text-slate-500 font-semibold mb-8 uppercase tracking-widest">Trusted by innovative teams worldwide</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
            <span className="text-2xl font-black tracking-tight">Google</span>
            <span className="text-2xl font-black tracking-tight">Microsoft</span>
            <span className="text-2xl font-black tracking-tight">Amazon</span>
            <span className="text-2xl font-black tracking-tight">Spotify</span>
            <span className="text-2xl font-black tracking-tight">Notion</span>
            <span className="text-2xl font-black tracking-tight">Discord</span>
          </div>
        </div>
      </div>
    </div>
  );
}
