import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'js-cookie';
const EditQuestionSub = () => {
  const [question, setQuestion] = useState('');
  const [rightAnswer, setRightAnswer] = useState('');
  const [wrongAnswer1, setWrongAnswer1] = useState('');
  const [wrongAnswer2, setWrongAnswer2] = useState('');
  const [wrongAnswer3, setWrongAnswer3] = useState('');
  const [mark, setMark] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { questionsubId } = useParams(); 

  const updateQuestion = () => {
    const url = `http://localhost:8000/api/question/updateQuestion/${questionsubId}`;
    const token = sessionStorage.getItem('accessToken');

    const data = {
        text: question,
        rightAnswer: rightAnswer,
        Answers: [wrongAnswer1, wrongAnswer2, wrongAnswer3],
        mark: mark
    };

    axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
       console.log(response.data)
        console.log('تم تحديث السؤال بنجاح');
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
          <h2>Edit Question</h2>
          {errorMessage && <p>{errorMessage}</p>}
          <div className='addref'>
            <div className='gtr'>
              <h2>please enter text of question</h2>
              <input type="text" value={question} onChange={e => setQuestion(e.target.value)} placeholder='enter Something...' />
            </div>

            <div className='gtr right'>
              <h2>please enter right answer</h2>
              <input type="text" value={rightAnswer} onChange={e => setRightAnswer(e.target.value)} placeholder='enter Something...' />
            </div>
            <div className='gtr'>
              <h2>please enter wrong answer 1</h2>
              <input type="text" value={wrongAnswer1} onChange={e => setWrongAnswer1(e.target.value)} placeholder='enter Something...' />
            </div>
            <div className='gtr'>
              <h2>please enter wrong answer 2</h2>
              <input type="text" value={wrongAnswer2} onChange={e => setWrongAnswer2(e.target.value)} placeholder='enter Something...' />
            </div>
            <div className='gtr'>
              <h2>please enter wrong answer 3</h2>
              <input type="text" value={wrongAnswer3} onChange={e => setWrongAnswer3(e.target.value)} placeholder='enter Something...' />
            </div>

            <div className='gtr'>
              <h2>please enter Mark</h2>
              <input type="text" value={mark} onChange={e => setMark(e.target.value)} placeholder='enter Something...' />
            </div>
          </div>
          <button className='buttons' onClick={updateQuestion}>update</button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionSub;