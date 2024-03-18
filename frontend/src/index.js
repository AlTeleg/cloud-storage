import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './reducers/authReducer.js';

ReactDOM.render(
  <Provider store={store}>
    <App files={files} users={users} file={file}/>
  </Provider>,
  document.getElementById('root')
);
