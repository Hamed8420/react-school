import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './studentTable.scss'
import Cookies from 'js-cookie';
const MarkStudent = () => {
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

  const handleDelete = (studentId) => {
    // const date ={
    //   subjectId:idsubject
    // }
    const token = sessionStorage.getItem('accessToken');
    console.log(token)
    axios
      .delete(`http://localhost:8000/api/mark/deleteMark/${studentId}`, {subjectId:idsubject} ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('تم حذف العنصر بنجاح');

        const updatedQuestions = studentMark.filter((question) => question.id !== studentId);
        setStudentMark(updatedQuestions);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="contera">
          <div className='row22'>
            <h2>Marks of Student...</h2>
            {/* <Link to={`/studentTable/add`} className='add'>Add</Link> */}
            <div className='gtr' >
            <input type='text' placeholder='enter year of mark' onChange={handleInputChange} value={year}  />

            </div>
          </div>

          <table className="tara">
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
                  <td >
                    <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/mark/${idsubject}/one/${mark.User.studentNumber}/${mark.year}`} >
                    {mark.User.firstName}</Link>
                    {/* <span className='gre'>{mark.User.firstName}</span> */}
                  </td>
                  <td>{mark.User.lastName}</td>
                  <td>{mark.User.email}</td>
                  <td>{mark.mark}</td>
                  <td>{mark.status}</td>

                  <td><Link to={`/classes/section/${Idclass}/lessons/${Idsection}/mark/${idsubject}/edites/${mark.User.id}`} className='rf' >Edit</Link></td>
                  <td><FontAwesomeIcon icon={faTrash}  onClick={() => handleDelete(mark.studentId)} className='deleteIcon' /></td>
                  {console.log(mark.User.id)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MarkStudent;