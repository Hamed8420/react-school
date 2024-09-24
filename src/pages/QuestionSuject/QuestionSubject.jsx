import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const QuestionSubject = () => {
  const { idsubject, lessonId ,Idclass,Idsection } = useParams();
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

        const response = await axios.get(`http://localhost:8000/api/question/AllQuestion/Subjects/${idsubject}`, config);
        setQuestions(response.data.questions);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [idsubject]);

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

  const handleSubmit = () => {
    const data = Object.keys(selectedAnswers).map((questionId) => ({
      question: questionId,
      answer: selectedAnswers[questionId]
    }));

    if (data.length > 0) {
      axios
        .post(`http://localhost:8000/api/question/chooseSubjectAnswer/${idsubject}`, { answers: data }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          console.log(response.data);
          // console.log(`fuck you`)
        })
        .catch(error => {
          console.error('حدث خطأ أثناء إرسال الإجابات', error);
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
      <div className='questionSu'>
        <Navbar />

        <div className="save">
          <div className="adde ">
            <Link
             to={`/classes/section/${Idclass}/lessons/${Idsection}/quessub/${idsubject}/addee`} className='ququ'>Add Question</Link>
          </div>
          {errorMessage && <h4 className='rtg'>{errorMessage}</h4>}

          <div className="hade">
            {questions.map((question) => (
              <div className="question" key={question.id}>
      
                {/* <h3>{question.title}<span>{question.mark}</span></h3> */}
                <div className='mar'>
                <h3>{question.title}</h3>
                <span>{question.mark}</span>
                </div>
                <div className="options">
                  {shuffle(question.answers).map((option, index) => (
                    <div className="option" key={index}>
                      {/* {console.log(option.id)} */}
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
                  <button>
                  <Link to={`/classes/section/${Idclass}/lessons/${Idsection}/quessub/${idsubject}/edits/${question.id}`} className='ed'>Edit</Link>

                  </button>
                </div>
              </div>
            ))}
          </div>
       <div className='sen'>
       <button 
          onClick={handleSubmit} 
          className='send'>Send</button>
       </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionSubject;