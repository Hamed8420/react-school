import React, { useEffect, useState } from 'react';
import './profile.css';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Profil = () => {
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
    <div className="home">
    <Sidebar />
    <div className="singleContainer">
      <Navbar />
        <div className="leftee">
          <Link to={`/profile/edite/${Iduser}`} className="editButton">Edit</Link>
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
                    <span className="itemValue">{userData.motherName}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">date:</span>
                    <span className="itemValue">{userData.Date}</span>
                  </div>

                  <div className="detailItem">
                    <span className="itemKey">Phone:</span>
                    <span className="itemValue">{userData.phone}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Address:</span>
                    <span className="itemValue">
                    {userData.address}
                    </span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">number:</span>
                    <span className="itemValue">{userData.studentNumber}</span>
                  </div>

                  </div>
              )}

          </div>


        </div>
        {/* <div className="right">
          <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
        </div> */}
      

    </div>
  </div>
  );
}

export default Profil;