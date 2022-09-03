
import { useDispatch } from "react-redux";
import * as commentActions from '../../store/comment'
import './DeleteCommentForm.css'
function DeleteCommentForm({comment,setShowModal})  {

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(commentActions.deleteCommentThunkCreator(comment?.id))
        setShowModal(false)
    }


  return(
    <div className="deleteCommentModalContainer">
     <p className="deleteComentHeading">Delete comment</p>
      <p className="deleteComentWarning">Delete your comment permanently?</p>
      <hr className="deleteCommentModalHr"></hr>
      <div className="deleteCommentModalBtnContainer">
        <button className="deleteCommentModalCancelBtn" type='button' onClick={()=>setShowModal(false)}>CANCEL</button>
        <button className="deleteCommentModalBtn" onClick={()=>deleteHandler()}>DELETE </button>

      </div>
    </div>
  )
}


export default DeleteCommentForm;
