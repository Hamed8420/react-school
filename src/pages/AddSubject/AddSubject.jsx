import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const AddSubject = () => {
  const [name, setName] = useState('');
  const [minimumSuccess, setMinimumSuccess] = useState('');
  const [image, setImage] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [date, setDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  

  const { Idclass } = useParams();

  const handleAddSubject = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      formData.append('name', name);
      formData.append('minimumSuccess', minimumSuccess);
      formData.append('teacherId', selectedTeacherId);
      formData.append('image', image);
      formData.append('ClassId', Idclass);

      const response = await axios.post('http://localhost:8000/api/subject/addSubject', formData, config);
      console.log(response.data.message);
      setDate(response.data.message)
      console.log('Group Created Successfully!');
      if (response.status === 200) {
        console.log('Data is added successfully');
        setErrorMessage('Data is added successfully');
      } else if (response.status === 422) {
        const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
        setErrorMessage(message);
      }
 
    } catch (error) {
      console.error('Error Editing notifcation:', error);
        setErrorMessage('you have a wrong in adding or you must be Admin');
    }
  };

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/getUser/TEACHER');
        setTeachers(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Add Subject</h2>

          {errorMessage && <p>{errorMessage}</p>}

          <div className='addref'>

          <div className='lessonEdit'>
            <input type="file" id="file-input" multiple onChange={handleFileChange} required />
            <label htmlFor="file-input" className='filees'>Choose File</label>
          </div>

          <div className='gtr'>
            <h2>Name Subject</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required  placeholder='Enter Somthing ...' />
          </div>

          <div className='gtr'>
            <h2>Minimum Success</h2>
            <input type="text" value={minimumSuccess} onChange={(e) => setMinimumSuccess(e.target.value)} required  placeholder='Enter Somthing ...' />
          </div>

          <div className='gtr'>
            <h2>Teacher</h2>
            <select value={selectedTeacherId} onChange={(e) => setSelectedTeacherId(e.target.value)} required>
              <option value={''}> Select A Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.firstName} {teacher.lastName}
                </option>
              ))}
            </select>
          </div>
          </div>

          <button onClick={handleAddSubject} className='buttons'>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddSubject;