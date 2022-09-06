import FlatVideoCard from './FlatVideoCard'
import { useLocation } from "react-router-dom";
import SideBar from './SideBar'
import './SearchedVideos.css'
import {SideBarContext} from '../context/SideBarContext'
import SmallSideBar from './SmallSideBar'
import { useContext} from 'react'

function SearchedVideos(){
    let location = useLocation();
    let serchedVideos=location.state.searchVideo;
    const {isSidebar} = useContext(SideBarContext)

 return (
        <div className={isSidebar ?'searchedVideoOuterContainerWithSidebar':'searchedVideoOuterContainerWithSmallSidebar'}>
            {isSidebar? <SideBar />  : <SmallSideBar/>}
            <div className='searchedVideoAndUserInfoContainer'>
                <div  className={isSidebar ? 'searchedVideoContainer':'searchedVideoContainerWithSmallSidebar'}>
                    {serchedVideos?.length === 0 && <h2>No videos found..........</h2>}
                    {serchedVideos?.length !== 0 && serchedVideos?.map((video,i) => {
                        return(
                            <FlatVideoCard video={video} />
                        )
                    })}
                </div>
            </div>
            <div></div>
        </div>
    )
}


export default SearchedVideos
