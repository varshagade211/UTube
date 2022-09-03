import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as videoActions from "../../store/video";

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
    <div>
      <p>Permanently delete this video?</p>
      <input type="checkbox" id="sure" name="sure" onClick={(e)=>checkboxHandler()}/>

      <label for="sure">I understand that deleting is permanent and can't be undone</label>
      <button  onClick={()=>deleteHandler()}  disabled={!isChecked}>Delete Forever</button>

      <button type='button' onClick={cancelHandler}>Cancel</button>
    </div>
  )
}


export default DeleteVideoForm;
