import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Footer from "../components/Footer/Footer";
import { getProjects } from "../services/api";
import {useNavigate} from "react-router-dom"


const Portfolio = () => {
  const heroRef = useRef()
  const titleRef = useRef()
  const aboutRef = useRef()
  const skillsRef = useRef()
  const projectsRef = useRef()
  const projects = getProjects()
  const navigate = useNavigate()

  const [projectsData, setProjectsData] = useState([])

  useEffect(()=>{
    getProjects().then(res =>{
      setProjectsData(res.data.data)
      console.log(res.data.data)
    } )
  } , [])



  const heroInView = useInView(heroRef, { once: true, margin: "-100px" })
  const aboutInView = useInView(aboutRef, { once: true, margin: "-100px" })
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" })
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" })



  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <motion.section 
        ref={heroRef} 
        initial={{ opacity: 0 }}
        animate={heroInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <motion.h1 
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          className="text-4xl md:text-6xl font-bold mb-4">
          Hi, I'm <span className="text-green-400 italic">MJ Coder</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="text-gray-400 max-w-xl mb-4">
          Full Stack Developer specializing in building fast, scalable, and modern web applications.
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="text-gray-500 max-w-lg mb-6 text-sm">
          I help startups and businesses turn ideas into powerful digital products using modern technologies like React, Node.js, and MongoDB.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          className="flex gap-4">
          <button className="bg-green-400 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            View Projects
          </button>
          <button className="border border-gray-600 px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
            Download Resume
          </button>
        </motion.div>
      </motion.section>

      {/* ABOUT */}
      <motion.section 
        ref={aboutRef}
        initial={{ opacity: 0 }}
        animate={aboutInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl font-bold mb-6">About Me</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="text-gray-400 mb-4">
            I'm a passionate Full Stack Developer with a strong focus on performance, scalability, and clean UI design.
            I enjoy solving real-world problems and creating seamless user experiences.
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="text-gray-500 text-sm">
            With hands-on experience in frontend and backend technologies, I build complete end-to-end solutions
            that are optimized, secure, and user-friendly.
          </motion.p>
        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section 
        ref={skillsRef}
        initial={{ opacity: 0 }}
        animate={skillsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl font-bold mb-10 text-center">Skills & Technologies</motion.h2>

          <motion.div 
            className="grid md:grid-cols-4 gap-6 text-center"
            initial={{ opacity: 0 }}
            animate={skillsInView ? { opacity: 1 } : {}}
            transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          >

            {[
              { title: 'Frontend', skills: 'React, Tailwind CSS, JavaScript, GSAP' },
              { title: 'Backend', skills: 'Node.js, Express.js, REST APIs' },
              { title: 'Database', skills: 'MongoDB, Mongoose' },
              { title: 'Tools', skills: 'Git, GitHub, Vercel, Postman' },
            ].map((category, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={skillsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="bg-[#111] p-6 rounded-xl">
                <h3 className="font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm">{category.skills}</p>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section 
        ref={projectsRef}
        initial={{ opacity: 0 }}
        animate={projectsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="py-20 px-6">
        <div className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl md:text-4xl font-bold">
            My <span className="text-green-400">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="text-gray-400 max-w-md text-sm">
            A collection of real-world projects showcasing my development skills.
          </motion.p>
        </div>

        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={projectsInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >

          {projectsData.map((item) => (
  <motion.div
    onClick={() => navigate(`/project/${item._id}`)}

    key={item._id}
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    animate={projectsInView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
    className="bg-[#111] rounded-xl overflow-hidden hover:scale-105 transition flex flex-col h-full">
    
    <img 
      src={item.thumbnail} 
      className="w-full h-48 object-cover flex-shrink-0" 
    />
    
    <div className="p-5 flex flex-col flex-1">
      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
      
      <p className="text-gray-400 text-sm mb-3 flex-1 line-clamp-3">
        {item.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {item.techStack?.map((tech, i) => (
          <span key={i} className="text-xs bg-green-400/10 text-green-400 px-2 py-1 rounded">
            {tech}
          </span>
        ))}
      </div>

      <a 
        href={item.liveUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-green-400 text-sm mt-auto">
        View Project →
      </a>
    </div>
  </motion.div>
))}
        </motion.div>
      </motion.section>

      {/* CONTACT */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="py-20 px-6 bg-[#0d0d0d]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-3xl font-bold mb-6">Let's Work Together</motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="text-gray-400 mb-4">
            Have an idea or project in mind? Let's collaborate and build something amazing.
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="text-gray-500 text-sm mb-6">
             Email: mozzimdev@gmail.com <br />
             Location: India
          </motion.p>

          <motion.button 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
            className="bg-green-400 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
            Contact Me
          </motion.button>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-500 text-sm">
        © 2026 Mozzim.dev — Built with ❤️ using React & Tailwind
      </footer>
      <Footer/>
    </div>
  );
};

export default Portfolio;