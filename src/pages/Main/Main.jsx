import React, { useState, useEffect } from 'react';
import Card from '../../components/card/Card';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './main.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const Main = () => {
  const [bookData, setBookData] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedType, setSelectedType] = useState(''); // تغيير القيمة الافتراضية إلى القيمة الفارغة

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get('http://localhost:8000/api/subject/getReferance', config);
        setBookData(response.data.referances);
        setFilteredBooks(response.data.referances); // تعيين القيمة الافتراضية للكتب المُصفاة
        console.log(response.data.referances);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [selectedType]);

  const filterBooks = () => {
    if (selectedType === '') {
      setFilteredBooks(bookData);
    } else {
      const filtered = bookData.filter((book) => book.type === selectedType);
      setFilteredBooks(filtered);
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'>
        <Navbar />
        <div className='cover'>
          <div className='header'>
            <div className='row2'>
              <h2>Find Your Book...</h2>
              <select value={selectedType} onChange={handleTypeChange} className='selecttype'>
                <option value=''>All</option>
                <option value='fun'>Fun</option>
                <option value='action'>Action</option>
                <option value='math'>Math</option>
                <option value='physics'>Physics</option>
                <option value='history'>History</option>
              </select>
              <Link to={`/books/adde`}>Add</Link>
            </div>
            <div className='row1'>
              <h1>Before you give up, think about why you fought for so long</h1>
            </div>
          </div>
          <div className='containa'>
            <Card book={filteredBooks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;


