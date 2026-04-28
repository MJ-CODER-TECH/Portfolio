import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBlogById } from "../../services/api";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogById(id)
      .then(res => setBlog(res.data?.data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  // ================= LOADING UI =================
  if (loading) {
    return (
      <div className="bg-black min-h-screen text-white px-6 md:px-20 py-20">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-10 bg-gray-800 rounded w-3/4 mb-6"></div>
          <div className="h-64 bg-gray-800 rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded"></div>
            <div className="h-4 bg-gray-800 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  // ================= ERROR / NOT FOUND =================
  if (!blog) {
    return (
      <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-2xl font-semibold mb-4">Blog not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="text-green-400 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen px-6 md:px-20 py-16">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-green-400 mb-10 transition"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* META INFO */}
        <div className="text-gray-400 text-sm flex gap-4 mb-4">
          {blog.date && <span>📅 {blog.date}</span>}
          {blog.readTime && <span>⏱ {blog.readTime}</span>}
        </div>

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
          {blog.title}
        </h1>

        {/* IMAGE */}
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-[400px] object-cover rounded-xl mb-8"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}

        {/* CONTENT */}
        <div className="text-gray-300 text-[15px] leading-7 space-y-5">
          {blog.content?.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* FOOTER CTA */}
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-sm">
            Want a similar solution for your business?
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-lg transition"
          >
            Get in Touch
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogDetailsPage;