import React, { useRef } from 'react'
import { Canvas } from "@react-three/fiber";
import ParticleSphere from "../ParticleSphere";
import gsap from "gsap";
import { useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import SplitText from "../../Animation/SplitText";
import { motion } from "framer-motion";
import RevealDelay from '../../Animation/RevealDelay';

const MainContain = () => {

   const ref = useRef();

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 10, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
    );
  }, []);


  const containerRef = useRef()

  return (
    <div 
      ref={containerRef} 
      className='relative text-white flex flex-col items-center justify-center h-screen text-center px-4 overflow-hidden'
    >

      {/* 🔥 CONTENT */}
      <div className="relative z-10 flex flex-col items-center gap-6">

        <button className='border border-white/20 text-white/70 rounded-full px-4 py-1.5 text-sm'>
          We Build Digital Products 2026
        </button>

        {/* 🔥 TEXT + PARTICLE WRAPPER */}
        <div className="relative  flex items-center justify-center">

          {/* 🔥 PARTICLE (exact text ke piche) */}
          <div className="absolute flex items-center justify-center pointer-events-none">
          <div className="w-[clamp(500px,70vw,1300px)] h-[clamp(500px,70vw,1300px)]">
  <Canvas camera={{ position: [0, 0, 5] }}>
    <ParticleSphere />
  </Canvas>
</div>
          </div>
          {/* 🔥 TEXT */}
      
   <h1 className='relative z-10 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight'>

  <SplitText delay={0.5}>
    Build Smarter Software
  </SplitText>

  <br />

  <SplitText delay={1} >
    Grow with
  </SplitText>

<span className="inline-block min-w-[320px] overflow-hidden">
  <motion.span
    initial={{ y: "100%" }}
    animate={{ y: "0%" }}
    transition={{
      delay: 1.2, // 👈 timeline (after your 2 lines)
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    }}
    className="inline-block"
  >
    <TypeAnimation
      sequence={['MJ Coder', 2000, '', 500]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
      className="text-green-400 italic"
    />
  </motion.span>
</span>

</h1>


        </div>

      <RevealDelay >
        <p className='text-white/60 max-w-xl'>
          From idea to launch in weeks. Scalable web & mobile apps, clean code.
        </p>
      </RevealDelay>
      </div>

    </div>
  )
}

export default MainContain