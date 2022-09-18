
import { useSelector,useDispatch } from "react-redux"
import SideBar from './SideBar'
import './YourVideos.css'
import {SideBarContext} from '../context/SideBarContext'
import SmallSideBar from './SmallSideBar'
import { useContext, useEffect} from 'react'
import * as videoActions from '../store/video'
import * as subscribeActions from '../store/subscribe'
import VideoCard from './VideoCard'


function Subscription(){

    const {isSidebar} = useContext(SideBarContext)
    const videos = useSelector(state => state?.videos?.videos)
    const subscribeData= useSelector(state => state?.subscribe?.subscribee)
    const dispatch = useDispatch()

    useEffect(()=>{
        const response = dispatch(videoActions.getAllVideosThunkCreator())
        dispatch(subscribeActions.getAllSubscribeeThunk())

   },[dispatch])

    let subscribedVideo = []
    subscribeData.forEach(subscribee => {
        videos.forEach(video => {
            if( video?.uploaderId === subscribee?.id){
                subscribedVideo.push(video)
            }
        })

    });

return (
    <div className={isSidebar?'homePageOuterContainer':"oncloseSidebar"}>
      {isSidebar? <SideBar />  : <SmallSideBar/>}

        <div className='homeVideoContainer'>
            {subscribedVideo.length === 0 && <h2>No subscribed videos yet, Please subscribe ..........</h2>}
            {subscribedVideo.length !== 0 && subscribedVideo?.map((video,i) => {
                return(
                    // <VideoCard video={video} localVideo={localVideo[i]} />
                    <VideoCard video={video} />
                )
            })}
        </div>
    </div>
)
}


export default Subscription
