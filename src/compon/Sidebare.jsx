import React from 'react'
import Navbare from "./Navbare"
// import Search from './Search'
import Chats from "./Chats"

const Sidebare = ({socket}) => {
  return (
    <div className="sidebare">
        <Navbare/>
        {/* <Search/> */}
        <Chats socket={socket}/>
        </div>
  )
}

export default Sidebare