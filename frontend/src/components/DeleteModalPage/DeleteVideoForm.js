import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as videoActions from "../../store/video";
import './DeleteVideoForm.css'


function DeleteVideoForm({video,setShowModal,setShowDelete})  {
  const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(videoActions.deleteVideoThunkCreator(video?.id))
        setShowModal(false)
        setShowDelete(false)
    }

    const checkboxHandler = ()=>{
      setIsChecked((prev)=>!prev)

    }

    const cancelHandler = ()=>{
      setShowModal(false)
      setShowDelete(false)

    }
  return(
    <div className="deleteVideoContainer">
      <h3>Permanently delete this video?</h3>
      <div className="deleteVideoAndIfoContainer">
        <video  className='deletePreviewVid'  controls muted playsInline >
          <source src={video?.url} type={video?.type} id="videoSource"/>
        </video>
        <div className="dateTitleViewsContainer">
           <p className="deteVideoTile">{video?.title}</p>
           <p className="deteVideoUploadeDate">Uploaded {new Date(video?.createdAt).toDateString()}</p>
           <p className="deteVideoViews">{video?.views} views</p>
        </div>

      </div>
      <div className="deleteVideoWarningDiv">
      <input className="deleteVideoChecknox" type="checkbox" id="sure" name="sure" onClick={(e)=>checkboxHandler()}/>
       <label className="deleteVideoWarningLabel" for="sure">I understand that deleting is permanent and can't be undone</label>

      </div>
      <div className="delteVideoBtnContainer">

        <button className="deleteVideoBtn" type='button' onClick={cancelHandler}>Cancel</button>
        <button className={isChecked ?"deleteVideoBtn" :"deleteVideoDisabled"}  onClick={()=>deleteHandler()}  disabled={!isChecked}>Delete Forever</button>

      </div>
    </div>
  )
}


export default DeleteVideoForm;
