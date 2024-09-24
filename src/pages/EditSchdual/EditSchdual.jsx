import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const EditSchdual = () => {
  const [subjects, setSubjects] = useState([]);
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [subject, setSubject] = useState('');

  const { Idclass, Idsection,idtmp } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/subject/getAllSubject/${Idclass}`)
      .then(response => {
        setSubjects(response.data.subjects);
      })
      .catch(error => {
        console.error(error);
      });
  }, [Idclass]);

  const Edithandel = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
        // hour: time,
        // day: day,
        subjectId: subject,
        // sectionId: Idsection
    };

    axios
      .put(`http://localhost:8000/api/schedule/updateDate/${idtmp}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
   
      })
      .catch(error => {
        console.error(error);

      });
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />
        <div className='edites'>
          <h2>Edite schdual</h2>

          <div className='addref'>
            {/* <div className='gtr'>
              <h2>Enter day</h2>
              <select name={day} onChange={event => setDay(event.target.value)}>
                <option value={''}>enter day</option>
                <option value={'sun'}>Sunday</option>
                <option value={'mon'}>Monday</option>
                <option value={'tus'}>Tusday</option>
                <option value={'wes'}>Wesnday</option>
                <option value={'The'}>Thersday</option>
              </select>
            </div> */}

            {/* <div className='gtr'>
              <h2>Enter Time</h2>
              <select name={time} onChange={event => setTime(event.target.value)}>
                <option value={''}>enter time</option>
                <option value={'9:00'}>9:00</option>
                <option value={'10:00'}>10:00</option>
                <option value={'10:45'}>10:45</option>
                <option value={'11:00'}>11:00</option>
                <option value={'11:45'}>11:45</option>
              </select>
            </div> */}

            <div className='gtr'>
              <h2>Enter Subject</h2>
              <select name={subject} onChange={event => setSubject(event.target.value)}>
                <option value={''}>enter subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className='buttons' onClick={Edithandel}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSchdual;