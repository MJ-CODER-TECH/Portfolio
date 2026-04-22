import { useEffect, useState } from 'react';
import { FolderKanban, CreditCard, Star, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { getProjects, getPlans, getReviews, getContacts } from '../services/api';

/* =========================
   🔹 STAT CARD COMPONENT
   reusable card for dashboard stats
========================= */
const StatCard = ({ icon: Icon, label, value, color, sub }) => {
  return (
   <div className="stat-card bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
  
  <div className="flex items-start justify-between">
    <div>
      <p className="text-xs text-slate-400 font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-white">{value ?? '—'}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>

    {/* icon box */}
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
  </div>

</div>
  );
};


/* =========================
   🔹 MAIN DASHBOARD COMPONENT (CONST STYLE)
========================= */
const Dashboard = () => {

  // 👉 all stats store
  const [stats, setStats] = useState({});

  // 👉 loading state
  const [loading, setLoading] = useState(true);


  /* =========================
     🔹 FETCH ALL DATA (API CALL)
  ========================= */
  const fetchAllData = async () => {
    try {
      // 👉 parallel API calls (fast performance)
      const [projects, plans, reviews, contacts] = await Promise.allSettled([
        getProjects(),
        getPlans(),
        getReviews(),
        getContacts()
      ]);

      // 👉 safe data extraction (crash avoid)
      const proj = projects.value?.data || [];
      const pl = plans.value?.data || [];
      const rev = reviews.value?.data || [];
      const con = contacts.value?.data || [];

      // 👉 final stats calculation
      setStats({
        projects: Array.isArray(proj) ? proj.length : 0,
        plans: Array.isArray(pl) ? pl.length : 0,

        // pending review count
        pendingReviews: Array.isArray(rev)
          ? rev.filter(r => !r.approved && !r.isApproved).length
          : 0,

        totalReviews: Array.isArray(rev) ? rev.length : 0,

        // unread messages
        newMessages: Array.isArray(con)
          ? con.filter(c => c.status === 'new').length
          : 0,

        totalMessages: Array.isArray(con) ? con.length : 0,
      });

    } catch (err) {
      console.error("Dashboard Error:", err);
    } finally {
      setLoading(false);
    }
  };


  /* =========================
     🔹 RUN ON PAGE LOAD
  ========================= */
  useEffect(() => {
    fetchAllData();
  }, []);


  /* =========================
     🔹 CARD DATA (UI CONFIG)
  ========================= */
  const cards = [
    {
      icon: FolderKanban,
      label: 'Total Projects',
      value: stats.projects,
      color: 'bg-brand-500/15 text-brand-400',
      sub: 'Active portfolio items',
    },
    {
      icon: CreditCard,
      label: 'Pricing Plans',
      value: stats.plans,
      color: 'bg-purple-500/15 text-purple-400',
      sub: 'Available subscription tiers',
    },
    {
      icon: Star,
      label: 'Pending Reviews',
      value: stats.pendingReviews,
      color: 'bg-yellow-500/15 text-yellow-400',
      sub: `${stats.totalReviews || 0} total reviews`,
    },
    {
      icon: MessageSquare,
      label: 'New Messages',
      value: stats.newMessages,
      color: 'bg-green-500/15 text-green-400',
      sub: `${stats.totalMessages || 0} total messages`,
    },
  ];


  /* =========================
     🔹 LOADING UI
  ========================= */
  if (loading) {
    return (
      <div className="animate-fade-in">
        <div className="section-header">
          <h1 className="page-title">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="card h-28 animate-pulse bg-dark-700" />
          ))}
        </div>
      </div>
    );
  }


  /* =========================
     🔹 MAIN UI
  ========================= */
  return (
    <div className="animate-fade-in space-y-6">

      {/* HEADER */}
      <div className="section-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Welcome back! Here's what's happening.
          </p>
        </div>

        {/* date */}
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-dark-700 border border-dark-400 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}
        </div>
      </div>


      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

  {/* QUICK OVERVIEW */}
  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">

    {/* shine */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-brand-400" />
        <h3 className="text-sm font-semibold text-white">Quick Overview</h3>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Projects in Portfolio', val: stats.projects, color: 'bg-brand-500' },
          { label: 'Approved Reviews', val: (stats.totalReviews || 0) - (stats.pendingReviews || 0), color: 'bg-green-500' },
          { label: 'Pending Reviews', val: stats.pendingReviews, color: 'bg-yellow-500' },
          { label: 'Unread Messages', val: stats.newMessages, color: 'bg-blue-500' },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${item.color}`} />
              <span className="text-sm text-slate-400">{item.label}</span>
            </div>
            <span className="text-sm font-semibold text-white">{item.val ?? 0}</span>
          </div>
        ))}
      </div>
    </div>
  </div>


  {/* QUICK ACTIONS */}
  <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">

    {/* shine */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-40 pointer-events-none" />

    <div className="relative z-10">
      <h3 className="text-sm font-semibold text-white mb-4">Admin Actions</h3>

      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Add Project', to: '/projects', color: 'bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 border border-brand-500/20' },
          { label: 'Add Plan', to: '/plans', color: 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20' },
          { label: 'Review Pending', to: '/reviews', color: 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' },
          { label: 'Read Messages', to: '/contact', color: 'bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20' },
        ].map((a) => (
          <a
            key={a.label}
            href={a.to}
            className={`rounded-xl px-3 py-2.5 text-xs font-medium text-center transition-all duration-200 ${a.color} hover:scale-[1.03]`}
          >
            {a.label}
          </a>
        ))}
      </div>
    </div>
  </div>

</div>
    </div>
  );
};


/* =========================
   🔹 EXPORT
========================= */
export default Dashboard;