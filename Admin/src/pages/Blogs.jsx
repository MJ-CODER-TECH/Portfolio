import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import {
  getBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog
} from '../services/api';

const initialForm = {
  title: '',
  content: '',
  image: ''
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogsAdmin();
      const data = res.data;
      setBlogs(data.blogs || data.data || data || []);
    } catch {
      toast.error('Failed to fetch blogs');
      setBlogs([]);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleImageUpload = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'your_upload_preset');

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
        { method: 'POST', body: data }
      );
      const result = await res.json();
      setForm((prev) => ({ ...prev, image: result.secure_url }));
      toast.success('Image uploaded');
    } catch {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      return toast.error('All fields required');
    }

    try {
      setLoading(true);

      if (editingId) {
        await updateBlog(editingId, form);
        toast.success('Blog updated');
      } else {
        await createBlog(form);
        toast.success('Blog created');
      }

      setForm(initialForm);
      setEditingId(null);
      setShowModal(false);
      fetchBlogs();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditingId(blog._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog?')) return;

    try {
      await deleteBlog(id);
      toast.success('Deleted');
      fetchBlogs();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="p-6 animate-fade-in">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-4xl font-bold text-white">Blogs</h1>
          <p className="text-sm text-slate-500 mt-1">
            {blogs.length} total blogs
          </p>
        </div>

        <button
          onClick={() => {
            setForm(initialForm);
            setEditingId(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#212121] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> New Blog
        </button>
      </div>

      {/* EMPTY */}
      {blogs.length === 0 ? (
        <div className="text-center py-16 border border-white/5 bg-[#1a1a1a] rounded-xl">
          <p className="text-slate-500 text-sm">No blogs found</p>
        </div>
      ) : (

        /* LIST UI (LIKE IMAGE) */
        <div className="rounded-xl border border-white/5 bg-[#1a1a1a] overflow-hidden">

          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex items-center gap-4 px-4 py-3 border-b border-white/[0.04] hover:bg-white/[0.02] transition last:border-none"
            >

              {/* IMAGE */}
              <div className="w-20 h-14 rounded-md overflow-hidden bg-white/5 flex-shrink-0">
                {blog.image ? (
                  <img
                    src={blog.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-600">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1 min-w-0">
                <h2 className="text-[14px] font-medium text-blue-400 truncate">
                  {blog.title}
                </h2>

                <p className="text-[12px] text-slate-600 truncate">
                  {blog.content}
                </p>

                <p className="text-[11px] text-slate-700 mt-1">
                  {Math.floor(Math.random() * 1000)} views •{' '}
                  {Math.floor(Math.random() * 600)} comments
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(blog)}
                  className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center hover:bg-white/5"
                >
                  <Pencil size={13} />
                </button>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center hover:bg-white/5 text-red-500"
                >
                  <Trash2 size={13} />
                </button>
              </div>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-lg rounded-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg text-white">
                {editingId ? 'Edit Blog' : 'Create Blog'}
              </h2>
              <X className="cursor-pointer text-slate-400" onClick={() => setShowModal(false)} />
            </div>

            <input
              type="text"
              placeholder="Title"
              className="w-full bg-[#111] border border-white/10 p-3 rounded-lg mb-3 text-white"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <textarea
              placeholder="Content"
              className="w-full bg-[#111] border border-white/10 p-3 rounded-lg mb-3 text-white"
              rows={5}
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
            />

            <input
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="mb-3 text-slate-400"
            />

            {form.image && (
              <img src={form.image} className="h-28 rounded mb-3 object-cover" />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#212121] hover:bg-[#2a2a2a] text-white py-2 rounded-lg"
            >
              {loading ? 'Processing...' : 'Save Blog'}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}