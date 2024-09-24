    // import './addLesson.scss'
    // import Sidebar from '../../components/sidebar/Sidebar';
    // import Navbar from '../../components/navbar/Navbar';

    // const AddLesson = () => {


    // return (
    
    //     <div className='home'>
    //     <Sidebar />
    //     <div className='cantana'>
    //     <Navbar />
        
        
    //     <div className='edit'>
    //     <h2>Add Lesson</h2>

    //     <div className='lessonEdit'>
    //     <input type="file" id="file-input" multiple/>

    //     <label for="file-input">
    //     Choose File
    // </label>
    
    //     </div>

    //     <div className='gtr'>
    //     <h2>Name Lesson</h2>
    //     <input type="text" id="name" />
    //     </div>
    //     <button>ADD</button>
    //     </div>
        
    //     </div>
    // </div>
    // );
    // };

    // export default AddLesson;


    import React, { useState } from 'react';
    import axios from 'axios';
    import './addLesson.scss';
    import Sidebar from '../../components/sidebar/Sidebar';
    import Navbar from '../../components/navbar/Navbar';
    import { useParams } from 'react-router-dom';
    import Cookies from 'js-cookie';
    const AddLesson = () => {
      const [name, setName] = useState('');
      const [selectedImage, setSelectedImage] = useState(null);
      const [errorMessage, setErrorMessage] = useState('');
      const { idsubject,Idsection } = useParams();
      console.log(Idsection)
    
      const token = sessionStorage.getItem('accessToken');
    
      const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
      };
    
      const handleNameChange = (event) => {
        setName(event.target.value);
      };
    
      const handleAddLesson = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('file', selectedImage);
        formData.append('sectionId',Idsection)
    
        try {
          const response = await axios.post(`http://localhost:8000/api/lesson/addLesson/${idsubject}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
          if (response.status === 200) {
            console.log('Data is added successfully');
            setErrorMessage('Data is added successfully');
          } else if (response.status === 422) {
            const message = response.data.message; // استخراج رسالة الخطأ من الاستجابة
            setErrorMessage(message);
          }
        } catch (error) {
          console.error('Error Editing notifcation:', error);
        setErrorMessage('you have a wrong in adding ');
        }
      };
    
      return (
        <div className='home'>
          <Sidebar />
          <div className='cantanes'>
            <Navbar />
            <div className='edites'>
              <h2>Add Lesson</h2>
              {errorMessage && <p>{errorMessage}</p>}
              <div className='addref'>

              <div className='lessonEdit'>
                <input type='file' id='image-input' onChange={handleImageChange} required />
    
                <label htmlFor='image-input' className='filees'>Choose Image</label>
              </div>
    
              <div className='gtr'>
                <h2>Name Lesson</h2>
                <input type='text' id='name' value={name} onChange={handleNameChange} placeholder='Enter Somthing ...' required />
              </div>

              </div>

              <button onClick={handleAddLesson} className='buttons'>ADD</button>
            </div>
          </div>
        </div>
      );
    };
    
    export default AddLesson;