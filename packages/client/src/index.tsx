// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4} from 'uuid';
import io from 'socket.io-client';

import { App } from './modules/App/App';

// React setup
const DOM_ELEMENT = document.getElementById('root');
if (!DOM_ELEMENT) throw new Error('Unable to find the dom element');
const root = ReactDOM.createRoot(DOM_ELEMENT);

// Get UUID
let uuid: string;
if (localStorage.getItem('uuid')) {
  uuid = localStorage.getItem('uuid') || '';
} else {
  uuid = uuidv4();
  updateUUID(uuid);
}

// Socket
const socket = io({
  auth: {
    uuid,
  }
});

/**
 * Update the uuid in localstorage
 */
function updateUUID (uuid: string) {
  localStorage.setItem('uuid', uuid);
  return localStorage.getItem('uuid') === uuid;
}

root.render(
  <React.StrictMode>
    <App
      uuid={uuid}
      setUUID={updateUUID}
      socket={socket}
    />
  </React.StrictMode>
);