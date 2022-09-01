
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom';
import EditVideoFormModal from '../components/EditVideoPage';
import DeleteVideoFormModal from './DeleteModalPage';

import './FlatVideoCard.css'

// function FlatVideoCard({video,localVideo}) {
function FlatVideoCard({video}) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    const [showDelete, setShowDelete] = useState(false)

    const videoClickHandler = () => {
        history.push(`/video/${video?.id}/`)
    }

    const editDeleteDropdown = () => {
        setShowDelete((prev)=> !prev)
    }

    return(
        <div>
        {video?.uploaderId === sessionUser?.id &&
        <div className='userVideoAnddiscContainer'>
            <div className='userFlatVideoContainer'>
                <video className='userVideoTag' onClick={videoClickHandler}  muted playsInline >
                    <source src={video?.url} type={video?.type}/>
                    {/* <source src={localVideo} type={video?.type}/> */}
                </video>
             </div>

            <div className='userInfoContainer' >
                <div>

                <h3 className='flatVideoUserTitle'>{video?.title}</h3>
                <p className='flatVideoUserDescription'>{video?.description}</p>
                <p className='flatVideoViews'>{video?.views} views</p>

                </div>

                {showDelete && <div className='flatDropDownMenu'>
                    <EditVideoFormModal video={video}/>
                    <DeleteVideoFormModal video={video}/>
                </div>}

                {sessionUser?.id === video?.uploaderId &&<div onClick={editDeleteDropdown} className='flatVerticalIconContainer'>
                <i className="fa-solid fa-ellipsis-vertical flatVerticalIcon"></i>
                </div>}
            </div>



        </div>}
        </div>


    )
}

export default FlatVideoCard