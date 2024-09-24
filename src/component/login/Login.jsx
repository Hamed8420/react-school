import React, { useState } from 'react';
import {Link} from 'react-router-dom'

import { createBrowserHistory } from 'history';
import axios from 'axios'
import Cookies from 'js-cookie';

import './login.css';

const Login = () => {
  const history = createBrowserHistory();
  const [date, setDate]=useState();

  const [email, setEmail]=useState();
  const [password, setPassword]=useState();
  const [loginToken, setLogintoken]=useState();

  const handlemailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlepasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleloginTokenChange = (event) => {
    setLogintoken(event.target.value);
  };


  // const message = '';

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // const email = e.target.elements.email.value;
    // const password = e.target.elements.password.value;
    // const loginToken =e.target.elements.loginToken.value
  
    const data = {
      email: email,
      password: password,
      loginToken:loginToken
    };
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', data);
      console.log(response.data.message);
      // message = response.data;
      if (response.status === 200) {
        const token = response.data.accessToken;
        const refreshToken = response.data.refershToken;
        const Iduser = response.data.user.id;
        // const imageUser = response.data.user.image
        // const role=response.data.user.role;
        // const sectionId=response.data.usre.sectionId
        setDate(response.data.message);
        console.log(response.data)
        // localStorage.setItem('accessToken', token);
        // localStorage.setItem('refershToken', refreshToken);
        // localStorage.setItem('Iduser', Iduser);
        sessionStorage.setItem('accessToken', token);
        sessionStorage.setItem('refershToken', refreshToken);
        // sessionStorage.setItem('role',role)
        // sessionStorage.setItem('sectionId',sectionId)
        // Cookies.set('Iduser', Iduser, { expires: 365 });
        sessionStorage.setItem('Iduser', Iduser);
        // sessionStorage.setItem('image',imageUser)
  
        const userRole = response.data.user.role;
  
        if (userRole === 'STUDENT') {
          history.push('/use');
        }else if(userRole === 'PARENTS'){
          history.push('/use');
        }
         else if (userRole === 'ADMIN') {
          history.push('/');
        } else if(userRole === 'TEACHER'){
          history.push('/');
        } else {
          console.error('Invalid user role');
        }
      } else if (response.status == 422) {
        console.log('sdnfksdjfnkkj')
        // setDate(message.message);
        // console.log(message.message)
        // console.log(message.message)
      }
    } catch (error) {
      console.error(error);
      setDate(`erorr in email or password`);
      // console.log(response.data.message)
      // console.log(response.data)
      // console.log('sdnfksdjfnkkj')
    }
  };

  return (
<div className='form-container'>
    <div className='myweb'>
        Welcom in our WebSite
         <p className="error-message">{date}</p>
    </div>
<form  className="form" onSubmit={handleSubmit}>
     
      <div className='test'>
        <label>Email Address</label>
        <input
        type="email" name='email' value={email} onChange={handlemailChange} placeholder="Enter Your Email Address" required/>
      </div>

      <div className='test'>
        <label>Password</label>
        <div    >
          <input type='password'value={password} onChange={handlepasswordChange}
           name='password' placeholder="Enter password" required />
     
        </div>
      </div>

      <div className='test'>
        <label>number who we send you</label>
        <div    >
          <input type='number' value={loginToken} onChange={handleloginTokenChange}
           name='password' placeholder="don't show it to anyone" required />
     
        </div>
      </div>

      <button type="submit" className='Log' >
     Login
      </button>
  
      <div className='go'>
        <p> Do you not have an account</p>
       <div className='link'>
       <p>Create an account</p>
        <li>
        <Link to='/use/signup'>SignUp</Link>
        </li>
       </div>
      </div>

    </form>
</div>

  );
};

export default Login;