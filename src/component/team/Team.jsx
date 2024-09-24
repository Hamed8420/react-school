import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Back from "../common/back/Back"
// import TeamCard from "./TeamCard"
import "./team.css"
// import Awrapper from "../about/Awrapper"
import "../about/about.css"
import Header from "../common/heading/Header"
// import { team } from "../../dummydata"
import Gojo from '../../img/gojo.jfif'
// import Cookies from 'js-cookie';

const Team = () => {
  const [data, setData] = useState([]);

  // const formatDa = date => {
  //   if (date.length > 5) {
  //     return date.slice(0, 5);
  //   }
  //   return date;
  // };
  const formatDa = (date) => {
    if (typeof date === 'number') {
      return date.toFixed(1);
    }
    return date.toString();
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/getUser/TEACHER')
      .then(response => {
        setData(response.data.users);
        console.log(response.data.users)
        
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <>
    <div className='homeeee'>
    <Header/>
      <Back title='Team' />
      <section className='team padding'>
        <div className='contain gride3'>
          {/* <TeamCard /> */}

          {data.map((teacher) => (
        <div className='items shadow'>
          <div className='img'>

            {/* <img src={`http://localhost:8000/${teacher.image}`} alt='' /> */}
            <img src={Gojo} alt='' />


            <div className='overlay'>
              <a href='google.com'> <i className='fab fa-facebook-f icon'></i></a>
             
              <i className='fab fa-twitter icon'></i>
              <i className='fab fa-instagram icon'></i>
              <i className='fab fa-tiktok icon'></i>
            </div>
          </div>
          <div className='details'>
       <div className='ratee'>
            <h2>{teacher.firstName} {teacher.lastName}</h2>
       <div className='star'>
        <span>
          {/* {teacher.rate} */}
          {formatDa(teacher.rate)}
          </span>
       <i class="fas fa-star"></i>
       </div>
       </div>
       <p>{teacher.email}</p>
          </div>
        </div>
      ))}
        </div>
      </section>
      {/* <Awrapper /> */}
    </div>
    </>
  )
}

export default Team
