
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Goja from '../../img/goja.jpg'
import './allStudentInSection.css'
import Cookies from 'js-cookie';
const AllStudentInSection = () => {
      const [datastudent, setDatastudent] = useState([]);
  const {Idsection ,Idclass } = useParams()

  const token = sessionStorage.getItem('accessToken')
  useEffect(() => {
    axios.get(`http://localhost:8000/api/section/getStudentSection/${Idsection}`,{
        headers: {
            Authorization: `Bearer ${token}`
          }
    })
      .then(response => {
        setDatastudent(response.data.users);
        console.log(response.data.users)
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <>

      <section className='coursesCar'>
        <div className='contain gride3'>
   

          {datastudent.map((val) => (
        <div className='itemssx shadow'>
          <div className='flexxx'>
        <div className='imgeex'>
        <img src={Goja}
        // src ={`http://localhost:8000/${val.image}`}
        alt='' />
          </div>
       
            <div className='text'>
            <h1>{val.firstName} {val.lastName}</h1>

            <div className='admin '>
              <p>
          
                <label htmlFor=''>{val.studentNumber}</label>
              </p>
          
              <p>
                <label htmlFor=''>{val.email}</label>
              </p>
              
            </div>
          </div>
          </div>
         
        </div>
      ))}
        </div>
      </section>
    </>
  )
}

export default AllStudentInSection
