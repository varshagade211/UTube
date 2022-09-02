
import {useSelector} from 'react-redux'
import './VideoCard.css'
import { useHistory } from 'react-router-dom';

// function VideoCard({video,localVideo}) {
function VideoCard({video}) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()

    const playHandler = (target) => {
            target.currentTime = 0;
            target.play();
    }

    const pauseHandler = (target)=> {
        target.load()
    }

    const videoClickHandler = () => {
        history.push(`/video/${video?.id}/`)
    }
    return(
    <div>

        <div className='vidioInfoContainer'>
            <div className='vidioTagContainer'>
             <video onClick={videoClickHandler} onMouseEnter={(e)=>playHandler(e.target)} onMouseLeave={(e)=>pauseHandler(e.target)} className='vidioTag'  muted playsInline >
                <source src={video?.url} type={video?.type}/>
                {/* <source src={localVideo} type={video?.type}/> */}
            </video>

            </div>
            <div>
                <div className='imgAndDescriptionContainer'>
                    <div className='profileImageContainer'>  {sessionUser && <img className='userProfileImg' src={sessionUser?.profileImageUrl}/>} </div>

                    <div>
                        <div className="homeDescriptionContainer"> <h3 className='vidDiscription'>{video?.title}</h3> </div>
                        <div className='viewsAndNameContainer'>
                            <p className='vidUserName'>{sessionUser?.firstName} </p>
                            <p className='vidViwes'>{video?.views} views</p>
                        </div>

                    </div>
                </div>
            </div>

         </div>
        </div>
    )
}

export default VideoCard
