import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FolderKanban, CreditCard, Star,
  MessageSquare, Settings, LogOut, Code2, Menu, X
} from 'lucide-react';
import { useAuth } from '../middlewares/Authcontext';
import { toast } from 'react-hot-toast';

// ─── Nav Items ────────────────────────────────────────────────────────────────

const NAV = [
  { to: '/',         icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/projects', icon: FolderKanban,    label: 'Projects'  },
  { to: '/plans',    icon: CreditCard,      label: 'Plans'     },
  { to: '/reviews',  icon: Star,            label: 'Reviews'   },
  { to: '/contact',  icon: MessageSquare,   label: 'Contact'   },
  { to: '/settings', icon: Settings,        label: 'Settings'  },
];

// ─── Sidebar Content ──────────────────────────────────────────────────────────

const SidebarContent = ({ onClose }) => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const avatar = user?.name?.charAt(0)?.toUpperCase() || 'A';

  return (
    <div className="flex flex-col h-full relative z-10">

      {/* Glass shine overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

      {/* Logo */}
      <div className="relative flex items-center gap-3 px-5 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-indigo-500/15 border border-indigo-500/30 rounded-xl flex items-center justify-center">
          <Code2 size={18} className="text-indigo-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-white leading-tight">MJ Coder</p>
          <p className="text-xs text-slate-400">Admin Panel</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="relative flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive
                ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-700 hover:text-slate-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-indigo-400' : ''} />
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="relative px-3 py-4 border-t border-white/10 space-y-1">

        {/* User Info */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-bold shrink-0">
            {avatar}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {user?.name || 'Admin'}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.email || ''}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>

      </div>
    </div>
  );
};

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-slate-200 overflow-hidden" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 bg-white/5 backdrop-blur-xl border-r border-white/10 shadow-xl relative overflow-hidden shrink-0">
        <SidebarContent onClose={undefined} />
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Drawer */}
          <aside className="relative w-64 bg-white/5 backdrop-blur-xl border-r border-white/10 flex flex-col shadow-2xl z-10 overflow-hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white z-20"
            >
              <X size={18} />
            </button>
            <SidebarContent onClose={() => setSidebarOpen(false)} />
          </aside>

        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Mobile Top Bar */}
        <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white/5 backdrop-blur-xl border-b border-white/10 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white transition"
          >
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Code2 size={16} className="text-sky-400" />
            <span className="text-sm font-bold text-white">MJ Coder</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}