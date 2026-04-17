import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import SplitText from "../../Animation/SplitText";
import RevealDelay from '../../Animation/RevealDelay';

const MainContain8 = () => {

  const containerRef = useRef()
  const title1Ref = useRef()
  const para1Ref = useRef()
  const cards1Ref = useRef()

  const title2Ref = useRef()
  const para2Ref = useRef()
  const cards2Ref = useRef()

  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <motion.div ref={containerRef} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-black text-white py-20 px-20">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 ref={title1Ref} className="text-3xl md:text-4xl font-bold">
           <SplitText>What our clients</SplitText>  <span className="text-green-400"><SplitText>say</SplitText></span> <SplitText>about our work</SplitText>
          </h2>
          <RevealDelay> <p ref={para1Ref} className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Real feedback from businesses we’ve helped build, scale, and optimize.
          </p></RevealDelay>
         
        </div>

        <div ref={cards1Ref} className="grid md:grid-cols-3 gap-6">

          {[1,2,3,4,5,6].map((_,i)=>(
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
              className="bg-[#111] p-6 rounded-xl shadow-lg hover:border-white/30 hover:border transition-all duration-300"
            >
              <p className="text-yellow-400 mb-3">★★★★★</p>
              <p className="text-gray-300">
                Premium development experience with scalable and modern solutions.
              </p>
              <div className="flex items-center mt-5 gap-3">
                <img src={`/user${i+1}.jpg`} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="font-semibold">Client {i+1}</p>
                  <p className="text-sm text-gray-400">Business Owner</p>
                </div>
              </div>
            </motion.div>
            ))}

        </div>
      </section>

      {/* ================= BLOG ================= */}
      <section className="bg-black text-white py-20 px-20">

        <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between gap-6">
          <h2 ref={title2Ref} className="text-3xl md:text-4xl font-bold max-w-lg">
            Insights & articles <br /> from our tech team
          </h2>
<RevealDelay> <p ref={para2Ref} className="text-gray-400 max-w-md text-sm">
            Explore our latest blogs on development, UI/UX, and scaling products.
          </p></RevealDelay>
         
        </div>

        <div ref={cards2Ref} className="grid md:grid-cols-3 gap-6">

          {[1,2,3].map((_,i)=>(
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
              className="bg-[#111] rounded-xl overflow-hidden shadow-lg hover:border-white/30 hover:border transition-all duration-300"
            >
              <img src={`/blog${i+1}.jpg`} className="w-full h-48 object-cover" />
              <div className="p-5">
                <div className="text-gray-400 text-sm flex gap-4 mb-2">
                  <span>📅 2024-02-10</span>
                  <span>⏱ 5 min read</span>
                </div>
                <h3 className="font-semibold text-lg">
                  Modern Web Development Insights
                </h3>
              </div>
            </motion.div>
            ))}

        </div>

      </section>

    </motion.div>
  )
}

export default MainContain8