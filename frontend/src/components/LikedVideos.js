import FlatVideoCard from './FlatVideoCard'

import { useSelector,useDispatch } from "react-redux"
import SideBar from './SideBar'
import './SearchedVideos.css'
import {SideBarContext} from '../context/SideBarContext'
import SmallSideBar from './SmallSideBar'
import { useContext, useEffect} from 'react'
import * as videoActions from '../store/video'

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
            if( likes[j]?.likerId === sessionUser?.id){
                likdeVideos.push(videos[i])
            }
        }
    }

 return (
        <div className={isSidebar ?'searchedVideoOuterContainerWithSidebar':'searchedVideoOuterContainerWithSmallSidebar'}>
            {isSidebar? <SideBar />  : <SmallSideBar/>}
            <div className='searchedVideoAndUserInfoContainer'>
                <div  className={isSidebar ? 'searchedVideoContainer':'searchedVideoContainerWithSmallSidebar'}>
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
                    {sessionUser?.profileImageUrl ? <img className="userYourVideosProfileImg" src={sessionUser?.profileImageUrl} />:
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