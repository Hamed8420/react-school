import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const EditReferance = () => {
  const { Idref } = useParams();
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleUpdateReferance = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('type', type);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
    
        },
      };

      const response =await axios.put(`http://localhost:8000/api/subject/updateRreferance/${Idref}`, formData, config);
      
      if (response.status === 200) {
        console.log('Data is added successfully');
        setErrorMessage('Data is Editing successfully');
      } else if (response.status === 422) {
        const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
        setErrorMessage(message);
      }
console.log(`DATA UPDATE`)
      setFile(null);
      setName('');
      setDescription('');
      setType('');
    } catch (error) {
      console.error('Error adding referance:', error);
      setErrorMessage('Error Editing referance');
    }
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
            <input type='file' id='file' onChange={handleFileInputChange} />
            <label htmlFor='file' className='filees'>Choose File</label>
          </div>

          <div className='gtr'>
            <h2>Name Referance</h2>
            <input type='text' value={name} onChange={handleNameChange} placeholder='Enter Somthing ...' />
          </div>

          <div className='gtr'>
            <h2>Description</h2>
            <input type='text' value={description} onChange={handleDescriptionChange} placeholder='Enter Somthing ...' />
          </div>
          <div className='gtr'>
            <h2>Type</h2>
            <input type='text' value={type} onChange={handleTypeChange} placeholder='Enter Somthing ...' />
          </div>
         </div>

          <button onClick={handleUpdateReferance} className='buttons'>UPDATE</button>
        </div>
      </div>
    </div>
  );
};

export default EditReferance;