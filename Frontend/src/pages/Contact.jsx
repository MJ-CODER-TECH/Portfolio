import { useState } from "react";
import Footer from "../components/Footer/Footer";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <>
    <section className="relative min-h-screen bg-[#050505] flex items-center justify-center px-4 py-30 overflow-hidden">

      {/* Background Blobs */}
      <div className="absolute top-[-80px] left-[-100px] w-[400px] h-[400px] rounded-full bg-green-400 opacity-10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-orange-500 opacity-10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[860px] grid md:grid-cols-[1fr_1.3fr] border border-[#1f1f1f] rounded-[20px] overflow-hidden bg-[#0d0d0d]">

        {/* LEFT PANEL */}
        <div className="flex flex-col justify-between p-10 border-b md:border-b-0 md:border-r border-[#1f1f1f]">
          <div>
            {/* Tag */}
            <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-green-400 bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full mb-6">
              Available for work
            </span>

            {/* Heading */}
            <h2 className="font-syne text-[2.2rem] font-bold text-[#f5f5f5] leading-tight mb-4">
              Let&apos;s build<br />something <span className="text-green-400">great.</span>
            </h2>

            <p className="text-sm text-[#5a5a5a] leading-relaxed mb-8">
              Have a project in mind? I&apos;d love to hear about it. Send a message and I&apos;ll get back to you within 24 hours.
            </p>

            {/* Contact Info */}
            <div className="flex flex-col gap-4">
              {/* Email */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-green-400/5 border border-green-400/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 stroke-green-400" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-[#3d3d3d]">Email</p>
                  <p className="text-sm text-[#b0b0b0]">your@email.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[10px] bg-green-400/5 border border-green-400/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 stroke-green-400" viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.8 19.8 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.8 19.8 0 01.07 1.18 2 2 0 012.06 0h3a2 2 0 012 1.72c.13 1 .37 1.97.72 2.9a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.93.35 1.9.59 2.9.72A2 2 0 0122 14.92z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-widest text-[#3d3d3d]">Phone</p>
                  <p className="text-sm text-[#b0b0b0]">+91 12345 67890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Dot */}
          <div className="flex items-center gap-2 mt-10 text-xs text-[#4a4a4a]">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Currently available for freelance projects
          </div>
        </div>

        {/* RIGHT PANEL - FORM */}
        <div className="p-10">
          <h3 className="font-syne text-[1.05rem] font-semibold text-[#d0d0d0] pb-4 mb-6 border-b border-[#1a1a1a]">
            Send a message
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Name + Email Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-widest text-[#3d3d3d]">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-[#0a0a0a] border border-[#1d1d1d] rounded-[10px] px-3.5 py-3 text-sm text-[#d0d0d0] placeholder-[#2e2e2e] outline-none focus:border-green-400/40 focus:bg-[#0c100c] transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] uppercase tracking-widest text-[#3d3d3d]">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@email.com"
                  required
                  className="bg-[#0a0a0a] border border-[#1d1d1d] rounded-[10px] px-3.5 py-3 text-sm text-[#d0d0d0] placeholder-[#2e2e2e] outline-none focus:border-green-400/40 focus:bg-[#0c100c] transition-all"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-widest text-[#3d3d3d]">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                className="bg-[#0a0a0a] border border-[#1d1d1d] rounded-[10px] px-3.5 py-3 text-sm text-[#d0d0d0] placeholder-[#2e2e2e] outline-none focus:border-green-400/40 focus:bg-[#0c100c] transition-all"
              />
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] uppercase tracking-widest text-[#3d3d3d]">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
                className="bg-[#0a0a0a] border border-[#1d1d1d] rounded-[10px] px-3.5 py-3 text-sm text-[#d0d0d0] placeholder-[#2e2e2e] outline-none focus:border-green-400/40 focus:bg-[#0c100c] transition-all resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-1 py-3 bg-green-400 text-[#020d04] font-syne font-bold text-sm tracking-wide rounded-[10px] flex items-center justify-center gap-2 hover:bg-green-300 active:scale-[0.98] transition-all"
            >
              Send Message
              <svg className="w-3.5 h-3.5 stroke-[#020d04]" viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>

            {/* Success Banner */}
            {sent && (
              <div className="flex items-center gap-2.5 bg-green-400/5 border border-green-400/15 rounded-[10px] px-4 py-3 text-sm text-green-400">
                <svg className="w-4 h-4 stroke-green-400 shrink-0" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Message sent! I'll get back to you soon.
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
          <Footer/>
          </>

  );
};

export default Contact;