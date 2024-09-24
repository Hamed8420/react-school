// import React from "react"
import { blog } from "../../dummydata"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// import "./courses.css"
// import { coursesCard } from "../../dummydata"
import { useParams } from 'react-router-dom';

import axios from 'axios';

const BlogCard = () => {

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
      {subjects.map((val) => (
        <div className='subjecte shadow'>
          <div className='subimg'>
            <img src={`http://localhost:8000/${val.image}`} alt='' />
          </div>


          <div className='textt'>

          <div className="teach">
      <h1>{val.name}</h1>
            <label htmlFor=''>{val.User.firstName} {val.User.lastName}</label>
            <p>MinSuc:{val.minimumSuccess}</p>
      </div>

            <div className='admi'>
              <span>
             <Link to={`/use/courses/section/${Idclass}/lessons/${Idsection}/lesson/${val.id}/${val.teacherId}`} >show Lesson!</Link>
              
              </span>
              
              <span>

                <Link to={`/use/courses/section/${Idclass}/lessons/${Idsection}/mark/${val.id}`}>Show Mark!</Link>
      
              </span>
              <span>
             <Link to={`/use/courses/section/${Idclass}/lessons/${Idsection}/quessub/${val.id}`}>Show Question!</Link>
               
              </span>
            </div>
   
          </div>


        </div>
      ))}
    </>
  )
}

export default BlogCard
