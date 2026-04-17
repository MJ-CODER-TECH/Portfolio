import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MdArrowOutward } from 'react-icons/md'
import { BadgeCheck } from 'lucide-react'
import Footer from '../components/Footer/Footer'

const services = [
  {
    number: '01',
    title: 'Web Development',
    desc: 'We build fast, responsive, and modern websites using React, Next.js, and Tailwind CSS. From landing pages to full web apps.',
    features: ['React / Next.js', 'Tailwind CSS', 'SEO Optimized', 'Mobile Responsive'],
    color: 'text-green-400',
  },
  {
    number: '02',
    title: 'Mobile App Development',
    desc: 'Native and cross-platform mobile apps for iOS & Android. Clean UI, smooth performance, and real-world functionality.',
    features: ['React Native', 'iOS & Android', 'Push Notifications', 'Offline Support'],
    color: 'text-orange-400',
  },
  {
    number: '03',
    title: 'Backend & API Development',
    desc: 'Scalable REST APIs, databases, and server-side logic. Built for performance, security, and growth.',
    features: ['Node.js / Express', 'MongoDB / PostgreSQL', 'REST API', 'JWT Auth'],
    color: 'text-green-400',
  },
  {
    number: '04',
    title: 'UI/UX Design',
    desc: 'Pixel-perfect designs that convert. We create intuitive user experiences that look great and feel natural.',
    features: ['Figma Design', 'Wireframing', 'Prototyping', 'Design System'],
    color: 'text-orange-400',
  },
  {
    number: '05',
    title: 'SaaS Product Development',
    desc: 'End-to-end SaaS product development — from idea to launch. Auth, payments, dashboard, and everything in between.',
    features: ['Stripe Integration', 'Multi-tenant', 'Admin Dashboard', 'Analytics'],
    color: 'text-green-400',
  },
  {
    number: '06',
    title: 'SEO & Performance',
    desc: 'We optimize your website for speed, search engines, and conversions. More traffic, better rankings, higher sales.',
    features: ['Core Web Vitals', 'On-Page SEO', 'Speed Optimization', 'Analytics Setup'],
    color: 'text-orange-400',
  },
]

const process = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your idea, goals, and requirements in a free consultation.' },
  { step: '02', title: 'Planning & Design', desc: 'We create wireframes, design mockups, and a project roadmap.' },
  { step: '03', title: 'Development', desc: 'Our team builds your product with clean code and regular updates.' },
  { step: '04', title: 'Testing & Launch', desc: 'We test everything thoroughly and deploy your product live.' },
  { step: '05', title: 'Support & Scale', desc: 'Post-launch support and scaling as your business grows.' },
]

const techStack = [
  'React', 'Next.js', 'Node.js', 'MongoDB',
  'PostgreSQL', 'React Native', 'Tailwind CSS',
  'TypeScript', 'Express', 'Firebase', 'Stripe', 'AWS',
]

const Services = () => {
  const [activeService, setActiveService] = useState(null)
  const titleRef = useRef()
  const paraRef = useRef()
  const servicesRef = useRef()
  const processRef = useRef()
  const techStackRef = useRef()
  const ctaRef = useRef()

  const heroInView = useInView(titleRef, { once: true, margin: "-100px" })
  const servicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
  const processInView = useInView(processRef, { once: true, margin: "-100px" })
  const techInView = useInView(techStackRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })



  return (
    <div className="w-full bg-black text-white">

      {/* Hero */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col items-center justify-center text-center px-6 md:px-20 py-32">
        <motion.button 
          initial={{ opacity: 0, y: -20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="border border-white/20 text-white/60 rounded-full px-4 py-1.5 text-sm mb-6 hover:border-white/40 transition-all">
          What We Offer
        </motion.button>
        <motion.h1 
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight max-w-4xl">
          Services Built to{' '}
          <span className="text-green-400 italic">Grow</span>{' '}
          Your Business
        </motion.h1>
        <motion.p 
          ref={paraRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="mt-6 text-white/50 text-sm sm:text-base max-w-2xl leading-relaxed">
          From idea to deployment — we offer end-to-end software services
          that help startups and businesses build, launch, and scale their
          digital products.
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

      {/* Services List */}
      <motion.section 
        ref={servicesRef}
        initial={{ opacity: 0 }}
        animate={servicesInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-20 py-20 border-t border-white/10">
        <div className="text-center mb-14">
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="text-green-400 text-sm font-medium mb-3">What We Do</motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            Our Core <span className="text-green-400">Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="mt-4 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
            Every service is designed to deliver real results — fast, scalable,
            and built to last.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial={{ opacity: 0 }}
          animate={servicesInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={servicesInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              onClick={() => setActiveService(activeService === i ? null : i)}
              className="bg-[#111] border border-white/10 rounded-2xl p-6 flex flex-col gap-4 cursor-pointer hover:border-white/20 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${s.color}`}>{s.number}</span>
                <span className="w-9 h-9 flex text-lg rounded-full justify-center items-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all">
                  <MdArrowOutward />
                </span>
              </div>
              <h3 className="text-xl font-semibold text-white">{s.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>

              {/* Features */}
              <div
                className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${
                  activeService === i ? 'max-h-60 mt-2' : 'max-h-0'
                }`}
              >
                <div className="border-t border-white/10 pt-4 flex flex-col gap-2">
                  {s.features.map((f, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-white/70">
                      <BadgeCheck size={15} className="text-orange-400 shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Process Section */}
      <motion.section 
        ref={processRef}
        initial={{ opacity: 0 }}
        animate={processInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-20 py-20 border-t border-white/10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="text-green-400 text-sm font-medium mb-3">How We Work</motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Our <span className="text-green-400">Process</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="mt-4 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          A simple, transparent process designed to keep you informed
          at every step.
        </motion.p>

        <motion.div 
          className="flex flex-col md:flex-row gap-5 mt-12"
          initial={{ opacity: 0 }}
          animate={processInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {process.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={processInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="flex-1 bg-[#111] border border-white/10 rounded-2xl p-6 text-left">
              <span className="text-green-400 text-sm font-medium">{p.step}</span>
              <h3 className="text-white font-semibold text-base mt-2">{p.title}</h3>
              <p className="text-white/50 text-sm mt-2 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section 
        ref={techStackRef}
        initial={{ opacity: 0 }}
        animate={techInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="px-6 md:px-20 py-20 border-t border-white/10 text-center">
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="text-green-400 text-sm font-medium mb-3">Tools We Use</motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
          Our <span className="text-green-400">Tech Stack</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={techInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="mt-4 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          We use the latest and most reliable technologies to build
          your product.
        </motion.p>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mt-12"
          initial={{ opacity: 0 }}
          animate={techInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.05, delayChildren: 0.3 }}
        >
          {techStack.map((tech, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={techInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="bg-[#111] border border-white/10 text-white/70 text-sm px-5 py-2 rounded-full hover:border-green-400/40 hover:text-green-400 transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA */}
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
          Let's Build Something{' '}
          <span className="text-green-400">Amazing</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="mt-4 text-white/50 text-sm sm:text-base max-w-xl mx-auto">
          Have a project in mind? Get a free consultation and let's
          discuss how we can bring your idea to life.
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
<Footer />
    </div>
  )
}

export default Services