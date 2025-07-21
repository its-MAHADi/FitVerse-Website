import React from 'react'
import Banner from '../Banner/Banner'
import FeaturedSection from '../Featured/FeaturedSection'
import AboutSection from '../About/AboutSection'
import FeaturedClasses from '../FeaturedClasses/FeaturedClasses'
import Testimonials from '../Testimonials/Testimonials'
import LatestCommunity from '../Community/LatestCommunity'

const Home = () => {
  return (
    <div>
     <Banner></Banner>
     <FeaturedSection></FeaturedSection>
     <AboutSection></AboutSection>
     <FeaturedClasses></FeaturedClasses>
     <Testimonials></Testimonials>
     <LatestCommunity></LatestCommunity>
    </div>
  )
}

export default Home
