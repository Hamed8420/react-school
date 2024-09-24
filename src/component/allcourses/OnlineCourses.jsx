
import "./courses.css"
import { online } from "../../dummydata"
// import Heading from "../common/heading/Heading"
import Title from "../common/Title/Title"
import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import less from '../../img/o9.png'
import les from '../../img/o9.1.png'
import Cookies from 'js-cookie';
const OnlineCourses = () => {
  const [rate, setRate] = useState(0);
  const [lessons, setLessons] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { idsubject,Idsection,Idclass,IdTeacher } = useParams();

  console.log(idsubject)
  const token = sessionStorage.getItem('accessToken');
  const userId =sessionStorage.getItem('Iduser')

  const handleRate = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
      rate: rate,
 
    };

    console.log(data)
    axios.post(`http://localhost:8000/api/user/addRate/${IdTeacher}`, data, {
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/lesson/allLesson/${idsubject}/${Idsection}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLessons(response.data.lessons);
        console.log(response.data.lessons);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <>
      <section className='online'>
        <div className='contain'>
        <Title subtitle='COURSES' title='Browse Our Online Courses' />
        <div className="rate">
{/* <input type="text" className="teeer" placeholder="Enter rate of Teacher" /> */}
<Rating
  emptySymbol={<FontAwesomeIcon icon={solidStar} />}
  fullSymbol={<FontAwesomeIcon icon={halfStar} />}
  fractions={1}
  initialRating={rate}
  onChange={value => setRate(value)}
  className="gold"
/>
<button className='nee' onClick={() => handleRate(rate)}>send</button>
          </div>

          <div className='content gride3'>
            {lessons.map((val) => (
              <div className='boxe'>
                <div className='img'>
                  <img src={less} alt="" />
                  <img src={les} alt='' className='showe' />
                </div>
                {val.files.map((file, fileIndex) => (
  <h1 key={fileIndex}>
    <a
      href={`http://localhost:8000/${file.path}`}
      download={file.name}
    >
      {val.name}
    </a>
  </h1>
))}

  <p>
  <Link to={`/use/courses/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}/question/${val.id}`}>Question</Link>
  </p>
  <p>
  {/* <Link to={`/use/courses/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${userId}/live/${val.id}`}>VideoLive</Link> */}
  <Link to={`http://localhost:3000/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}/livestream/${val.id}`}>Live Video</Link>
  </p>


              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses
