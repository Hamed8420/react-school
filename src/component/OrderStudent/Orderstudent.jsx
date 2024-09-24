import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import './orderStudent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Header from '../common/heading/Header';
import Back from '../common/back/Back';
import Cookies from 'js-cookie';
const OrderStudent = () => {
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
        console.log(response.data.requests)
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

 
  return (
    <>
       <div className='homeeee'>
       <Header/>
      <Back title='Explore Courses' />
      
      <section className='coursesCard'>
      
        <div className="contain ">
          <div className='row22'>
            <h2 className='hello'>Marks of Student...</h2>

   <div className='morr'>
   <button onClick={() => setFilter("all")} className='alll' >All</button>
            <button onClick={() => setFilter("acceptable")} className='alll' >Acceptable</button>
            <button onClick={() => setFilter("unacceptable")} className='alll' >Unacceptable</button>
            <button onClick={() => setFilter("unthink")} className='alll' >UnthinkRequest</button>
   </div>

            <Link to={`/use/notifcation/order/${Idnot}/add`} className='addd'>Add</Link>
          </div>

          <table className="ter">
            <thead>
              <tr>
                <th>firstName</th>
                <th>Last Name</th>
                <th>Height</th>
                <th>Weight</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.User.id} className="studentt">
                  <td>
                    {student.User.firstName}
                  </td>
                  <td>{student.User.lastName}</td>
                  <td>{student.lenght}</td>
                  <td>{student.weight}</td>
                  <td>{student.User.Section == null ? '-' :student.User.Section.Class.name }</td>
            
          
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

export default OrderStudent;