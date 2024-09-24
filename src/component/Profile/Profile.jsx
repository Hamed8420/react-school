import Back from "../common/back/Back"

import Header from "../common/heading/Header"
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Profilee = () => {
    const [userData, setUserData] = useState(null);
    const token = sessionStorage.getItem('accessToken')
      const Iduser = sessionStorage.getItem("Iduser")
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/user/getProfile/${Iduser}`, {
              headers: {
                Authorization: `Bearer ${token}`, // استرداد قيمة الـ Cookie
              },
            });
            const data = response.data.user;
            setUserData(data);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [Iduser]);
    
  return (
    <>
    <div className="homeeee">
    <Header/>
      <Back title='Explore Class' />
      {/* <CoursesCard /> */}
      <section className='singleContaine'>
      <div className="lefteeee">
      <Link to={`/use/profile/edite/${Iduser}`} className="editButton">Edit</Link>
          <h1 className="titl">Information</h1>


          <div className="itemee">
          {userData &&(
 <img
 src={`http://localhost:8000/${userData.image}`}
alt=""
className="itemImg"
/>
)

}
            

             {userData && (
                  <div className="details">
                  <h1 className="itemTitle">{userData.firstName}{userData.lastName}</h1>
                  <div className="detailItem">
                    <span className="itemKey">Email:</span>
                    <span className="itemValue">{userData.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Father:</span>
                    <span className="itemValue">{userData.midelName}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Mother:</span>
                    <span className="itemValue">samar</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">date:</span>
                    <span className="itemValue">2000</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">+1 2345 67 89</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                      Elton St. 234 Garden Yd. NewYork
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Country:</span>
                    <span className="itemValue">USA</span>
                  </div>

                  </div>
              )}

          </div>


        </div>
      </section>

      
      {/* <OnlineCourses /> */}
    </div>
    </>
  )
}

export default Profilee

