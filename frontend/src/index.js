import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './App.css';

ReactDOM.render(
  <React.StrictMode></React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
