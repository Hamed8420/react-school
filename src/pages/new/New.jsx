import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}  </h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
               
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
   {/* <div className="formInput">
   <label htmlFor="file">Image:<DriveFolderUploadOutlinedIcon className="icon"/></label>
              <input type="file" id="file" style={{display:'none'}}/>
   </div>

   <div className="formInput">
   <label>Username</label>
              <input type="text" placeholder="john-doe"/>
   </div>

   <div className="formInput">
   <label>name and surname</label>
              <input type="text" placeholder="Jogn Doe"/>
   </div>
   <div className="formInput">
   <label>Email</label>
              <input type="email" placeholder="john-doe@gmail.com"/>
   </div>
   <div className="formInput">
   <label>phone</label>
              <input type="text" placeholder="+963 982831811"/>
   </div>
   <div className="formInput">
   <label>password</label>
              <input type="password" placeholder="12345678"/>
   </div>  

    <div className="formInput">
   <label>Adress</label>
              <input type="text" placeholder="Allepo furkan sakan"/>
   </div>

   <div className="formInput">
   <label>Country</label>
              <input type="text" placeholder="Syria"/>
   </div> */}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
