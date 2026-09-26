import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Layers, 
  LayoutDashboard, 
  MessageSquarePlus, 
  List, 
  User, 
  Shield, 
  HelpCircle,
  Users,
  Settings,
  Bell,
  Search,
  Menu
} from 'lucide-react';
import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { UserButton } from '@clerk/react';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const userNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Submit Feedback', href: '/dashboard/feedback/analysis', icon: MessageSquarePlus },
  { name: 'My Reviews', href: '/dashboard/reviews', icon: List },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Security', href: '/dashboard/settings/password', icon: Shield },
  { name: 'Help & Support', href: '#', icon: HelpCircle },
];

const adminNav = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Reviews', href: '/admin/reviews', icon: List },
  { name: 'Analytics', href: '#', icon: Search },
  { name: 'Customers', href: '#', icon: Users },
  { name: 'Categories', href: '#', icon: Layers },
  { name: 'Settings', href: '#', icon: Settings },
];

export default function DashboardLayout({ role = 'user' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = role === 'admin' ? adminNav : userNav;
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 flex font-sans text-slate-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 flex flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 border-b border-slate-200/60 bg-white/50">
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
            <Layers className="text-primary-600" />
            <span>FeedbackLens</span>
          </Link>
        </div>

        {role === 'admin' && (
          <div className="px-6 py-4">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Admin Portal</h2>
          </div>
        )}

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary-50 text-primary-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              {role === 'admin' ? 'A' : 'R'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">
                {role === 'admin' ? 'Admin User' : 'Rahul Sharma'}
              </p>
              <p className="text-xs text-slate-500 truncate">
                {role === 'admin' ? 'admin@acme.com' : 'Customer'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white/60 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex-1 flex items-center justify-end gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
            </button>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-100/50 p-1.5 rounded-lg transition-colors">
              {role === 'admin' ? (
                <button 
                  onClick={() => {
                    localStorage.removeItem('adminAuth');
                    navigate('/admin/login');
                  }}
                  className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <UserButton afterSignOutUrl="/" />
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 relative">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
