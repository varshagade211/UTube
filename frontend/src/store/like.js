
import { csrfFetch } from './csrf';
// constant variables


const GET_LIKES = 'like/getLikes'
const CREATE_LIKE = 'like/createLike'
const EDIT_LIKE = 'like/editLike'
const DELETE_LIKE = 'like/deleteLike'

//--------------------------------------------- action creators------------------------------
const getLiks = ( (likes, dislikes) => {
    return {
        type:GET_LIKES,
        likes,
        dislikes
    }
 })


const createLike = ((like,likeType)=>{
  return {
    type:CREATE_LIKE,
    like,
    likeType
  }
})

const editLike = ((like,likeType)=>{
 return {
    type:EDIT_LIKE,
    like,
    likeType
 }
})
const deletLike = ((likeId,likeType)=>{
    return {
       type:DELETE_LIKE,
       likeId,
       likeType
    }
   })
 // ------------------------------------------------thunk action creator --------------------------


export const getAllLikesThunkCreator = ((videoId) => async (dispatch) =>{
    const response = await csrfFetch(`/api/like/${videoId}`)
    const data = await response.json()
    dispatch(getLiks(data.likes, data.dislikes))
    return response
})



export const createLikeThunkCreator = ((likeData) => async (dispatch) => {

    const {type, videoId} = likeData
    const response = await csrfFetch(`/api/like/${videoId}`,
        {
           method:'POST',
           body:JSON.stringify({
            type
           })
       })

    const like = await response.json()
    dispatch(createLike(like,type))
    return response;
})


export const editLikeThunkCreator = ((likeData) => async (dispatch) => {

    const {type, videoId} = likeData
    const response = await csrfFetch(`/api/like/${videoId}`,
        {
           method:'PUT',
           body:JSON.stringify({
            type
           })
       })

    const like = await response.json()
    dispatch(editLike(like,type))
    return response;
})

export const deleteLikeThunkCreator = ((likeData) => async (dispatch) => {

    const {type, videoId} = likeData
    const response = await csrfFetch(`/api/like/${videoId}`,
        {
           method:'DELETE',
           body:JSON.stringify({
            type
           })
       })

    const data = await response.json()
    dispatch(deletLike(data.likeId,type))
    return response;
})

// -------------------------------------like Reducer-----------------------

const initialState = { likes: [] , dislikes:[] };

const likeReducer = (state = initialState, action) => {
    let newState;
    switch(action?.type) {
       case GET_LIKES:{
           newState ={...state,likes:[...action?.likes], dislikes:[...action?.dislikes]}
           return newState
        }
        case CREATE_LIKE:{
            if(action?.likeType === true){
                newState = {...state,likes:[action?.like,...state?.likes],dislikes:[...state?.dislikes]}
            }else{
                newState = {...state,likes:[...state?.likes],dislikes:[action?.like,...state?.dislikes]}
            }
            return newState
        }
        case EDIT_LIKE:{
            if(action?.likeType === true){
                let newDislikes = state?.dislikes?.filter((like) => like?.id !== action?.like?.id)
                newState = {...state,likes:[action?.like,...state?.likes],dislikes:newDislikes}
            }else{
                let newLikes = state?.likes?.filter((like) => like?.id !== action?.like?.id)
                newState = {...state,likes:newLikes,dislikes:[action?.like,...state?.dislikes]}
            }
            return newState
        }
        case DELETE_LIKE:{
            if(action?.likeType === true){
                let newLikes = state?.likes?.filter((like) => like?.id !== action?.likeId)
                newState = {...state,likes:newLikes, dislikes:[...state?.dislikes]}
            }else{
                let newDisikes = state?.dislikes?.filter((like) => like?.id !== action?.likeId)
                newState = {...state,likes:[...state?.likes], dislikes:newDisikes}
            }
            return newState
        }
        default:{
            return state;
        }

    }
}

export default likeReducer;
