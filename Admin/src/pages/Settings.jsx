import { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { changePassword } from '../services/api';
import { useAuth } from '../middlewares/Authcontext';

export default function Settings() {
  const { user } = useAuth();
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ cur: false, new: false, con: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      toast.success('Password changed successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in max-w-xl">
      <div className="section-header">
        <h1 className="page-title">Settings</h1>
      </div>

      {/* Profile Info */}
      <div className="card mb-5">
        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-400" />
          Account Info
        </h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center text-xl font-bold text-brand-400">
            {user?.name?.charAt(0)?.toUpperCase() || 'A'}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{user?.name || 'Admin'}</p>
            <p className="text-xs text-slate-500">{user?.email || ''}</p>
            <span className="badge bg-brand-500/10 text-brand-400 border border-brand-500/20 text-xs mt-1 inline-block">Administrator</span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card">
        <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-brand-400" />
          Change Password
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">Current Password</label>
            <div className="relative">
              <input
                type={show.cur ? 'text' : 'password'}
                className="input pr-9"
                value={form.currentPassword}
                onChange={e => setForm({...form, currentPassword: e.target.value})}
                required
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShow({...show, cur: !show.cur})} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {show.cur ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">New Password</label>
            <div className="relative">
              <input
                type={show.new ? 'text' : 'password'}
                className="input pr-9"
                value={form.newPassword}
                onChange={e => setForm({...form, newPassword: e.target.value})}
                required
                placeholder="Min 6 characters"
              />
              <button type="button" onClick={() => setShow({...show, new: !show.new})} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {show.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <div className="relative">
              <input
                type={show.con ? 'text' : 'password'}
                className="input pr-9"
                value={form.confirmPassword}
                onChange={e => setForm({...form, confirmPassword: e.target.value})}
                required
                placeholder="Repeat new password"
              />
              <button type="button" onClick={() => setShow({...show, con: !show.con})} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300">
                {show.con ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {form.newPassword && form.confirmPassword && form.newPassword !== form.confirmPassword && (
            <p className="text-xs text-red-400">Passwords do not match</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary disabled:opacity-60 mt-2"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}