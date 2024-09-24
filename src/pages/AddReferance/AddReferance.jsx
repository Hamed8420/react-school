import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './addReferance.css'
import Cookies from 'js-cookie';
const AddReferance = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
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

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };
  const gtr=document.querySelector('.hell');
  const handleAddReferance = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('image', image);
      formData.append('type', type);

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        //   'Content-Type': 'multipart/form-data',
        },
      };

      const response = await axios.post('http://localhost:8000/api/subject/addRreferance', formData, config);

      if (response.status === 200) {
        console.log('Data is added successfully');
        setErrorMessage('Data is added successfully');
      } else if (response.status === 422) {
        const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
        setErrorMessage(message);
      }
  

   
      setFile(null);
      setName('');
      setDescription('');
      setImage('');
      setType('');

      
    } catch (error) {
      console.error('Error Editing referance:', error);
      setErrorMessage('Error adding referance');
    }
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Add Referance</h2>

          {errorMessage && <p>{errorMessage}</p>}
<div className='addref'>

<div className='lessonEdit'>
            <input type='file' id='file-input' onChange={handleImageChange} />
            <label htmlFor='file-input' className='filees'>Choose image</label>
          </div>

          <div className='lessonEdit'>
            <input type='file' id='file' onChange={handleFileInputChange} />
            <label htmlFor='file' className='filees'>Choose File</label>
          </div>

          <div className='gtr'>
            <h2>Name Referance</h2>
            <input type='text' value={name} onChange={handleNameChange} placeholder='Enter Somthing ...' />
          </div>

          <div className='gtr'>
            <h2> Enter Description</h2>
            <input type='text' value={description} onChange={handleDescriptionChange}  placeholder='Enter Somthing ...' />
          </div>
          <div className='gtr'>
            <h2> Enter Type</h2>
            <input type='text' value={type} onChange={handleTypeChange}  placeholder='Enter Somthing ...' />
          </div>
          
</div>
        

          <button onClick={handleAddReferance} className='buttons'>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddReferance;