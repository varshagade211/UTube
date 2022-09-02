import * as commentActions from '../store/comment'
import { useSelector,useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import Comment from './Comment'

function Comments ({video}) {
    const [commentData,setCommentData] = useState('')
    const [showSubmitCancelBtn, setshowSubmitCancelBtn] = useState(false)
    const [errors, setErrors] = useState({});
    const comments = useSelector(state => state?.comments)
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()


    useEffect(()=>{
        const response = dispatch(commentActions.getVideoCommentsThunkCreator(video?.id))
    },[dispatch])

    const onSubmitCommentHandler = (e) => {
        e.preventDefault();


        dispatch(commentActions.createCommentThunkCreator({comment:commentData,videoId:video.id}))
        .then((res) => {
            setCommentData("");
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
        setCommentData("");
        setErrors({})
        setshowSubmitCancelBtn(false)
    }

    const onCommentChangeHandler = (e) =>{
        setCommentData(e.target.value)

    }
    const inputCommentClickHandler = () =>{
        setshowSubmitCancelBtn(true)
    }

   
    return (
        <div>
            <p>{Object.keys(comments)?.length} Comments</p>
            <form onSubmit={onSubmitCommentHandler}>
                <input type='text' value={commentData} name='comment' onChange={(e)=>onCommentChangeHandler(e)} onClick={inputCommentClickHandler} />
                {errors?.comment &&
                 <div className="errorContainer">
                <div>
                    <i class="fa-solid fa-circle-exclamation errorlogo"></i>
                </div>
                <div>
                    <span className='error' key={errors.comment}>{errors.comment}</span>
                </div>
            </div>}
            {showSubmitCancelBtn &&
            <div><button>Comment</button>
                <button type='button' onClick={cancelCommentFormHandler}>Cancel</button>
                </div>}
            </form>
            {Object.values(comments)?.map((comment)=>{

                return <Comment key={comment?.id} comment={comment} />
            })}
        </div>
    )
}

export default Comments
