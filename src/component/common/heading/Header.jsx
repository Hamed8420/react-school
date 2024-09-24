import React, { useState } from "react"
import { Link } from "react-router-dom"
import Head from "./Head"
import "./header.css"
import t12 from "../../../img/t12.png"
import t13 from "../../../img/t13.png"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
    <Head />
      <header className="headder">
          <span><img src={t13} alt=""  className="meee"/></span>
        <nav className='flexSBB'>
          <ul className={click ? "mobile-nav" : "flexSBB "} onClick={() => setClick(false)}>
         {/* <span>
          <img src={t12} alt="" />
         </span> */}

            <li>
              <Link to='/use'>Home</Link>
            </li>
            
            {/* <li>
              <Link to='/use/live'>LiveStream</Link>
            </li> */}

            <li>
              <Link to='/use/chat'>Chat</Link>
            </li>

            <li>
              <Link to='/use/courses'>AllCourses</Link>
            </li>
            <li>
              <Link to='/use/about'>About</Link>
            </li>
            <li>
              <Link to='/use/team'>Teacher</Link>
            </li>
            <li>
              <Link to='/use/pricing'>Books</Link>
            </li>
            <li>
              <Link to='/use/notifcation'>notification</Link>
            </li>
            <li>
              <Link to='/use/contact'>Contact</Link>
            </li>
          </ul>
          <div className='start '>
            <li>
              <Link to='/use/signup'>SignUp</Link>
            </li>
            <li>
              <Link to='/use/login'>Login</Link>
            </li>
          </div>
          <button className='toggle' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
      </header>
     
    </>
  )
}

export default Header
