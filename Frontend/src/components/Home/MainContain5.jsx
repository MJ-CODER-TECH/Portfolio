import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";
import SplitText from "../../Animation/SplitText";
import RevealDelay from "../../Animation/RevealDelay";

const lineData = [
  { month: "Jan", thisYear: 10000, lastYear: 8000 },
  { month: "Feb", thisYear: 18000, lastYear: 12000 },
  { month: "Mar", thisYear: 14000, lastYear: 15000 },
  { month: "Apr", thisYear: 22000, lastYear: 13000 },
  { month: "May", thisYear: 26000, lastYear: 18000 },
  { month: "Jun", thisYear: 28000, lastYear: 20000 },
];

const donut1 = [{ value: 81 }, { value: 19 }];
const donut2 = [{ value: 22 }, { value: 78 }];

const MainContain5 = () => {

  const containerRef = useRef();
  const titleRef = useRef();
  const paraRef = useRef();
  const cardsRef = useRef();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={containerRef} 
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full bg-black px-6 md:px-20 py-20 text-white text-center">

      {/* Heading */}
      <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
        <SplitText>Your Business Goals Deserve</SplitText> <br className="hidden sm:block" />
        <SplitText>Powerful,{" "}</SplitText>
        <span className="text-green-400"><SplitText>Smart Solutions</SplitText></span>
      </h1>

<RevealDelay> <p ref={paraRef} className="mt-6 text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        Build more with modern tools designed to simplify, scale, and grow your
        digital product. From development to deployment, we make software
        delivery effortless.
      </p></RevealDelay>
     

      {/* Cards */}
      <motion.div 
        ref={cardsRef} 
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
      >

        {/* Card 1 */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="bg-[#111] rounded-2xl p-6 text-left flex flex-col justify-between border border-white/10 hover:border-white/30 transition-all duration-300"
        >
          <div className="flex flex-col gap-3 mb-6">
            <div className="bg-[#1a1a1a] rounded-xl p-3 flex items-center gap-3 self-end w-fit ml-auto">
              <div className="relative w-10 h-10">
                <svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#222" strokeWidth="4" />
                  <circle cx="18" cy="18" r="15" fill="none" stroke="#22c55e" strokeWidth="4"
                    strokeDasharray="92 8" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold">92%</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">120 Projects</p>
                <p className="text-white/40 text-xs">Completed</p>
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-white">Live Project Tracking</h3>
          <p className="text-white/50 text-sm mt-2">
            Monitor every stage of your project with real-time updates.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          className="bg-[#111] rounded-2xl p-6 border border-white/10 hover:border-white/30 transition-all duration-300"
        >
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={lineData}>
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Line type="monotone" dataKey="thisYear" stroke="#22c55e" />
              <Line type="monotone" dataKey="lastYear" stroke="#f97316" />
            </LineChart>
          </ResponsiveContainer>
          <h3 className="mt-4 text-lg font-semibold">Automated Workflows</h3>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          className="bg-[#111] rounded-2xl p-6 border border-white/10 flex justify-center items-center gap-6 hover:border-white/30 transition-all duration-300"
        >
          <PieChart width={100} height={100}>
            <Pie data={donut1} dataKey="value">
              <Cell fill="#ef4444" />
              <Cell fill="#333" />
            </Pie>
          </PieChart>
          <PieChart width={100} height={100}>
            <Pie data={donut2} dataKey="value">
              <Cell fill="#22c55e" />
              <Cell fill="#333" />
            </Pie>
          </PieChart>
        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default MainContain5;