import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../common/heading/Header';
import Back from '../common/back/Back';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { useParams } from 'react-router-dom';/

const EditProfileee = () => {
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


<div className="homeeee">
<Header/>
  <Back title='Explore Class' />

  <section className='singleContaine'>

        <div className='edites'>
          <h2>Edit Referance</h2>
          {errorMessage && <p>{errorMessage}</p>}


         <div className='addref'>
         <div className='lessonEdit'>
            <input type='file' id='file' onChange={handleFileInputChange}  />
            <label htmlFor='file' className='filees'>Choose File</label>
          </div>


         </div>

          <button  className='buttons' onClick={handleAddOrder}>UPDATE</button>
        </div>
  </section>

  
  {/* <OnlineCourses /> */}
</div>
  );
};

export default EditProfileee;