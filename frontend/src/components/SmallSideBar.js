import { NavLink, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import './SmallSideBar.css'
function SmallSideBar(){
    const location = useLocation();
    console.log(location.pathname)
    return(
        <div className="SmallSideBar">
            <div className='linkContainer'>
                <NavLink  to={'/'}>
                <i className={location?.pathname ==='/'? 'fa-solid fa-house iconActive':"fa-solid fa-house homeIcon"}></i></NavLink>
                <p className='smallSidebarLinks'>Home</p>

            </div>

            <div className='linkContainer'>
                <NavLink  to={'/explore'}><i className= {location?.pathname ==='/explore'? "fa-regular fa-compass iconActive"
                :"fa-regular fa-compass explorerIcon"}></i></NavLink>
                <p className='smallSidebarLinks'>Explore</p>

            </div>
            <div className='linkContainer'>
                <NavLink  to={'/subscription'}><i className={location?.pathname ==='/subscription'?"fa-brands fa-square-youtube iconActive"
                :"fa-brands fa-square-youtube subscriptionsIcon"}></i></NavLink>
                    <p className='smallSidebarLinks subscription'>Subscriptions</p>

            </div>
            <div className='linkContainer'>
                <NavLink  className='smallSidebarLinks' to={'/library'}><i className={location?.pathname === '/library'?"fa-solid fa-photo-film iconActive"
                :"fa-solid fa-photo-film libraryIcon"}></i></NavLink>
                    <p className='smallSidebarLinks'>Library</p>

            </div>


        </div>
    )
}

export default SmallSideBar
