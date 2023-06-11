import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastProvider } from './Toast';
import { ToastProvider as ToastProvider2 } from './Toast2';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <ToastProvider2>
        <App />
      </ToastProvider2>
    </ToastProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
