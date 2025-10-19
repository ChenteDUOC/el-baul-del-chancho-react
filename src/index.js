import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importamos Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Importamos Bootstrap JS'
import { BrowserRouter } from 'react-router-dom'; // Importamos BrowserRouter
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
