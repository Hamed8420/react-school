import "./single.css";
import React, { useEffect, useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
const ProfileTeacher = () => {
  const {userId } =useParams();
  const [userData, setUserData] = useState('');
const token = sessionStorage.getItem('accessToken')
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/getProfile/${userId}`, {
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
  }, [userId]);
  return (
    <div className="home">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="nameeee">
        <div className="leftee">
            {/* <div className="editButton">Edit</div> */}
            <h1 className="titl">Information</h1>


            <div className="itemee">
              <img
                 src={`http://localhost:8000/${userData.image}`}
                alt=""
                className="itemImg"
              />
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
        </div>
        
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        
  
      </div>
    </div>
  );
};

export default ProfileTeacher;
