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

      // 💡 smart fallback (no crash ever)
      setBlogs(data.blogs || data.data || data || []);
    } catch (err) {
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
        {
          method: 'POST',
          body: data
        }
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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">📝 Blog Manager</h1>
        <button
          onClick={() => {
            setForm(initialForm);
            setEditingId(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-xl shadow"
        >
          <Plus size={18} /> New Blog
        </button>
      </div>

      {/* Empty State */}
      {blogs.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-lg">No blogs yet</p>
          <p className="text-sm">Start by creating your first blog 🚀</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt=""
                  className="h-44 w-full object-cover"
                />
              )}

              <div className="p-4">
                <h2 className="font-semibold text-lg line-clamp-1">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                  {blog.content}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Pencil size={16} /> Edit
                  </button>

                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-6 shadow-lg animate-fadeIn">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">
                {editingId ? 'Edit Blog' : 'Create Blog'}
              </h2>
              <X
                className="cursor-pointer"
                onClick={() => setShowModal(false)}
              />
            </div>

            <input
              type="text"
              placeholder="Blog Title"
              className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <textarea
              placeholder="Write your blog content..."
              className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2"
              rows={5}
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
            />

            <input
              type="file"
              onChange={(e) => handleImageUpload(e.target.files[0])}
              className="mb-3"
            />

            {form.image && (
              <img
                src={form.image}
                className="h-32 rounded-lg mb-3 object-cover"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl mt-2"
            >
              {loading ? 'Processing...' : 'Save Blog'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}