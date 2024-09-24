import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './studentSection.css'
import Cookies from 'js-cookie';

const StudentInSection = () => {
  const [datastudent, setDatastudent] = useState([]);
  const {Idsection ,Idclass } = useParams()

  const token = sessionStorage.getItem('accessToken')
  useEffect(() => {
    axios.get(`http://localhost:8000/api/section/getStudentSection/${Idsection}`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
    })
      .then(response => {
        setDatastudent(response.data.users);
        console.log(response.data.users)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (

        <div className="home">
          <Sidebar/>
          <div className="homeContainer">
            <Navbar/>
            <div className="contera">
              <div className='row22'>
                <h2>All Student...</h2>
                <Link to={`/classes/section/${Idclass}/timetable/${Idsection}/stusec/adde`} className='addes'>Add</Link>
              </div>
              <table className="tarae">
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Father</th>
                    <th>Mother</th>
                    {/* <th>Class</th> */}
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {datastudent.map((student) => (
                    <tr key={student.id} className="student">
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.midelName}</td>
                      <td>{student.motherName}</td>
                      {/* <td>Class One</td> */}
                      <td>{student.email}</td>
                      <td className="ty">
                        <div className="cellAction">
                
                     <Link
                            to={`/users/${student.id}`}
                            style={{ textDecoration: "none" }}
                            className='vie'
                          >
                            View
                          </Link>
                  
                       
                  
                      <Link to={`/classes/section/${Idclass}/timetable/${Idsection}/stusec/edite/${student.id}`} 
                 className='vie'>Edit</Link>
                 

                        </div>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
 
  );
};

export default StudentInSection;