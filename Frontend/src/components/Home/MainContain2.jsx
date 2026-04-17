import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import SplitText from "../../Animation/SplitText";
import RevealDelay from '../../Animation/RevealDelay';

const stats = [
  { number: '98%', label: 'Client Satisfaction Rate' },
  { number: '50+', label: 'Products Launched' },
  { number: '10+', label: 'Technologies Mastered' },
]

const MainContain2 = () => {
  const ref = useRef()
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <div ref={ref} className="w-full bg-black px-6 md:px-20 py-20 text-white text-center">

      {/* Heading */}
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
        <SplitText >Why Top Startups & Businesses</SplitText>  <br className="hidden sm:block" />
      <SplitText>Choose</SplitText>   <span className="text-green-400 italic"> <SplitText>MJ Coder</SplitText></span>
      </motion.h1>

      {/* Paragraph */}
      <RevealDelay>
        <p  className="mt-6 text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From clean UI to powerful backends — we deliver fast, scalable,
          and maintainable software that helps businesses grow without limits.
        </p>
      </RevealDelay>
      

      {/* Stat Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
            className={`rounded-2xl p-6 h-56 flex flex-col justify-between hover:scale-105 transition-transform duration-300 ${
              i === 0
                ? 'bg-white text-black'
                : 'bg-[#111] border border-white/10 text-white'
            }`}
          >
            <h2 className="text-6xl font-bold text-start">{stat.number}</h2>
            <p className={`text-xl text-end ${i === 0 ? 'text-gray-500' : 'text-white/50'}`}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>

    </div>
  )
}

export default MainContain2