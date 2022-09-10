import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import * as sessionActions from '../../store/session';
import './ProfileButton.css'
import defaultProfile from '../../images/default_profile_image.png'


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const history = useHistory()
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };
    useEffect(() => {
        if (!showMenu) return;
            const closeMenu = () => {
            setShowMenu(false);
        };
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
    };

    const switchAccountHandler = ()=>{
        dispatch(sessionActions.logout());
        history.push('/signin')

    }


    const addDefaultSrc = (ev)=>{
        ev.target.src = defaultProfile
    }



    return (
      <>
        <div className='circlePfImageBtn'onClick={openMenu}>{user?.profileImageUrl ?

        <img  onError={(e)=>addDefaultSrc(e)} className="circlePfImage" src={user?.profileImageUrl}/>

        :
            <i className="fas fa-user-circle topcircleSinginIcon" />}
        </div>
        {showMenu && (
            <div className="profile-dropdown" >
                <div className="dpProfileImgNameContainer">
                    <div className="dropdownImageContainer">{user?.profileImageUrl ?
                       <img onError={(e)=>addDefaultSrc(e)} className="proFileDropdownUserProfileImg" src={user?.profileImageUrl}/>


                       : <i className="fas fa-user-circle dpcircleSinginIcon" />}
                    </div>
                    <p className="dpFirstName">{user?.firstName} {user?.lastName}</p>
                </div>
                {/* <hr className="hr"></hr> */}
                <div className='dropDownVideoLinkContainer' onClick={() => history.push(`/${user?.id}/videos`)}>
                    <i className="fa-regular fa-circle-play dropdownVideoVideosIcon "></i>
                    <p className='drpdownVideoLinks'>Your Videos</p>
                </div>

                <div className="dropDownVideoLinkContainer" onClick={switchAccountHandler}>
                    <i class="fa-solid fa-user-group switchIcon "></i>
                    <p className="drpdownVideoLinks">Switch account</p>
                </div>

                <div className="dropDownVideoLinkContainer" onClick={logout}>
                    <i className="fa-solid fa-arrow-right-to-bracket signOutLogo"></i>
                    <p className="drpdownVideoLinks">Sign Out</p>
                </div>

            </div>
        )}
      </>

    );
}

export default ProfileButton;
