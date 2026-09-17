import { Outlet, Link } from 'react-router-dom';
import { Layers } from 'lucide-react';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Layers className="text-primary-500" />
          <span>FeedbackLens</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-primary-400">Features</a>
          <a href="#pricing" className="hover:text-primary-400">Pricing</a>
          <a href="#about" className="hover:text-primary-400">About</a>
          <a href="#contact" className="hover:text-primary-400">Contact</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm hover:text-primary-400">Login</Link>
          <Link to="/login" className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg text-sm font-medium transition-colors">
            Get Started
          </Link>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
