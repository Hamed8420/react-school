import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Gjo from "../img/gjo.jpg"
import { Link } from 'react-router-dom';
import io from 'socket.io-client'
const Search = () => {
  const [groups, setGroups] = useState([]);
  const socket=io('http://localhost:8000')
  useEffect(() => {
  
    axios.get('http://localhost:8000/api/chat/getAllGroup')
      .then(response => {
        const groupsData = response.data.groups;
      
        setGroups(groupsData);

        // localStorage.setItem('chatId', chatId);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className='searche'  >
      {groups.map((group,index) => (
        <Link to={`/chat/chats/${group.id}/${group.isGroup}`} key={index}>
        <div className='userChat' key={group.id}>
          
          <img src={Gjo} alt="غوجو" />
          <div className='userChatInfo'>
            <span >{group.groupName}</span>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
}

export default Search;