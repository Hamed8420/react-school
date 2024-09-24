import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { price } from "../../dummydata"

const PriceCard = () => {

  const [books, setBooks] = useState([]);


  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/subject/getReferance',{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data.referances);
        console.log(response.data.referances);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <>
      {books.map((val) => (
        <div className='subjecte  shadow'>
            <div className='subimge'>
            <img src={`http://localhost:8000/${val.image}`} alt='' />
          </div>


          <div className='textt'>

         <div className="teach">
         <h4>{val.name}</h4>
         </div>
  <div className='admi'>
  <h1>{val.type}</h1>

<h3>{val.description} jasjdka ajskhd aksjdha sdkjashd sajkdhas dkajsdhas dkajshd</h3>
  </div>


          <button className='outline-b'>
          <a
      href={`http://localhost:8000/${val.path}`}
      // download={file.name}
    >
            GET STARTED
    </a>
            </button>

          </div>


        </div>
      ))}




    </>
  )
}

export default PriceCard
