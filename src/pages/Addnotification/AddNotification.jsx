import React, { useState } from 'react';
import axios from 'axios';
import './addNotifcation.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
const AddNotifcation = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [image, setImage] = useState('');

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddNotification = () => {

    const token = sessionStorage.getItem('accessToken');


  

    const formData = new FormData();
      formData.append('title', name);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('image', image);
      formData.append('endDate', endDate);

      

    // const data = {
    //     title: name,
    //     description: description,
    //     startDate: startDate,
    //   endDate: endDate
    // };

    axios
      .post('http://localhost:8000/api/effectiveness/addEffectiveness', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('تمت إضافة الإشعار بنجاح:', response.data);
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
        setErrorMessage('Error adding notifcation');
    
      });
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />
        <div className='edites'>
          <h2>Add Notifcation</h2>

          {errorMessage && <p>{errorMessage}</p>}

<div className='addref'>
          {/* <div className='lessonEdit'>
            <input type='file' id='file-input' required value={image} onChange={e => setImage( e.target.files[0])} />
            <label htmlFor='file-input' className='filees'>Choose image</label>
          </div> */}

                <div className='lessonEdit'>
            <input type="file" id="file-input" multiple onChange={handleFileChange} required />
            <label htmlFor="file-input" className='filees'>Choose File</label>
          </div>
          <div className='gtr'>
            <h2>Name Active</h2>
            <input type='text' value={name} onChange={e => setName(e.target.value)} placeholder='Enter Somthing ...' required />
          </div>

            <div className='gtr'>
            <h2> date of start</h2>
            <h4>start date must be befor end date </h4>

            <input type='date' value={startDate}
            placeholder='start date must be befor end date ' onChange={e => setStartDate(e.target.value)} required />
          </div>

      
            <div className='gtr'>
            <h2> date of end</h2>
            <h4>end date must be after start date</h4>
            <input type='date' value={endDate}  
             placeholder='end date must be after start date ' onChange={e => setEndDate(e.target.value)}required />
          </div>

        
            <div className='gtr'>
            <h2> Enter Description</h2>
            <input type='text' value={description} onChange={e => setDescription(e.target.value)} placeholder='Enter Somthing ...'required />
          </div>
  </div>        

          <button onClick={handleAddNotification} className='buttons'>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddNotifcation;