// import {React,useEffect,useState} from 'react';
// import { Link } from 'react-router-dom';
// import './timetable.scss';
// import DayColumn from "../../components/dayColumn/DayColumn";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// // import Datatable from '../../components/datatable/AllTeacher';
// import StudentInSection from '../studentInSection/StudentInSection';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// function Timetable() {
//   const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
//   const timeSlots = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
//   const [dataStudent,setDatastudent] =useState();
//   const {Idsection}=useParams();
// let time9=[]
// let time10=[]
//   const token = localStorage.getItem('accessToken')
//   useEffect(() => {
//     axios.get(`http://localhost:8000/api/schedule/getScheduleSection/${Idsection}`,{
//         headers: {
//             Authorization: `Bearer ${token}`
//           }
//     })
//       .then(response => {
//         setDatastudent(response.data.subjects);
//         console.log(response.data.subjects[0])
//         // console.log(response.data.subjects)
//         response.data.subjects.forEach(subject=>{
//           if(subject[0]=="09:00:00"){
//             time9.push(subject)
//           }
//           if(subject[0] == "10:00:00"){
//             time10.push(subject)
//           }
//         })
//         console.log("time9",time9)
//         console.log("time10",time10)
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div className="home">
//       <Sidebar />
//       <div className="content">
//         <Navbar />
//     <div className="tera">
//     <div className="table">
//           <table className="tr">
//             <thead className="td">
//               <tr>
//           <th>Time</th>
//           <th>Sunday</th>
//           <th>Monday</th>
//           <th>tusday</th>
//           <th>wesnday</th>
//           <th>thersday</th>

//               </tr>
//             </thead>

//             <tbody className="ts">
//               {time9.forEach((time) => {
//               console.log("tmime",time)

//                 // <tr key={time}>
//                 //   <td>
//                 //     <p>{time[0]}</p>
//                 //     <p>{time[1]}</p>
//                 //     <p>{time[2]}</p>

//                 //   </td>

//                     /* <td >
//                       <DayColumn  time={time} />
//                     </td> */

//                 // </tr>
// })}

//             </tbody>
//           </table>
//         </div>

//         <div className="edit-button">
//           <Link to="/edit">Edit Timetable</Link>

//         </div>
//         <StudentInSection/>
//     </div>
//       </div>
//     </div>
//   );
// }

// export default Timetable;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import StudentInSection from "../studentInSection/StudentInSection";
import './timetable.css'
import Cookies from 'js-cookie';
function Timetable() {
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


  const handleDeleteSubject = async (id) => {
    try {
      const token = sessionStorage.getItem('accessToken'); // استحضار رمز المصادقة من localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة رمز المصادقة إلى رأس الطلب
        },
      };


      await axios.delete(`http://localhost:8000/api/schedule/deleteDate/${id}`, config);
      setData(data.filter(data => data.id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const Edithandel = (idtmp) => {
    const token = sessionStorage.getItem('accessToken');
    const data = {
        // hour: time,
        // day: day,
        subjectId:null,
        // sectionId: Idsection
    };

    axios
      .put(`http://localhost:8000/api/schedule/updateDate/${idtmp}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        // setData(data.filter(data => data.id !== id));
   
      })
      .catch(error => {
        console.error(error);

      });
  };


  return (
    <div className="home">
      <Sidebar />
      <div className="Schtual">
        <Navbar />
        <div className="class-li">

        <div className='tes'>
            <h2>Schedule and Student...</h2>
            <button className="butee">
              <Link to={`/classes/section/${Idclass}/timetable/${Idsection}/stusec`}>StudetnInSection</Link>
            </button>

            {/* <Link to={`/classes/section/${Idclass}/timetable/${Idsection}/addee`} className='addes'>Add</Link> */}
          </div>
          
        <div className="display">
          
        <div className=" side">
          <h5>Time</h5>
          <h5>8:00</h5>
          <h5>9:00</h5>
          <h5>10:00</h5>
          <h5>11:00</h5>
          <h5>12:00</h5>

        </div>
        <div className="class-lis">

          <div className="robaaa">
            <h5>Sunday</h5>
            <h5>Monday</h5>
            <h5>Tusday</h5>
            <h5>wesnday</h5>
            <h5>thersday </h5>

          </div>

          <div className="saree">
            {data.map((date, index) => (
              <div className="serviceeee" key={index}>
                <div className="tra">
                  <h3>{date[2]}</h3>
                  <div className="tera">
                    <h4>
                      <span>{date[3]}</span>
                    </h4>
                    
                    <h4>
                      <span>{date[4]}</span>
                    </h4>
                  </div>
                </div>
                <div className='temp'>
                    <button onClick={() => Edithandel(date[1])} >delete</button>
                    <button>
                    <Link to={`/classes/section/${Idclass}/timetable/${Idsection}/edites/${date[1]}`}  className='ed'>Edit</Link>
                    </button>
                  </div>

              </div>
            ))}
          </div>

        </div>
        </div>
        </div>
     

      </div>
    </div>
  );
}

export default Timetable;