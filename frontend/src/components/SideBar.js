import { NavLink, useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import {useSelector} from 'react-redux'



import './SideBar.css'
function SideBar(){
    const location = useLocation();
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    return(
        <div className="sideBar">
            <div className='sidebarLinkContainer' onClick={() => history.push('/')}>

                <i className={location?.pathname ==='/'? 'fa-solid fa-house sideiconActive':"fa-solid fa-house sidebarhomeIcon"}></i>
                <p className='sidebarLinks'>Home</p>

            </div>

            {/* <div className='sidebarLinkContainer' onClick={() => history.push('/explore')}>
               <i className= {location?.pathname ==='/explore'? "fa-regular fa-compass sideiconActive"
                :"fa-regular fa-compass sidebarexplorerIcon"}></i>
                 <p className='sidebarLinks'>Explore</p>


            </div> */}

            {/* <div className='sidebarLinkContainer' onClick={() => history.push('/subscription')}>

                    <i className={location?.pathname ==='/subscription'?"fa-brands fa-square-youtube sideiconActive"
                :"fa-brands fa-square-youtube sidebarsubscriptionsIcon"}></i>

                 <p className='sidebarLinks'>Subscriptions</p>

            </div> */}

            {/* <div className='sidebarLinkContainer' onClick={() => history.push('/library')}>
                <i className={location?.pathname === '/library'?"fa-solid fa-photo-film sideiconActive"
                :"fa-solid fa-photo-film sidebarlibraryIcon"}></i>
                 <p className='sidebarLinks'>Library</p>
            </div> */}

            {sessionUser?.id && <div className='sidebarLinkContainer' onClick={() => history.push(`/${sessionUser?.id}/videos`)}>

                    <i className={location?.pathname === `/${sessionUser?.id}/videos`?"fa-regular fa-circle-play sideiconActive":
                    "fa-regular fa-circle-play ssidebarhomeIcon "}>
                </i>
               <p className='sidebarLinks'>Your Videos</p>
            </div>}

            {sessionUser?.id && <div className='sidebarLinkContainer' onClick={() => history.push(`/${sessionUser?.id}/likedvideos`)}>

                <i className={location?.pathname === `/${sessionUser?.id}/likedvideos`?"fa-solid fa-thumbs-up  sideiconActive":
                "fa-solid fa-thumbs-up  sidebarhomeIcon "}>
                </i>
                <p className='sidebarLinks'>Liked Videos</p>
            </div>}

        </div>
    )
}

export default SideBar
