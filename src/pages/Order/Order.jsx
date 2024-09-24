
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './order.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("all");
  const { Idnot } = useParams();

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

    const fetchData = async () => {
      try {
        let url = `http://localhost:8000/api/request/${Idnot}/allRequest`;

        if (filter === "acceptable") {
          url = `http://localhost:8000/api/request/${Idnot}/getAcceptRequest`;
        } else if (filter === "unacceptable") {
          url = `http://localhost:8000/api/request/${Idnot}/getUnAcceptRequest`;
        } else if (filter === "unthink") {
          url = `http://localhost:8000/api/request/${Idnot}/getUnthinkRequest`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setStudents(response.data.requests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filter, Idnot]);

  const handleDeleteRequest = async (studentId) => {
    const token = sessionStorage.getItem('accessToken');

    try {
      await axios.delete(`http://localhost:8000/api/request/deleteRequest/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setStudents(students.filter(student => student.id !== studentId));
    } catch (error) {
      console.log(error);
    }
  };


  const handleStatusUpdate = (studentId, status) => {
        const token = sessionStorage.getItem('accessToken');
        const data = {
          status: status
        };
    
        axios.put(`http://localhost:8000/api/request/changeStatus/${studentId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response.data);
            console.log(`acckad`)
            
      
            // const updatedStudents = students.map(student => {
            //   if (student.id === studentId) {
            //     return {
            //       ...student,
            //       status: status
            //     };
            //   }
            //   return student;
            // });
            // setStudents(updatedStudents);
          })
          .catch(error => {
            console.log(error);
          });
      };
    

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="conte">

          <div className='row22'>
            <h2>Marks of Student...</h2>

         <div className='mor'>
         <button onClick={() => setFilter("all")} className='all'>All</button>
            <button onClick={() => setFilter("acceptable")} className='all'>Acceptable</button>
            <button onClick={() => setFilter("unacceptable")} className='all'>Unacceptable</button>
            <button onClick={() => setFilter("unthink")} className='all'>UnthinkRequest</button>
         </div>

            <Link to={`/notifcation/order/${Idnot}/add`} >Add</Link>
          </div>

          <table className="tara">
            <thead>
              <tr>
                <th>firstName</th>
                <th>LastName</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.User.id} className="student">
                  <td>
                 {student.User.firstName}
                  </td>
                  <td>{student.User.lastName}</td>
                  <td>{student.lenght}</td>
                  <td>{student.weight}</td>
                  <td>{student.User.Section == null ? '-' :student.User.Section.Class.name }</td>
                  
                  <td>
                    <button
                      onClick={() => handleStatusUpdate(student.id, "acceptable")}
                      className='access'
                    >
                      accep
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleStatusUpdate(student.id, "unacceptable")}
                      className='unaccess'
                    >
                      unaccep
                    </button>
                  </td>

                  <td className='td'>
                
               
                      <div className="cellAction">
                      {/* <div className='editee'>
                 <Link to={`/notifcation/order/${Idnot}/edites/${student.id}`} >Edit</Link>
                 </div> */}

                          <FontAwesomeIcon
                      icon={faTrash}
                      className='deleteIcon'
                      onClick={() => handleDeleteRequest(student.id)}
                    />
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

export default StudentTable;