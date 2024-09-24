
import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";

// import List from "./pages/list/AllTeacherCont";
import AllTeacherCont from "./pages/list/AllTeacherCont";
import AllStudent from "./pages/allStudent/AllStudent";
import Single from "./pages/ProfileTeacher/profileTacher";
import Timetable from "./pages/timetable/Timetable";
import New from "./pages/new/New";
import { BrowserRouter , Routes, Route} from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import "./App.css"
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
// import LessonsList from "./pages/lessonList/LessonList";
import Main from "./pages/Main/Main";
// import StudentTable from "./pages/studenttable/StudentTable";
import MarkStudent from "./pages/studenttable/MarkStudent";
import ClassList from "./pages/classList/ClassList";
import ServicesList from "./pages/serviceList/ServiceList";
import EditService from "./pages/editService/EditService";
import AddLesson from "./pages/AddLesson/AddLesson";
import EditLesson from "./pages/EditLesson/EditLesson";
import AddService from "./pages/EditSection/EditSection";
import Notication from "./pages/Notifcation/Notifcation";
import AddNotifcation from "./pages/Addnotification/AddNotification";
import EditNotifcation from "./pages/EditNotifcation/EditNtifcation";
import AddStudfentTable from "./pages/AddStudentTable/AddStudentTable";
import EditStudentTable from "./pages/EditStudentTable/EditStudentTable";
import StudentGrades from "./pages/Studentone/Studentone";
import Order from "./pages/Order/Order";
import AddOrder from "./pages/AddOrder/AddOrder";
import EditOrder from "./pages/EditOrder/EditOrder";
import Quastion from "./pages/Question/Question";
import AddQuestion from "./pages/AddQuestion/AddQuestion";
import EditQuestion from "./pages/EditQuestion/EditQuestion";
import Subject from "./pages/allSubject/AllSubject";
import AddSubject from "./pages/AddSubject/AddSubject";
import EditSubject from "./pages/EditSubject/EditSubject";
import LessonsList from "./pages/lessonList/LessonList"

import Profil from "./pages/Profil/Profil";
/*--------------- User Page ------------------------------- */
// import Header from "./component/common/heading/Header"
// import { BrowserRouter as Router, Switch ,Route } from "react-router-dom"
// import { BrowserRouter , Route, Routes } from "react-router-dom";
import About from "./component/about/About"
import CourseHome from "./component/allcourses/CourseHome"
import Team from "./component/team/Team"
import Pricing from "./component/pricing/Pricing"
import Blog from "./component/blog/Blog"
import Contact from "./component/contact/Contact"
// import Footer from "./component/common/footer/Footer"
import Homee from "./component/homee/Homee"
import Login from "./component/login/Login";
import SignUp from "./component/signup/Signup"
import Hom from "./pages/hom/Hom";
import Chat from "./compon/Chat";
import GroupForm from "./compon/AddGroup/AddGroup";


// import QuestionSubject from "./pages/QuestionSubject/QuestionSubject";
import QuestionSubject from "./pages/QuestionSuject/QuestionSubject";
import AddQuestionSub from "./pages/AddQuestionSub/AddQuestionSub";
import AddClass from "./pages/AddClass/AddClass";
import EditClass from "./pages/EditClass/EditClass";
import ClassSection from "./components/classItem/ClassSection";
import AddSection from "./pages/AddSection/AddSection";
import EditSection from "./pages/EditSection/EditSection";
import AddStudentToSection from "./pages/AddStudentToSection/AddStudentToSection";
import EditStudentInSection from "./pages/EditStudentInSection/EditStudentInSection";
import LiveStream from "./pages/LiveVideo/LiveVideo";

import AllClasses from "./component/AllClass/AllClasses";
import AllSection from "./component/AllSection/AllSection";
import AllTemplet from "./component/AllTemplet/AllTemplet";
import AllMarkStudent from "./component/markStudent/AllMarkStudent";
import OneMarkStudent from "./component/OneMarkStudent/OneMarkStudent";
import AllQuestion from "./component/AllQuestion/AllQuestion";
import QuestionLesson from "./component/QuestionLesson/QuestionLesson";
import AllNotification from "./component/AllNotification/AllNotification";
import OrderStudent from "./component/OrderStudent/Orderstudent";
import AddOrderStudent from "./component/AddOrderStudent/AddOrderStudent";
import AddReferance from "./pages/AddReferance/AddReferance";
import EditReferance from "./pages/EditReferance/EditReferance";
import AllTeacher from "./components/datatable/AllTeacher";
import AddSchdual from "./pages/AddSchdual/AddSchdual";
import EditSchdual from "./pages/EditSchdual/EditSchdual";
import EditQuestionSub from "./pages/EditQuestionSub/EditQuestionSub";
import ProfileTeacher from "./pages/ProfileTeacher/profileTacher";
import LiveVideo from "./component/LiveStream/LiveStream";
import ChatUse from "./compon/ChatUse/ChatUse";
import AddGroupUser from "./compon/AddGroup/AddGroupUser";
import Chatcall from "./compon/Cahtcall/Chatcall";
import EditMarkStudent from "./pages/EditMarkStudent/EditMarkStudent";
 import Profile from "./component/Profile/Profile";
 import EditProfile from "./pages/EditProfile/EditProfile";
 import Parent from "./component/Parent/Parent";
 import Attendance from "./pages/Attendance/Attendance";
 import StudentInSection from "./pages/studentInSection/StudentInSection";
import io from 'socket.io-client';
import Profilee from "./component/Profile/Profile";
import EditProfileee from "./component/Profile/EditProfileee";


const socket = io('http://localhost:8000');

function App() {
  

  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">

            <Route index element={<Home />} />
            
            {/* <Route path="login" element={<Login />} /> */}
            <Route path="users">
              <Route index element={<AllTeacher />} />
              <Route path=":userId" element={<ProfileTeacher />} />
              {/* <Route path="new" element={<New inputs={userInputs} title="Add New teachers" />}/> */}
            </Route>

            <Route path="products">
              <Route index element={<AllStudent />} />
               <Route path=":userId" element={<ProfileTeacher />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Student" />}
              /> 
            </Route>



            <Route path="classes">
              <Route index element={<ClassList />} />
              <Route path="add" element={<AddClass />} />
              <Route path="edites/:Idclass" element={<EditClass />} />
              
              <Route path="section/:Idclass">
              <Route index element={<ClassSection />} />
              <Route path="add" element={<AddSection />} />
              <Route path="edites/:Idsection" element={<EditSection />} />

              {/* <Route path="timetable/:Idsection" element={<Timetable />} /> */}

              <Route path="timetable/:Idsection"> 
              <Route index element={<Timetable />} />
              <Route path="addee" element={<AddSchdual/>}/>
              <Route path="edites/:idtmp" element={<EditSchdual/>}/>
<Route path="stusec" >
<Route index element={<StudentInSection />} />
<Route path="adde" element={<AddStudentToSection />} />
<Route path="edite/:Idus" element={<EditStudentInSection />} />
</Route>



              </Route>



  <Route path="lessons/:Idsection">
              <Route index element={<Subject  />} />
              <Route path="adde" element={<AddSubject />} />
              <Route path="edites/:id" element={<EditSubject />} />

              <Route path="mark/:idsubject">
              <Route index element={<MarkStudent  />} />
              {/* <Route path="add" element={<AddStudfentTable />} /> */}
              <Route path="edites/:id" element={<EditMarkStudent />} />
              <Route path="one/:usenum/:year" element={<StudentGrades />} /> 
            </Route>



              
              <Route path="quessub/:idsubject">

                  <Route index element={<QuestionSubject  />} />
                  <Route path="edits/:questionsubId" element={<EditQuestionSub />} /> 
                  <Route path="addee" element={<AddQuestionSub />} /> 

              </Route>

              <Route path="Attend/:idsubject">

<Route index element={<Attendance  />} />
{/* <Route path="edits/:questionsubId" element={<EditQuestionSub />} /> 
<Route path="addee" element={<AddQuestionSub />} />  */}

</Route>



          
            <Route path="lesson/:idsubject/:IdTeacher">
              <Route index element={<LessonsList  />} />
              <Route path="adde" element={<AddLesson />} />
              <Route path="edites/:id" element={<EditLesson />} />



                  <Route path="question/:lessonId">

                        <Route index element={<Quastion  />} />
                        <Route path="edits/:questionId" element={<EditQuestion />} /> 
                        <Route path="adde" element={<AddQuestion />} /> 

                  </Route>

<Route path="livestream/:lessonId" element={<LiveStream socket={socket}/>}/>




            </Route>
            

              
  </Route>
              

             
            </Route>

            </Route>



            <Route path="/notifcation">
              <Route index element={<Notication  />} />
              <Route path="add" element={<AddNotifcation />} />
              <Route path="edites/:Idnot" element={<EditNotifcation />} /> 

              <Route path="order/:Idnot">
              <Route index element={<Order/>} />
              <Route path="add" element={<AddOrder />} />
              <Route path="edites/:idorder" element={<EditOrder />} />
            </Route>

            </Route>

            {/* <Route path="/books" element={<Main />} /> */}
            <Route path="/books" >
<Route index element={<Main />} />
<Route path="adde" element={<AddReferance />} />
<Route path="edite/:Idref" element={<EditReferance />} />

            </Route>

        
            <Route path="/profile">
            <Route index element={<Profil />} />
            <Route path="edite/:user" element={<EditProfile/>} />
            </Route>

            {/* <Route path="/chat" element={<Hom />} /> */}
            <Route path="/chat">
            <Route index element={<Hom socket={socket} />}/>
            <Route path="adde" element={<GroupForm />} />
            <Route path="chats/:id/:isGroup" element={<Chat socket={socket}  />} />


            </Route>

  


          

       



            <Route path='/use'>

            <Route index element={<Homee/>} />
            <Route path="/use/profile" element={<Profilee/>} />
            <Route path="/use/profile">
            <Route index element={<Profilee />} />
            <Route path="edite/:user" element={<EditProfileee/>} />
            </Route>
            <Route path="/use/login" element={<Login/>}/>
            <Route path="/use/signup" element={<SignUp/>}/>
            <Route path="/use/parent" element={<Parent/>}/>

            
            <Route  path='/use/about' element={<About/>} />
            <Route  path='/use/live' element={<LiveVideo/>} />
            <Route  path='/use/chat' element={<ChatUse socket={socket}/>} />

            <Route path="/use/chat">
            <Route index element={<ChatUse socket={socket}/>}/>
            <Route path="adde" element={<AddGroupUser />} />
            <Route path="chats/:id/:isGroup" element={<Chatcall socket={socket}  />} />


            </Route>

       
          <Route path="/use/courses">
              <Route index element={<AllClasses />} />
            
              <Route path="section/:Idclass">
              <Route index element={<AllSection />} />

              <Route path="timetable/:Idsection">
              <Route index element={<AllTemplet />} />
            </Route>

            <Route path="lessons/:Idsection">
              <Route index element={<Blog  />} />

              <Route path="mark/:idsubject">
              <Route index element={<AllMarkStudent  />} />
           
              <Route path="one/:usenum/:year" element={<OneMarkStudent />} /> 
            </Route>

            <Route path="quessub/:idsubject">

                  <Route index element={<AllQuestion  />} />
              </Route>


              <Route path="lesson/:idsubject/:IdTeacher">
              <Route index element={<CourseHome  />} />
         



                  <Route path="question/:lessonId">

                        <Route index element={<QuestionLesson  />} />
                  
                  </Route>

                  <Route path="live/:lessonId" element={<LiveVideo socket={socket}/>}/>

            </Route>



      </Route>






              </Route>

            </Route>



          <Route  path='/use/team' element={<Team/>} />
          <Route  path='/use/pricing' element={<Pricing/>} />
          {/* <Route  path='/use/notifcation' element={<Blog/>} /> */}

          <Route path="/use/notifcation">
              <Route index element={<AllNotification />} />

              <Route path="order/:Idnot">
              <Route index element={<OrderStudent  />} />
              <Route path="add" element={<AddOrderStudent />} />
              <Route path="edites/:idorder" element={<EditOrder />} />
            </Route>

            </Route>
            
          <Route  path='/use/contact' element={<Contact/>} />
          {/* <Footer/> */}
            </Route>
        
          </Route>
        </Routes>

  
      </BrowserRouter>

      {/* --------------------------------------------------------- */}

    

    </div>
  );
}

export default App;
