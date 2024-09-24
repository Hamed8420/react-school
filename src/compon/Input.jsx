// import React, { useState } from 'react';

// const Input = ({ onSendMessage }) => {
//   const [messageText, setMessageText] = useState('');

//   const handleMessageSend = () => {
    
//     onSendMessage(messageText);
//     setMessageText('');
//   };

//   return (
//     <div className='input'>
//       <input
//         type='text'
//         placeholder='Type Something...'
//         value={messageText}
//         onChange={(e) => setMessageText(e.target.value)}
//       />
//       <div className='sende'>
//         <button className='but' onClick={handleMessageSend}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Input;