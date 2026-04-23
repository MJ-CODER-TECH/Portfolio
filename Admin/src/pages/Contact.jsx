import { useEffect, useState } from 'react';
import {
  Trash2,
  Mail,
  MailOpen,
  CheckCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  Search
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getContacts, updateContactStatus, deleteContact } from '../services/api';

const STATUS_CONFIG = {
  new: {
    label: 'New',
    icon: Mail,
    style: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  read: {
    label: 'Read',
    icon: MailOpen,
    style: 'bg-slate-500/10 text-slate-300 border-slate-500/20'
  },
  replied: {
    label: 'Replied',
    icon: CheckCheck,
    style: 'bg-green-500/10 text-green-400 border-green-500/20'
  }
};

const STATUS_NEXT = { new: 'read', read: 'replied', replied: 'read' };

export default function Contact() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);
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
    <div className="space-y-6 animate-fade-in">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
          <p className="text-sm text-slate-500">
            {contacts.length} total messages • {newCount} new
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 bg-dark-700 px-3 py-2 rounded-xl border border-dark-500">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name or email..."
              className="bg-transparent outline-none text-sm text-white w-48"
            />
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'new', 'read', 'replied'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium border transition-all ${
              filter === f
                ? 'bg-brand-500/15 text-brand-400 border-brand-500/30'
                : 'bg-dark-700 text-slate-400 border-dark-500 hover:border-dark-400'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* LIST */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="h-24 rounded-xl bg-dark-700 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          No messages found
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map(msg => {
            const cfg = STATUS_CONFIG[msg.status] || STATUS_CONFIG.new;
            const Icon = cfg.icon;
            const isOpen = expanded === msg._id;

            return (
              <div
                key={msg._id}
                className="bg-dark-800 border border-dark-600 rounded-2xl p-5 hover:border-dark-400 transition-all shadow-sm"
              >

                {/* TOP */}
                <div className="flex justify-between gap-4">

                  {/* LEFT */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-700 flex items-center justify-center border border-dark-500">
                      <Icon className="w-4 h-4 text-slate-300" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold text-sm">
                          {msg.name || 'Unknown'}
                        </h3>

                        <span className={`text-xs px-2 py-0.5 rounded-lg border ${cfg.style}`}>
                          {cfg.label}
                        </span>
                      </div>

                      <p className="text-xs text-slate-400">{msg.email}</p>
                      {msg.subject && (
                        <p className="text-xs text-slate-500 mt-1">
                          {msg.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.createdAt).toLocaleDateString('en-IN')}
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="mt-3">
                  <p className="text-sm text-slate-300 line-clamp-2">
                    {isOpen ? msg.message : msg.message?.slice(0, 120)}
                  </p>

                  <button
                    onClick={() => setExpanded(isOpen ? null : msg._id)}
                    className="text-xs text-brand-400 mt-2 flex items-center gap-1"
                  >
                    {isOpen ? (
                      <>Show Less <ChevronUp className="w-3 h-3" /></>
                    ) : (
                      <>Read More <ChevronDown className="w-3 h-3" /></>
                    )}
                  </button>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-dark-600">

                  <button
                    onClick={() => handleStatusUpdate(msg._id, msg.status)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-dark-700 hover:bg-dark-600 border border-dark-500 text-slate-300"
                  >
                    Change Status
                  </button>

                  <button
                    onClick={() => handleDelete(msg._id)}
                    className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-3 h-3 inline" /> Delete
                  </button>

                  <a
                    href={`mailto:${msg.email}`}
                    className="ml-auto text-xs text-brand-400 hover:underline"
                  >
                    Reply →
                  </a>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}