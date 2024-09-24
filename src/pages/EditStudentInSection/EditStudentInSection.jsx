import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
const EditStudentInSection = () => {
  const { Idclass, Idus } = useParams();
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');

    const fetchSections = async () => {
      try {
        const response = await axios.post(
          'http://localhost:8000/api/section/allSections',
          { classId: Idclass },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setSections(response.data.sections);
        console.log(response.data.sections);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSections();
  }, [Idclass]);

  const handleEdit = async () => {
    const token = sessionStorage.getItem('accessToken');

    try {
      await axios.put(
        'http://localhost:8000/api/section/updateSectionStudent',
        {
          sectionId: selectedSection,
          userId: Idus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log('Student updated successfully');
    } catch (error) {
      console.log(error);
    }
  };

  const handleUserChange = (event) => {
    setSelectedSection(event.target.value);
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='cantanes'>
        <Navbar />

        <div className='edites'>
          <h2>Edit Student</h2>

   <div  className='addref'>

   <div className='gtr'>
            <h2>Enter section</h2>
            <select value={selectedSection} onChange={handleUserChange}>
              <option value={''}>None choose</option>
              {sections.map((section) => (
                <option key={section.id} value={section.id}>
                  {section.sectionNumber}
                </option>
              ))}
            </select>
          </div>
   </div>
          <button onClick={handleEdit} className='buttons'>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default EditStudentInSection;