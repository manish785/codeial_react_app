import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import {App} from './components';
import {BrowserRouter , Route, Routes} from 'react-router-dom'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


