import { useEffect, useState } from 'react';
import { Star, Trash2, Check, X, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getReviews, approveReview, deleteReview } from '../services/api';

function Stars({ count }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`w-3 h-3 ${
            i <= count ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'
          }`}
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Load Reviews
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await getReviews();
const data = res.data?.data || res.data?.reviews || res.data || [];
setReviews(Array.isArray(data) ? data : []);    } catch (err) {
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ✅ Optimized Approve Toggle (no full refetch)
  const handleApprove = async (rev) => {
    const prevState = [...reviews];

    try {
     const updated = reviews.map(r =>
  r._id === rev._id
    ? { ...r, isApproved: !r.isApproved }
    : r
);

      setReviews(updated); // optimistic UI

      await approveReview(rev._id);

      toast.success(
        rev.approved ? 'Review unapproved' : 'Review approved!'
      );
    } catch (err) {
      setReviews(prevState); // rollback
      toast.error('Failed to update review');
    }
  };

  // ✅ Optimized Delete (no refetch)
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review?')) return;

    const prev = [...reviews];

    try {
      setReviews(reviews.filter(r => r._id !== id));

      await deleteReview(id);
      toast.success('Review deleted');
    } catch (err) {
      setReviews(prev); // rollback
      toast.error('Failed to delete');
    }
  };

  const filtered = reviews.filter(r => {
    const isApproved = r.isApproved || r.isApproved;
    if (filter === 'pending') return !isApproved;
    if (filter === 'approved') return isApproved;
    return true;
  });

const pendingCount = reviews.filter(r => !r.isApproved).length;
  return (
    <div className="animate-fade-in">
      <div className="section-header flex-wrap gap-3">
        <div>
          <h1 className="page-title">Reviews</h1>
          <p className="text-sm text-slate-500">
            {reviews.length} total reviews
          </p>
        </div>

        <div className="flex gap-2">
          {['all', 'pending', 'approved'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-lg border capitalize ${
                filter === f
                  ? 'bg-brand-500/15 text-brand-400 border-brand-500/30'
                  : 'bg-dark-700 text-slate-400 border-dark-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="card h-28 animate-pulse bg-dark-700" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-slate-500">No reviews found</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(rev => {
            const isApproved = rev.approved || rev.isApproved;

            return (
              <div
                key={rev._id}
                className={`card border ${
                  isApproved
                    ? 'border-green-500/20'
                    : 'border-yellow-500/20'
                }`}
              >
                {/* Header */}
                <div className="flex justify-between">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-dark-600 flex items-center justify-center font-bold">
                      {rev.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        {rev.name || 'Anonymous'}
                      </p>

                      <Stars count={rev.rating} />

                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          isApproved
                            ? 'text-green-400'
                            : 'text-yellow-400'
                        }`}
                      >
                        {isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(rev)}
                      className="text-green-400"
                    >
                      {isApproved ? (
                        <X size={16} />
                      ) : (
                        <Check size={16} />
                      )}
                    </button>

                    <button
                      onClick={() => handleDelete(rev._id)}
                      className="text-red-400"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Message */}
                {rev.message && (
                  <p className="text-xs text-slate-400 mt-3 border-t pt-3">
                    "{rev.message}"
                  </p>
                )}

                {/* Date */}
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-600">
                  <Clock size={12} />
                  {rev.createdAt
                    ? new Date(rev.createdAt).toLocaleDateString()
                    : 'Recently'}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}