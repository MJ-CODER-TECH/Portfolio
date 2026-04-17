import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { BadgeCheck } from 'lucide-react'
import SplitText from "../../Animation/SplitText";
import { motion, useInView } from 'framer-motion'
import { useRef } from "react"
import RevealDelay from '../../Animation/RevealDelay';

const data = [
  { month: 'Jan', web: 4, app: 6 },
  { month: 'Feb', web: 8, app: 5 },
  { month: 'Mar', web: 3, app: 7 },
  { month: 'Apr', web: 6, app: 3 },
  { month: 'May', web: 5, app: 8 },
  { month: 'Jun', web: 7, app: 4 },
  { month: 'Jul', web: 6, app: 9 },
  { month: 'Aug', web: 4, app: 3 },
]

const features = [
  'Fast delivery, clean code',
  'Scalable & modern tech stack',
  'Dedicated support after launch',
]

const AboutSection = () => {

  const containerRef = useRef()
  const chartRef = useRef()
  const contentRef = useRef()
  const listRef = useRef()
  const btnRef = useRef()
  
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <motion.section 
      ref={containerRef} 
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row justify-center items-center gap-10 px-6 py-16 bg-black">

      {/* Left — Chart Card */}
      <motion.div 
        ref={chartRef} 
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="w-full md:w-110 bg-black rounded-2xl p-6 border border-white/10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-white text-sm font-medium">Projects Delivered</span>
          <span className="text-white/40 text-xs">2024</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={data} barGap={4}>
            <XAxis dataKey="month" tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#888', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Bar dataKey="web" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="app" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        {/* Legend */}
        <div className="flex gap-6 mt-3">
          <span className="flex items-center gap-2 text-xs text-white/50">
            <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Web Projects
          </span>
          <span className="flex items-center gap-2 text-xs text-white/50">
            <span className="w-3 h-3 rounded-sm bg-orange-500 inline-block" /> App Projects
          </span>
        </div>
      </motion.div>

      {/* Right — Content */}
      <motion.div 
        ref={contentRef} 
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
        className="w-full md:w-1/2 flex flex-col gap-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
         <SplitText>Your Vision. Your</SplitText> 
          <span className="text-green-400"> <SplitText>Product.</SplitText></span>
          <br /> <SplitText>Built to</SplitText> 
          <span className="text-green-400"> <SplitText>Scale.</SplitText></span>
        </h2>
      
      <RevealDelay><p className="text-white/50 text-base leading-relaxed">
          We build modern web and mobile applications for startups and businesses —
          pixel-perfect UI, powerful backend, and clean code that grows with you.
        </p> </RevealDelay>
        
 
<motion.ul 
          ref={listRef} 
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {features.map((f, i) => (
            <motion.li 
              key={i} 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-white/80 text-sm">
              <BadgeCheck size={20} className="text-orange-400 shrink-0" />
              {f}
            </motion.li>
          ))}
        </motion.ul>

        <motion.button 
          ref={btnRef} 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          className="w-fit bg-orange-500 hover:bg-orange-600 transition-colors text-white font-medium px-8 py-3 rounded-full">
          See Our Work
        </motion.button>
      </motion.div>

    </motion.section>
  )
}

export default AboutSection