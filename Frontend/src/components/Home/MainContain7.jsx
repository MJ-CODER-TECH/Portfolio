import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SplitText from "../../Animation/SplitText";
import RevealDelay from "../../Animation/RevealDelay";
const faqs = [
  {
    question: "How long does it take to build my project?",
    answer:
      "It depends on the project size. A basic website takes 1–2 weeks, a web app takes 3–6 weeks, and a full custom software or mobile app takes 6–12 weeks. We always share a clear timeline before starting.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern tech stack — React, Next.js, Node.js, MongoDB, PostgreSQL, React Native, Tailwind CSS, and more.",
  },
  {
    question: "Will I get the source code after project completion?",
    answer:
      "Yes, absolutely. Once the project is complete and payment is done, full source code ownership is transferred to you.",
  },
  {
    question: "Are there any hidden charges?",
    answer:
      "No hidden fees at all. Everything is discussed upfront.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes! Every plan includes free post-launch support.",
  },
];

const MainContain7 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const containerRef = useRef();
  const titleRef = useRef();
  const paraRef = useRef();
  const faqRef = useRef();
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <motion.div 
      ref={containerRef} 
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="w-full bg-black px-6 md:px-40 py-20 text-white text-center">

      {/* Heading */}
      <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
        <SplitText>Frequently asked</SplitText> <br />
        <span className="text-green-400"><SplitText>questions</SplitText></span>
      </h1>

<RevealDelay> <p ref={paraRef} className="mt-6 text-white/50 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
        Have questions? We've got clear answers to help you understand every step.
      </p></RevealDelay>
     

      {/* FAQ List */}
      <motion.div 
        ref={faqRef} 
        className="flex flex-col gap-3 mt-12"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            onClick={() => toggle(i)}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1], delay: i * 0.08 }}
            className="bg-[#111] border border-white/10 rounded-2xl px-6 py-5 text-left cursor-pointer hover:border-white/30 transition-all duration-300"
          >
            <div className="flex justify-between items-center">
              <span className="text-white text-sm sm:text-base font-medium">
                {faq.question}
              </span>
              <span
                className={`text-white/60 text-xl transition-transform duration-300 ${
                  openIndex === i ? "rotate-45" : "rotate-0"
                }`}
              >
                +
              </span>
            </div>

            {/* Answer (height controlled) */}
            <div
              style={{
                maxHeight: openIndex === i ? "200px" : "0px",
              }}
              className="overflow-hidden transition-all duration-300"
            >
              <p className="text-white/50 text-sm mt-4 leading-relaxed">
                {faq.answer}
              </p>
            </div>

          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MainContain7;