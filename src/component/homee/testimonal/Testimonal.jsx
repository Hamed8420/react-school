import React from "react"
import { testimonal } from "../../../dummydata"
// import Heading from "../../common/heading/Heading"
import Title from "../../common/Title/Title"
import "./style.css"

const Testimonal = () => {
  return (
    <>
      <section className='testimonal padding'>
        <div className='contain'>
        <div id='heading'>
        <h3>TESTIMONIAL</h3>
        <h1>Our Successful Students </h1>
      </div>
          {/* <Title subtitle='TESTIMONIAL' title='Our Successful Students' /> */}

          <div className='content grid2222'>
            {testimonal.map((val) => (
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={val.cover} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonal
