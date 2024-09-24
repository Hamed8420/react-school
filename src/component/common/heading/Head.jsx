import React from "react"
import { Link } from "react-router-dom"
import t12 from "../../../img/t12.png"
const Head = () => {
  return (
    <>
      <section className='head'>
        <div className='contain flexSB'>
          <div className='logo'>
         <div className="mse">
         {/* <span><img src={t12} alt=""  className="msee"/></span> */}
         <h1>Modern electronic school</h1>
         </div>
            <span>ONLINE EDUCATION & LEARNING</span>
          </div>

          <div className='social'>
       <Link to={`/use/profile`}>
       <i class="fas fa-user icon"></i></Link>
          <a href="http://google.com">  <i className='fab fa-facebook-f icon'></i></a>
          <a href="http://instagram.com"><i className='fab fa-instagram icon'></i></a>
          <a href="http://twitter.com"><i className='fab fa-twitter icon'></i></a>
          <a href="http://youtube.com"><i className='fab fa-youtube icon'></i></a>
          
          </div>
        </div>
      </section>
    </>
  )
}

export default Head
