import React from "react"
// import Heading from "../../common/heading/Heading"
// import Title from "../../common/Title/Title"
import "./hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='contain'>
          <div className='rowe'>
          <div id='heading'>
        <h3>WELCOME TO ACADEMIA</h3>
        <h1>Best Online Education Expertise </h1>
      </div>
            {/* <Title subtitle='WELCOME TO ACADEMIA' title='Best Online Education Expertise' /> */}
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            {/* <div className='button'>
              <button className='primary-btn'>
                GET STARTED NOW <i className='fa fa-long-arrow-alt-right'></i>
              </button>
              <button>
                VIEW COURSE <i className='fa fa-long-arrow-alt-right'></i>
              </button>
            </div> */}
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
