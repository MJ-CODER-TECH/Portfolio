import { useEffect, useState } from 'react';
import { Star, Trash2, Check, X, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getReviews, approveReview, deleteReview } from '../services/api';

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`w-3 h-3 ${i <= count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | pending | approved

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await getReviews();
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch { toast.error('Failed to load reviews'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleApprove = async (rev) => {
    try {
      await approveReview(rev._id);
      const isApproved = rev.approved || rev.isApproved;
      toast.success(isApproved ? 'Review unapproved' : 'Review approved!');
      fetchReviews();
    } catch { toast.error('Failed to update review'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      await deleteReview(id);
      toast.success('Review deleted');
      fetchReviews();
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = reviews.filter(r => {
    const isApproved = r.approved || r.isApproved;
    if (filter === 'pending') return !isApproved;
    if (filter === 'approved') return isApproved;
    return true;
  });

  const pendingCount = reviews.filter(r => !r.approved && !r.isApproved).length;

  return (
    <div className="animate-fade-in">
      <div className="section-header flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="page-title">Reviews</h1>
            <p className="text-sm text-slate-500">{reviews.length} total reviews</p>
          </div>
          {pendingCount > 0 && (
            <span className="badge bg-yellow-500/15 text-yellow-400 border border-yellow-500/20 text-xs px-2 py-1">
              {pendingCount} pending
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'approved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-brand-500/15 text-brand-400 border-brand-500/30'
                  : 'bg-dark-700 text-slate-400 border-dark-400 hover:border-dark-300'
              }`}
            >{f}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="card h-28 animate-pulse bg-dark-700" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-slate-500">No reviews found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((rev) => {
            const isApproved = rev.approved || rev.isApproved;
            return (
              <div key={rev._id} className={`card border transition-all ${isApproved ? 'border-green-500/20' : 'border-yellow-500/20'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-dark-600 border border-dark-400 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                      {rev.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white">{rev.name || 'Anonymous'}</p>
                        {rev.company && <span className="text-xs text-slate-500">@ {rev.company}</span>}
                        <span className={`badge ${isApproved ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'}`}>
                          {isApproved ? '✓ Approved' : '⏳ Pending'}
                        </span>
                      </div>
                      <Stars count={rev.rating} />
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleApprove(rev)}
                      title={isApproved ? 'Unapprove' : 'Approve'}
                      className={`p-1.5 rounded-lg transition-colors border ${isApproved ? 'text-slate-500 hover:text-yellow-400 border-dark-400 hover:border-yellow-500/30' : 'text-green-400 hover:text-green-300 border-green-500/20 hover:border-green-500/40 bg-green-500/5'}`}
                    >
                      {isApproved ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 border border-dark-400 hover:border-red-500/30 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {rev.message && (
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed border-t border-dark-500 pt-3">
                    "{rev.message}"
                  </p>
                )}

                <div className="flex items-center gap-1 mt-2 text-xs text-slate-600">
                  <Clock className="w-3 h-3" />
                  {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' }) : 'Recently'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}