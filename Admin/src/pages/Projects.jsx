import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Globe, GitBranch, Star } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getProjects, createProject, updateProject, deleteProject } from '../services/api';

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = ['All', 'web', 'mobile', 'design', 'backend', 'fullstack', 'other'];

const EMPTY = {
  title: '',
  description: '',
  category: 'web',
  techStack: '',
  liveUrl: '',
  githubUrl: '',
  featured: false,
};

// ─── Modal Component ──────────────────────────────────────────────────────────

const Modal = ({ project, onClose, onSave }) => {
  const [form, setForm] = useState(project || EMPTY);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("liveUrl", form.liveUrl);
      formData.append("githubUrl", form.githubUrl);
      formData.append("featured", form.featured);

      // techStack convert
      const techArray =
        typeof form.techStack === "string"
          ? form.techStack.split(",").map((s) => s.trim()).filter(Boolean)
          : form.techStack || [];

      techArray.forEach((tech, i) => {
        formData.append(`techStack[${i}]`, tech);
      });

      // ✅ IMAGE (MOST IMPORTANT)
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      if (project?._id) {
        await updateProject(project._id, formData);
        toast.success("Project updated!");
      } else {
        await createProject(formData);
        toast.success("Project created!");
      }

      onSave();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save project");
    } finally {
      setSaving(false);
    }
  };
  const techStr = Array.isArray(form.techStack)
    ? form.techStack.join(', ')
    : form.techStack;

  const inputClass =
    'w-full bg-gray-900 border border-gray-700 text-white text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder-gray-500 transition';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <h2 className="text-white font-semibold text-base">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg p-1 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">Project Title *</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Portfolio Website"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">Description *</label>
            <textarea
              className={`${inputClass} resize-none h-24`}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="What does this project do?"
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-400">Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setForm({ ...form, image: e.target.files[0] })
              }
              className="w-full text-sm text-gray-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white hover:file:bg-indigo-500"
            />
          </div>
          

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">Category</label>
              <select
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {CATEGORIES.slice(1).map((c) => (
                  <option key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">Tech Stack</label>
              <input
                className={inputClass}
                value={techStr}
                onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                placeholder="React, Node.js, MongoDB"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">Live URL</label>
              <input
                className={inputClass}
                value={form.liveUrl}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                placeholder="https://myproject.com"
                type="url"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-400">GitHub URL</label>
              <input
                className={inputClass}
                value={form.githubUrl}
                onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                type="url"
              />
            </div>
          </div>

          {/* Featured Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-indigo-500"
            />
            <span className="text-sm text-gray-300">Mark as Featured</span>
          </label>

          {/* Footer Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg text-sm text-gray-300 border border-gray-600 hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 rounded-lg text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : project ? 'Update Project' : 'Create Project'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | projectObject
  const [category, setCategory] = useState('All');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await getProjects();
      let data = [];
      if (Array.isArray(res.data))                data = res.data;
      else if (Array.isArray(res.data?.projects)) data = res.data.projects;
      else if (Array.isArray(res.data?.data))     data = res.data.data;
      setProjects(data);
    } catch (err) {
      toast.error('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      await deleteProject(id);
      toast.success('Project deleted!');
      fetchProjects();
    } catch {
      toast.error('Failed to delete project');
    }
  };

  const filtered =
    category === 'All' ? projects : projects.filter((p) => p.category === category);

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Modal */}
      {modal && (
        <Modal
          project={modal === 'add' ? null : modal}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); fetchProjects(); }}
        />
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-gray-400 mt-0.5">{projects.length} total projects</p>
        </div>
        <button
          onClick={() => setModal('add')}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          <Plus size={16} /> Add Project
        </button>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              category === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-sm">Loading projects...</p>
        </div>

      /* Empty State */
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
            <Plus size={24} className="text-gray-500" />
          </div>
          <p className="text-white font-medium">No projects found</p>
          <p className="text-gray-500 text-sm mt-1 mb-4">
            {category !== 'All'
              ? `No projects in "${category}" category.`
              : 'Add your first project to get started.'}
          </p>
          <button
            onClick={() => setModal('add')}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-2 rounded-lg transition"
          >
            <Plus size={15} /> Add Project
          </button>
        </div>

      /* Projects Grid */
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((proj) => {
            const techs = Array.isArray(proj.techStack) ? proj.techStack : [];

            return (
              <div
                key={proj._id}
                className="relative bg-gray-800 border border-gray-700 rounded-2xl p-5 flex flex-col gap-3 hover:border-gray-600 transition"
              >
                {/* Featured Badge */}
                {proj.featured && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                    <Star size={11} fill="currentColor" /> Featured
                  </span>
                )}

                {/* Category + Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full capitalize">
                    {proj.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setModal(proj)}
                      className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                      aria-label="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(proj._id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
         {proj.thumbnail && (
  <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-900">
    <img
      src={proj.thumbnail}
      alt={proj.title}
      className="w-full h-full object-cover"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
  </div>
)}

                {/* Title & Description */}
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{proj.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{proj.description}</p>
                </div>

                {/* Tech Stack */}
                {techs.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {techs.slice(0, 4).map((t) => (
                      <span key={t} className="text-xs text-gray-300 bg-gray-700 px-2 py-0.5 rounded-md">
                        {t}
                      </span>
                    ))}
                    {techs.length > 4 && (
                      <span className="text-xs text-gray-500 bg-gray-700 px-2 py-0.5 rounded-md">
                        +{techs.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Links */}
                {(proj.liveUrl || proj.githubUrl) && (
                  <div className="flex gap-2 mt-auto pt-1 border-t border-gray-700">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition"
                      >
                        <Globe size={13} /> Live Demo
                      </a>
                    )}
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition"
                      >
                        <GitBranch size={13} /> GitHub
                      </a>
                    )}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default Projects;