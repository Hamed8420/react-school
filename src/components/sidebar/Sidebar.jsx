import "./sidebar.css";
// import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
// import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext,useState } from "react";
import axios from 'axios';
import t13 from "../../img/t13.png"
import t4  from "../../img/t4.png"


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [click, setClick] = useState(false)

  const Logout = async () => {
    try {
      const token = sessionStorage.getItem('accessToken'); 
      const refreshToken1 =sessionStorage.getItem('refershToken');
      console.log(refreshToken1)
      const data ={
        refershToken:refreshToken1
      }
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // إضافة رمز المصادقة إلى رأس الطلب
        },
      };


      await axios.post('http://localhost:8000/api/auth/logout',{refershToken:refreshToken1});
      sessionStorage.removeItem('accessToken')
      sessionStorage.removeItem('refershToken')

      window.location.pathname = '/use/login';
      console.log(`data:`)

    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
    <div  className={click ? "mobile-nave" : "sidebar "} onClick={() => setClick(false)}>

      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
<div className="you">
<span><img src={t4} alt="" className="me" /></span>
<span className="logo">lamadmin</span>
</div>
        </Link>
      </div>

      <hr />

      <div className="center">
        <ul>
          <p className="tit">MAIN</p>

          <Link to="/use" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icons" />
              <span>User Page</span>
            </li>
          </Link>

          <p className="tit">LISTS</p>

          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icons" />
              <span>Teachers</span>
            </li>
          </Link>


          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icons" />
              <span>Student</span>
            </li>
          </Link>


      
          {/* <Link to="/livestream" style={{ textDecoration: "none" }}>

          <li>
            <CreditCardIcon className="icons" />
            <span>Live broadcast</span>
          </li>

          </Link> */}
{/*         
          <Link to="/lessons" style={{ textDecoration: "none" }}>
            <li>
            <LocalShippingIcon className="icon" />

              <span>Lessons</span>
            </li>
          </Link> */}

          
          <Link to="/chat" style={{textDecoration:"none"}}>
          <li>
            <InsertChartIcon className="icons" />
            <span>Chat</span>
          </li>
          </Link>

          <p className="tit">USEFUL</p>

<Link to="/books" style={{textDecoration:"none"}}>
          <li>
            <InsertChartIcon className="icons" />
            <span>books</span>
          </li>
          </Link>
          
      
          
          <Link to="/notifcation" style={{textDecoration:"none"}}>
          <li>
            <NotificationsNoneIcon className="icons" />
            <span>Notifications</span>
          </li>
          </Link>
          <p className="tit">SERVICE</p>

          {/* <Link to="/service" style={{textDecoration:"none"}}>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Service</span>
          </li>
          </Link> */}


          {/* <Link to="/studentTable" style={{textDecoration:"none"}}>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>markers</span>
          </li>
          </Link> */}
       


       
          <Link to="/classes" style={{ textDecoration: "none" }}>
          <li>
            <SettingsApplicationsIcon className="icons" />
            <span>All Classes</span>
          </li>
          </Link>



          <Link to="/profile" style={{ textDecoration: "none" }}>
          <li>
            <SettingsApplicationsIcon className="icons" />
            <span>Profile</span>
          </li>
          </Link>
          
          <li>
            <ExitToAppIcon className="icons" />
            <span onClick={Logout}>Logout</span>
            {/* <span>Logout</span> */}
          </li>

        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>

 

    </div>
    <button className='togglee' onClick={() => setClick(!click)}>
            {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
          </button>
    </>
  );
};

export default Sidebar;
