import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import videoReducer from './video';
import commentReducer from './comment'
import likeReducer from './like'
import subscribeReducer from './subscribe';

const rootReducer = combineReducers({
    session: sessionReducer,
    videos:videoReducer,
    comments:commentReducer,
    likes:likeReducer,
    subscribe:subscribeReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}


const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

  export default configureStore;
