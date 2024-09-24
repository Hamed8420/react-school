import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const AddStudentToSection = () => {
  const { Idsection } = useParams();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/getStudentNullSection', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUsers(response.data.studnets);
        console.log(response.data.studnets);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddOrder = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
      sectionId: Idsection,
      userId: selectedUser
    };

    axios.post('http://localhost:8000/api/section/addStudentToSection', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Add Student</h2>

          <div className='addref'>
          <div className='gtr'>
            <h2>Enter Student</h2>
            <select value={selectedUser} onChange={handleUserChange}>
              <option value={''}>None choose</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
          </div>
          </div>

       

          <button onClick={handleAddOrder} className='buttons'>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentToSection;