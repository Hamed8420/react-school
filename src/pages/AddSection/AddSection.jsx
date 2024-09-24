import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
const AddSection = () => {
  const { Idclass } = useParams();
  const [maxNumberOfStudent, setMaxNumberOfStudent] = useState('');
  const [sectionNumber, setSectionNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addSection = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
      classId: Idclass,
      maxNumberOfStudent: maxNumberOfStudent,
      sectionNumber: sectionNumber
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.post('http://localhost:8000/api/section/addSection', data, config)
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
        setErrorMessage('you have a wrong in adding or you must be Admin');
      });
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />
        <div className='edites'>
          <h2>Add Section</h2>
          {errorMessage && <p>{errorMessage}</p>}

<div className='addref'>
<div className='gtr'>
            <h2>Max number of student</h2>
            <input
              type="number"
              id="maxNumberOfStudent"
              value={maxNumberOfStudent}
              onChange={event => setMaxNumberOfStudent(event.target.value)}
            />
          </div>

          <div className='gtr'>
            <h2>Section number</h2>
            <input
              type="text"
              id="sectionNumber"
              value={sectionNumber}
              onChange={event => setSectionNumber(event.target.value)}
            />
          </div>
</div>
          

          <button onClick={addSection} className='buttons'>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddSection;