import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CMP from "../../assets/CMP.mp4";
import API from "../../assets/API.mp4";
import { MdArrowOutward } from "react-icons/md";
import SplitText from "../../Animation/SplitText";
import RevealDelay from "../../Animation/RevealDelay";
const services = [
  {
    video: CMP,
    title: "Web Development",
    desc: "We build fast, responsive, and modern websites using React, Next.js, and Tailwind CSS.",
  },
  {
    video: CMP,
    title: "App Development",
    desc: "Native and cross-platform mobile apps for iOS & Android using React Native.",
  },
  {
    video: API,
    title: "Backend & API",
    desc: "Scalable REST APIs, databases, and server-side logic using Node.js and MongoDB.",
  },
];

const MainContain4 = () => {

  const containerRef = useRef();
  const titleRef = useRef();
  const paraRef = useRef();
  const topCardRef = useRef();
  const bottomCardsRef = useRef();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <motion.div 
      ref={containerRef} 
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-black px-6 md:px-20 py-20 text-white text-center overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
      </div>

      {/* Heading */}
      <h1
        ref={titleRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight tracking-tight"
      >
        <SplitText>Deliver Your Project With</SplitText> <br className="hidden sm:block" />
        <span className="text-green-400 relative">
          <SplitText>Core Services</SplitText>
        </span>
      </h1>

<RevealDelay>  <p
        ref={paraRef}
        className="mt-6 text-white/50 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
      >
        From UI design to backend development, every service is built to deliver
        fast, scalable, and modern digital solutions for your business.
      </p></RevealDelay>
    

      {/* Cards */}
      <motion.div 
        className="flex flex-col items-center mt-12 gap-5"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
      >

        {/* Top card */}
        <motion.div
          ref={topCardRef}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="group relative rounded-2xl bg-[#111] border border-white/10 text-white w-full md:w-[600px] flex flex-col justify-between p-6 h-56 overflow-hidden hover:border-white/30 transition-all duration-300"
        >

          {/* Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

          <div className="flex items-center justify-between">
            <video
              src={services[0].video}
              autoPlay loop muted playsInline
              className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110"
            />

            <span className="w-10 h-10 flex text-xl rounded-full justify-center items-center border border-white/20 
            group-hover:bg-white group-hover:text-black transition-all duration-300 cursor-pointer">
              <MdArrowOutward className="group-hover:rotate-45 transition-transform duration-300" />
            </span>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-start">{services[0].title}</h3>
            <p className="text-start text-sm text-white/50 mt-1">{services[0].desc}</p>
          </div>
        </motion.div>

        {/* Bottom cards */}
        <motion.div 
          ref={bottomCardsRef} 
          className="flex flex-col sm:flex-row gap-5 w-full md:w-[600px]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
        >

          {services.slice(1).map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.15 }}
              className="group relative rounded-2xl bg-[#111] border border-white/10 text-white w-full flex flex-col justify-between p-6 h-56 overflow-hidden hover:border-white/30 transition-all duration-300"
            >

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 via-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

              <div className="flex items-center justify-between">
                <video
                  src={s.video}
                  autoPlay loop muted playsInline
                  className="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110"
                />

                <span className="w-10 h-10 flex text-xl rounded-full justify-center items-center border border-white/20 
                group-hover:bg-white group-hover:text-black transition-all duration-300 cursor-pointer">
                  <MdArrowOutward className="group-hover:rotate-45 transition-transform duration-300" />
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-start">{s.title}</h3>
                <p className="text-start text-sm text-white/50 mt-1">{s.desc}</p>
              </div>

            </motion.div>
          ))}

        </motion.div>

      </motion.div>
    </motion.div>
  );
};

export default MainContain4;