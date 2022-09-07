import { useSelector,useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import * as videoActions from '../store/video'
import * as likeActions from '../store/like'
import { useEffect,useContext,useRef } from "react"
import Comments from './Comments'
import {SideBarContext} from '../context/SideBarContext'
import SideBar from './SideBar'
// import SmallSideBar from './SmallSideBar'
import './SingleVideoPage.css'
import {getSpentTime} from './DateUtils'
import { useHistory } from 'react-router-dom';
import { useState } from "react"

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
    const likeData= useSelector(state => state?.likes)
    const sessionUser = useSelector(state => state.session.user);
    const {id} = useParams()
    const {isSidebar} = useContext(SideBarContext)
    const history = useHistory()
    const videos = useSelector(state => state?.videos?.videos)
    const singlePageVideoTag = useRef(null);
    const [isLiked, setIsLiked] = useState(likeData?.likes?.filter(like => like?.likerId === sessionUser?.id)?.length)
    const [isDisLiked, setIsDisLiked] = useState(likeData?.dislikes?.filter(dislike => dislike?.likerId === sessionUser?.id)?.length)



    useEffect(()=>{
         dispatch(videoActions.getSingleVideoThunkCreator(id))
         const response = dispatch(videoActions.getAllVideosThunkCreator())
         dispatch(likeActions.getAllLikesThunkCreator(id))

    },[dispatch,id])

    useEffect(()=>{
        if(foundVideo && singlePageVideoTag.current){
            singlePageVideoTag.current.load()
        }
    },[foundVideo])

    const videoClickHandler = (video) => {
        history.push(`/video/${video?.id}`)

    }
    useEffect(()=>{
        setIsLiked(likeData?.likes?.filter(like => like?.likerId === sessionUser?.id)?.length)
        setIsDisLiked(likeData?.dislikes?.filter(dislike => dislike?.likerId === sessionUser?.id)?.length)
    },[likeData?.likes,likeData?.dislikes])

    const likeHandler = ()=>{
        if(isLiked){
            dispatch(likeActions.deleteLikeThunkCreator({type:true,videoId:foundVideo?.id}))
        }else{
            if(isDisLiked){
                dispatch(likeActions.editLikeThunkCreator({type:true,videoId:foundVideo?.id}))
            }else{
                dispatch(likeActions.createLikeThunkCreator({type:true,videoId:foundVideo?.id}))
            }

        }
    }

    const disLikeHandler = ()=>{
        if(isDisLiked){
            dispatch(likeActions.deleteLikeThunkCreator({type:false,videoId:foundVideo?.id}))

        }else{
           if(isLiked){
            dispatch(likeActions.editLikeThunkCreator({type:false,videoId:foundVideo?.id}))
           }else{
            dispatch(likeActions.createLikeThunkCreator({type:false,videoId:foundVideo?.id}))
           }
        }

    }
    return(
        <div className={isSidebar ? "singlePageOuterContainer":"singlePageOuterContainerWithoutSidebar"}>
            {isSidebar&& <SideBar /> }


            <div className="singlePageInnerContainer">
                {foundVideo &&
                    <div className="singlePageVideoDesContainer">
                        <div className="singlePageVideoContainer">
                            <video ref={singlePageVideoTag} className='singleVidioTag' controls autoPlay>
                                <source src={foundVideo?.url} type={foundVideo?.type}/>
                                {/* <source src={localVideo[2]} type={foundVideo?.type}/> */}
                            </video>
                        </div>
                        <div className="singlePageTitleViewsContainer">
                            <h3 className="singlePageTitle">{foundVideo?.title}</h3>
                            <div className="viewsAndLikeDislikContainer">
                            <span className="singlePageViews">{foundVideo?.views} views . {new Date(foundVideo?.createdAt)?.toDateString()}</span>
                            <div className="likeDislikeContainer">
                            <div className="likeContainer">
                               {isLiked === 0 && <i onClick={likeHandler} className="fa-regular fa-thumbs-up thumbsUpIcon"></i>}
                               {isLiked !== 0 && <i onClick={likeHandler} className="fa-solid fa-thumbs-up thumbsUpIcon"></i>}
                               <span className='likeCount'>{likeData?.likes?.length}</span>

                            </div>
                            <div className="likeContainer">
                               {isDisLiked === 0 &&<i onClick={disLikeHandler} className="fa-regular fa-thumbs-down thumbsUpIcon"></i>}
                               {isDisLiked !== 0 &&<i onClick={disLikeHandler} className="fa-solid fa-thumbs-down thumbsUpIcon"></i>}
                               <span className='disLikeCount'>{likeData?.dislikes?.length}</span>
                            </div>
                            </div>
                            </div>
                            <hr className="singlepageHr"></hr>
                            <div className="singlePageProfileImageAndNameContainer">
                                {foundVideo?.uploader?.profileImageUrl
                                ?
                                <img className='singlePageProfileImage' src={foundVideo?.uploader?.profileImageUrl}/>:
                                <i className="fas fa-user-circle singlePagecircleSinginIcon" />}

                                <div className="singlePageNameDiscriptionContainer">
                                    <p className="singlePageUseName">{foundVideo?.uploader?.firstName}  {foundVideo?.uploader?.lastName}</p>
                                    <p className="singlePageDiscription">{foundVideo?.description}</p>
                                </div>
                            </div>
                        </div>
                        <hr className="singlepageHr"></hr>
                        <Comments video={foundVideo}/>
                        <hr className="suggestedSinglepageHr"></hr>
                    </div>
                }
                <div>
                {videos?.filter(filVid => foundVideo?.id !== filVid?.id)?.map((vid,i)=>{
                   return(

                    <div key={vid?.id}>


                        <div className="suggestedVidoeImageAndTitleContainer" onClick={()=>videoClickHandler(vid)}>
                            <div className="suggestedVidoeImageContainer">
                                <video  className='suggestedVidioTag' >
                                    <source src={vid?.url} type={vid?.type}/>
                                    {/* <source src={localVideo[i]} type={vid?.type}/> */}
                                </video>
                            </div>
                            <div>
                                <p className="suggestedUserTitleBigScreen"> {vid?.title?.substring(0,50)}{vid?.title?.length > 50 && '...'}</p>
                                <p className="suggestedUserTitleSmallScren"> {vid?.title}</p>
                                <div className="suggestedUserViwesAndCreatedAtContainer">
                                    <p className="suggestedUserViews">{vid?.User?.firstName}{vid?.User?.lastName}</p>
                                    <p className="suggestedUserViews">{vid?.views} views . {getSpentTime(vid?.createdAt)}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    )
                })
                }
                </div>
            </div>
        </div>
    )
}

export default SingleVideoPage
