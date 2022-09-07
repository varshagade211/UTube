import { NavLink, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

import './SmallSideBar.css'
function SmallSideBar(){
    const location = useLocation();
    const history = useHistory()
    return(
        <div className="SmallSideBar">
            <div className='linkContainer' onClick={() => history.push('/')}>

                <i className={location?.pathname ==='/'? 'fa-solid fa-house iconActive':"fa-solid fa-house homeIcon"}></i>
                <p className='smallSidebarLinks'>Home</p>

            </div>

            {/* <div className='linkContainer' onClick={() => history.push('/explore')}>
            <i className= {location?.pathname ==='/explore'? "fa-regular fa-compass iconActive"
                :"fa-regular fa-compass explorerIcon"}></i>
                <p className='smallSidebarLinks'>Explore</p>

            </div> */}
            {/* <div className='linkContainer' onClick={() => history.push('/subscription')}>

                    <i className={location?.pathname ==='/subscription'?"fa-brands fa-square-youtube iconActive"
                :"fa-brands fa-square-youtube subscriptionsIcon"}></i>

                    <p className='smallSidebarLinks '>Subscriptions</p>

            </div> */}
            {/* <div className='linkContainer' onClick={() => history.push('/library')}>
              <i className={location?.pathname === '/library'?"fa-solid fa-photo-film iconActive"
                :"fa-solid fa-photo-film libraryIcon"}></i>
                    <p className='smallSidebarLinks'>Library</p>

            </div> */}


        </div>
    )
}

export default SmallSideBar
