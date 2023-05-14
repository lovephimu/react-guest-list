import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import GuestList from './GuestList';
import GuestListPrototype from './GuestListPrototype';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <GuestListPrototype />
  </React.StrictMode>,
);
