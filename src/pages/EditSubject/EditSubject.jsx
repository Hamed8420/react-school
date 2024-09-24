
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
const EditSubject = () => {
  const { id ,Idclass} = useParams();
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');



  const handleEditSubject = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append('name', name);
      formData.append('image', image);
      formData.append('ClassId',Idclass)

      const response = await axios.put(`http://localhost:8000/api/subject/updateSubject/${id}`, formData, config);
      console.log(response.data);
      if (response.status === 200) {
        console.log('Data is added successfully');
        setErrorMessage('Data is added successfully');
      } else if (response.status === 422) {
        const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
        setErrorMessage(message);
      }
    } catch (error) {
      console.error('Error Editing notifcation:', error);
      setErrorMessage('you have a wrong in editing or you must be Admin');

    }
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0])
    setImage(event.target.files[0]);
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Edit Subject</h2>
          {errorMessage && <p>{errorMessage}</p>}
          <div className='addref'>

          <div className='lessonEdit'>
            <input type="file" id="file-input" multiple onChange={handleFileChange} />
            <label htmlFor="file-input" className='filees'>Choose File</label>
          </div>

          <div className='gtr'>
            <h2>Name Subject</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}  placeholder='Enter Somthing ...' />
          </div>
          </div>

          <button onClick={handleEditSubject} className='buttons' >Edit</button>
        </div>

      </div>
    </div>
  );
};

export default EditSubject;