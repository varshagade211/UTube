
import { useDispatch } from "react-redux";
import * as commentActions from '../../store/comment'
function DeleteCommentForm({comment,setShowModal})  {

    const dispatch = useDispatch()

    const deleteHandler = () => {
        dispatch(commentActions.deleteCommentThunkCreator(comment?.id))
        setShowModal(false)
    }


  return(
    <div>
     <h4>Delete comment</h4>
      <p>Delete your comment permanently?</p>

      <button  onClick={()=>deleteHandler()}  >Delete </button>

      <button type='button' onClick={()=>setShowModal(false)}>Cancel</button>
    </div>
  )
}


export default DeleteCommentForm;
