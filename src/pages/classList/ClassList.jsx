import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import './classList.css';
import Cookies from 'js-cookie';
function ClassList() {
  const [classesData, setClassesData] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    


    axios.get('http://localhost:8000/api/class/AllClass',{
      headers: {
                  Authorization: `Bearer ${token}`
                }
    })
      .then(response => {
        setClassesData(response.data.allCalsses);
        
        console.log(response.data.allCalsses)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

 

  const handleDeleteClass = async (id) => {
    console.log(id)
    try {
      const token = sessionStorage.getItem('accessToken'); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };


      await axios.delete(`http://localhost:8000/api/class/deleteClass/${id}`, config);
      setClassesData(classesData.filter(classData => classData.id !== id));
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div className='home'>
      <Sidebar />
      <div className='Containerrr'>
        <Navbar />
        <div className='class-list'>
          <div className='testes'>
            <h2>All Classes...</h2>
            <Link to={`/classes/add`} className='addes'>Add</Link>
          </div>
          <div className='zara'>
            {classesData.map((classData, index) => (
              <div className='service-ite' key={classData.id}>
                  <h2 className='indexx'>{index + 1}</h2>
                  <Link to={`/classes/section/${classData.id}`}>
                  <div className='par'>
                    <h4>{classData.name}</h4>
                  </div>
                </Link>
                

                  <div className='buttes'>
                    <button onClick={() => handleDeleteClass(classData.id)}>delete</button>
                    <button>
                    <Link to={`/classes/edites/${classData.id}`} className='ed'>Edit</Link>
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassList;
