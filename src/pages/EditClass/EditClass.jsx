import React, { useState } from 'react';
import axios from 'axios';
// import './addOrder.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const EditClass = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {Idclass} = useParams()

  const handleEditClass = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
        name: name,
     
    };

    axios.put(`http://localhost:8000/api/class/updateClass/${Idclass}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          console.log('Data is added successfully');
          setErrorMessage('Data is added successfully');
        } else if (response.status === 422) {
          const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
          setErrorMessage(message);
        }
       
      })
      .catch(error => {
        console.error('Error Editing notifcation:', error);
        setErrorMessage('you have a wrong in Editing or you must be Admin');
      });
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Edit Class</h2>
          {errorMessage && <p>{errorMessage}</p>}
          <div className='addref'>
          <div className='gtr'>
            <h2>name Classt</h2>
            <input type="text" className='tgr' value={name} onChange={e => setName(e.target.value)} />
            
          </div>
          </div>

       
          <button onClick={handleEditClass} className='buttons' >Edit</button>
        </div>

      </div>
    </div>
  );
};

export default EditClass;