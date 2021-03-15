import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import { CookiesProvider } from 'react-cookie';

const routing = (
  <React.StrictMode>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </React.StrictMode>
);

ReactDOM.render(routing, document.getElementById('root'));

reportWebVitals();
