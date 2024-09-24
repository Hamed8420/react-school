import React, { useState, useEffect } from 'react';
import Goja from "../img/goja.jpg";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/sidebar/Sidebar';
import Navbar from '../components/navbar/Navbar';
import './chatSchool.css'

// import io from 'socket.io-client';

// const socket = io('http://localhost:8000');

const Chat = ({ socket }) => {
  const { id, isGroup } = useParams();
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState('');

  const [groups, setGroups] = useState([]);
  const Iduser = sessionStorage.getItem('Iduser');

  let chatId;
  if (isGroup === 'undefined') {
    chatId = sessionStorage.getItem('chatId');
  } else {
    chatId = id;
  }

  // useEffect(()=>{
  //   socket.on('getMessageToRoom', (message) => {
  //     setMessages(prevMessages=> [...prevMessages,message]);
  //     console.log( message)

  //   });

  // },[])

    useEffect(() => {
    socket.on('getMessageToRoom', (data) => {
      const { message, sender,image,firstName } = data;
      console.log(`data is m:${data.message}`)
      console.log(`data is u:${data.userId}`)
      console.log(`data is s:${data.sender}`)
      console.log(`data is i:${data.image}`)
      console.log(`data is f:${data.firstName}`)
      const newMessage = {
        text: message,
        UserId: sender,
        User:{
          image:image,
          firstName:firstName
        }
      };
      console.log(newMessage)
      // setImages(data.image)
      

      setMessages(prevMessages => [...prevMessages, newMessage]);
      console.log(messages)
    });
  }, [socket]);

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken');
    axios.get('http://localhost:8000/api/chat/getAllGroup',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        const groupsData = response.data.groups;
        // console.log(response.data.groups)
        setGroups(groupsData);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);


  useEffect(() => {



   
    axios.post('http://localhost:8000/api/chat/getAllMessage', {
      groupId: chatId
    })
      .then(response => {
        // console.log(response.data.messages)
        setMessages(response.data.messages);
      })
      .catch(error => {
        console.error(error);
      });

   
    // return () => {
    //   socket.off('getMessageToRoom');
    // };
  }, []);

  const handleSendMessage = () => {
    const Iduser = sessionStorage.getItem('Iduser');

    const newMessage = {
      text: inputValue,
      userId: Iduser,
      room: chatId,

    };

    // setMessages(prevMessages => [...prevMessages, newMessage]);s 

    socket.emit('sendMessageToRoom', newMessage);

    

    axios.post('http://localhost:8000/api/chat/sendMessage', {
      message: inputValue,
      groupId: chatId,
      senderId: Iduser
    })
      .then(response => {
        // console.log(response.data)
        setInputValue('');
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className='list'>
    <Sidebar/>
    <div className='listContainer'>
      <Navbar/>
      <div className="home">
        <div className="homeContainer">
    
        <div className='chat'>
          <div className='useeee'>
       {
        groups.map((use,index) =>{
<p>{use.Users.firstName}</p>
        })
       }
          </div>
<div className='room'>

<div className='messages'>
  {console.log(messages)}
        {messages.map((message) => (
          <div className='message' key={message.id}>
            <div className={message.UserId == Iduser ?'messageInfo' : "messageinf"}>
              <div className='spa'>
              <span>{message.text}</span>
                </div>
              <img src={`http://localhost:8000/${message.User.image}`} alt='' />
              {/* <img src={Goja} alt='' />  */}
              

              {/* <span>{message.firstName}</span> */}
              {/* {console.log(message.User)} */}
            </div>
          </div>
        ))}
      </div>

      <div className='input'>
        <input type='text' placeholder='Type Something...' value={inputValue} onChange={handleInputChange} />
        <div className='sende'>
          <button className='send' onClick={handleSendMessage}>Send</button>
        </div>
      </div>

  </div>     

    



    </div>
        </div>
      </div>
        
     
    </div>
  </div>

  

  );
};

export default Chat;
