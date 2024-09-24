import React, { useState } from 'react';
import axios from 'axios';
// import './editNotifcation.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const EditMarkStudent = () => {


  const [name, setName] = useState('');

  const [errorMessage, setErrorMessage] = useState('');


  const { id,idsubject } = useParams();
  console.log(id);

  const handleEditSubject = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        mark: name,
        subjectId:idsubject
      };



      const response = await axios.put(`http://localhost:8000/api/mark/updateMark/${id}`, data, config);

      console.log(response.data);
      if (response.status === 200) {
        console.log('Data is added successfully');
        setErrorMessage('Data is added successfully');
      } else if (response.status === 422) {
        const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
        setErrorMessage(message);
      }
    } catch (error) {
      console.error(error);
      console.error('Error Editing notifcation:', error);
      setErrorMessage('Error Editing notifcation');
    }
  };


  return (
    <div className="home">
      <Sidebar />
      <div className="cantanes">
        <Navbar />

        <div className="edites">
          <h2>Edit Mark</h2>
          {errorMessage && <p>{errorMessage}</p>}


          <div className="addref">
       

          

            <div className='gtr'>
            <h2>Enter Mark</h2>
            <input type='number' value={name} onChange={e => setName(e.target.value)}placeholder='Enter new Mark ...' />
          </div>


         


        

         


   


          </div>
          <button onClick={handleEditSubject} className='buttons' >Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditMarkStudent;