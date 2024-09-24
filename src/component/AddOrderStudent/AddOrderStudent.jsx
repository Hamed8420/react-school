import React, { useState } from 'react';
import axios from 'axios';
// import './addOrder.scss';
import Header from '../common/heading/Header';
import Back from '../common/back/Back';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const AddOrderStudent = () => {
  const { Idnot } = useParams();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

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
       
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
     <div className='homeeee'>
     <Header/>
      <Back title='Explore Courses' />
      <section className='coursesCard'>

<div className='contain'>


  <div className='editedd'>
    <h2>Add Order</h2>
<div className='addref'>


<div className='gtr'>
      <h2>Height student</h2>
      <input type="text" className='tgr' value={height} onChange={e => setHeight(e.target.value)} />
    </div>
    <div className='gtr'>

      <h2>Weight student</h2>
      <input type="text" className='tgr' value={weight} onChange={e => setWeight(e.target.value)} />
    </div>
    

</div>
    
    <button onClick={handleAddOrder} className='buttons'>ADD</button>
  </div>

</div>
</section>
     </div>
    </>
 
  );
};

export default AddOrderStudent;