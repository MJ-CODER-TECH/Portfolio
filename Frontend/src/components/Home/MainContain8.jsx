import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView } from "framer-motion";
import SplitText from "../../Animation/SplitText";
import RevealDelay from '../../Animation/RevealDelay';
import { getReviews, getBlogs } from '../../services/api';
import { useNavigate } from "react-router-dom";

const MainContain8 = () => {
const navigate = useNavigate();
  const containerRef = useRef()
  const title1Ref = useRef()
  const para1Ref = useRef()
  const cards1Ref = useRef()
  const [reviews, setReviews] = useState([])
const [revLoading, setRevLoading] = useState(true)

  const title2Ref = useRef()
  const para2Ref = useRef()
  const cards2Ref = useRef()

  // State
const [blogs, setBlogs] = useState([])
const [blogLoading, setBlogLoading] = useState(true)

// useEffect
useEffect(() => {
  getBlogs()
    .then(res => setBlogs(res.data?.data || []))
    .catch(() => setBlogs([]))
    .finally(() => setBlogLoading(false))
}, [])


  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

 useEffect(() => {
  getReviews()
    .then(res => setReviews(res.data?.data || []))
    .catch(() => setReviews([]))
    .finally(() => setRevLoading(false))
}, [])

  return (
    <motion.div ref={containerRef} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>

    {/* ================= TESTIMONIALS ================= */}
<section className="bg-black text-white py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
  <div className="max-w-6xl mx-auto text-center mb-10 md:mb-12">
    <h2 ref={title1Ref} className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
      <SplitText>What our clients</SplitText>{" "}
      <span className="text-green-400"><SplitText>say</SplitText></span>{" "}
      <SplitText>about our work</SplitText>
    </h2>

    <RevealDelay>
      <p ref={para1Ref} className="text-gray-400 mt-3 md:mt-4 max-w-2xl mx-auto text-sm md:text-base">
        Real feedback from businesses we’ve helped build, scale, and optimize.
      </p>
    </RevealDelay>
  </div>

  <div ref={cards1Ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">

  {revLoading ? (
    /* Loading skeleton */
    [1,2,3].map(i => (
      <div key={i} className="bg-[#111] p-6 rounded-xl h-44 animate-pulse" />
    ))
  ) : reviews.length === 0 ? (
    <div className="col-span-3 text-center py-12 text-gray-500 text-sm">
      Abhi tak koi review nahi.
    </div>
  ) : (
    reviews.map((r, i) => (
      <motion.div
        key={r._id}
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.25,1,0.5,1], delay: i * 0.1 }}
        className="bg-[#111] p-6 rounded-xl shadow-lg hover:border-white/30 hover:border transition-all duration-300"
      >
        <div className="flex gap-1 mb-3">
          {[1,2,3,4,5].map(s => (
            <span key={s} className={s <= r.rating ? "text-green-400" : "text-gray-700"}>★</span>
          ))}
        </div>

        <p className="text-gray-300 text-sm leading-relaxed flex-1">
          "{r.message}"
        </p>

        <div className="flex items-center mt-5 gap-3">
          {r.avatar ? (
            <img src={r.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-700" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-green-400/15 border border-green-400/20 flex items-center justify-center">
              <span className="text-green-400 font-semibold">
                {r.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="font-semibold text-sm">{r.name}</p>
            {(r.position || r.company) && (
              <p className="text-sm text-gray-400">
                {r.position}{r.position && r.company ? " at " : ""}{r.company}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    ))
  )}

</div>
      </section>

   {/* ================= BLOG ================= */}
<section className="bg-black text-white py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-20">

  <div className="max-w-6xl mx-auto mb-10 md:mb-12 flex flex-col md:flex-row justify-between gap-4 md:gap-6">
    <h2 ref={title2Ref} className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-lg leading-tight">
      Insights & articles <br /> from our tech team
    </h2>

    <RevealDelay>
      <p ref={para2Ref} className="text-gray-400 max-w-md text-sm md:text-base">
        Explore our latest blogs on development, UI/UX, and scaling products.
      </p>
    </RevealDelay>
  </div>

  <div ref={cards2Ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
  {blogLoading ? (
    [1,2,3].map(i => (
      <div key={i} className="bg-[#111] rounded-xl h-64 animate-pulse" />
    ))
  ) : blogs.length === 0 ? (
    <div className="col-span-3 text-center py-12 text-gray-500 text-sm">
      Koi blog nahi mila.
    </div>
  ) : (
    blogs.map((b, i) => (
    <motion.div
  key={b._id}
  onClick={() => navigate(`/blog-details/${b._id}`)} // 👈 ye add kar
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
        className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:border-white/30 hover:border transition-all duration-300"
      >
      <img
  src={b.image}
  alt={b.title}
  className="w-full h-40 sm:h-44 md:h-48 object-cover"
  onError={(e) => e.target.style.display = 'none'}
/>
        <div className="p-5">
          <div className="text-gray-400 text-sm flex gap-4 mb-2">
            {b.date && <span>📅 {b.date}</span>}
            {b.readTime && <span>⏱ {b.readTime}</span>}
          </div>
          <h3 className="font-semibold text-lg">{b.title}</h3>
        </div>
      </motion.div>
    ))
  )}
</div>

      </section>

    </motion.div>
  )
}

export default MainContain8