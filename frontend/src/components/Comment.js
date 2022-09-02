

import { useState } from 'react'
import { useSelector, useDispatch} from "react-redux"
import DeleteVideoFormModal from './DeleteModalPage'
import * as commentActions from '../store/comment'


function Comment ({comment}) {
    const [isEdit, setIsEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
  
    const [commentData,setCommentData] = useState(comment?.comment)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user);
    const [errors, setErrors] = useState({});

    const editDeleteDropdown = ()=>{
        setShowDelete((prev)=> !prev)

    }
    const editCommentHandler = () => {
        setIsEdit(true)
        setShowDelete(false)

    }



    const editSubmitHandler = (e) =>{
        e.preventDefault()

        dispatch(commentActions.editCommentThunkCreator({comment:commentData,id:comment?.id}))
        .then((res) => {
            if(res.status === 200){
                setIsEdit(false)
            }
        }).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

    }



    return(
        <div>
            {isEdit
                ?
                <form onSubmit={editSubmitHandler}>
                    <input type='text' value={commentData} onChange={(e)=>setCommentData(e.target.value)} ></input>
                    {errors?.comment &&
                        <div className="errorContainer">
                            <div>
                                <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                            </div>
                            <div>
                                <span className='error' key={errors.comment}>{errors.comment}</span>
                            </div>
                        </div>
                    }


                        <button>edit comment</button>
                        <button type='button' onClick={()=> setIsEdit(false)}>Cancel</button>

                </form>
                :
                <div>
                <p>{comment?.comment}</p>
                {showDelete &&
                    <div className='flatDropDownMenu'>
                        <button onClick={editCommentHandler}>Edit</button>
                        <DeleteVideoFormModal comment={comment} type={'comment'}/>
                    </div>
                }
                {
                    sessionUser?.id === comment?.commenterId &&
                    <div >
                    <i onClick={editDeleteDropdown} className="fa-solid fa-ellipsis-vertical "></i>
                    </div>
                }
                </div>
            }
        </div>
    )
}

export default Comment
