import { useEffect, useState } from 'react';
import {
  Trash2,
  Mail,
  MailOpen,
  CheckCheck,
  Search
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getContacts, updateContactStatus, deleteContact } from '../services/api';

const STATUS_CONFIG = {
  new: {
    label: 'New',
    icon: Mail,
    style: 'bg-[rgba(55,138,221,0.15)] text-[#5aabff]'
  },
  read: {
    label: 'Read',
    icon: MailOpen,
    style: 'bg-white/[0.05] text-slate-400'
  },
  replied: {
    label: 'Replied',
    icon: CheckCheck,
    style: 'bg-[rgba(99,153,34,0.15)] text-[#8bc34a]'
  }
};

const STATUS_NEXT = { new: 'read', read: 'replied', replied: 'read' };

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await getContacts();
      setContacts(res.data.data || []);
    } catch {
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleStatusUpdate = async (id, current) => {
    const next = STATUS_NEXT[current] || 'read';
    try {
      await updateContactStatus(id, next);
      toast.success(`Marked as ${next}`);
      fetchContacts();
    } catch {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await deleteContact(id);
      toast.success('Deleted');
      fetchContacts();
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = contacts
    .filter(c => filter === 'all' || c.status === filter)
    .filter(c =>
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase())
    );

  const newCount = contacts.filter(c => c.status === 'new').length;

  return (
    <div className="animate-fade-in p-6">

      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Contact Messages</h1>
          <p className="text-sm mt-1 text-slate-500">
            {contacts.length} total messages • {newCount} new
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex items-center gap-2 bg-[#2a2a2a] px-4 py-2 rounded-lg border border-white/5 w-72">
          <Search className="w-4 h-4 text-slate-600" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or email..."
            className="bg-transparent outline-none text-sm text-white w-full placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 mb-4">
        {['all', 'new', 'read', 'replied'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-lg transition ${
              filter === f
                ? 'bg-[#212121] text-white'
                : 'bg-[#2a2a2a] text-white/60 hover:bg-[#212121] hover:text-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLE */}
      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-14 rounded-lg animate-pulse bg-[#1a1a1a]" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-white/5 bg-[#1a1a1a]">
          <p className="text-slate-500 text-sm">No messages found</p>
        </div>
      ) : (
        <div className="rounded-xl border border-white/5 overflow-hidden bg-[#1a1a1a]">

          {/* HEADER */}
          <div className="grid grid-cols-7 px-4 py-3 border-b border-white/5 bg-[#111]">
            {['Name', 'Email', 'Subject', 'Message', 'Date', 'Status', 'Action'].map(h => (
              <span key={h} className="text-[11px] uppercase tracking-widest text-slate-600">
                {h}
              </span>
            ))}
          </div>

          {/* ROWS */}
          {filtered.map(msg => {
            const cfg = STATUS_CONFIG[msg.status] || STATUS_CONFIG.new;

            return (
              <div
                key={msg._id}
                className="grid grid-cols-7 px-4 py-3 items-center border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors last:border-none"
              >

                {/* NAME */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-white border border-white/10">
                    {msg.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-[13px] text-slate-200">
                    {msg.name || 'Unknown'}
                  </span>
                </div>

                {/* EMAIL */}
                <span className="text-[12px] text-slate-600 truncate">
                  {msg.email}
                </span>

                {/* SUBJECT */}
                <span className="text-[12px] text-slate-400 truncate">
                  {msg.subject || '-'}
                </span>

                {/* MESSAGE */}
                <span className="text-[11px] text-slate-600 truncate">
                  {msg.message?.slice(0, 40)}...
                </span>

                {/* DATE */}
                <span className="text-[12px] text-slate-600">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>

                {/* STATUS */}
                <span className="text-[11px] px-2 py-1 rounded-full w-fit" style={{
                  background: cfg.style.includes('#5aabff')
                    ? 'rgba(55,138,221,0.15)'
                    : cfg.style.includes('#8bc34a')
                    ? 'rgba(99,153,34,0.15)'
                    : 'rgba(255,255,255,0.05)',
                  color: cfg.style.includes('#5aabff')
                    ? '#5aabff'
                    : cfg.style.includes('#8bc34a')
                    ? '#8bc34a'
                    : '#aaa'
                }}>
                  {cfg.label}
                </span>

                {/* ACTION */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate(msg._id, msg.status)}
                    className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center hover:bg-white/5"
                  >
                    <Mail size={13} />
                  </button>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center hover:bg-white/5 text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}