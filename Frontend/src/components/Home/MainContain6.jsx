import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "../../Animation/SplitText";
import { Check } from "lucide-react";
import RevealDelay from "../../Animation/RevealDelay";

const plans = [
  {
    name: "Starter",
    desc: "Perfect for small businesses starting their digital journey — simple, fast, and affordable.",
    monthlyPrice: 299,
    yearlyPrice: 199,
    features: [
      "Landing Page / Basic Website",
      "Mobile Responsive Design",
      "Up to 5 Pages",
      "Contact Form Integration",
      "1 Month Free Support",
      "Standard Delivery",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    desc: "Designed to scale with you — advanced features for faster and smarter digital growth.",
    monthlyPrice: 799,
    yearlyPrice: 599,
    features: [
      "Full Stack Web Application",
      "REST API Development",
      "Up to 15 Pages / Screens",
      "Admin Dashboard",
      "3 Months Free Support",
      "Priority Delivery",
    ],
    highlight: true,
  },
  {
    name: "Scale",
    desc: "Powerful solutions built for high-growth businesses — maximum impact, complete control.",
    monthlyPrice: 1499,
    yearlyPrice: 1199,
    features: [
      "Custom Software / SaaS Product",
      "Mobile App (iOS & Android)",
      "Database Design & Integration",
      "Payment Gateway Integration",
      "6 Months Free Support",
      "Dedicated Developer",
    ],
    highlight: false,
  },
];

const MainContain6 = () => {
  const [isYearly, setIsYearly] = useState(true);

  const containerRef = useRef();
  const titleRef = useRef();
  const paraRef = useRef();
  const toggleRef = useRef();
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
        <SplitText>Flexible Plans for</SplitText> <br />
        <span className="text-green-400"><SplitText>Every Business</SplitText></span>
      </h1>

<RevealDelay>  <p ref={paraRef} className="mt-6 text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        Choose the right plan for your project — transparent pricing, no hidden
        costs, and real results for your business.
      </p>
</RevealDelay>
    
      {/* Toggle */}
      <div ref={toggleRef} className="flex items-center justify-center mt-8">
        <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-full p-1 gap-1">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-1.5 rounded-full text-sm transition-all ${
              !isYearly
                ? "bg-orange-500 text-white font-medium"
                : "text-white/50 hover:text-white"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-5 py-1.5 rounded-full text-sm transition-all ${
              isYearly
                ? "bg-orange-500 text-white font-medium"
                : "text-white/50 hover:text-white"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Cards */}
      <motion.div 
        ref={cardsRef} 
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
            className={`rounded-2xl p-6 text-left flex flex-col border hover:border-white/30 transition-all duration-300 ${
              plan.highlight
                ? "border-orange-500 bg-[#1a1a1a]"
                : "border-white/10 bg-[#111]"
            }`}
          >
            <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
            <p className="text-white/50 text-sm mt-2 min-h-[48px]">{plan.desc}</p>

            <button
              className={`mt-5 w-full py-2.5 rounded-full text-sm font-medium transition-all ${
                plan.highlight
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "border border-white/20 hover:bg-white/10 text-white"
              }`}
            >
              Get Started
            </button>

            <div className="mt-6 pb-4 border-b border-white/10">
              <span className="text-5xl font-bold">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-white/40 text-sm ml-1">
                /{isYearly ? "year" : "month"}
              </span>
            </div>

            <ul className="mt-4 flex flex-col gap-2.5">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                  <Check size={15} className="mt-0.5 text-orange-400" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MainContain6;