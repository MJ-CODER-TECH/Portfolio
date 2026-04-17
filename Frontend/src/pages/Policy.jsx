import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PrivacyPolicy = () => {
  const titleRef = useRef()
  const contentRef = useRef()

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" })
  const contentInView = useInView(contentRef, { once: true, margin: "-100px" })



  return (
    <div className="bg-black text-white px-6 py-20">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12">
          <motion.h1 
            ref={titleRef}
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="text-4xl md:text-5xl font-bold mb-4">
            Privacy <span className="text-green-400">Policy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
            className="text-gray-400 text-sm">
            Last updated: April 2026
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div 
          ref={contentRef}
          initial={{ opacity: 0 }}
          animate={contentInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-10 text-gray-300 text-sm leading-relaxed">

          {/* Intro */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
          >
            <p>
              This Privacy Policy describes how <span className="text-white font-medium">Mozzim.dev</span> 
              ("we", "our", or "us") collects, uses, and protects your information when you access or use our website and services.
            </p>
          </motion.section>

          {/* Info Collection */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.05 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Personal information (such as name and email address)</li>
              <li>Information submitted through contact forms</li>
              <li>Technical data such as browser type, IP address, and device information</li>
            </ul>
          </motion.section>

          {/* Usage */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              2. How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to inquiries and provide support</li>
              <li>To improve website performance and user experience</li>
              <li>To communicate updates, services, or relevant information</li>
            </ul>
          </motion.section>

          {/* Cookies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.15 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              3. Cookies & Tracking Technologies
            </h2>
            <p>
              We may use cookies and similar technologies to enhance your browsing experience,
              analyze traffic, and understand user behavior.
            </p>
          </motion.section>

          {/* Sharing */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              4. Data Sharing & Third Parties
            </h2>
            <p>
              We do not sell your personal data. However, we may share information with trusted third-party services
              (such as hosting providers or analytics tools) strictly for operational purposes.
            </p>
          </motion.section>

          {/* Security */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.25 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              5. Data Security
            </h2>
            <p>
              We implement industry-standard security measures to protect your data from unauthorized access,
              misuse, or disclosure.
            </p>
          </motion.section>

          {/* Rights */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              6. Your Rights
            </h2>
            <p>
              You have the right to request access, correction, or deletion of your personal data.
              You may contact us at any time regarding your data.
            </p>
          </motion.section>

          {/* Retention */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.35 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              7. Data Retention
            </h2>
            <p>
              We retain your data only for as long as necessary to fulfill the purposes outlined in this policy,
              unless a longer retention period is required by law.
            </p>
          </motion.section>

          {/* Changes */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              8. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be reflected on this page with a revised date.
            </p>
          </motion.section>

          {/* Contact */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1], delay: 0.45 }}
          >
            <h2 className="text-xl font-semibold text-white mb-3">
              9. Contact Information
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact:
            </p>
            <p className="mt-2 text-gray-400">
              📧 Email: mozzimdev@gmail.com <br />
              🌐 Website: Mozzim.dev
            </p>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;