import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Pricing", to: "/pricing" },
  { label: "About", to: "/about" },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[99999] flex flex-col justify-center items-center w-10 h-10 gap-1.5"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="w-6 h-[2px] bg-white rounded origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="w-6 h-[2px] bg-white rounded"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="w-6 h-[2px] bg-white rounded origin-center"
        />
      </button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99990]"
          />
        )}
      </AnimatePresence>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed top-0 right-0 w-[300px] h-screen bg-[#080808] z-[99995] flex flex-col"
          >
            {/* Glow */}
            <div className="absolute -top-16 -right-16 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,rgba(74,222,128,0.08),transparent_70%)] pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-white/10">
              <span className="text-white font-bold text-lg">
                MJ <span className="text-green-400">Coder</span>
              </span>

              {/* <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center"
              >
                <svg width="13" height="13" viewBox="0 0 14 14">
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button> */}
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto px-7 py-2">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <NavLink
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between py-4 border-b border-white/10"
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-4">
                          <span className="text-[11px] text-white/20 tracking-widest min-w-[18px]">
                            0{i + 1}
                          </span>
                          <span
                            className={`text-2xl font-bold ${
                              isActive ? "text-green-400" : "text-white"
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>

                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                            isActive
                              ? "border-green-400/40"
                              : "border-white/10"
                          }`}
                        >
                          <MdArrowOutward
                            className={`text-sm ${
                              isActive
                                ? "text-green-400 rotate-45"
                                : "text-white/30"
                            }`}
                          />
                        </span>
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-7 pt-5 pb-8 border-t border-white/10">
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-green-400 text-black font-bold text-sm"
              >
                Start a Project
                <MdArrowOutward />
              </NavLink>

              <div className="flex justify-center gap-6 mt-5">
                {["Twitter", "GitHub", "LinkedIn"].map((s) => (
                  <a key={s} href="#" className="text-xs text-white/30">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileMenu;