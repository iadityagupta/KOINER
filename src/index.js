import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import CryptoContext from './components/CryptoContext'; // Ensure this path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CryptoContext>  {/* Wrap the App with CryptoContext */}
      <Router>
        <App />
      </Router>
    </CryptoContext>
  </React.StrictMode>
);
