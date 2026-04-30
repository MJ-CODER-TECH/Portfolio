import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Header/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Services from './pages/Services'
import Portfolio from './pages/Portfolio'
import Pricing from './pages/Pricing'
import ScrollToTop from './components/ScrollToTop'
import PrivacyPolicy from './pages/Policy'
import ProjectDetailsPage from './components/Project/ProjectDetailsPage'
import BlogDetailsPage from './components/Blog/BloagDetailsPage'
import FloatingWhatsapp from './components/WhatsappIntegration/WTPIntegration'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <FloatingWhatsapp />
      <ScrollToTop/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/project/:id" element={<ProjectDetailsPage />} />
        <Route path="/blog-details/:id" element={<BlogDetailsPage />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App