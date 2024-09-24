import React from "react"
import AboutCard from "../about/AboutCard"
import Hblog from "./Hblog"
import HAbout from "./HAbout"
import Hero from "./hero/Hero"
import Hprice from "./Hprice"
import Testimonal from "./testimonal/Testimonal"
import Testimonall from "./testimonal/topRate"
import Header from "../common/heading/Header"
import Footer from "../common/footer/Footer"

const Home = () => {
  return (
    <>
    <div className="homeeee">
    <Header/>

    
      <Hero />
   
      <Testimonal />
      <Testimonall />

      
 
      <Footer/>
    </div>

    </>
  )
}

export default Home
