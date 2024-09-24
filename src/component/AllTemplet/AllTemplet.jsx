import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


import Back from "../common/back/Back"

import Header from "../common/heading/Header"
 import './allTemplet.css'
// import StudentInSection from '../studentInSection/StudentInSection';
import AllStudentInSection from '../AllStudentInSection/AllStudentInSection';
import Cookies from 'js-cookie';
function AllTemplet() {
  const [data, setData] = useState([]);
  const [timing, setTiming] = useState("");
  const token = sessionStorage.getItem("accessToken");
  const { Idsection,Idclass } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/schedule/getScheduleSection/${Idsection}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.subjects);
        console.log(response.data.subjects);
        setTiming(response.data.time);
        console.log(response.data.time);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div className="homeeee">
           <Header/>
      <Back title='Explore Class' />
      <section className="coursesCard">
        
    <div className="contain ">

{/* 
    <div className="table">
          <table className="tr">
            <thead className="td">
              <tr>
                <th>Time</th>
                {daysOfWeek.map((day) => (
                  <th key={day}>{day}</th>
                ))}
              </tr>
            </thead>
            
            <tbody className="ts">
              {timeSlots.map((time) => (
                <tr key={time}>
                  <td>{time}</td>
                  {daysOfWeek.map((day) => (
                    <td key={day}>
                      <div className="day-column">
      <p className="subject">
        {randomSubject.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </p>
    </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        
        <div className="display">
          
          <div className=" sidee">
            <h5>Time</h5>
            <h5>9:00</h5>
            <h5>10:00</h5>
            <h5>10:45</h5>
            <h5>11:00</h5>
            <h5>11:45</h5>
  
          </div>
          <div className="class-l">
  
            <div className="roba">
              <h5>Sunday</h5>
              <h5>Monday</h5>
              <h5>Tusday</h5>
              <h5>wesnday</h5>
              <h5>thersday </h5>
  
            </div>
  
            <div className="sare">
              {data.map((date, index) => (
                <div className="service" key={index}>
                  <div className="traa">
                    <h3>{date[2]}</h3>
            
                
                      <h4>
                        <span>{date[4]}</span>
                      </h4>
            
                  </div>
       
  
                </div>
              ))}
            </div>
  
          </div>
          </div>
         

        <AllStudentInSection/>
    </div>
      </section>
    </div>
    </>
  );
}

export default AllTemplet;