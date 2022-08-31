import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './ProfileButton.css'



function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
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
    };
    return (
      <>
        <div className='circlePfImageBtn'onClick={openMenu}>{user?.profileImageUrl ? <img className="circlePfImage" src={user?.profileImageUrl}/>:
        <i className="fas fa-user-circle" />}</div>
        {showMenu && (
              <div className="profile-dropdown">
                  <div className="dpProfileImgNameContainer">
                      <div><img className="proFileDropdownUserProfileImg" src={user?.profileImageUrl} /></div>
                      <p className="dpFirstName">{user.email}</p>
                  </div>
                  <hr className="hr"></hr>
                  <button className="signOutBtn" onClick={logout}><i className="fa-solid fa-arrow-right-to-bracket signOutLogo"></i> Sign Out</button>
              </div>
        )}
      </>
    );
}

export default ProfileButton;
