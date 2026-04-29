import React, { useRef } from 'react'

const Footer = () => {
  const footerRef = useRef()
  const columnsRef = useRef()
  const bottomRef = useRef()

  return (
    <div ref={footerRef}>
      <footer className="bg-black text-white px-6 py-16">
        <div ref={columnsRef} className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">

          {/* Logo + About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center font-bold">
                S
              </div>
              <h2 className="text-xl font-semibold">MJ Coder</h2>
            </div>

            <p className="text-gray-400 text-sm">
              We build scalable web applications, modern UI/UX, and powerful backend systems for growing businesses.
            </p>
          </div>

          {/* Main Pages */}
          <div>
            <h3 className="font-semibold mb-4">Main Pages</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>About Us</li>
              <li>Services</li>
              <li>Projects</li>
              <li>Blog</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Contact</li>
              <li>Case Studies</li>
              <li>Documentation</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Utility */}
          <div>
            <h3 className="font-semibold mb-4">Utility Pages</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Licenses</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div ref={bottomRef} className="max-w-6xl mx-auto mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          
          <p className="text-gray-500 text-sm">
            © 2026 SoftTech. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              f
            </div>
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              in
            </div>
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              X
            </div>
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition">
              ig
            </div>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer
