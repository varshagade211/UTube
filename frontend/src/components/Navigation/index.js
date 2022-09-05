import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './index.css'
import CreateVideoFormModal from '../CreateVideoPage';
import logo from '../../images/logo.png'
import {SideBarContext} from '../../context/SideBarContext'
import { useContext } from 'react';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const {setSidebar} = useContext(SideBarContext)
  const history = useHistory()

  const signInHandler = ()=> {
    history.push("/signin")

  }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profileBtnAndCreateVideoBtnContainer'>
        <CreateVideoFormModal />

        <a href={"https://github.com/varshagade211"} > <i className="fa-brands fa-github gitHubIcon"></i> </a>

       <a  href={"https://www.linkedin.com/in/varsha-gade-7b33aa174/"}>
       <i className="fa-brands fa-linkedin linkeInIcon"></i></a>


        {/* <CreateVideoFormModal /> */}
        <ProfileButton user={sessionUser} />


      </div>
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
       <div className='signinBtnContainer'>

       <a href={"https://github.com/varshagade211"} ><i className="fa-brands fa-github gitHubIcon"></i> </a>

       <a  href={"https://www.linkedin.com/in/varsha-gade-7b33aa174/"}>
       <i className="fa-brands fa-linkedin linkeInIcon"></i></a>




       <button className='signInBtn' onClick={signInHandler}><i className="fas fa-user-circle signInCircleIcon" /> SIGN IN</button></div>

      </>
    );
  }
  const onSearchSubmit = (e) =>{
    e.preventDefault()
    history.push('/')

  }

  return (
    <div className='navBar'>
      {/* <li> */}
        {/* <NavLink  className='utubeHomeLink' exact to="/"><i className="fa-brands fa-youtube utubeHomeIcon"></i>UTube</NavLink> */}
        <div className='logoBarIconContainer'>
          <i className="fa-solid fa-bars barIcon" onClick={()=>setSidebar((prev)=> !prev)}></i>
          <NavLink   exact to="/"><img className='logo' src= {logo} /></NavLink>
        </div>

          <form className='searchForm' onSubmit={(e)=> onSearchSubmit(e)}>
            <input className='searchBar' placeholder='Search coming soon...'type='text'></input>
            <button className='submmitSearchbtn' ><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>

        {isLoaded && sessionLinks}
      {/* </li> */}
    </div>
  );
}

export default Navigation;
