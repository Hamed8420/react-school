// import React, { useState } from 'react';
// import {Link} from 'react-router-dom'
// import axios from 'axios'
// // import './signup.css';

// const Parent = () => {
//   const [datee, setDatee] = useState('');

//   const [firstName, setFirstname] = useState('');
//   const [midelName, setmidelName] = useState('');
//   const [image, setImage] = useState('');
//   const [email, setemail] = useState('');
//   const [password, setpassword] = useState('');
//   const [confirmPassword, setconfirmPassword] = useState('');
//   const [lastName, setLastName] = useState('');

//   const [phone, setphone] = useState('');
//   const [address, setaddress] = useState('');

  
//   const handlefirstnameChange = (event) => {
//     setFirstname(event.target.value);
//   };
//   const handlemidelNameChange = (event) => {
//     setmidelName(event.target.value);
//   };

//   const handleemailChange = (event) => {
//     setemail(event.target.value);
//   };

//   const handlepasswordChange = (event) => {
//     setpassword(event.target.value);
//   };
//   const handleconfirmPasswordChange = (event) => {
//     setconfirmPassword(event.target.value);
//   };
//   const handlelastNameChange = (event) => {
//     setLastName(event.target.value);
//   };

//   const handlephoneChange = (event) => {
//     setphone(event.target.value);
//   };

//   const handlemotherNameChange = (event) => {
//     setmotherName(event.target.value);
//   };
  
//   const handlemidelNameChange = (event) => {
//     setmidelName(event.target.value);
//   };


//   const handleaddressChange = (event) => {
//     setaddress(event.target.value);
//   };



//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

 


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append('firstName', firstName);


//     formData.append('lastName', lastName);
//     formData.append('email', email);
//     formData.append('password', password);
//     formData.append('confirmPassword', confirmPassword);

//     formData.append('phone', phone);
//     formData.append('address', address);
//     formData.append('image', image);
    

//     if (
//       !formData.get('firstName') ||
//       !formData.get('lastName') ||

//       !formData.get('email') ||
//       !formData.get('password') ||
//       !formData.get('confirmPassword') ||

   
 
//       !formData.get('phone') ||
//       !formData.get('address') ||
//       !formData.get('image') 
//     ) {
//       alert('Please fill in all fields');
//       return;
//     }



//     try {
//       const response = await axios.post(
//         'http://localhost:8000/api/auth/signup',
//         formData
//       );
//       if (response.status === 200) {
//         console.log(response.data);
//       } else {
//         setDatee(response.data.message);
//       }
//     } catch (error) {
//       console.error(error);
//       setDatee('you have an error');
//     }
//   };

//   return (
// <div className='form-container'>
//     <div className='myweb'>
//       Please Create An Account
//       <span>{datee}</span>
//     </div>
// <form  className="form" onSubmit={handleSubmit}>
// <div className='test'>
//         <label>First Name</label>
//         <input
//         type="text" name='firstName' value={firstName} onChange={handlefirstnameChange}
//         placeholder="Enter Your Name" required/>
//       </div>
      

//       <div className='test'>
//         <label>last Name</label>
//         <input
//         type="text" name='lastName' value={lastName} onChange={handlelastNameChange}
//          placeholder="Enter Your Name" required/>
//       </div>

//       <div className='test'>
//         <label>Mother Name</label>
//         <input
//         type="text" name='midelName'value={motherName} onChange={handlemotherNameChange}
//          placeholder="Enter Your Name" required/>
//       </div>

//       <div className='test'>
//         <label>Midel Name</label>
//         <input
//         type="text" name='midelName' value={midelName} onChange={handlemidelNameChange}
//          placeholder="Enter Your Name" required/>
//       </div>


//       <div className='test'>
//         <label>Email Address</label>
//         <input
//         type="email" name='email' value={email} onChange={handleemailChange}
//          placeholder="Enter Your Email Address" required/>
//       </div>



//       <div className='test'>
//         <label>your Adress</label>
//         <input
//         type="text" name='midelName' value={address} onChange={handleaddressChange}
//          placeholder="Enter Your Name" required/>
//       </div>



//       <div className='test'>
//         <label>Phone Number</label>
//         <input
//         type="text" name='midelName' value={phone} onChange={handlephoneChange}
//         placeholder="Enter Your Name" required/>
//       </div>


//       <div className='test'>
//         <label>Password</label>
//         <div    >
//           <input type='password' value={password} onChange={handlepasswordChange}
//           name='password' placeholder="Enter password" required />
       
//         </div>
//       </div>
// {/* 
//       <div className='test'>
//         <label>Confirm Password</label>
//         <div>
//           <input type='password' value={confirmPassword} onChange={handleconfirmPasswordChange}
//           name='confirmPassword' placeholder="Enter Confirm Password" required />
     
//         </div>
//       </div> */}

  

//       <div className='test'>
//      <div className='document'>
//  <div className='te'>
//  <label for="file-input" className='file'>chooes your profile picture</label>
//         <input
//         type="file" id="file-input" onChange={handleImageChange} required/>
//  </div>


//      </div>

//       </div>

    



//       <button type="submit" className='Log' >
//      SignUp
//       </button>
//       <div className='go'>
        
//        <div className='sr'>
//        <p>Do you have an account</p>
//         <li>
//         <Link to='/use/login'>Login</Link>
//         </li>
//        </div>

//       </div>

//     </form>
// </div>

//   );
// };

// export default Parent;

import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
// import './signup.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Parent = () => {
  const [datee, setDatee] = useState('');
  // const [file, setFile] = useState(null);
  const [firstName, setFirstname] = useState('');
  const [midelName, setmidelName] = useState('');
  const [image, setImage] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  // const [confirmPassword, setconfirmPassword] = useState('');
  const [lastName, setLastName] = useState('');
  // const [role, setrole] = useState('');
  const [motherName, setmotherName] = useState('');
  const [sonNumber, setSonNumber] = useState('');
  const [phone, setphone] = useState('');
  const [address, setaddress] = useState('');

  
  const handlefirstnameChange = (event) => {
    setFirstname(event.target.value);
  };
  const handlemidelNameChange = (event) => {
    setmidelName(event.target.value);
  };

  const handleemailChange = (event) => {
    setemail(event.target.value);
  };

  const handlepasswordChange = (event) => {
    setpassword(event.target.value);
  };
  // const handleconfirmPasswordChange = (event) => {
  //   setconfirmPassword(event.target.value);
  // };
  const handlelastNameChange = (event) => {
    setLastName(event.target.value);
  };
  // const handleroleChange = (event) => {
  //   setrole(event.target.value);
  // };
  const handlemotherNameChange = (event) => {
    setmotherName(event.target.value);
  };
  
  const handledateChange = (event) => {
    setSonNumber(event.target.value);
  };
  const handlephoneChange = (event) => {
    setphone(event.target.value);
  };

  const handleaddressChange = (event) => {
    setaddress(event.target.value);
  };



  
  // const handleFileInputChange = (event) => {
  //   setFile(event.target.files[0]);
  // };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('firstName', firstName);

    formData.append('midelName', midelName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    // formData.append('confirmPassword', confirmPassword);
    // formData.append('sonNumber', role);
    formData.append('motherName', motherName);
    formData.append('sonNumber', sonNumber);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('image', image);
    // formData.append('file', file);

    if (
      !formData.get('firstName') ||
      !formData.get('lastName') ||
      !formData.get('midelName') ||
      !formData.get('email') ||
      !formData.get('password') ||
      // !formData.get('confirmPassword') ||

      !formData.get('motherName') ||
      !formData.get('sonNumber') ||
      !formData.get('phone') ||
      !formData.get('address') ||
      !formData.get('image') 
      // !formData.get('file')
    ) {
      alert('Please fill in all fields');
      return;
    }

    // if (formData.get('password') !== formData.get('confirmPassword')) {
    //   alert('Passwords do not match');
    //   return;
    // }

    try {
      const response = await axios.post(
        'http://localhost:8000/api/auth/signupParents',
        formData
      );
      if (response.status === 200) {
        console.log(response.data);
      } else {
        setDatee(response.data.message);
      }
    } catch (error) {
      console.error(error);
      setDatee('you have an error');
    }
  };
  

  return (
<div className='form-container'>
    <div className='myweb'>
      Please Create An Account
      <span>{datee}</span>
    </div>
<form  className="form" onSubmit={handleSubmit}>
<Slider
      slidesToShow={1}
      slidesToScroll={1}
      dots={true}
      infinite={false}
      
      appendDots={dots => (
        <div>
          <ul  style={{ margin: "0px" }}> {dots} </ul>
        </div>
        
      )}
      className='next'
      
    >

<div className='vist'>
<div className='test'>
        <label>First Name</label>
        <input
        type="text" name='firstName' value={firstName} onChange={handlefirstnameChange}
        placeholder="Enter Your Name" required/>
      </div>

      <div className='test'>
        <label>Midel Name</label>
        <input
        type="text" name='midelName' value={midelName} onChange={handlemidelNameChange}
         placeholder="Enter Your Name" required/>
      </div>

      <div className='test'>
        <label>last Name</label>
        <input
        type="text" name='lastName' value={lastName} onChange={handlelastNameChange}
         placeholder="Enter Your Name" required/>
      </div>
</div>
<div className='vist'>

<div className='test'>
        <label>Email Address</label>
        <input
        type="email" name='email' value={email} onChange={handleemailChange}
         placeholder="Enter Your Email Address" required/>
      </div>

      <div className='test'>
        <label>Mother Name</label>
        <input
        type="text" name='midelName'value={motherName} onChange={handlemotherNameChange}
         placeholder="Enter Your Name" required/>
      </div>

      <div className='test'>
        <label>your Adress</label>
        <input
        type="text" name='midelName' value={address} onChange={handleaddressChange}
         placeholder="Enter Your Name" required/>
      </div>
</div>
 
<div className='vist'>

<div className='test'>
        <label>Number Son</label>
        <input
        type="text" name='midelName' value={sonNumber} onChange={handledateChange}
         placeholder="Enter Your number son" required/>
      </div>


      <div className='test'>
        <label>Phone Number</label>
        <input
        type="text" name='midelName' value={phone} onChange={handlephoneChange}
        placeholder="Enter Your Name" required/>
      </div>


      <div className='test'>
        <label>Password</label>
        <div    >
          <input type='password' value={password} onChange={handlepasswordChange}
          name='password' placeholder="Enter password" required />
       
        </div>
      </div>
</div>
  <div className='vist'>
  {/* <div className='test'>
        <label>Confirm Password</label>
        <div>
          <input type='password' value={confirmPassword} onChange={handleconfirmPasswordChange}
          name='confirmPassword' placeholder="Enter Confirm Password" required />
     
        </div>
      </div> */}

  

      <div className='test'>
     <div className='document'>
 <div className='te'>
 <label for="file-input" className='file'>chooes your profile picture</label>
        <input
        type="file" id="file-input" onChange={handleImageChange} required/>
 </div>

 {/* <div className='te'>
        <label for="file-inpu" className='file' >enter your Document</label>
        <input
        type="file" id="file-inpu" onChange={handleFileInputChange} required />
      </div> */}
     </div>

      </div>

    

      {/* <div className='test'>
        <label> select how are you</label>
<select name='role' value={role} onChange={handleroleChange}>
  <option value={""}></option>
  <option value={"STUDENT"}>Student</option>
  <option value={"TEACHER"}>Teacher</option>
  <option value={"PARENTS"}>Parents</option>

</select>
      </div> */}
  </div>
  </Slider>
  
      

      <button type="submit" className='Log' >
     SignUp
      </button>
      <div className='go'>
        
       <div className='sr'>
       <p>Do you have an account</p>
        <li>
        <Link to='/use/login'>Login</Link>
        </li>
       </div>
      </div>

    </form>
</div>

  );
};

export default Parent;