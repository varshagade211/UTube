
import { csrfFetch } from './csrf';

const GET_VIDEO_COMMENTS = 'comment/getVideoComment'
const CREATE_COMMENT = 'comment/createComment'
const EDIT_COMMENT = 'comment/editComment'
const DELETE_COMMENT = 'comment/deleteComment'


// commnet action creator
const getComments = ((comments) => {
    return {
        type:GET_VIDEO_COMMENTS,
        comments
    }
 })

const createComment = ((comment) => {
    return {
        type:CREATE_COMMENT,
        comment
    }
 })

 const editComment = ((comment) => {
    return {
        type:EDIT_COMMENT,
        comment,
    }
 })

 const deleteComment = ((commentId) => {
    return {
        type:DELETE_COMMENT,
        commentId,
    }
 })



 // comments thunk creator

export const getVideoCommentsThunkCreator = (videoId) => async (dispatch) => {
    const response = await csrfFetch(`/api/comment/${videoId}`)
    const comments = await response.json()
    dispatch(getComments(comments))
    return response
}


export const createCommentThunkCreator = (commentData) => async (dispatch) => {
    const {comment,videoId} = commentData

    const response = await csrfFetch(`/api/comment/${videoId}`,
        {
           method:'POST',
           body:JSON.stringify({
              comment
           })
        })

    const newComment = await response.json()

    dispatch(createComment(newComment))
    return response;
}

export const editCommentThunkCreator = ((commentData) => async (dispatch) => {

    const {comment, id} = commentData
    const response = await csrfFetch(`/api/comment/${id}`,
        {
           method:'PUT',
           body:JSON.stringify({
              comment
           })
       })

    const newComment = await response.json()
    dispatch(editComment(newComment))
    return response;
})


export const deleteCommentThunkCreator = ((commentId) => async(dispatch) => {
    const response = await csrfFetch(`/api/comment/${commentId}`,
    {
        method: 'DELETE',
    })

    if(response.status === 200){
        dispatch(deleteComment(commentId))
    }

    return response
})


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case GET_VIDEO_COMMENTS:{
            let temp = {}
            action?.comments?.forEach(comment => {
                temp[comment?.id] = comment
            });
            newState={...temp}
            return newState
        }
        case CREATE_COMMENT:{
            state[action?.comment?.id] = action?.comment
            newState = {...state}
            return newState
        }
        case EDIT_COMMENT:{
            state[action?.comment?.id] = action?.comment
            newState = {...state}
            return newState
        }
        case DELETE_COMMENT:{
            delete state[action?.commentId]
            newState = {...state}
            return newState
        }
        default:{
            return state;
        }
    }
}

export default commentReducer;
