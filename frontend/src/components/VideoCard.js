
import {useSelector} from 'react-redux'
import './VideoCard.css'
import { useHistory } from 'react-router-dom';
import {getSpentTime} from './DateUtils'
import { useRef,useEffect,useState } from 'react';
import defaultProfile from '../images/default_profile_image.png'
import default_video from '../images/default_video.mp4'
// import thumbNail from '../images/default_thambnail.jpeg'
// function VideoCard({video,localVideo}) {
function VideoCard({video}) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const videoCardVideoTag = useRef(null);
    const videScourceTag = useRef(null);
    const [isOnErrorReload, setIsOnErrorReload] = useState(0)
    const playHandler = (target) => {
        // target.currentTime = 0;
        // target.play();
    }

    const pauseHandler = (target)=> {
        // target.load()
        // target.pause();
    }

    const videoClickHandler = () => {
        history.push(`/video/${video?.id}`)
    }

    useEffect(() => {
        // console.log('inside useEffect video', video)
        // console.log('inside useEffect videoCardVideoTag', videoCardVideoTag)
        if(video && videoCardVideoTag.current){
            videoCardVideoTag.current.load()
        }
    },[video, videoCardVideoTag])



    const addDefaultSrc = (ev)=>{
        ev.target.src = defaultProfile
    }
     // =======================================================
    const onerrorHandler = (e) => {

        if(isOnErrorReload < 2){

            setTimeout(()=>{
                // console.log('video url',e?.target?.src)
                // console.log('source',videScourceTag?.current?.src )
                // videScourceTag.current.src = e?.target?.src
                videScourceTag?.current?.setAttribute('src', e?.target?.src);
                videoCardVideoTag?.current?.load()
                setIsOnErrorReload(prev => prev +1)
                // console.log(videoCardVideoTag?.current)
                // console.log(isOnErrorReload)
                // console.log('isOnErrorReload',isOnErrorReload )
            },1000)

        }
        // else{
        //     videScourceTag.current.setAttribute('src', default_video );
        //     videoCardVideoTag?.current.load()
        // }

    }
    // =======================================================

    return(
    <div>

        <div className='vidioInfoContainer'>
            <div className='vidioTagContainer'>
             <video onError={onerrorHandler} ref={videoCardVideoTag} onClick={videoClickHandler}  onMouseEnter={(e)=>playHandler(e.target)} onMouseLeave={(e)=>pauseHandler(e.target)} className='vidioTag'  muted playsInline >
                  <source ref={videScourceTag} src={video?.url} type={video?.type}/>
                {/* <source src={localVideo} type={video?.type}/> */}
            </video>

            </div>
            <div>
                <div className='imgAndDescriptionContainer'>
                    <div className='profileImageContainer'>
                     {video?.uploader?.profileImageUrl
                        ?

                            <img   onError={(e)=>addDefaultSrc(e)} className='userProfileImg' src={video?.uploader?.profileImageUrl}/>

                        : <i className="fas fa-user-circle userSeedProfileIcon" />
                     } </div>

                    <div>
                        <div className="homeDescriptionContainer">
                             <h3 className='vidDiscription'>
                                {video?.title}
                                </h3>
                             </div>
                        <div className='viewsAndNameContainer'>
                            <p className='vidUserName'>{video?.uploader?.firstName} {video?.uploader?.lastName} </p>
                            <p className='vidViwes'>{video?.views} views . {getSpentTime(video?.createdAt)}</p>

                        </div>

                    </div>
                </div>
            </div>

         </div>
        </div>
    )
}

export default VideoCard
