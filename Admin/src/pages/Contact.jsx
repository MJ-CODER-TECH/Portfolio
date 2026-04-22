import { useEffect, useState } from 'react';
import { Trash2, Mail, MailOpen, CheckCheck, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getContacts, updateContactStatus, deleteContact } from '../services/api';

const STATUS_CONFIG = {
  new: { label: 'New', color: 'bg-blue-500/15 text-blue-400 border-blue-500/20', icon: Mail },
  read: { label: 'Read', color: 'bg-slate-500/15 text-slate-400 border-slate-500/20', icon: MailOpen },
  replied: { label: 'Replied', color: 'bg-green-500/15 text-green-400 border-green-500/20', icon: CheckCheck },
};

const STATUS_NEXT = { new: 'read', read: 'replied', replied: 'read' };

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getContacts();
      setContacts(Array.isArray(res.data) ? res.data : res.data?.contacts || []);
    } catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchContacts(); }, []);

  const handleStatusUpdate = async (id, currentStatus) => {
    const next = STATUS_NEXT[currentStatus] || 'read';
    try {
      await updateContactStatus(id, next);
      toast.success(`Marked as ${next}`);
      fetchContacts();
    } catch { toast.error('Failed to update status'); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await deleteContact(id);
      toast.success('Message deleted');
      fetchContacts();
    } catch { toast.error('Failed to delete'); }
  };

  const filtered = contacts.filter(c => filter === 'all' || c.status === filter);
  const newCount = contacts.filter(c => c.status === 'new').length;

  return (
    <div className="animate-fade-in">
      <div className="section-header flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="page-title">Contact Messages</h1>
            <p className="text-sm text-slate-500">{contacts.length} total messages</p>
          </div>
          {newCount > 0 && (
            <span className="badge bg-blue-500/15 text-blue-400 border border-blue-500/20 text-xs px-2 py-1">
              {newCount} new
            </span>
          )}
        </div>
        <div className="flex gap-2 flex-wrap">
          {['all', 'new', 'read', 'replied'].map(f => (
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
          {[1,2,3].map(i => <div key={i} className="card h-24 animate-pulse bg-dark-700" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card text-center py-16">
          <p className="text-slate-500">No messages found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => {
            const cfg = STATUS_CONFIG[msg.status] || STATUS_CONFIG.new;
            const StatusIcon = cfg.icon;
            const isExpanded = expanded === msg._id;
            return (
              <div
                key={msg._id}
                className={`card transition-all ${msg.status === 'new' ? 'border-blue-500/20' : 'border-dark-500'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border ${
                    msg.status === 'new' ? 'bg-blue-500/10 border-blue-500/20' : 'bg-dark-600 border-dark-400'
                  }`}>
                    <StatusIcon className={`w-4 h-4 ${msg.status === 'new' ? 'text-blue-400' : 'text-slate-500'}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-semibold text-white">{msg.name || 'Unknown'}</p>
                          <span className={`badge border text-xs ${cfg.color}`}>{cfg.label}</span>
                        </div>
                        <p className="text-xs text-slate-500">{msg.email}</p>
                        {msg.subject && <p className="text-xs text-slate-400 mt-0.5 font-medium">{msg.subject}</p>}
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <div className="flex items-center gap-1 text-xs text-slate-600">
                          <Clock className="w-3 h-3" />
                          {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString('en-IN', { dateStyle: 'short' }) : ''}
                        </div>
                        <button
                          onClick={() => setExpanded(isExpanded ? null : msg._id)}
                          className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {!isExpanded && msg.message && (
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{msg.message}</p>
                    )}

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t border-dark-500">
                        <p className="text-sm text-slate-300 leading-relaxed">{msg.message}</p>
                        {msg.phone && <p className="text-xs text-slate-500 mt-2">📞 {msg.phone}</p>}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dark-600">
                  <button
                    onClick={() => handleStatusUpdate(msg._id, msg.status)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                      msg.status === 'new'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20'
                        : msg.status === 'read'
                        ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                        : 'bg-slate-500/10 text-slate-400 border-slate-500/20 hover:bg-slate-500/20'
                    }`}
                  >
                    {msg.status === 'new' ? '→ Mark Read' : msg.status === 'read' ? '→ Mark Replied' : '→ Mark Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="btn-danger text-xs"
                  >
                    <Trash2 className="w-3 h-3" /> Delete
                  </button>
                  {msg.email && (
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-brand-400 hover:underline ml-auto"
                    >
                      Reply via Email →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}