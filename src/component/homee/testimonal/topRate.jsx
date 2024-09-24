import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { testimonal } from "../../../dummydata"
// import Heading from "../../common/heading/Heading"
import Title from "../../common/Title/Title"
import "./style.css"

import Cookies from 'js-cookie';
const Testimonall = () => {
    const [dataa, setDataa] = useState([]);
    const formatDa = (date) => {
        if (typeof date === 'number') {
          return date.toFixed(1);
        }
        return date.toString();
      };

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        axios.get('http://localhost:8000/api/user/getMostRate',{
            headers: {
                Authorization: `Bearer ${token}`
              }
        })
          .then(response => {
            setDataa(response.data.users);
            console.log(response.data.users)
            
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
    
  return (
    <>
      <section className='testimonal padding'>
        <div className='contain'>
        <div id='heading'>
        <h3>Top Rate Of Teacher</h3>
        <h1>Our Successful Teacher </h1>
      </div>
          {/* <Title subtitle='TESTIMONIAL' title='Our Successful Students' /> */}

          <div className='content grid2222'>
            {dataa.map((val) => (
              <div className='items shadow'>
                <div className='box flex'>
                  <div className='img'>
                    <img src={`http://localhost:8000/${val.image}`} alt='' />
                    <i className='fa fa-quote-left icon'></i>
                  </div>
                  <div className='name'>
                    <h2>{val.firstName }</h2>
                    <span>{val.lastName}</span>
                  </div>
                </div>
                <p>{val.email}</p>
                <div className='star'>
        <span>
          {/* {teacher.rate} */}
          {formatDa(val.rate)}
          </span>
       <i class="fas fa-star"></i>
       </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Testimonall
