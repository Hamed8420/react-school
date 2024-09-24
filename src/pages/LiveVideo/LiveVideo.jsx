import React,{ useEffect, useRef, useState } from 'react';
import Peer from "simple-peer";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import './liveVideo.css';
import video from '../../img/S1E7.mp4'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';



const buttonColors = {
  audio: '#080',
  video: '#00ff00',
  chat: '#0000ff',
};

const Container = styled.div`
padding: 20px;
display: flex;
height: 100vh;
width: 96%;
flex-wrap: wrap;
margin: 0px 20px 0px 0px;
position: relative;

`;

const StyledButton = styled.button`
  height: 40px;
  margin-right: 5px;
  border-radius:8px;
  outline: nonr;
  border: none;
  background-color: ${props => buttonColors[props.className]};
`;

const StyledVideo = styled.video`
height: 250px;
    width: 250px;
    margin: 10px 20px;
    border: 1px solid #CCC;
    border-radius: 24px;
    object-fit: fill;
`;

const Video = (props) => {
    
  const ref = useRef();
  // const {Idclass} =useParams()
 
  useEffect(() => {
      props.peer.on("stream", stream => {
          ref.current.srcObject = stream;
      })
  }, []);

  return (
      <StyledVideo playsInline autoPlay ref={ref} />
  );
}


const videoConstraints = {
  height: window.innerHeight ,
  width: window.innerWidth 
};


const LiveStream = ({ socket ,props}) => {

  let [peers, setPeers] = useState([]);
  const socketRef = useRef();
  const userVideo = useRef();
  let peersRef = useRef([]);
  const {Idsection,lessonId ,Idclass,IdTeacher,idsubject}=useParams()
  const roomID = lessonId;
  const [Nstream, setNStream] = useState(null);
  const userId=sessionStorage.getItem('Iduser');
  // console.log(userId)
  const IdLesson=lessonId;
  const server =socket;
  let rolee = '';

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true })
    .then(stream => {
        console.log(stream)
        setNStream(stream);
        userVideo.current.srcObject = stream;
        server.emit("enterRoom", {roomID,userId,IdLesson},()=>{
            console.log(roomID)
        });
        server.on("all users", (users) => {
            console.log("240",users)
      
         console.log(users)
            const peers = [];
            users.forEach(userID => {
                console.log("243",userID[2])
                rolee =userID[2];
                const height = userID[2] === 'TEACHER' ? 600  : 200;
                const width = userID[2] === 'TEACHER' ? 600 : 200;

                const peer = createPeer(userID[0], server.id, stream , height, width);


                peersRef.current.push({
                    peerID: userID[0],
                    peer,
                })
                peers.push(peer);
                console.log(peers)
            })
            setPeers(peers);
        })
        
        server.on("user joined", payload => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
                peerID: payload.callerID,
                peer,
            })

            setPeers(users => [...users, peer]);
        });

        server.on("receiving returned signal", payload => {
            const item = peersRef.current.find(p => p.peerID === payload.id);
            item.peer.signal(payload.signal);
        });
    })
}, []);

function createPeer(userToSignal, callerID, stream , height, width) {
  const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
  });
  function dis(){
  
  }

  peer.on("signal", signal => {
      server.emit("sending signal", { userToSignal, callerID, signal })
  });

//   peer.on("stream", (stream) => {
//     const videoElement = document.createElement("video");
//     videoElement.height = height;
//     videoElement.width = width;
//     videoElement.srcObject = stream;
//     document.getElementById("video-container").appendChild(videoElement);
//   });



  return peer;
}

function addPeer(incomingSignal, callerID, stream) {
  const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
  })

  peer.on("signal", signal => {
      server.emit("returning signal", { signal, callerID })
  })

  peer.signal(incomingSignal);

  return peer;
}


function Chat() {
       console.log(Nstream)
       if (Nstream) {
        Nstream.getTracks().forEach((track) => {
          track.stop();
        });
        setNStream(null);
        window.location.pathname =`/classes/section/${Idclass}/lessons/${Idsection}/lesson/${idsubject}/${IdTeacher}`
        // setPeers([]);
        // peersRef.current=[]
        // socket.emit('dis')
        // server.emit("leaveRoom", { roomID, userId });
      }
}

function audio() {
    // console.log(`Suck my dick`);
    if(Nstream.getAudioTracks()[0].enabled){
        Nstream.getAudioTracks()[0].enabled = false;
    }else{
        Nstream.getAudioTracks()[0].enabled = true;
    }
}

function video() {
    if(Nstream.getVideoTracks()[0].enabled){
        Nstream.getVideoTracks()[0].enabled = false;
    }else{
        Nstream.getVideoTracks()[0].enabled = true;
    }
}


//   const students = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5', 'Student 6'];

  return (
        
    <div className='home'>
        {/* <Sidebar/> */}
  <div className="cantane">
        {/* <Navbar/> */}

<Container >
            
     
            <div className="containerrrrrrr">
    
                <StyledButton onClick={audio} className="audio">
            audio
          </StyledButton>
    
          <StyledButton onClick={video} className="audio">
            video
          </StyledButton>
    
          <StyledButton onClick={Chat} className="audio">
            chat
          </StyledButton>
          
                </div>
      
            <div className="videoes">
            <StyledVideo muted ref={userVideo} className={rolee === 'TEACHER' ?'rolee' : "real"}  autoPlay playsInline />
                {peers.map((peer, index) => {
                    return (
                        <Video key={index} peer={peer} />
                    );
                })}
            </div>
            
             
            </Container>
    </div>
    </div>
  
  );
};

export default LiveStream;