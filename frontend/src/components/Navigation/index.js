import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import './index.css'
import CreateVideoFormModal from '../CreateVideoPage';
import logo from '../../images/logo.png'
import {SideBarContext} from '../../context/SideBarContext'
import { useContext } from 'react';
import * as videoActions from '../../store/video'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const {setSidebar} = useContext(SideBarContext)
  const history = useHistory()
  const [searchResult, setSurchResult] = useState('')
  const [isSmallscreenForm, setSmallScreenForm] = useState(false)
  const videos = useSelector(state => state?.videos?.videos)
  const dispatch = useDispatch()

  useEffect(()=>{
    const response = dispatch(videoActions.getAllVideosThunkCreator())
  },[dispatch])

  const signInHandler = ()=> {
    history.push("/signin")

  }
  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='profileBtnAndCreateVideoBtnContainer'>
         <i class="fa-solid fa-magnifying-glass smallScreenSearchIcon" onClick={()=>setSmallScreenForm(prev => !prev)} ></i>
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
       <i class="fa-solid fa-magnifying-glass smallScreenSearchIcon" onClick={()=>setSmallScreenForm(prev => !prev)} ></i>

       <a href={"https://github.com/varshagade211"} ><i className="fa-brands fa-github gitHubIcon"></i> </a>

       <a  href={"https://www.linkedin.com/in/varsha-gade-7b33aa174/"}>
       <i className="fa-brands fa-linkedin linkeInIcon"></i></a>




       <button className='signInBtn' onClick={signInHandler}><i className="fas fa-user-circle signInCircleIcon" /> SIGN IN</button></div>

      </>
    );
  }
  const onSearchSubmit = (e) =>{
    e.preventDefault()
    if(!searchResult?.length){
        return
    }
    let matchedVideos=[]
    let  result = searchResult.toLowerCase().split(' ')
    for(let i = 0; i < videos.length; i++) {
      let words = videos[i].title.toLowerCase().split(' ')

      for(let j = 0; j < result.length; j++) {

        if (result[i] === '') continue
        let matched = false
        for(let k = 0; k < words.length; k++) {
          if(words[k] === '') continue

          if(words[k].startsWith(result[j])) {
            matchedVideos.push(videos[i])
            matched = true
            break
          }
        }
        if (matched) break
      }
    }

    history.push('/search/videos',{searchVideo :matchedVideos})
  }

  return (
    <div>
    <div className='navBar'>
      {/* <li> */}
        {/* <NavLink  className='utubeHomeLink' exact to="/"><i className="fa-brands fa-youtube utubeHomeIcon"></i>UTube</NavLink> */}
        <div className='logoBarIconContainer'>

          <i className="fa-solid fa-bars barIcon" onClick={()=>setSidebar((prev)=> !prev)}></i>
          <NavLink   exact to="/"><img className='logo' src= {logo} /></NavLink>
        </div>

          <form className='searchForm' onSubmit={(e)=> onSearchSubmit(e)}>
            <input className='searchBar' value={searchResult} onChange={(e)=>setSurchResult(e.target.value)} placeholder='Search' type='text'></input>
            <button className='submmitSearchbtn' ><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>

        {isLoaded && sessionLinks}

      {/* </li> */}
    </div>
    {isSmallscreenForm && <div  className='smallScreenSearchFormConatiner'>

    <form className='smallScreenSearchForm' onSubmit={(e)=> onSearchSubmit(e)}>

            <input className='smallScreenSearchBar' value={searchResult} onChange={(e)=>setSurchResult(e.target.value)} placeholder='Search' type='text'></input>
            <button className='smallScreenSubmmitSearchbtn' ><i className="fa-solid fa-magnifying-glass"></i></button>
          </form>





    </div>}

    </div>

  );
}

export default Navigation;
