import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../../redux/features/userSlide';
import ImageSlider from '../Slider/ImageSlider';
import { SliderData } from '../Slider/SliderData';
import './StudentASideBar.css' ;
import logo from './logo4.png'

const StudentASideBar = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const handleLogout =(e) => {
      e.preventDefault();

      dispatch(logout())
      window.location.href='/login';

  }
    return (

        <div class="sidebar-container">
      <div class="sidebar-logo">
      <img src={logo} className="logoNav"/>
      </div>
      <ul class="sidebar-navigation">
        <li>
          <Link to ='/'>
          <i class="bi bi-house-door icon" ></i> Home
          </Link>
        </li>
        
        <li>
          <Link to='/profil'>
          <i class="bi bi-person icon"></i> Profil
          </Link>
        </li>
        <li>
          <Link to='/addclaim'>
          <i class="bi bi-file-earmark-plus icon"></i> Add Claim
          </Link>
        </li>
        <li >
          <Link to ='/claimlist'>
          <i class="bi bi-files icon" ></i> My Claims
          </Link>
        </li>
        <li class="btm">
         <button class="btnLogout" onClick={(e) => handleLogout(e)}><i class="bi bi-box-arrow-left icon" ></i> Logout</button>  
        </li>
      </ul>
      
    </div>
    )
}

export default StudentASideBar;
