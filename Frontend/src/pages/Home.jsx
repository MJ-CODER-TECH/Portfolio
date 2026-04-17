import React from "react";
import MainContain from '../components/Home/MainContain'
import MainContain2 from '../components/Home/MainContain2'
import MainContain3 from '../components/Home/MainContain3'
import MainContain4 from '../components/Home/MainContain4'
import MainContain5 from '../components/Home/MainContain5'
import MainContain6 from '../components/Home/MainContain6'
import MainContain7 from '../components/Home/MainContain7'
import MainContain8 from '../components/Home/MainContain8'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div className='w-full h-screen bg-black '>
      <MainContain />
      <MainContain2/>
      <MainContain3/>
      <MainContain4/>
      <MainContain5/>
      <MainContain6/>
      <MainContain7/>
      <MainContain8/>
      <Footer/>
    </div>
  )
}

export default Home