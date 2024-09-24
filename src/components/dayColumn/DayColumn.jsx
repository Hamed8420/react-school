import React from 'react';
import './dayColumn.scss';

function DayColumn({ day, time }) {
  const subjects = [
  ['Math','class 6','Marwa'], 
  ['Science','class4','khaled'],
  ['English','class2','mohamed'],
  ['History','class1','Ahmed']
  
  ];
 

  return (
    <div className="day-column">
      <p className="subject">
        {subjects.map((item, index) => (
          <div key={index}>
       <p >{item[0]}</p>
          <p >{item[1]}</p>
          <p >{item[2]}</p>
          </div>
   

        ))}
      </p>
    </div>
  );
}

export default DayColumn;
