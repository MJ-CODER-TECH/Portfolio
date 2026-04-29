import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../../services/api";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: [0.25, 1, 0.5, 1], delay },
});

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", position: "", company: "", message: "", rating: 5 });
  const [submitted, setSubmitted] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    API.get(`/projects/${id}`)
      .then((res) => { setProject(res.data.data || res.data); setLoading(false); })
      .catch(() => { setError("Failed to load project."); setLoading(false); });
  }, [id]);

  useEffect(() => {
    API.get("/reviews")
      .then((res) => setReviews(res.data.data || res.data || []))
      .catch(() => setReviews([]));
  }, []);

  const handleReviewSubmit = async () => {
    if (!form.name || !form.message) return;
    setReviewLoading(true);
    try {
      await API.post("/reviews", { ...form, projectRef: id });
      setSubmitted(true);
    } catch (e) { console.error(e); }
    setReviewLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="w-10 h-10 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
          <p className="text-gray-500 text-sm tracking-widest uppercase">Loading</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 text-center px-6">
        <p className="text-gray-400 text-lg">{error || "Project not found."}</p>
        <button onClick={() => navigate(-1)} className="text-green-400 border border-green-400/30 px-5 py-2 rounded-lg text-sm hover:bg-green-400/10 transition">
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Back Nav */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <motion.button onClick={() => navigate(-1)} {...fadeUp(0)}
          className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition text-sm group">
          <span className="inline-block group-hover:-translate-x-1 transition-transform">←</span>
          Back to Portfolio
        </motion.button>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="relative w-full rounded-2xl overflow-hidden bg-[#111]" style={{ aspectRatio: "16/9" }}>
          {!imgLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="w-8 h-8 rounded-full border-2 border-green-400 border-t-transparent animate-spin" />
            </div>
          )}
          <img src={project.thumbnail} alt={project.title} onLoad={() => setImgLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? "opacity-100" : "opacity-0"}`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-12">

        {/* Left */}
        <div className="md:col-span-2 flex flex-col gap-8">
          <div>
            <motion.p {...fadeUp(0.05)} className="text-green-400 text-xs uppercase tracking-[0.2em] mb-2">Project</motion.p>
            <motion.h1 {...fadeUp(0.1)} className="text-3xl md:text-5xl font-bold leading-tight">{project.title}</motion.h1>
          </div>

          <motion.div {...fadeUp(0.15)}>
            <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-3">About</h2>
            <p className="text-gray-300 leading-relaxed text-[0.95rem]">{project.description}</p>
          </motion.div>

          {project.longDescription && (
            <motion.div {...fadeUp(0.2)}>
              <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-3">Details</h2>
              <p className="text-gray-400 leading-relaxed text-sm">{project.longDescription}</p>
            </motion.div>
          )}

          {project.features?.length > 0 && (
            <motion.div {...fadeUp(0.22)}>
              <h2 className="text-xs text-gray-500 uppercase tracking-widest mb-4">Key Features</h2>
              <ul className="flex flex-col gap-3">
                {project.features.map((f, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.07, ease: [0.25, 1, 0.5, 1] }}
                    className="flex items-start gap-3 text-gray-300 text-sm">
                    <span className="mt-1 w-4 h-4 flex-shrink-0 rounded-full bg-green-400/15 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 block" />
                    </span>
                    {f}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          <motion.div {...fadeUp(0.3)} className="flex flex-wrap gap-4 pt-2">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="bg-green-400 text-black px-6 py-3 rounded-lg font-semibold text-sm hover:scale-105 transition flex items-center gap-2">
                Live Demo
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                className="border border-gray-600 px-6 py-3 rounded-lg text-sm hover:bg-white hover:text-black transition flex items-center gap-2">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
                GitHub
              </a>
            )}
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4">
          {project.techStack?.length > 0 && (
            <motion.div {...fadeUp(0.18)} className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <span key={i} className="text-xs bg-green-400/10 text-green-400 border border-green-400/20 px-3 py-1 rounded-md">{tech}</span>
                ))}
              </div>
            </motion.div>
          )}
          {project.category && (
            <motion.div {...fadeUp(0.22)} className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Category</h3>
              <p className="text-gray-300 text-sm">{project.category}</p>
            </motion.div>
          )}
          {project.status && (
            <motion.div {...fadeUp(0.26)} className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Status</h3>
              <span className={`inline-flex items-center gap-2 text-sm ${project.status === "Live" ? "text-green-400" : "text-yellow-400"}`}>
                <span className={`w-2 h-2 rounded-full animate-pulse ${project.status === "Live" ? "bg-green-400" : "bg-yellow-400"}`} />
                {project.status}
              </span>
            </motion.div>
          )}
          {project.year && (
            <motion.div {...fadeUp(0.3)} className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5">
              <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Year</h3>
              <p className="text-gray-300 text-sm">{project.year}</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Gallery */}
      {project.images?.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <motion.h2 {...fadeUp(0.35)} className="text-xs text-gray-500 uppercase tracking-widest mb-6">Gallery</motion.h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.images.map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.38 + i * 0.08, ease: [0.25, 1, 0.5, 1] }}
                className="rounded-xl overflow-hidden bg-[#111]" style={{ aspectRatio: "16/9" }}>
                <img src={img} alt={`${project.title} screenshot ${i + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── REVIEWS SECTION ── */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="border-t border-gray-800 mb-10" />

        {/* Section Header */}
        <motion.div {...fadeUp(0)} className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold">
            What People <span className="text-green-400">Say</span>
          </h2>
          {reviews.length > 0 && (
            <span className="text-xs text-gray-500 border border-gray-800 px-3 py-1 rounded-full">
              {reviews.length} review{reviews.length > 1 ? "s" : ""}
            </span>
          )}
        </motion.div>

        {/* Reviews Grid — compact cards */}
        {reviews.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {reviews.map((r, i) => (
              <motion.div key={r._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-5 flex flex-col gap-3">

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`text-sm ${s <= r.rating ? "text-green-400" : "text-gray-700"}`}>★</span>
                  ))}
                </div>

                {/* Message */}
                <p className="text-gray-400 text-sm leading-relaxed">"{r.message}"</p>

                {/* Author */}
                <div className="flex items-center gap-2.5 pt-1 border-t border-gray-800/60">
                  {r.avatar ? (
                    <img src={r.avatar} alt={r.name} className="w-7 h-7 rounded-full object-cover border border-gray-700 flex-shrink-0" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-green-400 text-xs font-semibold">{r.name?.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <p className="text-white text-xs font-medium leading-none mb-0.5">{r.name}</p>
                    {(r.position || r.company) && (
                      <p className="text-gray-600 text-[11px]">
                        {r.position}{r.position && r.company ? " · " : ""}{r.company}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mb-10 py-8 border border-dashed border-gray-800 rounded-xl text-center">
            <p className="text-gray-600 text-sm">No reviews yet. Be the first!</p>
          </div>
        )}

        {/* ── REVIEW FORM — compact ── */}
        <motion.div {...fadeUp(0.1)} className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6">

          {submitted ? (
            <div className="text-center py-6">
              <div className="w-10 h-10 rounded-full bg-green-400/10 border border-green-400/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-green-400 text-lg">✓</span>
              </div>
              <p className="text-white font-semibold mb-1">Review Submitted!</p>
              <p className="text-gray-500 text-xs">Admin approval ke baad dikhega.</p>
            </div>
          ) : (
            <>
              <h3 className="text-sm font-semibold text-white mb-4">Leave a Review</h3>

              <div className="flex flex-col gap-3">

                {/* Name + Position row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="Your name *" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-[#111] border border-gray-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-400/40 transition" />
                  <input type="text" placeholder="Position (e.g. CEO)" value={form.position}
                    onChange={(e) => setForm({ ...form, position: e.target.value })}
                    className="bg-[#111] border border-gray-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-400/40 transition" />
                </div>

                {/* Company + Star Rating row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input type="text" placeholder="Company name" value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="bg-[#111] border border-gray-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-400/40 transition" />

                  {/* Stars inline */}
                  <div className="bg-[#111] border border-gray-700/80 rounded-lg px-3.5 py-2.5 flex items-center gap-2">
                    <span className="text-gray-600 text-xs">Rating</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setForm({ ...form, rating: star })}
                          className={`text-lg transition-transform hover:scale-110 ${star <= form.rating ? "text-green-400" : "text-gray-700"}`}>
                          ★
                        </button>
                      ))}
                    </div>
                    <span className="text-gray-600 text-xs ml-auto">{form.rating}/5</span>
                  </div>
                </div>

                {/* Message */}
                <textarea rows={3} placeholder="Your experience with this project *"
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="bg-[#111] border border-gray-700/80 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-400/40 transition resize-none" />

                {/* Submit */}
                <div className="flex justify-end">
                  <button onClick={handleReviewSubmit}
                    disabled={reviewLoading || !form.name || !form.message}
                    className="bg-green-400 text-black px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-300 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2">
                    {reviewLoading ? (
                      <>
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-black border-t-transparent animate-spin" />
                        Submitting...
                      </>
                    ) : "Submit Review"}
                  </button>
                </div>

              </div>
            </>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-5 text-center text-gray-600 text-xs">
        © 2026 Mozzim.dev — Built with ❤️ using React & Tailwind
      </footer>
    </div>
  );
};

export default ProjectDetailsPage;