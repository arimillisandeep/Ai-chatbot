import React from 'react';
import ReactDOM from 'react-dom/client';

import ChatBox from './ChatBox.jsx';
import './style.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatBox />
  </React.StrictMode>
);