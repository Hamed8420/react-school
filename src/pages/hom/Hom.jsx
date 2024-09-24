import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebare from '../../compon/Sidebare';
// import Chat from '../../compon/Chat';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './hom.css'


const Home = ({ socket }) => {
  

  return (
    <div className='list'>
      <Sidebar/>
      <div className='listContainer'>
        <Navbar/>
        <div className="home">
          <div className="homeContainer">
            <div className='chates'>
              
          <Sidebare socket={socket}/>
            </div>

          </div>
        </div>
          
       
      </div>
    </div>
  );
};

export default Home;