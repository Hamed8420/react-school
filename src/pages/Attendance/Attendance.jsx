import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import Sidebar from '../sidebar/Sidebar';
// import Navbar from '../navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
// import './allTeacher.css'
const Attendance = () => {
  const [data, setData] = useState([]);
  const [date, setDate] =useState([]);
  const [dateee, setDateee] =useState([]);

  const {Idsection , idsubject} =useParams();


  useEffect(() => {
    axios.get(`http://localhost:8000/api/attendace/getAttendance/${Idsection}/${idsubject}`)
      .then(response => {
        setData(response.data.lessonName);
        setDate(response.data.studentName);
        setDateee(response.data.last)

        console.log(response.data.lessonName)
        console.log(response.data.studentName)
        console.log(response.data.last)
        

        
      })
      .catch(error => {
        console.error(error);
      });
  }, [idsubject,Idsection]);

  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
      <Navbar/>
      <div className="home">
      <div className="homeContainer">
        <div className="contt">
          <div className='teste'>
            <p>All teachers...</p>
            {/* <Link to={"/users/new"} className='add'>Add</Link> */}
          </div>
          <table className="tame">
            <thead>
              <tr>
                <th> Name</th>
          {/* {data.map((less)=> (
            <th>{less}</th>

          ))} */}
             {data.length > 0 && data.map((less) => <th>{less}</th>)}
             
              </tr>
            </thead>
            <tbody>
            {/* {date.map((stude, index) => (
                    <tr key={index}>
                      <td>{stude}</td>
                      {dateee[index].map((ser) => (
                        <td>{ser}</td>
                      ))}
                    </tr>
                  ))} */}

{date.length > 0 &&
                  date.map((stude, index) => (
                    <tr key={index}>
                      <td>{stude}</td>
                      {dateee[index]?.map((ser) => (
                        <td>{ser}</td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      </div>
    </div>
  
  );
};

export default Attendance;