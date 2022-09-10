import FlatVideoCard from './FlatVideoCard'

import { useSelector,useDispatch } from "react-redux"
import SideBar from './SideBar'
import './YourVideos.css'
import {SideBarContext} from '../context/SideBarContext'
import SmallSideBar from './SmallSideBar'
import { useContext, useEffect} from 'react'
import * as videoActions from '../store/video'
import defaultProfile from '../images/default_profile_image.png'
function LikeddVideos(){

    const {isSidebar} = useContext(SideBarContext)
    const videos = useSelector(state => state?.videos?.videos)
    const sessionUser = useSelector(state => state?.session?.user);
    const dispatch = useDispatch()

    useEffect(()=>{
        const response = dispatch(videoActions.getAllVideosThunkCreator())

   },[dispatch])

    let likdeVideos = []
    for(let i=0; i<videos?.length; i++){
        let likes = videos[i]?.Likes
        for(let j=0; j<likes?.length; j++){
            if( likes[j]?.likerId === sessionUser?.id && likes[j]?.type === true){
                likdeVideos.push(videos[i])
            }
        }
    }

    const addDefaultSrc = (ev)=>{
        ev.target.src = defaultProfile
      }



 return (
        <div className={isSidebar ?'userVideoOuterContainerWithSidebar':'userVideoOuterContainerWithSmallSidebar'}>
            {isSidebar? <SideBar />  : <SmallSideBar/>}
            <div className='yourVideoAndUserInfoContainer'>
                <div  className={isSidebar ? 'userVideoContainer':'userVideoContainerWithSmallSidebar'}>
                    {likdeVideos?.length === 0 && <h2>No liked videos yet..........</h2>}
                    {likdeVideos?.length !== 0 && likdeVideos?.map((video,i) => {
                        return(
                            <FlatVideoCard video={video} type={"likeddVideos"}/>
                        )
                    })}
                </div>
               <div className='userVideosInfo'>
                <div className='yourVideoImageProfileIconContainer'>
                    <div className='yourVideoProfileContainer'>
                    {sessionUser?.profileImageUrl ?

                      <img onError={(e)=>addDefaultSrc(e)} className="userYourVideosProfileImg" src={sessionUser?.profileImageUrl} />
                    :
                      <i className="fas fa-user-circle yourVidcircleSinginIcon" />
                    }
                    <p>{sessionUser?.firstName} {sessionUser?.lastName}</p>

                    </div>
                    <div className='yourVideoUloadCound'>
                    <p className='uploadCount'>Liked Videos</p>
                    <p className='uploadCount'>{likdeVideos?.length}</p>
                    </div>


                </div>
            </div>
            </div>

        </div>
    )
}


export default LikeddVideos
