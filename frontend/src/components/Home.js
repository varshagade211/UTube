import {useDispatch,useSelector} from 'react-redux'
import { useEffect, useState ,useContext} from 'react'
import * as videoActions from '../store/video'
import VideoCard from './VideoCard'
import SideBar from './SideBar'
import './Home.css'
import {SideBarContext} from '../context/SideBarContext'
import SmallSideBar from './SmallSideBar'
// video files
// import vid1 from '../videos/videoplayback.mp4'
// import vid2 from '../videos/Amazing_Kingfisher.mp4'
// import vid3 from '../videos/Best_nature_sunrise.mp4'
// import vid4 from '../videos/Epiphyllum_time_lapse.mp4'
// import vid5 from '../videos/Extraordinary_Creatures_wild_africa.mp4'
// import vid6 from '../videos/FLOWERS_CAN_DANCE.mp4'
// import vid7 from '../videos/London_water_lily.mp4'
// import vid8 from '../videos/Nature_love.mp4'
// import vid9 from '../videos/Nature_video.mp4'
// import vid10 from '../videos/nature.mp4'
// import vid11 from '../videos/Relaxing_Rain_Music.mp4'
// import vid12 from '../videos/Water_falls_nature.mp4'
// import vid13 from '../videos/Wild_life.mp4'

// const localVideo = [vid1,vid2,vid3,vid4,vid5,vid6,vid7,vid8,vid9,vid10,vid11,vid12]
function Home () {
    const dispatch = useDispatch()
    const videos = useSelector(state => state?.videos?.videos)
    const {isSidebar} = useContext(SideBarContext)

    useEffect(()=>{

        const response = dispatch(videoActions.getAllVideosThunkCreator())

    },[dispatch])
    
    return (
        <div className={isSidebar?'homePageOuterContainer':"oncloseSidebar"}>
            {isSidebar? <SideBar />  : <SmallSideBar/>}
            <div className='homeVideoContainer'>
                {!videos.length && <h2>No videos created yet, Please create some videos..........</h2>}
                {videos.length && videos?.map((video,i) => {
                    return(
                        // <VideoCard video={video} localVideo={localVideo[i]} />
                        <VideoCard video={video} />
                    )
                })}
            </div>
        </div>
    )
}


export default Home
