

import { useEffect, useRef,useState } from 'react'
import { useSelector, useDispatch} from "react-redux"
import DeleteVideoFormModal from './DeleteModalPage'
import * as commentActions from '../store/comment'
import {getSpentTime} from './DateUtils'
import './Comment.css'



function Comment ({comment}) {
    const [isEdit, setIsEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    // const [showSubmitCancelBtn, setshowSubmitCancelBtn] = useState(false)

    const [commentData,setCommentData] = useState(comment?.comment)
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state?.session?.user);
    const [errors, setErrors] = useState({});
    const textArea = useRef(null);


    const editDeleteDropdown = ()=>{
        setShowDelete((prev)=> !prev)

    }
    const editCommentHandler = () => {
        setIsEdit(true)
        setShowDelete(false)
    }

    useEffect(()=>{
        if(isEdit){

            textArea.current.style.height = 'auto'
            textArea.current.style.height = textArea.current.scrollHeight + 'px'
        }
    },[isEdit])


    const editSubmitHandler = (e) =>{
        e.preventDefault()

        dispatch(commentActions.editCommentThunkCreator({comment:commentData,id:comment?.id}))
        .then((res) => {
            if(res.status === 200){
                setIsEdit(false)
                setErrors({})
            }
        }).catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });

    }

    let isEdited = new Date(comment?.updatedAt) - new Date(comment?.createdAt) !== 0

    const onCommentChangeHandler = (e) =>{
        if(e.target.value.length>1000){
            setErrors({...errors,'comment':'Comment must be less than 1000 characters'});
        }if(errors.comment){
            delete errors.comment
        }
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        setCommentData(e.target.value)

    }
    const editCancelHandler = () =>{
        setCommentData(comment?.comment)
        setErrors({})
        setIsEdit(false)
    }

    return(
        <div>
            {isEdit
                ?
                <div className='editProfileImageAndFormContainer'>
                    <div className='editCommentFormImageContainer'>
                        { comment?.User?.profileImageUrl
                            ? <img className='commentProfileImage' src={comment?.User?.profileImageUrl} />
                            : <i className="fas fa-user-circle commentProfileImageIcon" />
                        }
                    </div>
                    <div className='editCommentFormContainer'>
                        <form onSubmit={editSubmitHandler}>
                            <textarea className='editCommentInput' ref={textArea}  rows={1} value={commentData} onChange={(e)=>onCommentChangeHandler(e)} ></textarea>

                        {errors?.comment &&
                            <div className="errorContainer">
                                <div>
                                    <i class="fa-solid fa-circle-exclamation editCommentErrorlogo "></i>
                                    <span className='editCommentError' key={errors.comment}>{errors.comment}</span>
                                 </div>
                            </div>
                        }

                            <div className='editCommentBtnContainer'>
                                <button className='editCommentCancelBtn' type='button'  onClick={()=>editCancelHandler()}>CANCEL</button>
                                <button className='editCommentsubmitBtn'>SAVE</button>
                            </div>
                            {errors?.error &&
                            <div className="errorContainer">
                                <div>
                                    <i class="fa-solid fa-circle-exclamation editCommentErrorlogo "></i>
                                    <span className='editCommentError' key={errors.error}>{errors.error}</span>
                                 </div>
                            </div>
                        }
                            {/* <button>edit comment</button>
                            <button type='button' onClick={()=> setIsEdit(false)}>Cancel</button> */}
                        </form>
                    </div>
                </div>
                :
                <div className='commentProfileImageAndIconContainer'>
                    { comment?.User?.profileImageUrl
                        ? <img className='commentProfileImage' src={comment?.User?.profileImageUrl} />
                        : <i className="fas fa-user-circle commentProfileImageIcon" />
                    }
                    {/* <div> */}
                        <div className='createdTimeAndUserNameOuter'>
                            <div className='createdTimeAndUserNameAndCommentContainer'>
                                <div className='createdTimeAndUserName'>
                                    <p className='commentUserName'>{comment?.User?.firstName} {comment?.User?.lastName}</p>
                                    <p className='createdCommentTime'>{getSpentTime(comment?.createdAt)}  {isEdited && "(edited)"} </p>
                                </div>
                                <div className='commentTxtContainer'>
                                    <p className='commentTxt'>{comment?.comment}</p>
                                </div>
                            </div>
                            {showDelete &&
                                <div className='editFlatDropDownMenu'>
                                    <div className="commentEditBtn" onClick={editCommentHandler}>
                                        <i class="fa-solid fa-pencil editCommentPencilIcon"></i>
                                        <p className='commentEditP'>Edit</p>
                                    </div>
                                    <DeleteVideoFormModal comment={comment} type={'comment'}/>
                                </div>
                            }
                            {
                                sessionUser?.id === comment?.commenterId &&
                                <div className='editCommentVerticalIconOuterContainer' onClick={editDeleteDropdown}>
                                    {/* <div className='editVerticalIconCntainer'> */}
                                    <i  className="fa-solid fa-ellipsis-vertical editCommentVerticalIcon "></i>
                                    {/* </div> */}
                                </div>
                            }
                        </div>
                    {/* </div> */}
                </div>
            }
        </div>
    )
}

export default Comment
