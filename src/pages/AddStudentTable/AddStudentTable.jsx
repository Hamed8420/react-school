import './addStudentTable.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';

const AddStudfentTable = () => {


return (

    <div className='home'>
    <Sidebar />
    <div className='cantana'>
    <Navbar />
    
    
    <div className='addstudent'>
    <h2>Add Student Number</h2>

    <div className='lessonEdit'>
    <input type="file" id="file-input" multiple/>

    <label for="file-input">
    Choose File
</label>

    </div>

    <div className='gtr'>
   <div>
   <p>Name student</p>
    <input type="text" className='tgr' />
   </div>
    <p>english</p>
    <input type="text" className='tgr' />
    <p>math</p>
    <input type="text" className='tgr' />
    <p>physik</p>
    <input type="text" className='tgr' />
    <p>history</p>
    <input type="text" className='tgr' />
    <p>gyographic</p>
    <input type="text" className='tgr' />

    </div>
    <button>ADD</button>
    </div>
    
    </div>
</div>
);
};

export default AddStudfentTable;