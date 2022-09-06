import { csrfFetch } from './csrf';
// constant variables

const CREATE_VIDEO =  'video/createVideo'
const GET_VIDEOS = 'video/getVideos'
const GET_SINGLE_VIDEO = 'video/getSingleVideo'
const EDIT_VIDEO = 'video/editVideo'
const DELETE_VIDEO = 'video/deleteVideo'

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
 const getSingleVideo = ( (video) => {
    return {
        type:GET_SINGLE_VIDEO,
        video
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

// ------------------------------------------------thunk action creator --------------------------


export const getAllVideosThunkCreator = (() => async (dispatch) =>{
    const response = await csrfFetch('/api/video/')
    const videos = await response.json()
    dispatch(getAllVideos(videos.videos))
    return response
})

export const getSingleVideoThunkCreator = ((id) => async (dispatch) =>{
    const response = await csrfFetch(`/api/video/${id}/`)
    const video = await response.json()

    dispatch(getSingleVideo(video))
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




// -------------------------------------video Reducer-----------------------

const initialState = { videos: []  };

const videoReducer = (state = initialState, action) => {
    let newState;
    switch(action.type) {
        case GET_VIDEOS:{
            console.log('all videos in thunk', action?.videos)
            newState = {...state, videos:[...action?.videos]}
            return newState
        }
        case GET_SINGLE_VIDEO:{
            console.log('single video in thunk', action?.video)
            state['singleVideo'] = action?.video
            newState={...state}
            return newState
        }
        case CREATE_VIDEO:{
            console.log('create video in thunk ', action?.video)
            newState = {...state, videos:[action?.video,...state?.videos]}
            console.log('create video newState', newState)
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
        default:{
            return state;
        }

    }
}

export default videoReducer;
