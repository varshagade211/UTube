import { csrfFetch } from './csrf';
// constant variables

const GET_SUBSCRIBER = 'subscribe/getALLSUbscriber'
const CREATE_SUBSCRIBER = 'subscribe/createSubscriber'
const DELETE_SUBSCRIBER = 'sbscribe/deleteSubscriber'

//--------------------------------------------- action creators------------------------------



const getSubscribee = ((subscribee)=>{
   return {
     type:GET_SUBSCRIBER,
     subscribee
   }
})

const createSubscriber = ((subscriber) =>{
    return {
        type:CREATE_SUBSCRIBER,
        subscriber
    }
})

const deleteSubscriber = ((subscriber)=>{
    return {
        type:DELETE_SUBSCRIBER,
        subscriber
    }
})




export const getAllSubscribeeThunk = (() => async (dispatch) =>{
    const response = await csrfFetch(`/api/subscribe`)
    const data = await response.json()
    dispatch(getSubscribee(data.subscribee))
    return response
})


export const createSubscriberThunk = ((subscribeeId) => async (dispatch) => {

    const response = await csrfFetch(`/api/subscribe/${subscribeeId}`,
        {
           method:'POST',

       })

    const data = await response.json()
    dispatch(createSubscriber(data.subscribee))
    return response;
})


export const deleteSubscriberThunk = ((subscribeeId) => async (dispatch) => {

    const response = await csrfFetch(`/api/subscribe/${subscribeeId}`,
        {
           method:'DELETE',

       })

    const data = await response.json()
    dispatch(deleteSubscriber(data.foundSubscribee))
    return response;
})



const initialState = { subscribee: [] };

const subscribeReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_SUBSCRIBER:{
          newState = {...state, subscribee:[...action?.subscribee]}
          return newState
        }
        case CREATE_SUBSCRIBER:{

            newState= {...state,subscribee:[action?.subscriber,...state?.subscribee]}
            return newState
        }
        case DELETE_SUBSCRIBER:{
            let newSubscricibee = state?.subscribee?.filter((subscribee) => subscribee?.id !== action?.subscriber?.subscribeeId)
            newState = {...state, subscribee:newSubscricibee}
            return newState

        }
        default:{
            return state;
        }
    }



}

export default subscribeReducer;
