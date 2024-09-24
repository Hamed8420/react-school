import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import b5 from '../../img/b5.webp'

import "./allNotification.css"

import { useParams } from 'react-router-dom';

import axios from 'axios';
import Back from "../common/back/Back"
import Header from "../common/heading/Header"
import Cookies from 'js-cookie';

const AllNotification = () => {

  
  const [services, setServices] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

    axios
      .get('http://localhost:8000/api/effectiveness/allEffectiveness', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setServices(response.data.effects);
        console.log(response.data.effects);
      })
      .catch(error => {
        console.log('حدث خطأ أثناء استدعاء البيانات:', error);
      });
  }, []);

  const formatDate = date => {
    if (date.length > 10) {
      return date.slice(0, 10);
    }
    return date;
  };

  return (
    <>
   <div className='homeeee'>
   <Header/>
      <Back title='Explore Courses' />
      
      <section className='coursesCard'>
        <div className='contain grid2'>
          {services.map((val) => (
            <div className='items'>


              <div className=' fle'>
             
                <div className='text'>
                  <img
                  src ={`http://localhost:8000/${val.image}`}
                  // src={b5}
                   alt=''/>
              </div>
         
             <div className='rightt'>
                  <h1>{val.title}</h1>
             <div className='details'>
                 
             
                   <div className='pere'>
                     <h4><span>start:</span> {formatDate(val.startDate)}</h4>
                   </div>
                   <div className='pere'>
                     <h4><span>end:</span> {formatDate(val.endDate)}</h4>
                   </div>
               
           </div>

           <div className='desss'>
             <p>{val.description}</p>


           </div>
             <button className='outlin-'>
          <Link to={`/use/notifcation/order/${val.id}`} className="edite">
          show order
           </Link>
          </button>
               </div>

                </div>
      
          

                 
            </div>
          ))}
        </div>
      </section>
   </div>
    </>
    
  )
}

export default AllNotification
