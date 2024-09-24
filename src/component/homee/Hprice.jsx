import React from "react"
// import Heading from "../common/heading/Heading"
import Title from "../common/Title/Title"
import PriceCard from "../pricing/PriceCard"

const Hprice = () => {
  return (
    <>
      <section className='hprice padding'>
        <Title subtitle='OUR PRICING' title='Pricing & Packages' />
        <div className='price contain grid'>
          <PriceCard />
        </div>
      </section>
    </>
  )
}

export default Hprice
