import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App} from './components';
import {BrowserRouter , Route, Routes} from 'react-router-dom'
import {ToastProvider} from 'react-toast-notifications'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-left">
      <App />
    </ToastProvider>
  </React.StrictMode>
);


