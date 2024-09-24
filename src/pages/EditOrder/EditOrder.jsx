// import './addOrder.scss'
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { useParams } from 'react-router-dom';

const EditOrder = () => {
const {idorder , Idnot} =useParams()

return (

    <div className='home'>
    <Sidebar />
    <div className='cantana'>
    <Navbar />
    
    
    <div className='addstudent'>
    <h2>Edit Order</h2>


    <div className='gtr'>

    <p>Height student</p>
    <input type="text" className='tgr' />
    <p>weight student</p>
    <input type="text" className='tgr' />
  

    </div>
    <button>Edit</button>
    </div>
    
    </div>
</div>
);
};

export default EditOrder;