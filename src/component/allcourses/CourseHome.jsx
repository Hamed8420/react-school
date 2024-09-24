import React from "react"
import Back from "../common/back/Back"
// import CoursesCard from "./CoursesCard"
import OnlineCourses from "./OnlineCourses"
import Header from "../common/heading/Header"

const CourseHome = () => {
  return (
    <>
<div className="homeeee">
<Header/>
      <Back title='Explore Courses' />
      {/* <CoursesCard /> */}
      <OnlineCourses />
</div>
    </>
  )
}

export default CourseHome
