import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import "./courses.css"
// import { coursesCard } from "../../dummydata"
import { useParams } from 'react-router-dom';

import axios from 'axios';

const CoursesCard = () => {

  
  const [subjects, setsubjects] = useState([]);
 const {Idclass , Idsection} = useParams()
  useEffect(() => {

    axios.get(`http://localhost:8000/api/subject/getAllSubject/${Idclass}`)
      .then(response => {
        setsubjects(response.data.subjects);

        console.log(response.data.subjects)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <section className='coursesCard'>
        <div className='contain grid2'>
          {subjects.map((val) => (
            <div className='items'>
              <div className='content flex'>
                <div className='left'>
                  <div className='img'>
                    <img src={`http://localhost:8000/${val.image}`} alt='' />
                  </div>
                </div>
                <div className='text'>
                  <h1>{val.name}</h1>
         
                  <div className='details'>
                    {/* {val.courTeacher.map((details) => (
                      <>
                        <div className='box'>
                          <div className='dimg'>
                            <img src={details.dcover} alt='' />
                          </div>
                          <div className='para'>
                            <h4>{details.name}</h4>
                          </div>
                        </div>
                      </>
                    ))} */}
                  </div>
                </div>
              </div>
      
              <button className='outline-btn'>Show Lesson!</button>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default CoursesCard
