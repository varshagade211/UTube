import { csrfFetch } from './csrf';
// constant variables

const CREATE_VIDEO =  'video/createVideo'
const GET_VIDEOS = 'video/getVideos'
const EDIT_VIDEO = 'video/editVideo'
const DELETE_VIDEO = 'video/deleteVideo'
// commants constants
const CREATE_COMMENT = 'video/createComment'
const EDIT_COMMENT = 'video/editComment'
const DELETE_COMMENT = 'video/deleteComment'
//--------------------------------------------- action creators------------------------------

const createVideo = ( (video) => {
   return {
       type:CREATE_VIDEO,
       video
   }
})

const getAllVideos = ( (videos) => {
    return {
        type:GET_VIDEOS,
        videos
    }
 })

 const editVideo = ( (editedVideo) => {
    return {
        type:EDIT_VIDEO,
        editedVideo
    }
 })
const deletVideo = ( (deleteVideodId) => {
    return {
        type:DELETE_VIDEO,
        deleteVideodId
    }
 })
// commnet action creator
 const createComment = ((newComment,videoId) => {
    return {
        type:CREATE_COMMENT,
        newComment,
        videoId
    }
 })

 const editComment = ((newComment) => {
    return {
        type:EDIT_COMMENT,
        newComment,

    }
 })

 const deleteComment = ((deletedCommId,videoId) => {
    return {
        type:DELETE_COMMENT,
        deletedCommId,
        videoId

    }
 })
// ------------------------------------------------thunk action creator --------------------------


export const getAllVideosThunkCreator = (() => async (dispatch) =>{
    const response = await csrfFetch('/api/video/')
    const videos = await response.json()
    dispatch(getAllVideos(videos.videos))
    return response
})



export const createVideoThunkCreator = ( (videoInfo) => async (dispatch) => {
   const {video, videos, title , description} = videoInfo;
   const formData = new FormData();
   formData.append('title', title);
   formData.append('description',description)


    // for multiple files
    if (videos && videos.length !== 0) {
        for (let i = 0; i < videos.length; i++) {
            formData.append("videos", videos[i]);
        }
    }

    // for single file
    if (video) formData.append("video", video);
    const res = await csrfFetch(`/api/video/`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data",
        },
        body: formData,
    });

    const data = await res.json();
    dispatch(createVideo(data));
    return res

})


export const editVideoThunkCreator = (video) => async(dispatch) => {
    const {id, title,description} = video
    const response = await csrfFetch(`/api/video/${id}`,
    {
        method: 'PUT',
        body:JSON.stringify({title,description})
    })
    const editedVideo = await response.json()

    dispatch(editVideo(editedVideo))
    return response

}

export const deleteVideoThunkCreator = (videoId) => async(dispatch) => {
    const response = await csrfFetch(`/api/video/${videoId}`,
    {
        method: 'DELETE',
    })

    dispatch(deletVideo(videoId))
    return response

}


// comments thunk crator
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
       dispatch(createComment(newComment,videoId))
       return response;

}

export const editCommentThunkCreator = (commentData) => async (dispatch) => {
    const {comment,id} = commentData

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

}


export const deleteCommentThunkCreator = (commentId,videoId) => async(dispatch) => {
    const response = await csrfFetch(`/api/video/${commentId}`,
    {
        method: 'DELETE',
    })
    if(response.status === 200){
        dispatch(deleteComment(commentId,videoId))
    }
    return response

}
// -------------------------------------video Reducer-----------------------

const initialState = { videos: [] };

const videoReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_VIDEOS:{
            newState = {...state, videos:action?.videos}
            return newState
        }
        case CREATE_VIDEO:{
            newState = {...state, videos:[...state?.videos,action?.video]}
            return newState
        }
        case EDIT_VIDEO:{
            state?.videos?.forEach((video,i) => {

                if(video?.id === action?.editedVideo?.id){
                    state?.videos?.splice(i, 1, action?.editedVideo)
                }
            });
            newState = {...state, videos:[...state?.videos]}
            return newState
        }
        case DELETE_VIDEO:{

            let newUserPosts = state?.videos?.filter((video) => video?.id !== action?.deleteVideodId)
            newState = {...state,videos:newUserPosts}
            return newState
        }
        // comment reducers
        case CREATE_COMMENT:{
             state?.videos?.forEach((vid) => {
                  if(vid.id === action?.videoId){
                     vid.comments.push(action?.newComment)
                  }
             })
             newState= {...state,videos:[...state?.videos]}
             return newState
        }
        case EDIT_COMMENT:{
            state?.videos?.forEach((vid) => {
                if(vid.id === action?.newComment?.videoId){
                    vid?.comments?.forEach((comm,i) => {
                        if(comm.id === action?.newComment?.id){
                            vid?.comments?.splice(i, 1, action?.newComment)
                        }
                    })
                }
            })
            newState = {...state, videos:[...state?.videos]}
            return newState
        }
        case DELETE_COMMENT:{
            state?.videos?.forEach((vid) => {
                if(vid.id === action?.videoId){
                    let newComments = vid?.comments?.filter((comm) => comm?.id !== action?.deletedCommId)
                    vid.comments = newComments
                }
            })
            newState = {...state, videos:[...state?.videos]}
            return newState

        }
        default:{
            return state;
        }

    }
}

export default videoReducer;
