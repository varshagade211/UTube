import { useSelector,useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import * as videoActions from '../store/video'
import { useEffect,useContext } from "react"
import Comments from './Comments'
import {SideBarContext} from '../context/SideBarContext'
import SideBar from './SideBar'
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

// const localVideo = [vid1,vid2,vid3,vid4,vid5,vid6,vid7,vid8,vid9,vid10,vid11,vid12]

function SingleVideoPage(){
    const dispatch = useDispatch()
    const foundVideo = useSelector(state => state?.videos?.singleVideo)
    const {id} = useParams()
    const {isSidebar} = useContext(SideBarContext)

    useEffect(()=>{
        const response = dispatch(videoActions.getSingleVideoThunkCreator(id))
    },[dispatch])


    return(
        <div>
            {isSidebar? <SideBar />  : <SmallSideBar/>}
            {foundVideo &&
            <div>
                <video className='vidioTag' controls autoPlay>
                    <source src={foundVideo?.url} type={foundVideo?.type}/>

                    {/* <source src={localVideo[foundVideo?.id]} type={foundVideo?.type}/> */}
                </video>
                <h3>{foundVideo?.title}</h3>
                <p>{foundVideo?.views} views</p>
                <hr className="hr"></hr>
                <div>
                    {foundVideo?.uploader?.profileImageUrl ?<img src={foundVideo?.uploader?.profileImageUrl}/>:
                      <i className="fas fa-user-circle topcircleSinginIcon" />}
                    <p>{foundVideo?.uploader?.firstName}</p>
                </div>
                <div>
                    <p>About The Show:</p>
                    <h3>{foundVideo?.description}</h3>

                </div>

                 <hr className="hr"></hr>
                <Comments video={foundVideo}/>
            </div>
            }
        </div>
    )
}

export default SingleVideoPage
