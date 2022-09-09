import * as commentActions from '../store/comment'
import { useSelector,useDispatch } from "react-redux"
import { useState,useRef, useEffect } from 'react'
import Comment from './Comment'
import './Comments.css'
import { useHistory } from 'react-router-dom'

function Comments ({video}) {
    const [commentData,setCommentData] = useState('')
    const [showSubmitCancelBtn, setshowSubmitCancelBtn] = useState(false)
    const [errors, setErrors] = useState({});
    const comments = useSelector(state => state?.comments)
    const sessionUser = useSelector(state => state?.session?.user);
    const dispatch = useDispatch()
    const textArea = useRef(null);
    const history = useHistory()


    useEffect(()=>{
        const response = dispatch(commentActions.getVideoCommentsThunkCreator(video?.id))
    },[dispatch, video])

    const onSubmitCommentHandler = (e) => {
        e.preventDefault();


        dispatch(commentActions.createCommentThunkCreator({comment:commentData,videoId:video.id}))
        .then((res) => {
            setCommentData("");
            textArea.current.style.height = 1.2 +"rem"
            if(res.status === 200){
                setshowSubmitCancelBtn(false)
                setErrors({})
            }
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        });
    };


    const cancelCommentFormHandler=()=>{
        textArea.current.style.height = 1.2 +"rem"

        setCommentData("");
        setErrors({})
        setshowSubmitCancelBtn(false)
    }

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
    const inputCommentClickHandler = () =>{
        if(!sessionUser){
            history.push('/signin')
        }
        setshowSubmitCancelBtn(true)
    }


    return (
        <div className='commentsAndFormContainer'>
            <p className='commentNumber'>{Object.keys(comments)?.length} Comments</p>
            <div className='profileImageAndFormContainer'>
                <div className='commentFormImageContainer'>
                    {sessionUser?.profileImageUrl

                    ?
                        <img className='commentFormProfileImage' src={sessionUser?.profileImageUrl}/>:
                        <i className="fas fa-user-circle commentFormProfileImageIcon" />
                    }

                </div>
                <div className='commentFormContainer'>

                <form onSubmit={onSubmitCommentHandler}>
                    <textarea className='commentInput'    ref={textArea} rows={1} placeholder='Add a Comment...'
                    value={commentData} name='comment' onChange={(e)=>onCommentChangeHandler(e)} onClick={inputCommentClickHandler} />
                    {errors?.comment &&
                        <div className="errorContainer">

                            <div>
                            <i class="fa-solid fa-circle-exclamation commentErrorlogo"></i>
                            <span className='commentError' key={errors.comment}>{errors.comment}</span>
                            </div>
                        </div>
                    }
                    {showSubmitCancelBtn &&
                        <div className='commentBtnContainer'>
                            <button className='commentCancelBtn' type='button' onClick={cancelCommentFormHandler}>CANCEL</button>
                            <button className='commentsubmitBtn'>COMMENT</button>
                        </div>
                    }
            </form>
                </div>

            </div>

            {Object.values(comments)?.sort((a, b) => b?.id - a?.id)?.map((comment)=>{
                return <Comment key={comment?.id} comment={comment} />
            })}
        </div>
    )
}

export default Comments
