import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
// import './addQuestion.scss';

const AddQuestionSub = () => {
  const [question, setQuestion] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');
  const [wrongAnswer1, setWrongAnswer1] = useState('');
  const [wrongAnswer2, setWrongAnswer2] = useState('');
  const [wrongAnswer3, setWrongAnswer3] = useState('');
  const [mark, setMark] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { idsubject } = useParams(); 

  const handleAddQuestion = () => {
    const token = sessionStorage.getItem('accessToken'); 

    const data = {
      text: question,
      rightAnswer: rightAnswer,
      answers: [wrongAnswer1, wrongAnswer2, wrongAnswer3],
      mark:mark
    };

    axios.post(`http://localhost:8000/api/question/addQuestion/Subjects/${idsubject}`, data, {
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
        setErrorMessage('you have a wrong in adding all input requier');

      });
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='editt'>
          <h2>Add Question</h2>
          {errorMessage && <p>{errorMessage}</p>}

          <div className='addref'>

            <div className='gtr'>
              <h2>please enter text of question</h2>
              <input type="text"  value={question}
               placeholder='enter Something...' onChange={e => setQuestion(e.target.value)} />
            </div>

            <div className=' gtr right'>
              <h2>please enter right answer</h2>
              <input type="text" value={rightAnswer}
               onChange={e => setRightAnswer(e.target.value)} placeholder='enter Something...' />
            </div>
            <div className='gtr'>
              <h2>please enter wrong answer 1</h2>
              <input type="text" value={wrongAnswer1}
               placeholder='enter Something...' onChange={e => setWrongAnswer1(e.target.value)} />
            </div>
            <div className='gtr'>
              <h2>please enter wrong answer 2</h2>
              <input type="text"
               placeholder='enter Something...' value={wrongAnswer2} onChange={e => setWrongAnswer2(e.target.value)} />
            </div>
            <div className='gtr'>
              <h2>please enter wrong answer 3</h2>
              <input type="text" value={wrongAnswer3}
               onChange={e => setWrongAnswer3(e.target.value)} placeholder='enter Something...' />
            </div>

            <div className='gtr'>
              <h2>please enter Mark</h2>
              <input type="text" value={mark} 
              onChange={e => setMark(e.target.value)} placeholder='enter Something...' />
            </div>
          </div>
          <button onClick={handleAddQuestion} className='buttons'>ADD</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionSub;