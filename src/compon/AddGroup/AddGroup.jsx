import React, { useState, useEffect } from 'react';
import './addGroup.css';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const GroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [stud, setStude] = useState([]);

  const [date, setDate] = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/getUser/TEACHER');
        setUsers(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/getUser/STUDENT');
        setStude(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  const gtr=document.querySelector('.hell');
  const handleGroupCreation = async () => {
    const token = sessionStorage.getItem('accessToken');
    try {
      const formData = new FormData();
      console.log(selectedPeople)
      const Selectmap=JSON.stringify(selectedPeople)
      formData.append('groupName', groupName);
      formData.append('users', Selectmap);
      formData.append('image', selectedFile);
      

      const response =  await axios.post('http://localhost:8000/api/chat/createGroup', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

     
      if (response.status === 200) {
        console.log('Group Created Successfully!');
        gtr.innerText = 'Group Created Successfully!';
      } else {
        const message = response.data.message;
        gtr.innerText = message;
      }
  
      console.log('nsdfksdnkfs');
      console.log(response.data);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };


  const handlePersonSelection = (event) => {
    const { options } = event.target;
    const selectedPeople = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedPeople(selectedPeople);
  };

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className='home'>
    <Sidebar/>
    <div className='cantanes'>
      <Navbar/>
 
        <div className='edites'>
      <h2>Create a Group</h2>
   <p className='hell'></p>
      <div className='addref'>

        <div className='lessonEdit'>
          <input
            type="file"
            id="file"
            name={selectedFile}
            onChange={handleFileSelection}
          />
          <label htmlFor="file" className='filees'>image your Group</label>
 
        </div>
   
        
          <div className='gtr'>
          {/* <label htmlFor="groupName">Group Name:</label> */}
          <h2>Enter Name Group</h2>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          </div>


        <div className='gtr'>
        {/* <label htmlFor="people">Select People:</label> */}
        <h2>Select User</h2>
          <select
            multiple
            id="people"
            value={selectedPeople}
            onChange={handlePersonSelection}
          >
            <option> Select Persons</option>
            {users.map(user => (
                <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
            ))}
                 {stud.map(stu => (
                <option key={stu.id} value={stu.id}>{stu.firstName} {stu.lastName}</option>
            ))}

          </select>
        </div>
        


      </div>
        <button type="button" className='buttons' onClick={handleGroupCreation}>Create Group</button>
    </div>


      
        
     
    </div>
  </div>

  
  );
};

export default GroupForm;