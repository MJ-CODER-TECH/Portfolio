import { useEffect, useState } from 'react';
import { Star, Trash2, Check, X, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  getReviewsAdmin,
  approveReview,
  deleteReview
} from '../services/api';

// ⭐ Stars Component
function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}
        />
      ))}
    </div>
  );
}

// 🎨 Avatar Colors
const avColors = [
  { bg: 'rgba(55,138,221,0.18)',  color: '#5aabff' },
  { bg: 'rgba(99,153,34,0.18)',   color: '#8bc34a' },
  { bg: 'rgba(186,117,23,0.18)', color: '#f0a030' },
  { bg: 'rgba(153,53,86,0.18)',  color: '#d47a9a' },
  { bg: 'rgba(15,110,86,0.18)',  color: '#2dd4a0' },
];

// 🏷 Status Badge
function StatusBadge({ isApproved }) {
  if (isApproved) {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
        style={{ background: 'rgba(99,153,34,0.15)', color: '#8bc34a' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-[#8bc34a]" />
        Approved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
      style={{ background: 'rgba(186,117,23,0.15)', color: '#f0a030' }}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#f0a030]" />
      Pending
    </span>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // 📦 Fetch Reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getReviewsAdmin();
      const data = res.data?.data || [];
      setReviews(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReviews(); }, []);

  // ✅ Approve / Unapprove
  const handleApprove = async (rev) => {
    const prev = [...reviews];
    try {
      setReviews(prev.map(r =>
        r._id === rev._id ? { ...r, isApproved: !r.isApproved } : r
      ));
      await approveReview(rev._id);
      toast.success(rev.isApproved ? 'Review unapproved' : 'Review approved!');
    } catch {
      setReviews(prev);
      toast.error('Failed to update review');
    }
  };

  // 🗑 Delete
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    const prev = [...reviews];
    try {
      setReviews(reviews.filter(r => r._id !== id));
      await deleteReview(id);
      toast.success('Review deleted');
    } catch {
      setReviews(prev);
      toast.error('Failed to delete');
    }
  };

  // 🔍 Filter
  const filtered = reviews.filter(r => {
    if (filter === 'pending') return !r.isApproved;
    if (filter === 'approved') return r.isApproved;
    return true;
  });

  const pendingCount = reviews.filter(r => !r.isApproved).length;

  return (
    <div className="animate-fade-in p-6">

      {/* ── HEADER ── */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Reviews</h1>
          <p className="text-sm mt-1 text-slate-500">
            {reviews.length} total reviews • {pendingCount} pending
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mt-1">
          {['all', 'pending', 'approved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors ${
                filter === f
                  ? 'bg-[#212121] text-white'
                  : 'bg-[#2a2a2a] text-white/60 hover:bg-[#212121] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── LOADING ── */}
      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-14 rounded-lg animate-pulse bg-[#1a1a1a]" />
          ))}
        </div>

      ) : filtered.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-white/5 bg-[#1a1a1a]">
          <p className="text-slate-500 text-sm">No reviews found</p>
        </div>

      ) : (
        /* ── TABLE ── */
        <div className="rounded-xl border border-white/5 overflow-hidden bg-[#1a1a1a]">

          {/* Table Head */}
          <div
            className="grid gap-3 px-4 py-3 border-b border-white/5 bg-[#111]"
            style={{ gridTemplateColumns: '2fr 90px 1.4fr 1.3fr 110px 120px 70px' }}
          >
            {['Name & Review', 'Date', 'Rating', 'Assigned To', 'Status', 'Task Type', 'Action'].map(h => (
              <div key={h} className="text-[11px] uppercase tracking-widest text-slate-600 font-medium">
                {h}
              </div>
            ))}
          </div>

          {/* Table Rows */}
          {filtered.map((rev, index) => {
            const isApproved = rev.isApproved;
            const av = avColors[index % avColors.length];
            const initial = rev.name?.charAt(0)?.toUpperCase() || '?';

            return (
              <div
                key={rev._id}
                className="grid gap-3 px-4 py-3 border-b border-white/[0.04] items-center hover:bg-white/[0.02] transition-colors last:border-none"
                style={{ gridTemplateColumns: '2fr 90px 1.4fr 1.3fr 110px 120px 70px' }}
              >

                {/* Name & Message */}
                <div>
                  <p className="text-[13px] font-medium text-slate-200">
                    {rev.name || 'Anonymous'}
                  </p>
                  {rev.message && (
                    <p className="text-[11px] text-slate-600 mt-0.5 truncate max-w-[200px]">
                      {rev.message}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center gap-1 text-[12px] text-slate-600">
                  <Clock size={11} />
                  {rev.createdAt
                    ? new Date(rev.createdAt).toLocaleDateString()
                    : 'Recently'}
                </div>

                {/* Rating Stars */}
                <div>
                  <Stars count={rev.rating} />
                  <p className="text-[11px] text-slate-700 mt-0.5">{rev.rating}/5 stars</p>
                </div>

                {/* Assigned To (using rev.name as fallback) */}
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
                    style={{ background: av.bg, color: av.color }}
                  >
                    {initial}
                  </div>
                  <span className="text-[12px] text-slate-400 truncate">
                    {rev.assignedTo || rev.name || 'Unassigned'}
                  </span>
                </div>

                {/* Status */}
                <div>
                  <StatusBadge isApproved={isApproved} />
                </div>

                {/* Task Type */}
                <div className="text-[12px] text-slate-600">
                  {rev.taskType || 'Review'}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(rev)}
                    title={isApproved ? 'Unapprove' : 'Approve'}
                    className="w-7 h-7 rounded-md border border-white/10 bg-transparent flex items-center justify-center hover:bg-white/5 transition-colors"
                    style={{ color: isApproved ? '#e24b4a' : '#8bc34a' }}
                  >
                    {isApproved ? <X size={13} /> : <Check size={13} />}
                  </button>

                  <button
                    onClick={() => handleDelete(rev._id)}
                    title="Delete"
                    className="w-7 h-7 rounded-md border border-white/10 bg-transparent flex items-center justify-center hover:bg-white/5 transition-colors text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Footer Count */}
      {!loading && filtered.length > 0 && (
        <p className="text-xs text-slate-700 mt-3 ml-1">
          1–{filtered.length} of {filtered.length}
        </p>
      )}

    </div>
  );
}