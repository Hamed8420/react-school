import React from 'react';
import './lessonItem.scss';
import { Link } from 'react-router-dom';
function LessonItem({ name, number,pdfLink }) {
  return (
    <div className='tara'>
      <h3>{number}</h3>
      <p><a href={pdfLink} target='_blank' rel='noopener noreferrer'>{name}</a></p>
      <p><Link to={`/lessons/question`}>Question</Link></p>

      <div className='buttons'>
        <button>delete</button>
        <Link to={`/lessons/edites`} className='edite'>Edit</Link>
      </div>
    </div>
  );
}

export default LessonItem;

