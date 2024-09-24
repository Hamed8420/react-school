import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useParams } from 'react-router-dom';/

const EditProfile = () => {
  const { user } = useParams();
 const [errorMessage, setErrorMessage] = useState('');
 const [file, setFile] = useState(null);

 const handleFileInputChange = (event) => {
  setFile(event.target.files[0]);
};

 const handleAddOrder = () => {
  const token = sessionStorage.getItem('accessToken');
  const formData = new FormData();
  formData.append('userImage', file);


  axios.post(`http://localhost:8000/api/user/changeImage/${user}`,formData, {
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
      setErrorMessage('Error adding Order any persone can add once order');
    });
};


  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Edit Referance</h2>
          {errorMessage && <p>{errorMessage}</p>}


         <div className='addref'>
         <div className='lessonEdit'>
            <input type='file' id='file' onChange={handleFileInputChange}  />
            <label htmlFor='file' className='filees'>Choose File</label>
          </div>

          {/* <div className='gtr'>
            <h2>Name Referance</h2>
            <input type='text' placeholder='Enter Somthing ...' />
          </div> */}
{/* 
          <div className='gtr'>
            <h2>Description</h2>
            <input type='text'  placeholder='Enter Somthing ...' />
          </div> */}
          {/* <div className='gtr'>
            <h2>Type</h2>
            <input type='text' placeholder='Enter Somthing ...' />
          </div> */}
         </div>

          <button  className='buttons' onClick={handleAddOrder}>UPDATE</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;