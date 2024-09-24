import React, { useEffect, useState } from 'react';
import Back from "../common/back/Back"
import Header from "../common/heading/Header"
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './allQuestion.scss'
import Cookies from 'js-cookie';

const AllQuestion = () => {
  const { idsubject, lessonId ,Idclass,Idsection } = useParams();
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});

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
    }
  };

  const handleRadioChange = (questionId, answerId) => {
    setSelectedAnswers(prevState => ({
      ...prevState,
      [questionId]: answerId
    }));
  };

  return (

    <>
    <div className='homeeee'>
    <Header/>
      <Back title='Blog Posts' />
      <section className='blog padding'>
        <div className='contain '>

          
        <div className="savee">
         
         <h4 className="thr">Data has been added successfully</h4>
         <h2>Questions About the Subject</h2>
         <div className="heade">
           {questions.map((question) => (
             <div className="question" key={question.id}>
               {/* {console.log(question.id)}
               <h3>{question.title}<span>{question.mark}</span></h3> */}
                 <div className='marr'>
                <h3>{question.title}</h3>
                <span>{question.mark}</span>
                </div>

               <div className="options">
                 {shuffle(question.answers).map((option, index) => (
                   <div className="optionsss" key={index}>
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

           
             </div>
           ))}
         </div>
         <button className='buttonssss'
         onClick={handleSubmit} 
        >Send</button>
       </div>


        </div>
      </section>
    </div>
    </>



      
      
    
  );
}

export default AllQuestion;