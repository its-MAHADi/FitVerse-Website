import React from 'react'
import Banner from '../Banner/Banner'
import FeaturedSection from '../Featured/FeaturedSection'
import AboutSection from '../About/AboutSection'
import FeaturedClasses from '../FeaturedClasses/FeaturedClasses'

const Home = () => {
  return (
    <div>
     <Banner></Banner>
     <FeaturedSection></FeaturedSection>
     <AboutSection></AboutSection>
     <FeaturedClasses></FeaturedClasses>
    </div>
  )
}

export default Home
