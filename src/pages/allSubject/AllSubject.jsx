import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './allsubject.css'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const Subject = () => {


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


  const handleDeleteSubject = async (id) => {
    try {
      const token = sessionStorage.getItem('accessToken'); // استحضار رمز المصادقة من localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة رمز المصادقة إلى رأس الطلب
        },
      };


      await axios.delete(`http://localhost:8000/api/subject/deleteSubject/${id}`, config);
      setsubjects(subjects.filter(subject => subject.id !== id));
    } catch (error) {
      console.error(error);
    }
  };


  return (

    <div className='home'>
    <Sidebar />
    <div className='subjects'>
      <Navbar />
      <div className='class-list'>
      <div className='testes'>
      <h2>All Subjects...</h2>
        <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/adde`} className='addes'>Add</Link>
       </div>
   

 <div className='sara'>
     {subjects.map(lesson => (
          <div key={lesson.id} className='servi-item'>


      <div className="re">
      <div className='imge'>
      <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${lesson.id}/${lesson.teacherId}`} >
            <img src={`http://localhost:8000/${lesson.image}`} alt={lesson.name} className="service-imag" />
            </Link>
      <h3 className='h2'>{lesson.name}</h3>
            </div>
            
            <div className='des'>
                <h4 >{lesson.User.firstName} {lesson.User.lastName} </h4>
                <h4 >minSucc:<span>{lesson.minimumSuccess}</span></h4>
            </div>
          

            <div className='par'>

            <button>
          <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/quessub/${lesson.id}`}>Question</Link>

          </button>
            

                <button>
                  <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/mark/${lesson.id}`}>Mark</Link>
                </button>

              

              </div>
   

                
      
      </div>

      <div className='but'>
      <button onClick={() => handleDeleteSubject(lesson.id)}>Delete</button>
      <button>
                  <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/Attend/${lesson.id}`}>Attend</Link>
                </button>
      <button>
      <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/edites/${lesson.id}`} className='edite'>
                Edit
              </Link>
      </button>

      </div>
          </div>
          
        ))}
      </div >

      </div>
    </div>
  </div>
  );
};

export default Subject;