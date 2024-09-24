import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Rating from 'react-rating';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import './lessonList.css';
import Cookies from 'js-cookie';
import { faStar as solidStar, faStarHalfAlt as halfStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';

// قم بتكوين المكتبة وتضمين الرموز الخاصة بالنجوم
library.add(solidStar, halfStar);
function LessonsList() {
  const [lessons, setLessons] = useState([]);
  const { idsubject,Idsection,Idclass,IdTeacher } = useParams();
  const [rate, setRate] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  console.log(idsubject)
  const token = sessionStorage.getItem('accessToken');

  const handleRate = () => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
      rate: rate,
 
    };

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

 

  const handleDelete = (lessonId) => {
    axios
      .delete(`http://localhost:8000/api/lesson/deleteLesson/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('تم حذف العنصر بنجاح');

        const updatedLessons = lessons.filter((lesson) => lesson.id !== lessonId);
        setLessons(updatedLessons);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div className='home'>
      <Sidebar />
      <div className='Lesson'>
        <Navbar />
        <div className='class-list'>
          <div className='testes'>
            <h2>Lessons List...</h2>
            {/* <div className='rate'>
              <input type='number' placeholder='enter rate of teacher' value={rate} onChange={e => setRate(e.target.value)}/> 
              <button className='ne' onClick={handleRate}>send</button>
            </div> */}
                <div className='rate'>
                <Rating
  emptySymbol={<FontAwesomeIcon icon={solidStar} />}
  fullSymbol={<FontAwesomeIcon icon={halfStar} />}
  fractions={1}
  initialRating={rate}
  onChange={value => setRate(value)}
/>
      <button className='ne' onClick={() => handleRate(rate)}>send</button>
    </div>
              <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}/adde`} className='addes'>Add</Link>
          </div>

          <div className='zara'>
            {lessons.map((lesson, index) => (
              <div className='service-ite' key={index}>
                <h2 className='indexx'>{lesson.id}</h2>

                

                {lesson.files.map((file, fileIndex) => (
  <div key={fileIndex} className='para'>
    <a
      href={`http://localhost:8000/${file.path}`}
      download={file.name}
    >
      {lesson.name}
    </a>
  </div>
))}

     <div>
     <p>
              <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}/question/${lesson.id}`}>Question</Link>
        </p>

        <p className='video'>
              <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}/livestream/${lesson.id}`} className='videos'>VideoLive</Link>
        </p>
     </div>

                <div className='buttes'>
                  <button onClick={() => handleDelete(lesson.id)}>delete</button>
                <button>
                <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}/edites/${lesson.id}`} className='ed'>
                    Edit
                  </Link>
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

export default LessonsList;


