import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import GuestList from './GuestList';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GuestList />
  </React.StrictMode>,
);
