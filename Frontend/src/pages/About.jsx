import React, { useRef } from 'react'
import { motion, useInView } from "framer-motion";
import { MdArrowOutward } from 'react-icons/md'
import { BadgeCheck } from 'lucide-react'
import Footer from '../components/Footer/Footer'

const stats = [
  { number: '120+', label: 'Projects Completed' },
  { number: '98%', label: 'Client Satisfaction' },
  { number: '5+', label: 'Years Experience' },
  { number: '10+', label: 'Technologies' },
]

const team = [
  { name: 'MJ Coder', role: 'Founder & Full Stack Developer', init: 'MJ' },
  { name: 'Rahul Shah', role: 'UI/UX Designer', init: 'RS' },
  { name: 'Priya Mehta', role: 'Backend Developer', init: 'PM' },
  { name: 'Aryan Joshi', role: 'Mobile App Developer', init: 'AJ' },
]

const values = [
  { title: 'Clean Code', desc: 'We write maintainable, scalable, and well-documented code every time.' },
  { title: 'On-Time Delivery', desc: 'We respect your timeline and always deliver within the agreed schedule.' },
  { title: 'Transparent Pricing', desc: 'No hidden fees. What we quote is exactly what you pay.' },
  { title: 'Client First', desc: 'Your vision drives everything we build. We listen before we code.' },
]

const About = () => {
  const heroRef = useRef()
  const statsRef = useRef()
  const storyRef = useRef()
  const valuesRef = useRef()
  const teamRef = useRef()
  const ctaRef = useRef()
  
  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" })
  const storyInView = useInView(storyRef, { once: true, margin: "-100px" })
  const valuesInView = useInView(valuesRef, { once: true, margin: "-100px" })
  const teamInView = useInView(teamRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })



  return (
    <div className="w-full bg-black text-white">

      {/* Hero Section */}
      <motion.section 
        ref={heroRef} 
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-20 py-32">
        <motion.button 
          initial={{ opacity: 0, y: -20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="border border-white/20 text-white/60 rounded-full px-4 py-1.5 text-sm mb-6 hover:border-white/40 transition-all">
          About MJ Coder
        </motion.button>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight max-w-4xl">
          We Build Digital Products{' '}
          <span className="text-green-400 italic">That Matter</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="mt-6 text-white/50 text-sm sm:text-base max-w-2xl leading-relaxed">
          MJ Coder is a software & tech agency helping startups and businesses
          build modern, scalable, and beautiful digital products — from web apps
          to mobile solutions.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="bg-orange-500 hover:bg-orange-600 transition-all text-white font-medium rounded-full px-6 py-2.5 text-base">
            Get a Free Quote
          </button>
          <button className="border border-white/20 hover:bg-white/10 transition-all text-white rounded-full px-6 py-2.5 text-base">
            See Our Work
          </button>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <section className="px-6 md:px-20 py-20 border-t border-white/10">
        <motion.div 
          ref={statsRef} 
          className="grid grid-cols-2 md:grid-cols-4 gap-5"
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={statsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
              className={`rounded-2xl p-6 flex flex-col justify-between h-40 ${
                i === 0
                  ? 'bg-white text-black'
                  : 'bg-[#111] border border-white/10'
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold">{stat.number}</h2>
              <p className={`text-sm ${i === 0 ? 'text-gray-500' : 'text-white/50'}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Story Section */}
      <motion.section 
        ref={storyRef} 
        initial={{ opacity: 0 }}
        animate={storyInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-20 py-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row gap-12 items-center">

          {/* Left */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="w-full md:w-1/2">
            <p className="text-green-400 text-sm font-medium mb-3">Our Story</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
              Started with a Vision,{' '}
              <span className="text-green-400">Built with Passion</span>
            </h2>
            <p className="mt-6 text-white/50 text-sm sm:text-base leading-relaxed">
              MJ Coder was founded with one goal — to help businesses bring
              their digital ideas to life without the hassle. We started as a
              solo dev studio and have grown into a full-service tech agency
              delivering world-class web, mobile, and backend solutions.
            </p>
            <p className="mt-4 text-white/50 text-sm sm:text-base leading-relaxed">
              Every project we take on is treated like our own product — with
              care, precision, and a drive to exceed expectations.
            </p>
          </motion.div>

          {/* Right — visual card */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={storyInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="w-full md:w-1/2 bg-[#111] border border-white/10 rounded-2xl p-8 flex flex-col gap-4">
            {[
              '✦ 5+ years of software delivery',
              '✦ Worked with clients across 10+ countries',
              '✦ Shipped 120+ successful products',
              '✦ React, Next.js, Node, React Native & more',
              '✦ From MVP to enterprise-grade apps',
            ].map((point, i) => (
              <motion.p 
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={storyInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: 0.1 + i * 0.08 }}
                className="text-white/70 text-sm border-b border-white/10 pb-3 last:border-0 last:pb-0">
                {point}
              </motion.p>
            ))}
          </motion.div>

        </div>
      </motion.section>

      {/* Values Section */}
      <section className="px-6 md:px-20 py-20 border-t border-white/10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green-400 text-sm font-medium mb-3">What We Stand For</motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Our Core <span className="text-green-400">Values</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          These principles guide every line of code we write and every client
          relationship we build.
        </motion.p>

        <motion.div 
          ref={valuesRef} 
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12 text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {values.map((v, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{  duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 flex gap-4">
              <BadgeCheck size={22} className="text-orange-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-white font-semibold text-base">{v.title}</h3>
                <p className="text-white/50 text-sm mt-1 leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="px-6 md:px-20 py-20 border-t border-white/10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-green-400 text-sm font-medium mb-3">The People Behind</motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Meet Our <span className="text-green-400">Team</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          A small but mighty team of developers and designers passionate about
          building great software.
        </motion.p>

        <motion.div 
          ref={teamRef} 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
        >
          {team.map((member, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center text-green-400 font-semibold text-lg">
                {member.init}
              </div>
              <div className="text-center">
                <h3 className="text-white font-semibold text-base">{member.name}</h3>
                <p className="text-white/50 text-xs mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <motion.section 
        ref={ctaRef} 
        initial={{ opacity: 0 }}
        animate={ctaInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-20 py-20 border-t border-white/10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Ready to Build Something{' '}
          <span className="text-green-400">Great?</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="mt-4 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          Let's turn your idea into a real product. Get in touch today and get a
          free consultation.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="bg-orange-500 hover:bg-orange-600 transition-all text-white font-medium rounded-full px-8 py-3 text-base">
            Get a Free Quote
          </button>
          <button className="border border-white/20 hover:bg-white/10 transition-all text-white rounded-full px-8 py-3 text-base flex items-center gap-2">
            View Portfolio <MdArrowOutward />
          </button>
        </motion.div>
      </motion.section>
      <Footer/>

    </div>
  )
}

export default About