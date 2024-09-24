import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import './student.css'

const AllStudent = () => {
  const [data, setData] = useState([]);
  const [sect, setSect] = useState('');


  useEffect(() => {
    axios.get('http://localhost:8000/api/user/getUser/STUDENT')
      .then(response => {
        setData(response.data.users);
        // setSect(response.data.users.Section);
        // if(response.data.users.Section == null){
        //   setSect('-')
        // }
        
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  
  return (
    <div className='list'>
      <Sidebar />
      <div className='listContainer'>
        <Navbar />
        <div className="home">
          <div className="homeContainer">
            <div className="contta">
              <div className='teste'>
                <p>All Student...</p>
                {/* <Link to={"/users/new"} className='add'>Add</Link> */}
              </div>
              <table className="tame">
                <thead>
                  <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Father</th>
                    <th>Mother</th>
                    <th>Class</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((student) => (
                    <tr key={student.id}>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>{student.midelName}</td>
                      <td>{student.motherName}</td>
                      <td>{student.Section == null ? '-' : student.Section.Class.name}</td>
                      {/* {console.log(student.Section.Class.name)} */}
                      <td>{student.email}</td>
                      <td className="ty">
                        <div className="cellAction">
                          <Link
                            to={`/products/${student.id}`}
                            style={{ textDecoration: "none" }}
                            className='view'
                          >
                            View
                          </Link>
                          <div
                            className="view"
                            // onClick={() => handleDelete(student.id)}
                          >
                            Delete
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllStudent;