import { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const EditSection = () => {
  const { Idclass, Idsection } = useParams();
  const [sectionNumber, setSectionNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const editSection = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
      classId: Idclass,
      sectionNumber: sectionNumber
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios.put(`http://localhost:8000/api/section/updateSection/${Idsection}`, data, config)
      .then(response => {
        console.log(response.data); // تعامل مع الاستجابة هنا
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
          <h2>Edit Section</h2>
          {errorMessage && <p>{errorMessage}</p>}
<div className='addref'>
<div className='gtr'>
            <h2>Name Section</h2>
            <input
              type="number"
              id="sectionNumber"
              value={sectionNumber}
              onChange={event => setSectionNumber(event.target.value)}
            />
          </div>
</div>
        
          <button onClick={editSection} className='buttons' >Edit</button>
        </div>

      </div>
    </div>
  );
};

export default EditSection;