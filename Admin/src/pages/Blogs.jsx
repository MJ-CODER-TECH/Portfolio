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
  imageFile: null,
  imagePreview: '',
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // FETCH BLOGS
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

  // IMAGE CHANGE
  const handleImageChange = (file) => {
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      imageFile: file,
      imagePreview: URL.createObjectURL(file),
    }));
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      return toast.error('Title & Content required');
    }

    const data = new FormData();
    data.append('title', form.title);
    data.append('content', form.content);

    if (form.imageFile) {
      data.append('image', form.imageFile);
    }

    try {
      setLoading(true);

      if (editingId) {
        await updateBlog(editingId, data);
        toast.success('Blog updated');
      } else {
        await createBlog(data);
        toast.success('Blog created');
      }

      resetModal();
      fetchBlogs();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // RESET MODAL
  const resetModal = () => {
    setForm(initialForm);
    setEditingId(null);
    setShowModal(false);
  };

  // EDIT
  const handleEdit = (blog) => {
    setForm({
      title: blog.title || '',
      content: blog.content || '',
      imageFile: null,
      imagePreview: blog.image || '',
    });

    setEditingId(blog._id);
    setShowModal(true);
  };

  // DELETE
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
    <div className="p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Blogs</h1>
          <p className="text-sm text-slate-500">{blogs.length} blogs</p>
        </div>

        <button
          onClick={() => {
            resetModal();
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-[#212121] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> New Blog
        </button>
      </div>

      {/* LIST */}
      <div className="rounded-xl border border-white/5 bg-[#1a1a1a] overflow-hidden">

        {blogs.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            No blogs found
          </div>
        ) : (
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex items-center gap-4 px-4 py-3 border-b border-white/[0.05]"
            >
              {/* IMAGE */}
              <div className="w-20 h-14 bg-white/5 rounded overflow-hidden">
                {blog.image ? (
                  <img src={blog.image} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-slate-500">
                    No Image
                  </div>
                )}
              </div>

              {/* CONTENT */}
              <div className="flex-1">
                <h2 className="text-sm text-blue-400">{blog.title}</h2>
                <p className="text-xs text-slate-500 line-clamp-2">
                  {blog.content}
                </p>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <button onClick={() => handleEdit(blog)}>
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(blog._id)}>
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1a1a1a] w-full max-w-lg p-6 rounded-xl">

            <div className="flex justify-between mb-4">
              <h2 className="text-white">
                {editingId ? 'Edit Blog' : 'Create Blog'}
              </h2>
              <X onClick={resetModal} className="cursor-pointer" />
            </div>

            <input
              placeholder="Title"
              className="w-full mb-3 p-3 bg-[#111] text-white rounded"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              placeholder="Content"
              rows={5}
              className="w-full mb-3 p-3 bg-[#111] text-white rounded"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />

            <input
              type="file"
              onChange={(e) => handleImageChange(e.target.files[0])}
              className="mb-3 text-slate-400"
            />

            {form.imagePreview && (
              <img
                src={form.imagePreview}
                className="h-28 mb-3 rounded object-cover"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#212121] text-white py-2 rounded"
            >
              {loading ? 'Saving...' : 'Save Blog'}
            </button>

          </div>
        </div>
      )}
    </div>
  );
}