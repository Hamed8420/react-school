import React, { useEffect, useState } from 'react';
import './studentOne.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const StudentGrades = () => {
  const { usenum, year } = useParams();
  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

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
    <div className='home'>
      <Sidebar />
      <div className='cantane'>
        <Navbar />

        <div className="editesss">
          <h2>Student Information</h2>
          {/* <p>Name: <span>{marks.User.firstName}</span> <span>{marks.User.lastName}</span></p> */}

          <h3>Grades</h3>
          <ul className="grades-list">
            {grades.map((grade, index) => (
              <li key={index}>
                <h3>{grade.subject.name}:</h3>
                <h5>{grade.mark}</h5>
                <h5> {grade.status}</h5>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};

export default StudentGrades;