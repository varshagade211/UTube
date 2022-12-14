import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import { ModalProvider, IsModalOnContextProvider } from "./context/Modal";
import {SideBarContextProvider} from './context/SideBarContext.js'
import configureStore from './store';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

function Root() {
  return (
    <Provider store={store}>
      <ModalProvider>
        <IsModalOnContextProvider>
          <SideBarContextProvider>
            <BrowserRouter>
            <App />
           </BrowserRouter>
           </SideBarContextProvider>
        </IsModalOnContextProvider>
      </ ModalProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
      <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
