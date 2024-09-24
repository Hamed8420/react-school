import React from 'react'
import Gjo from '../img/gjo.jpg'
import { Link } from 'react-router-dom'

const Navbare = () => {
  return (
    <div className='navbare'>
<div className='users'>

  <Link to={`/chat/adde`} className='addddd'>AddNewGroup</Link>
</div>
    </div>
  )
}

export default Navbare