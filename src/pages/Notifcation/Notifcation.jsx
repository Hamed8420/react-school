import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import './notifcation.css';
import Goja from '../../img/goja.jpg';
import Cookies from 'js-cookie';

const Notication = () => {
  const [services, setServices] = useState([]);


  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

    axios
      .get('http://localhost:8000/api/effectiveness/allEffectiveness', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setServices(response.data.effects);
        console.log(response.data.effects);
      })
      .catch(error => {
        console.log('حدث خطأ أثناء استدعاء البيانات:', error);
      });
  }, []);

  const formatDate = date => {
    if (date.length > 10) {
      return date.slice(0, 10);
    }
    return date;
  };

  const handleDelete = (questionId) => {
    const token = sessionStorage.getItem('accessToken');
    axios
      .delete(`http://localhost:8000/api/effectiveness/deleteEffectiveness/${questionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('تم حذف العنصر بنجاح');

        const updatedQuestions = services.filter((question) => question.id !== questionId);
        setServices(updatedQuestions);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="cantan">
        <Navbar />
        <div className="class-list">
          <div className="testes">
            <h2>Notifcation...</h2>
            <Link to={`/notifcation/add`} className="addes">
              Add
            </Link>
          </div>
          <div className="containa">
            {services.map(service => (
              <div className="service-item" key={service.id}>
                <div className="re">
                  <div className='imge'>
                  <img className="service-image"
                   src={`http://localhost:8000/${service.image}`} alt={service.title} />
                  <h3>{service.title}</h3>
                  </div>

                  <div className="teree">
                    <p className='datee'>
                      <span>Start:</span> <p> {formatDate(service.startDate)}</p>
                    </p>
                    <p className='datee'>
                      <span>End:</span> <p>{formatDate(service.endDate)}</p>
                    </p>
                  </div>
                  <p className="tgr">
                   {service.description}
                  </p>
                </div>
             

                <div className="buut">

<div className="der">
<button onClick={() => handleDelete(service.id)}>delete</button>

 
       <button>
       <Link to={`/notifcation/order/${service.id}`} className="ed">
                    order
                  </Link>
       </button>
</div>
     

     <div className="line">
    <button>
    <Link to={`/notifcation/edites/${service.id}`} className="ed">
                    Edit
                  </Link>
    </button>
   </div>

     </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notication;