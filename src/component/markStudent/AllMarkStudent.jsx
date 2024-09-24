import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../common/heading/Header';
import Back from '../common/back/Back';
import './allMarkStudent.css'
import Cookies from 'js-cookie';

const AllMarkStudent = () => {
  const { idsubject,Idsection,Idclass } = useParams();
  const [studentMark, setStudentMark] = useState([]);
  const [year, setYear] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    if (year !== '') {
      axios.post(`http://localhost:8000/api/mark/getSubjectMarks/${idsubject}`, { year: year }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          setStudentMark(response.data.marks);
          console.log(response.data.marks)
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [idsubject, year]);

  const handleInputChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <>
     <div className='homeeee'>
     <Header/>
      <Back title='Blog Posts' />
    <section className="blog padding">
     
    
    
        <div className="contain">
          <div className='testee'>
            <p>Marks of Student...</p>
         
            <input type='text' placeholder='enter year of mark' onChange={handleInputChange} value={year} />
          </div>

          <table className="ter">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Email</th>
                <th>Mark</th>
              </tr>
            </thead>
            <tbody>
              {studentMark.map((mark) => (
                <tr key={mark.id} className="student">
                  <td className='tf'>
                    <Link to={`/use/courses/section/${Idclass}/lessons/${Idsection}/mark/${idsubject}/one/${mark.User.studentNumber}/${mark.year}`} >
                      <img src={process.env.PUBLIC_URL + '/images/picture5.jpg'} alt='' className="studentImage" /></Link>
                    <span className='gre'>{mark.User.firstName}</span>
                  </td>
                  <td>{mark.User.lastName}</td>
                  <td>{mark.User.email}</td>
                  <td>{mark.mark}</td>
                  <td>{mark.status}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
    </section>
     </div>

    </>
  );
};

export default AllMarkStudent;