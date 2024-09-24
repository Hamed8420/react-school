import React from "react"
import Title from "../common/Title/Title"
import "./about.css"
import { homeAbout } from "../../dummydata"
import Awrapper from "./Awrapper"
import about from '../../img/about.webp'
import b3 from '../../img/b3.webp'
import b5 from '../../img/b5.webp'
import b6 from '../../img/b6.webp'

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='contain flexSB'>
          <div className='left row'>
            <img src={about} alt='' />
          </div>
          <div className='right row'>
            <Title subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' />

            <div className='items'>
              {/* {homeAbout.map((val) => {
                return (
                  <div className='item flexSB'>
                    <div className='img'>
                      <img src={val.cover} alt='' />
                    </div>
                    <div className='text'>
                      <h2>{val.title}</h2>
                      <p>{val.desc}</p>
                    </div>
                  </div>
                )
              })} */}

<div className='item flexSB'>
                    <div className='img'>
                      <img src={b5} alt='' />
                    </div>
                    <div className='text'>
                      <h2>Online Courses</h2>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    </div>
                  </div>


                  
<div className='item flexSB'>
                    <div className='img'>
                      <img src={b6} alt='' />
                    </div>
                    <div className='text'>
                      <h2>Earn A Certificates</h2>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    </div>
                  </div>


                  
<div className='item flexSB'>
                    <div className='img'>
                      <img src={b3} alt='' />
                    </div>
                    <div className='text'>
                      <h2>Learn with Expert</h2>
                      <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    </div>
                  </div>



            </div>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard
