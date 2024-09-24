import React, { useState } from 'react';
import axios from 'axios';
import './addOrder.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const AddOrder = () => {
  const { Idnot } = useParams();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleAddOrder = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
        length: height,
      weight: weight
    };

    axios.post(`http://localhost:8000/api/request/${Idnot}/addRequest`, data, {
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
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Add Order</h2>
          {errorMessage && <p>{errorMessage}</p>}
<div className='addref'>
<div className='gtr'>
            <h2>Height student</h2>
            <input type="number" className='tgr' value={height} onChange={e => setHeight(e.target.value)} />
          </div>

          <div className='gtr'>
          <h2>Weight student</h2>
            <input type="number" className='tgr' value={weight} onChange={e => setWeight(e.target.value)} />
          </div>
</div>
        
          <button onClick={handleAddOrder} className='buttons'>ADD</button>
        </div>

      </div>
    </div>
  );
};

export default AddOrder;