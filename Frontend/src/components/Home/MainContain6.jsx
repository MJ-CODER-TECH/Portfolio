import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "../../Animation/SplitText";
import { Check } from "lucide-react";
import RevealDelay from "../../Animation/RevealDelay";

import { getPlans } from "../../services/api";


const MainContain6 = () => {
  const [isYearly, setIsYearly] = useState(true);

  const containerRef = useRef();
  const paraRef = useRef();
  const toggleRef = useRef();
  const cardsRef = useRef();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })


    const [plans, setPlans] = useState([]);
    const [billingType, setBillingType] = useState("month");
  
    const titleRef = useRef();
    const plansRef = useRef();
  
    const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
    const plansInView = useInView(plansRef, { once: true, margin: "-100px" });
  
    const filteredPlans = plans.filter((plan) => plan.duration === billingType);
  
    useEffect(() => {
      getPlans().then((res) => {
        setPlans(res.data.data);
      });
    }, []);

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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
            className="flex items-center justify-center mt-8"
          >
            <div className="flex items-center bg-[#1a1a1a] border border-white/10 rounded-full p-1 gap-1">
              {[
                { label: "Monthly", value: "month" },
                { label: "Yearly", value: "year" },
                { label: "One Time", value: "one-time" },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setBillingType(tab.value)}
                  className={`px-5 py-1.5 rounded-full text-sm transition-all ${
                    billingType === tab.value
                      ? "bg-orange-500 text-white font-medium"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
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
        {filteredPlans.length === 0 ? (
          <p className="col-span-3 text-white/30 text-sm mt-10">Loading plans...</p>
        ) : (
          filteredPlans.map((plan, i) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={plansInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.1 }}
              className={`rounded-2xl p-6 text-left flex flex-col border ${
                plan.isPopular
                  ? "border-orange-500 bg-[#1a1a1a]"
                  : "border-white/10 bg-[#111]"
              }`}
            >
              {/* Plan name & desc */}
              <h3 className="text-lg font-semibold text-white">{plan.title}</h3>
              <p className="text-white/50 text-sm mt-2 leading-relaxed min-h-[48px]">
                {plan.description}
              </p>

              {/* Button */}
              <button
                className={`mt-5 w-full py-2.5 rounded-full text-sm font-medium transition-all ${
                  plan.isPopular
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border border-white/20 hover:bg-white/10 text-white"
                }`}
              >
                Get Started
              </button>

              {/* Price */}
              <div className="mt-6 pb-4 border-b border-white/10">
                <span className="text-5xl font-bold text-white">
                  ₹{plan.price.toLocaleString("en-IN")}
                </span>
                <span className="text-white/40 text-sm ml-1">
                  /{billingType === "month" ? "month" : billingType === "year" ? "year" : "one time"}
                </span>
                {billingType === "year" && (
                  <span className="ml-2 text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">
                    Save 5%
                  </span>
                )}
              </div>

              {/* Features */}
              <p className="text-white/40 text-xs mt-4 mb-3">What's included?</p>
              <ul className="flex flex-col gap-2.5">
                {plan.features
                  .filter((f) => f !== "What's included?")
                  .map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-white/70">
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-orange-400"
                      />
                      {f}
                    </li>
                  ))}
              </ul>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
};

export default MainContain6;