import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './index.css'
import CreateVideoFormModal from '../CreateVideoPage';
import logo from '../../videos/logo.png'
import {SideBarContext} from '../../context/SideBarContext'
import { useContext } from 'react';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const {setSidebar} = useContext(SideBarContext)

  console.log(setSidebar)
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profileBtnAndCreateVideoBtnContainer'>
        <CreateVideoFormModal />
        <ProfileButton user={sessionUser} />


      </div>
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        <NavLink to="/signin">Sign In</NavLink>

      </>
    );
  }

  return (
    <div className='navBar'>
      {/* <li> */}
        {/* <NavLink  className='utubeHomeLink' exact to="/"><i className="fa-brands fa-youtube utubeHomeIcon"></i>UTube</NavLink> */}
        <div className='logoBarIconContainer'>
          <i className="fa-solid fa-bars barIcon" onClick={()=>setSidebar((prev)=> !prev)}></i>
          <NavLink   exact to="/"><img className='logo' src= {logo} /></NavLink>
        </div>

          <form className='searchForm'>
            <input className='searchBar' placeholder='Search coming soon...'type='text'></input>
            <button className='submmitSearchbtn' disabled={true}><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>

        {isLoaded && sessionLinks}
      {/* </li> */}
    </div>
  );
}

export default Navigation;
