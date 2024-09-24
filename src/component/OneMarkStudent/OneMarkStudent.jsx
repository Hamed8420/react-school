import React, { useEffect, useState } from 'react';
// import './studentOne.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/heading/Header';
import Back from '../common/back/Back';
import Cookies from 'js-cookie';

const OneMarkStudent = () => {
  const { usenum, year } = useParams();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const token = Cookies.get('accessToken');

    axios.post('http://localhost:8000/api/mark/getStudentMarks', {
      studetnNumber: usenum,
      year: year
    }, {
      headers: {
        // 'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setGrades(response.data.marks);
        console.log(response.data.marks)
      })
      .catch(error => {
        console.log(error);
      });
  }, [usenum, year]);

  return (
<>   
<div className='homeeee'>
<Header/>
      <Back title='Blog Posts' />

      <section className="blog padding">
    

        <div className="contain">
          <h2>Student Information</h2>
          {/* <p>Name: <span>{marks.User.firstName}</span> <span>{marks.User.lastName}</span></p> */}

          <h2>Grades</h2>
          <ul className="grades-list">
            {grades.map((grade, index) => (
              <li key={index}>
                <p>{grade.subject.name}</p>
                <span>{grade.mark}</span>
                <span> {grade.status}</span>
              </li>
            ))}
          </ul>
        </div>

      </section>
</div>  
    </>

  );
};

export default OneMarkStudent;