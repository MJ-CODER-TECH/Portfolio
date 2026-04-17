import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import Footer from "../components/Footer/Footer";

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

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(true);
  const titleRef = useRef()
  const paraRef = useRef()
  const toggleRef = useRef()
  const plansRef = useRef()

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" })
  const plansInView = useInView(plansRef, { once: true, margin: "-100px" })



  return (
    <div className="w-full bg-black px-6 md:px-20 py-20 text-white text-center">

      {/* Heading */}
      <motion.h1 
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
        Flexible Plans for <br />
        <span className="text-green-400">Every Business</span>
      </motion.h1>

      <motion.p 
        ref={paraRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
        className="mt-6 text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        Choose the right plan for your project — transparent pricing, no hidden
        costs, and real results for your business.
      </motion.p>

      {/* Toggle */}
      <motion.div 
        ref={toggleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
        className="flex items-center justify-center mt-8">
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
      </motion.div>

      {/* Cards */}
      <motion.div 
        ref={plansRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12"
        initial={{ opacity: 0 }}
        animate={plansInView ? { opacity: 1 } : {}}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={plansInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className={`rounded-2xl p-6 text-left flex flex-col border ${
              plan.highlight
                ? "border-orange-500 bg-[#1a1a1a]"
                : "border-white/10 bg-[#111]"
            }`}
          >
            {/* Plan name & desc */}
            <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
            <p className="text-white/50 text-sm mt-2 leading-relaxed min-h-[48px]">
              {plan.desc}
            </p>

            {/* Button */}
            <button
              className={`mt-5 w-full py-2.5 rounded-full text-sm font-medium transition-all ${
                plan.highlight
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "border border-white/20 hover:bg-white/10 text-white"
              }`}
            >
              Get Started
            </button>

            {/* Price */}
            <div className="mt-6 pb-4 border-b border-white/10">
              <span className="text-5xl font-bold text-white">
                ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
              </span>
              <span className="text-white/40 text-sm ml-1">
                /{isYearly ? "year" : "month"}
              </span>
              {isYearly && (
                <span className="ml-2 text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                  Save 5%
                </span>
              )}
            </div>

            {/* Features */}
            <p className="text-white/40 text-xs mt-4 mb-3">What's included?</p>
            <ul className="flex flex-col gap-2.5">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                  <Check
                    size={15}
                    className={`mt-0.5 shrink-0 ${
                      plan.highlight ? "text-orange-400" : "text-orange-400"
                    }`}
                  />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
      <Footer />
    </div>
  );
};

export default Pricing;