import React from 'react'
import Navbar from '@/components/shared/navbar'
import Footer from '@/components/shared/footer'
import HeroSection from '@/components/pagecomponents/homecomponents/heroSection'
import Categories from '@/components/pagecomponents/homecomponents/Category'
import LatestJobs from '@/components/pagecomponents/homecomponents/LatestJobs'

export default function Home() {
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
