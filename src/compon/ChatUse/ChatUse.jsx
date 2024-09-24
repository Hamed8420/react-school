import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './chatUse.css'
import Gojo from '../../img/gojo.jfif';
import Gjo from "../../img/gjo.jpg";
import Back from '../../component/common/back/Back';
import Header from '../../component/common/heading/Header';
import Sidebare from '../Sidebare';
import { Link } from 'react-router-dom';



const Iduser = sessionStorage.getItem('Iduser');

const ChatUse = ({ socket }) => {

    const [userData, setUserData] = useState([]);
    const [userADMIN, setUserADMIN] = useState([]);
  const [groups, setGroups] = useState([]);
  const [joinRoomMessage, setJoinRoomMessage] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected fdklsf ");
    });

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/getUser/TEACHER');
        setUserData(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  const imageUser=sessionStorage.getItem('image')

  useEffect(() => {
    socket.on('connect', () => {
      console.log("connected fdklsf ");
    });

    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user/getUser/ADMIN');
        setUserADMIN(response.data.users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    axios.get('http://localhost:8000/api/chat/getAllGroup',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const groupsData = response.data.groups;
        console.log(response.data.groups)
        setGroups(groupsData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/chat/createGroup')
  //     .then(response => {
  //       const groupsData = response.data.groups;
  //       setGroups(groupsData);
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
  //     });
  // }, []);

  const handleJoinRoom = async (userId) => {
    try {
      console.log("up")
      const response = await axios.post('http://localhost:8000/api/chat/createSingleChat', {
        senderId: Iduser,
        reciverId: userId
      });
      console.log("down")
      const chatId = response.data.chat.id;
      socket.emit('enterRoom', { sender: Iduser, receiver: userId });
      console.log('hhh')
      sessionStorage.setItem('chatId', chatId);
      console.log('Chat created:', chatId);
      setJoinRoomMessage('User joined the room successfully!');
    } catch (error) {
      console.error('Failed to create chat:', error);
    }
  };

  const handleJoinGroup = async (groupId) => {
    socket.emit('enterRoom', { chatId: groupId ,userId:Iduser});
    setJoinRoomMessage('User joined the room successfully!');
  };

  
  return (
    
    <>
    <div className='homeeee'>
    <Header/>
      <Back title='Explore Chat' />
      
      <section className='coursesCarde'>
        <div className='contain'>

        <div className="sidebare">

        <div className='navbareee'>
<div className='users'>

  <Link to={`/use/chat/adde`} className='addd'>AddNewGroup</Link>
</div>
    </div>

    <div className='allusere'>
          <h2> All Group</h2>
      <div className='searchee'>
    
        {groups.map((group, index) => (
          <Link to={`/use/chat/chats/${group.id}/${group.isGroup}`} key={index}>
            <div className='userChate' key={group.id} onClick={() => handleJoinGroup(group.id)}>
              <img src={`http://localhost:8000/${group.groupImage}`} alt="غوجو" />
              <div className='userChatInfo'>
                <span>{group.groupName}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>


      <h2> All User</h2>
      <div className='user'>

      {userData.filter(user => user.id != Iduser).map((user, index) => (
        <Link to={`/use/chat/chats/${user.id}/${user.isGroup}`} key={index}>
          <div className='userChate' onClick={() => handleJoinRoom(user.id)}>
            {/* <img src={Gojo} alt='' /> */}
            <img src={`http://localhost:8000/${user.image}`} alt='' />
            <div className='userChatInfo'>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
      
        </Link>
      ))}
      </div>


      <h2> ADMIN</h2>
      <div className='user'>

      {userADMIN.filter(user => user.id != Iduser).map((user, index) => (
        <Link to={`/use/chat/chats/${user.id}/${user.isGroup}`} key={index}>
          <div className='userChate' onClick={() => handleJoinRoom(user.id)}>
            {/* <img src={Gojo} alt='' /> */}
            <img src={`http://localhost:8000/${user.image}`} alt='' />
            <div className='userChatInfo'>
              <span>
                {user.firstName} {user.lastName}
              </span>
            </div>
          </div>
      
        </Link>
      ))}
      </div>
    </div>

        </div>
              
       
                
        </div>
      </section>
    </div>
    </>
  );
};

export default ChatUse;