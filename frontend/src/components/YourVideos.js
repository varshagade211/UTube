import {useDispatch,useSelector} from 'react-redux'
import { useEffect, useContext} from 'react'
import * as videoActions from '../store/video'
import FlatVideoCard from './FlatVideoCard'
import SideBar from './SideBar'
import './YourVideos.css'
import {SideBarContext} from '../context/SideBarContext'
import SmallSideBar from './SmallSideBar'
import { Modal ,isModalOnContext} from '../context/Modal';

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
function YourVideos () {
    const dispatch = useDispatch()
    const videos = useSelector(state => state?.videos?.videos)
    const sessionUser = useSelector(state => state.session.user);
    const {isSidebar} = useContext(SideBarContext)
    // const {isModalOpen,setIsModalOpen} = useContext(isModalOnContext)
    // useEffect(()=>{


    // },[isModalOpen])

    useEffect(()=>{
        const response = dispatch(videoActions.getAllVideosThunkCreator())

    },[dispatch])
    const userVideo = []
    videos?.forEach((vid)=>{
        if(vid?.uploaderId === sessionUser?.id ){
            userVideo.push(vid)
        }
    })
    return (

        <div className={isSidebar ?'userVideoOuterContainerWithSidebar':'userVideoOuterContainerWithSmallSidebar'}>
            {isSidebar? <SideBar />  : <SmallSideBar/>}
            <div className='yourVideoAndUserInfoContainer'>


            <div  className={isSidebar ? 'userVideoContainer':'userVideoContainerWithSmallSidebar'}>
            {userVideo?.length === 0 && <h2>No videos created yet, Please create some videos..........</h2>}
            {userVideo?.length !== 0 && userVideo?.map((video,i) => {
                return(
                    <FlatVideoCard video={video} type={"yourVideos"} />
                    // <FlatVideoCard video={video} localVideo={localVideo[i]} />
                    )
            })}


            </div>
            <div className='userVideosInfo'>
                <div className='yourVideoImageProfileIconContainer'>
                    <div className='yourVideoProfileContainer'>
                    {sessionUser?.profileImageUrl ? <img className="userYourVideosProfileImg" src={sessionUser?.profileImageUrl} />:
                      <i className="fas fa-user-circle yourVidcircleSinginIcon" />
                    }
                    <p>{sessionUser?.firstName} {sessionUser?.lastName}</p>

                    </div>
                    <div className='yourVideoUloadCound'>
                    <p className='uploadCount'>Uploads</p>
                    <p className='uploadCount'>{userVideo?.length}</p>
                    </div>


                </div>
            </div>
        </div>
    </div>

    )
}


export default YourVideos
