// import React from "react"
import Back from "../common/back/Back"
import BlogCard from "./BlogCard"
import Header from "../common/heading/Header"
import "./blog.css"
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import "./courses.css"
// import { coursesCard } from "../../dummydata"
import { useParams } from 'react-router-dom';

import axios from 'axios';

const Blog = () => {

    

  return (
    <>
 <div className="homeeee">
 <Header/>
      <Back title='Blog Posts' />
      <section className='blog padding'>
        <div className='contain grid2'>
          <BlogCard />
        </div>
      </section> 
 </div>
    </>
  )
}

export default Blog
