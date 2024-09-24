import React from 'react';
import ServiceItem from '../../components/serviceItem/ServiceItem';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Link } from 'react-router-dom';
import './servicelist.scss'

const ServicesList = () => {
  const services = [
    { id: 1, name: 'مخيم كشافة',image:  '/images/picture8.jpg' },
    { id: 2, name: 'العاب رياضية', image:  '/images/picture8.jpg' },
    { id: 3, name: 'احتفالات ومناسبات', image:  '/images/picture8.jpg' },
    { id: 4, name: 'مسابقات فكرية',image:  '/images/picture8.jpg' },
    { id: 5, name: 'أنشطة ترفيهية', image:  '/images/picture8.jpg' },
    { id: 6, name: 'خدمات مسرحية', image:  '/images/picture8.jpg'},
  ];

  return (
    // <div>
    //   {services.map(service => (
    //     <ServiceItem key={service.id} name={service.name} image={service.image} />
    //   ))}
    // </div>

    <div className='home'>
    <Sidebar />
    <div className='cantana'>
      <Navbar />
      <div className='class-list'>
      
        <div className='test'>
        <h2>Services...</h2>
          <Link to={`/service/add`} className='add'>Add</Link>
       </div>
       
        <div className='kara'>
          {services.map(service => (
       <ServiceItem key={service.id}
        name={service.name}
         image={service.image} />
         
     )
     )
     } 
 
        </div>
      </div>
    </div>
  </div>
  );
};

export default ServicesList;