import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { gsap } from "../../lib/gsap"

const Navbar = () => {
  const navRef = useRef()

  const navClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-lg text-sm transition-colors ${
      isActive
        ? 'bg-white/10 text-white font-medium'
        : 'text-white/60 hover:bg-white/10 hover:text-white'
    }`

  useEffect(() => {
    // Navbar entrance animation
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out"
    })

    let lastScroll = 0
    const handleScroll = () => {
      const currentScroll = window.scrollY

      if (currentScroll > lastScroll && currentScroll > 50) {
        gsap.to(navRef.current, { y: -80, duration: 0.3, ease: "power2.out" })
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.3, ease: "power2.out" })
      }

      lastScroll = currentScroll
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-20 h-16 bg-black/80 backdrop-blur-md border-b border-white/10"
    >

      {/* Logo */}
      <div className="text-xl font-semibold text-white">
        MJ <span className="text-green-400">Coder</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
        <li><NavLink to="/" className={navClass}>Home</NavLink></li>
        <li><NavLink to="/services" className={navClass}>Services</NavLink></li>
        <li><NavLink to="/portfolio" className={navClass}>Portfolio</NavLink></li>
        <li><NavLink to="/pricing" className={navClass}>Pricing</NavLink></li>
        <li><NavLink to="/about" className={navClass}>About</NavLink></li>
      </ul>

      {/* CTA Button */}
      <NavLink to="/contact" className="hidden md:block bg-orange-500 hover:bg-orange-600 transition-all text-white text-sm font-medium rounded-full px-5 py-2">
        Contact
      </NavLink>

      {/* Mobile Menu Icon */}
      <div className="flex md:hidden flex-col gap-1.5 cursor-pointer">
        <span className="w-6 h-0.5 bg-white rounded" />
        <span className="w-6 h-0.5 bg-white rounded" />
        <span className="w-6 h-0.5 bg-white rounded" />
      </div>

    </nav>
  )
}

export default Navbar