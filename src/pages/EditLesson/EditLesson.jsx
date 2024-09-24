import './editLesson.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
const EditLesson = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { id } = useParams();

//   const handleNameChange = (e) => {
//     setName(e.target.value);
//   };


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
      formData.append('newFile', image);

      const response = await axios.put(`http://localhost:8000/api/lesson/updateLesson/${id}`, formData, config);
      if (response.status === 200) {
        console.log('Data is added successfully');
        setErrorMessage('Data is added successfully');
      } else if (response.status === 422) {
        const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
        setErrorMessage(message);
      }
      console.log(response.data);
    } catch (error) {
      console.error('Error Editing notifcation:', error);
      setErrorMessage('you have a wrong in editing all input requier');
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
          <h2>Edit Lesson</h2>
          {errorMessage && <p>{errorMessage}</p>}

          <div  className='addref'>

          <div className='lessonEdit'>
            <input type='file' id='file-input' onChange={handleFileChange} required />

            <label htmlFor='file-input' className='filees'>Choose File</label>
          </div>

          <div className='gtr'>
            <h2>Name Lesson</h2>
            <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)}  placeholder='Enter Somthing ...'  required/>
          </div>

          </div>

         

          <button onClick={handleEditSubject}  className='buttons'>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditLesson;