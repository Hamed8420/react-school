import React, { useState } from 'react';
import axios from 'axios';
import './editNotifcation.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const EditNotifcation = () => {


  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const { Idnot } = useParams();
  console.log(Idnot);

  const handleEditSubject = async () => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        title: name,
        description: description,
        startDate: startDate,
        endDate: endDate
      };



      const response = await axios.put(`http://localhost:8000/api/effectiveness/updateEffectiveness/${Idnot}`, data, config);

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
          <h2>Edit Notifcation</h2>
          {errorMessage && <p>{errorMessage}</p>}


          <div className="addref">
          <div className='lessonEdit'>
            <input type='file' id='file-input' />
            <label htmlFor='file-input' className='filees'>Choose image</label>
          </div>

            {/* <div>
              <p>Name Active</p>
              <input type="text" className="tgr" value={name} onChange={e => setName(e.target.value)} />
            </div> */}

            <div className='gtr'>
            <h2>Name Active</h2>
            <input type='text' value={name} onChange={e => setName(e.target.value)}placeholder='Enter Somthing ...' />
          </div>


            {/* <p>date of start</p>
            <input type="date" className="tgr" value={startDate} onChange={e => setStartDate(e.target.value)} /> */}


            <div className='gtr'>
            <h2> date of start</h2>
            <input type='date' value={startDate}
              placeholder='start date must be befor end date '  onChange={e => setStartDate(e.target.value)}  />
          </div>


            {/* <p>date of end</p>
            <input type="date" className="tgr" value={endDate} onChange={e => setEndDate(e.target.value)} /> */}


            <div className='gtr'>
            <h2> date of end</h2>
            <input type='date'
            placeholder='end date must be after start date ' value={endDate}  onChange={e => setEndDate(e.target.value)} />
          </div>


            {/* <p>Explain</p>
            <input
              type="text"
              className="tgr"
              value={description}
              onChange={e => setDescription(e.target.value)}
            /> */}

<div className='gtr'>
            <h2> Enter Description</h2>
            <input type='text' value={description}  onChange={e => setDescription(e.target.value)} placeholder='Enter Somthing ...' />
          </div>
          </div>
          <button onClick={handleEditSubject} className='buttons' >Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditNotifcation;