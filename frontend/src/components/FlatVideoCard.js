
import { useState,useRef } from 'react';
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import EditVideoFormModal from '../components/EditVideoPage';
import DeleteVideoFormModal from './DeleteModalPage';
import {getSpentTime} from './DateUtils'
import './FlatVideoCard.css'

// function FlatVideoCard({video,localVideo}) {
function FlatVideoCard({video}) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const [showDelete, setShowDelete] = useState(false)
    const flatVideCardVideoTag = useRef(null);

    const videoClickHandler = () => {
        history.push(`/video/${video?.id}/`)
    }

    const editDeleteDropdown = () => {
        setShowDelete((prev)=> !prev)
    }
    useEffect(() => {
        if(flatVideCardVideoTag.current){
            flatVideCardVideoTag.current.load()
        }
    },[video])

    return(
        <div>
        {/* {video?.uploaderId === sessionUser?.id && */}
        <div className='userVideoAnddiscContainer'>
            <div className='userFlatVideoContainer'>
                <video  ref={flatVideCardVideoTag} className='userVideoTag' onClick={videoClickHandler}  muted playsInline >
                    <source src={video?.url} type={video?.type}/>
                    {/* <source src={localVideo} type={video?.type}/> */}
                </video>
             </div>

            <div className='userInfoContainer' >
                <div>

                <h3 className='flatVideoUserTitle'>{video?.title}</h3>
                {/* <p className="suggestedUserTitleBigScreen"> {vid?.title?.substring(0,50)}{vid?.title?.length > 50 && '...'}</p> */}
                <p className='flatVideoUserDescription'>{video?.description?.substring(0,150)}
                {video?.description?.length > 150 && '...'}</p>
                <p className='flatVideoViews'>{video?.views} views  . {getSpentTime(video?.createdAt)}</p>



                </div>

                {showDelete && <div className='flatDropDownMenu'>
                    <EditVideoFormModal video={video} setShowDelete={setShowDelete}/>
                    <DeleteVideoFormModal video={video} type={'video'} setShowDelete={setShowDelete}/>
                </div>}

                {sessionUser?.id === video?.uploaderId &&<div onClick={editDeleteDropdown} className='flatVerticalIconContainer'>
                <i className="fa-solid fa-ellipsis-vertical flatVerticalIcon"></i>
                </div>}
            </div>



        </div>
        {/* } */}
        </div>


    )
}

export default FlatVideoCard
