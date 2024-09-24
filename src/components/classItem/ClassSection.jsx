import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { useParams } from 'react-router-dom';
import './classItem.css'
import Cookies from 'js-cookie';
function ClassSection() {
  const [sections, setSections] = useState([]);
  const { Idclass } = useParams();
  const token = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/section/allSections',
          { classId: Idclass },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSections(response.data.sections);
        console.log(response.data.sections)
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [Idclass, token]);


  const deleteSection = async (sectionId) => {
    try {
      await axios.delete(`http://localhost:8000/api/section/deleteSection/${sectionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // تحديث القسم المحذوف في الواجهة الرسومية
      setSections(sections.filter(section => section.id !== sectionId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='sections'>
        <Navbar />
        <div className='class-list'>
          <div className='testes'>
            <h2>All Section...</h2>
            <Link to={`/classes/section/${Idclass}/add`} className='addes'>Add</Link>
          </div>
          <div className='zara'>
            {sections.map((section, index) => (
              <div className='service-ite' key={section.id}>
                  <h2 className='indexx'>{index + 1}</h2>
                  <div className='paree'>
                    <h4><span>name:</span>{section.sectionNumber}</h4>
                    <h4><span>numStudent:</span>{section.maxNumberOfStudent}</h4>
                  </div>

                  <div className='pare'>
                  <button>
                  <Link to={`/classes/section/${Idclass}/timetable/${section.id}`}> Schedule</Link>
                  </button>
                  <button>
                  <Link to={`/classes/section/${Idclass}/lessons/${section.id}`}>AllSubjects</Link>
                  </button>
                  </div>
              
                  <div className='butte'>
                    <button onClick={() => deleteSection(section.id)}>delete</button>
                    <button>
                    <Link to={`/classes/section/${Idclass}/edites/${section.id}`} className='ed'>Edit</Link>

                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassSection;