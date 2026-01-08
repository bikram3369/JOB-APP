import React, { useEffect } from 'react'
import Navbar from '@/components/shared/Navbar'
import Footer from '@/components/shared/footer'
import HeroSection from '@/components/pagecomponents/homecomponents/heroSection'
import Categories from '@/components/pagecomponents/homecomponents/Category'
import LatestJobs from '@/components/pagecomponents/homecomponents/LatestJobs'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'



export default function Home() {
  useGetAllJobs();
 
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <Categories/>
      <LatestJobs/>
      <Footer/>
    </div>
  )
}
