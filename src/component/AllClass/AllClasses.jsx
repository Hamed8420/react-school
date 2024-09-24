import Back from "../common/back/Back"
// import CoursesCard from "./CoursesCard"
// import OnlineCourses from "./OnlineCourses"
import Header from "../common/heading/Header"
import './allClasses.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import C1 from "../../img/o12.png"
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';


const Allclasses = () => {

    const [classesData, setClassesData] = useState([]);

    useEffect(() => {
      const token = sessionStorage.getItem('accessToken');
  
      axios.get('http://localhost:8000/api/class/AllClass',{
        headers: {
                    Authorization: `Bearer ${token}`
                  }
      })
        .then(response => {
          setClassesData(response.data.allCalsses);
  
          console.log(response.data.allCalsses)
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    
  return (
    <>
  <div className="homeeee">
  <Header/>
      <Back title='Explore Class' />
      {/* <CoursesCard /> */}
      <section className='coursesCard'>
        <div className='contain gride3'>
          {classesData.map((val,index) => (
            <div className='itemsss'>
              <div className='content flexxx'>
                
                  <div className='imgeee'>
   
                    <span>{index+1}</span>
                  </div>
                
                <div className='text'>
                  <h1>{val.name}</h1>
         
                </div>
              </div>
      
                <Link to={`/use/courses/section/${val.id}`} >
              <button className='outline-bt'>
                Show Section!
                </button>
                </Link>
            </div>
          ))}
        </div>
      </section>

      
      {/* <OnlineCourses /> */}
  </div>
    </>
  )
}

export default Allclasses

