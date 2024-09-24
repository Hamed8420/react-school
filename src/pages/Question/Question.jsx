import React, { useEffect, useState } from 'react';
import './question.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
function Question() {
  const { idsubject, lessonId ,Idclass,Idsection,IdTeacher} = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };

        const response = await axios.get(`http://localhost:8000/api/question/AllQuestion/Lesson/${lessonId}`, config);
        setQuestions(response.data.questions);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [lessonId]);

  function shuffle(array) {
    let currentIndex = array.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  const handleDelete = (questionId) => {
    axios
      .delete(`http://localhost:8000/api/question/deleteQuestion/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('تم حذف العنصر بنجاح');

        const updatedQuestions = questions.filter((question) => question.id !== questionId);
        setQuestions(updatedQuestions);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (questionId) => {
    const answerId = selectedAnswers[questionId];
    if (answerId) {
      const data = {
        answer: {
          question: questionId,
          answer: answerId
        }
      };
      console.log(data);


      axios
        .post('http://localhost:8000/api/question/chooseLessonAnswer', data, {
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
        setErrorMessage('you have a wrong in Sending you must choose answer');
        });
    } else {
      console.log('يرجى اختيار إجابة');
      setErrorMessage('you have a wrong in Sending you must choose answer');

    }
  };

  const handleRadioChange = (questionId, answerId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answerId
    }));
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='questioL'>
        <Navbar />

        <div className="save">
          <div className="adde ">
            <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}/question/${lessonId}/adde`} className='ququ'>Add Question</Link>
            {/* /classes/section/22/lessons/42/lesson/33/31question/25/adde */}
          </div>
          
          {/* <h4 className="rtg">Data has been added successfully</h4> */} 
          {errorMessage && <h4 className='rtg'>{errorMessage}</h4>}

          <div className="heade">
            {questions.map((question) => (
              <div className="question" key={question.id}>
                <div className='mar'>
                <h3>{question.title}</h3>
                <span>{question.mark}</span>
                </div>
               
                <div className="options">
                  {shuffle(question.answers).map((option, index) => (
                    <div className="option" key={index}>
                      <input
                        type="radio"
                        className="answer"
                        checked={selectedAnswers[question.id] === option.id}
                        onChange={() => handleRadioChange(question.id, option.id)}
                      />
                      <label className='lab'>{option.answer}</label>
                    </div>
                  ))}
                </div>

                <div className='Sender'>
                  <button onClick={() => handleDelete(question.id)}>delete</button>
                  <button onClick={() => handleSubmit(question.id)} >Send</button>
<button>
<Link to={`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/question/${lessonId}/edits/${question.id}`} className='ed'>Edit</Link>

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

export default Question;