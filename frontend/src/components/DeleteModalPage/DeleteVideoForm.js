import { useState } from "react";
import { useDispatch } from "react-redux";
import * as videoActions from "../../store/video";
function DeleteVideoForm({video,setShowModal})  {
  const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(videoActions.deleteVideoThunkCreator(video?.id))
        setShowModal(false)
    }

    const checkboxHandler = ()=>{
      setIsChecked((prev)=>!prev)
    }

  return(
    <div>
      <p>Permanently delete this video?</p>
      <input type="checkbox" id="sure" name="sure" onClick={(e)=>checkboxHandler()}/>

      <label for="sure">I understand that deleting is permanent and can't be undone</label>
      <button  onClick={()=>deleteHandler()}  disabled={!isChecked}>Delete Forever</button>

      <button type='button' onClick={()=>setShowModal(false)}>Cancel</button>
    </div>
  )
}


export default DeleteVideoForm;
