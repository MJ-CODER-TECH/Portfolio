import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const { pathname } = useLocation();

  const links = [
    { label: 'Dashboard', to: '/admin/dashboard' },
    { label: 'Projects', to: '/admin/projects' },
    { label: 'Plans', to: '/admin/plans' },
    { label: 'Reviews', to: '/admin/reviews' },
    { label: 'Messages', to: '/admin/messages' },
    { label: 'Blogs', to: '/admin/blogs' },
    { label: 'Settings', to: '/admin/settings' },
  ];

  return (
    <div className="w-72 min-h-screen p-6 
      bg-white/5 backdrop-blur-xl border-r border-white/10 
      shadow-xl relative overflow-hidden"
    >

      {/* glass shine */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-8 text-white">
          MJ Admin
        </h2>

        <nav className="space-y-2">
          {links.map((link) => {
            const active = pathname === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                className={`
                  sidebar-link
                  ${active ? 'active' : ''}
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}