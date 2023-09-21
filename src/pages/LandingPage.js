import React from 'react'
import Navbar from '../LandingPage/Navbar'
import About from '../LandingPage/About'
import Hero from '../LandingPage/Hero'
import Footer from '../LandingPage/Footer'
import Pricing from '../LandingPage/Pricing'
import Support from '../LandingPage/Support'
import AllInOne from '../LandingPage/AllInOne'

const LandingPage = () => {
  return (
    <div className='h-screen w-full'>
    <Navbar />
    <Hero />
    <About />
    <Support />
    <AllInOne />
    <Pricing />
    <Footer />
    </div>
  )
}

export default LandingPage