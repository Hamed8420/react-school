import Back from "../common/back/Back"

import Header from "../common/heading/Header"
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const AllSection = () => {
    const [sections, setSections] = useState([]);
    const { Idclass } = useParams();
    const token = sessionStorage.getItem('accessToken');
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            'http://localhost:8000/api/section/allSections',
            { classId: Idclass },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          setSections(response.data.sections);
          console.log(response.data.sections)
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    }, [Idclass, token]);

    
  return (
    <>
    <div className="homeeee">
    <Header/>
      <Back title='Explore Class' />
      {/* <CoursesCard /> */}
      <section className='coursesCard'>
        <div className='contain gride3'>
          {sections.map((val,index) => (
            <div className='itemsss'>
              <div className='content flexxx'>
                
                  <div className='imgeee'>
                    {/* <img src={index+1} alt='' /> */}
                    <span>{val.maxNumberOfStudent}</span>
                  </div>
                
                <div className='text'>
                  <h1>{val.sectionNumber}</h1>
         
                 
                     
                          <div className='dimg'>
                          <Link to={`/use/courses/section/${Idclass}/timetable/${val.id}`}>
                             <button>Schedule</button>
                             </Link>
                  
                          </div>
                    

           
                </div>
              </div>
              <Link to={`/use/courses/section/${Idclass}/lessons/${val.id}`}>
              <button className='outline-bt'>
                Show Subject!
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

export default AllSection

