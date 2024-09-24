import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import './allTeacher.css'
const AllTeacher = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/user/getUser/TEACHER')
      .then(response => {
        setData(response.data.users);
        console.log(response.data.users)
        
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
      <Navbar/>
      <div className="home">
      <div className="homeContainer">
        <div className="contt">
          <div className='teste'>
            <p>All TEACHERS...</p>
            {/* <Link to={"/users/new"} className='add'>Add</Link> */}
          </div>
          <table className="tame">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                {/* <th>School</th> */}
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.firstName}</td>
                  <td>{teacher.lastName}</td>
                  <td>{teacher.email}</td>
                  {/* <td>class two</td> */}
                  <td>{teacher.address}</td>
                  <td className="ty">
                    <div className="cellAction">
                      <Link
                        to={`/users/${teacher.id}`}
                        style={{ textDecoration: "none" }}
                        className='view'
                      >
                        View
                      </Link>
                      <div
                        className="view"
                        // onClick={() => handleDelete(teacher.id)}
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

export default AllTeacher;