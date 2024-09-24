import React from 'react';
// import './ServiceItem.scss';
import { Link } from 'react-router-dom';

const NoticationItem = ({ name, image, competitionNumber, submissionDate, endDate, requirements }) => {
  return (
    <div className="service-item">
   <div className='re'>
   <img className="service-image" src={image} alt={name} />
      <h3 >{name}</h3>
      <p className='tre'><span>number:</span> {competitionNumber}</p>

   <div className='tere'>
   <p ><span>start:</span> {submissionDate}</p>
      <p ><span>end:</span> {endDate}</p>
      
   </div>
      <p className='tgr'><span>requirment:</span> {requirements}</p>

   </div>
      <div className='buttons'>
        <button>delete</button>
        <Link to={`/notifcation/edites`} className='edite'>Edit</Link>
      </div>
    </div>
  );
};

export default NoticationItem;