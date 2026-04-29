import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import SplitText from "../../Animation/SplitText";
import RevealDelay from "../../Animation/RevealDelay";
import {useNavigate} from "react-router-dom";

// ── SVG Icons ──────────────────────────────────────────────
const WebIcon = () => (

  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="15" rx="2" stroke="#4ade80" strokeWidth="1.5" />
    <path d="M8 21h8M12 18v3" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 7h20" stroke="#4ade80" strokeWidth="1.5" />
    <circle cx="5" cy="5" r="0.8" fill="#4ade80" />
    <circle cx="7.5" cy="5" r="0.8" fill="#4ade80" />
    <circle cx="10" cy="5" r="0.8" fill="#4ade80" />
  </svg>
);

const AppIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="1" width="12" height="22" rx="3" stroke="#4ade80" strokeWidth="1.5" />
    <path d="M10 5h4" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="19" r="1" fill="#4ade80" />
  </svg>
);

const ApiIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="5" rx="1.5" stroke="#4ade80" strokeWidth="1.5" />
    <rect x="2" y="10" width="20" height="5" rx="1.5" stroke="#4ade80" strokeWidth="1.5" />
    <rect x="2" y="17" width="20" height="5" rx="1.5" stroke="#4ade80" strokeWidth="1.5" />
    <circle cx="18.5" cy="5.5" r="1" fill="#4ade80" />
    <circle cx="18.5" cy="12.5" r="1" fill="#4ade80" />
    <circle cx="18.5" cy="19.5" r="1" fill="#4ade80" />
  </svg>
);



// ── Services Data ──────────────────────────────────────────
const services = [
  {
    Icon: WebIcon,
    title: "Web Development",
    desc: "Fast, responsive, and modern websites built with React, Next.js, and Tailwind CSS — architected to perform.",
    tags: ["React", "Next.js", "Tailwind", "TypeScript"],
    stat: "98+",
    statLabel: "Lighthouse Score",
    num: "01",
    featured: true,
  },
  {
    Icon: AppIcon,
    title: "App Development",
    desc: "Native & cross-platform mobile apps for iOS and Android using React Native — one codebase, everywhere.",
    tags: ["iOS", "Android", "React Native"],
    num: "02",
  },
  {
    Icon: ApiIcon,
    title: "Backend & API",
    desc: "Scalable REST APIs, databases, and server logic using Node.js and MongoDB — built to handle real load.",
    tags: ["Node.js", "MongoDB", "REST"],
    num: "03",
  },
];

// ── Component ──────────────────────────────────────────────
const MainContain4 = () => {
  const navigate = useNavigate();
  const containerRef = useRef();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative w-full bg-black px-6 md:px-20 py-20 text-white overflow-hidden"
    >
      {/* Glow BG */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-green-400/[0.07] blur-[120px] rounded-full" />
        <div className="absolute bottom-24 -right-24 w-[400px] h-[400px] bg-green-400/[0.04] blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-green-400 mb-5 px-4 py-1.5 rounded-full border border-green-400/30 bg-green-400/5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          What we build
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.05] tracking-tight mb-4">
          <SplitText>Deliver your project with</SplitText>
          <br />
          <span className="text-green-400">
            <SplitText>core services</SplitText>
          </span>
        </h1>

        <RevealDelay>
          <p className="text-white/40 text-sm sm:text-base leading-relaxed font-light max-w-lg mx-auto">
            From pixel-perfect UI to rock-solid backends — every service
            engineered to ship fast and scale further.
          </p>
        </RevealDelay>
      </div>

      {/* Cards Grid */}
      <div className="max-w-[820px] mx-auto flex flex-col gap-4">

        {/* ── Featured Card: Web Dev ── */}
        <motion.div
          onClick={() => navigate("/services")}

          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          className="group relative rounded-2xl bg-[#0e0e0e] border border-white/[0.08] hover:border-green-400/25 transition-all duration-300 p-10 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-10 hover:-translate-y-1"
        >
          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ background: "radial-gradient(circle at 20% 50%, rgba(74,222,128,0.06), transparent 60%)" }}
          />

          {/* Number */}
          <span className="absolute top-6 right-6 text-[11px] font-bold tracking-widest text-white/15">01</span>

          {/* Left */}
          <div className="flex-1">
            {/* Icon box */}
            <div
              className="rounded-2xl border border-green-400/20 bg-green-400/[0.06] flex items-center justify-center mb-7 group-hover:bg-green-400/[0.12] group-hover:border-green-400/40 transition-all duration-300"
              style={{ width: 52, height: 52 }}
            >
              <WebIcon />
            </div>

            <h3 className="text-2xl font-bold tracking-tight mb-2">{services[0].title}</h3>
            <p className="text-sm text-white/40 leading-relaxed font-light max-w-sm mb-5">{services[0].desc}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {services[0].tags.map((t) => (
                <span key={t} className="text-[11px] font-medium tracking-wide text-green-400/70 px-2.5 py-1 rounded-full border border-green-400/20 bg-green-400/5">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col items-end justify-between gap-6 flex-shrink-0">
            {/* Chart visual */}
            <div
              className="rounded-xl border border-white/[0.06] bg-[#161616] flex items-center justify-center overflow-hidden relative"
              style={{ width: 176, height: 128 }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(74,222,128,0.08), transparent 70%)" }} />
              <svg viewBox="0 0 100 60" className="w-28 h-16 opacity-70">
                <polyline points="0,50 18,32 36,50 58,18 80,38 100,10" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="0,58 18,46 36,58 58,38 80,50 100,40" fill="none" stroke="rgba(74,222,128,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Stat */}
            <div className="text-right">
              <span className="block text-3xl font-extrabold tracking-tight">{services[0].stat}</span>
              <span className="text-[12px] text-white/30 tracking-wide">{services[0].statLabel}</span>
            </div>

            {/* Arrow */}
            <span className="w-10 h-10 flex rounded-full justify-center items-center border border-white/15 group-hover:bg-green-400 group-hover:border-green-400 transition-all duration-300 cursor-pointer">
              <MdArrowOutward className="text-white/50 group-hover:text-black group-hover:rotate-45 transition-all duration-300 text-base" />
            </span>
          </div>
        </motion.div>

        {/* ── Bottom two cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.slice(1).map((s, i) => {
            const Icon = s.Icon;
            return (
              <motion.div
                onClick={() => navigate("/services")}

                key={i}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1], delay: 0.2 + i * 0.15 }}
                className="group relative rounded-2xl bg-[#0e0e0e] border border-white/[0.08] hover:border-green-400/25 transition-all duration-300 p-8 overflow-hidden flex flex-col hover:-translate-y-1"
                style={{ minHeight: 260 }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(circle at 20% 50%, rgba(74,222,128,0.06), transparent 60%)" }}
                />

                {/* Number */}
                <span className="absolute top-6 right-6 text-[11px] font-bold tracking-widest text-white/15">{s.num}</span>

                {/* Icon box */}
                <div
                  className="rounded-2xl border border-green-400/20 bg-green-400/[0.06] flex items-center justify-center mb-6 group-hover:bg-green-400/[0.12] group-hover:border-green-400/40 transition-all duration-300"
                  style={{ width: 52, height: 52 }}
                >
                  <Icon />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{s.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {s.tags.map((t) => (
                      <span key={t} className="text-[11px] font-medium tracking-wide text-green-400/70 px-2.5 py-1 rounded-full border border-green-400/20 bg-green-400/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <span className="w-10 h-10 mt-6 flex rounded-full justify-center items-center border border-white/15 group-hover:bg-green-400 group-hover:border-green-400 transition-all duration-300 cursor-pointer">
                  <MdArrowOutward className="text-white/50 group-hover:text-black group-hover:rotate-45 transition-all duration-300 text-base" />
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom strip */}
      <div className="max-w-[820px] mx-auto mt-10 pt-5 border-t border-white/[0.07] flex items-center justify-between">
        <span className="text-[13px] text-white/25 font-light">
          Trusted by founders, startups & product teams
        </span>
        <button className="inline-flex items-center gap-2 text-[13px] font-medium text-green-400 px-5 py-2.5 rounded-full border border-green-400/30 bg-green-400/5 hover:bg-green-400/10 transition-all duration-300 cursor-pointer">
          Start a project ↗
        </button>
      </div>
    </motion.div>
  );
};

export default MainContain4;