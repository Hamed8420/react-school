import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
// import Datatable from "../../components/datatable/AllTeacher"
import AllTeacher from "../../components/datatable/AllTeacher"

const AllTeacherCont = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <AllTeacher/>
      </div>
    </div>
  )
}

export default AllTeacherCont