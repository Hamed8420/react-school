import React from "react"
import Back from "../common/back/Back"
import PriceCard from "./PriceCard"
import Header from "../common/heading/Header"

import "./price.css"
// import Faq from "./Faq"

const Pricing = () => {
  return (
    <>
  <div className="homeeee">
  <Header/>
      <Back title='Read your Book' />
      <section className='price padding'>
        <div className='contain grid2 '>
          <PriceCard />
        </div>
      </section>
      {/* <Faq /> */}
  </div>
    </>
  )
}

export default Pricing
