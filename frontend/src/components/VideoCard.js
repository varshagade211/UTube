
import img from '../videos/download-23.jpg'
import {useSelector} from 'react-redux'
import './VideoCard.css'
import { useState } from 'react'


function VideoCard({video,localVideo}) {
    const sessionUser = useSelector(state => state.session.user);


    const playHandler = (target) => {
        target.currentTime = 0;
        target.play()
    }
    const pauseHandler = (target)=> {
        target.load()
        //target.pause()
    }
    return(
    <div>

        <div className='vidioInfoContainer'>
            <div className='vidioTagContainer'>
             <video onMouseEnter={(e)=>playHandler(e.target)} onMouseLeave={(e)=>pauseHandler(e.target)} className='vidioTag'  muted playsInline >
                {/* <source src={video?.url} type="video/mp4"/> */}
                <source src={localVideo} type="video/mp4"/>
            </video>

            </div>
            <div>
                <div className='imgAndDescriptionContainer'>
                    <div className='profileImageContainer'>  {sessionUser && <img className='userProfileImg' src={sessionUser?.profileImageUrl}/>} </div>
                    <div>
                        <h5 className='vidDiscription'>{video?.description}</h5>
                        <div className='viewsAndNameContainer'>
                            <h6 className='vidUserName'>{sessionUser?.firstName} </h6>
                            <h6 className='vidViwes'>{video?.views} views</h6>
                        </div>

                    </div>
                </div>
            </div>
            {/* <div>
                {video?.Comments?.map((comment)=>{
                    return (<p>{comment?.comment}</p>)
                })}
            </div> */}


         </div>
        </div>
    )
}

export default VideoCard
