import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { coursesCard } from "../../dummydata"
import t2 from "../../img/t2.webp"
const Home = () => {

  const [students, setStudents] = useState([]);
  const [filter, setFilter] = useState("null");

  useEffect(() => {
    // const token = Cookies.get('accessToken');

    const fetchData = async () => {
      try {
        let url = `http://localhost:8000/api/auth/getRequest/null`;

        if (filter === "accepted") {
          url = `http://localhost:8000/api/auth/getRequest/accepted`;
        } else if (filter === "unaccepted") {
          url = `http://localhost:8000/api/auth/getRequest/unaccepted`;
        } else if(filter === "teacher"){
          url = `http://localhost:8000/api/auth/Teacher/getTeacherRequest`;
        }

        const response = await axios.get(url);

        setStudents(response.data.requests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [filter]);

  const handleStatusUpdate = (studentId, status) => {
    // const token = Cookies.get('accessToken');
    const data = {
      userId:studentId,
      status: status
    };

    axios.post(`http://localhost:8000/api/auth/changeStatus`, data)
      .then(response => {
        console.log(response.data);
        console.log(`acckad`)
        
  
        // const updatedStudents = students.map(student => {
        //   if (student.id === studentId) {
        //     return {
        //       ...student,
        //       status: status
        //     };
        //   }
        //   return student;
        // });
        // setStudents(updatedStudents);
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <div className="home">
      <Sidebar />
      <div className="Lessonn">
        <Navbar />
        {/* <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div> */}
   
   <div className='class-list'>
   <div className='row22'>
            <h2>Marks of Student...</h2>

         <div className='mor'>
         {/* <button onClick={() => setFilter("all")} className='all'>All</button> */}
            <button onClick={() => setFilter("null")} className='all'>UnthinkRequest</button>
            <button onClick={() => setFilter("accepted")} className='all'>Acceptable</button>
            <button onClick={() => setFilter("unaccepted")} className='all'>Unacceptable</button>
            <button onClick={() => setFilter("teacher")} className='all'>Teacher</button>

         </div>

          </div>

          <div className='zaraaaa'>
            {students.map((lesson, index) => (
              <div className='service-ite' key={index}>
        <div className="usersss">
        {/* <img
         src={`http://localhost:8000/${lesson.cover}`}
        src={`http://localhost:8000/${lesson.image}`}
         alt={lesson.name} className="indexxxxx" /> */}
   
         <img src={`http://localhost:8000/${lesson.image}`} alt={lesson.name} className="indexxxxx" />
                <h2 className='namee'>{lesson.firstName} {lesson.lastName}</h2>

          </div>
                

                {lesson.files.map((file, fileIndex) => (
  <div key={fileIndex} className='para1'>
    <a
      href={`http://localhost:8000/${file.path}`}
      download={file.name}
    >
   <h3 className="h12">   {lesson.email}</h3>


    </a>
  </div>
))}


                <div className='buttesss'>
                <button
                      onClick={() => handleStatusUpdate(lesson.id, "accepted")}
                      className='access'
                    >
                      accep
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(lesson.id, "unaccepted")}
                      className='unaccess'
                    >
                      unaccep
                    </button>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
