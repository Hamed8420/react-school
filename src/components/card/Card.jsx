import React from "react";
import { Link } from "react-router-dom";
import './card.scss';
import axios from "axios";
import Cookies from 'js-cookie';


const Card = ({ book ,books}) => {

  console.log(book);
  
const handleDelete = async (id) => {
    try {
      const token = sessionStorage.getItem('accessToken'); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };


      await axios.delete(`http://localhost:8000/api/subject/deleteReferance/${id}`, config);
      books(book.filter(book => book.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {book.map((item) => (
        <div className="carde" key={item.id}>
          <div className="bottomss">
          <img src={`http://localhost:8000/${item.image}`} alt="" />
           <div className="des">
           <h3 className="tit">{item.name}</h3>
            <h3 className="tit">{item.type}</h3> 
           </div>
          </div>
          <div className="dess">
            
            <p>
              {item.description} 
              {/* skmdfksdf klsdjf slkdjf sdlkfj */}
              </p>


          </div>
            <div className="buut">

       <div className="der">
       <button onClick={() => handleDelete(item.id)}>delete</button>

        
              <button>
              <a href={`http://localhost:8000/${item.path}`} download className="ed">
                 Show
              </a>
              </button>
       </div>
            

            <div className="line">
           <button>
           <Link  to={`/books/edite/${item.id}`} className="ed"> Edit</Link>
           </button>
          </div>

            </div>
         
        </div>
      ))}
    </>
  );
};

export default Card;