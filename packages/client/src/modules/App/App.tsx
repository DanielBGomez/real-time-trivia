// Modules
import { func, string } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

// CSS
import 'normalize.css';

// Types
import { Response } from 'server/lib/common/interfaces';
interface AppProps {
  uuid: string,
  socket: Socket,
  setUUID(uuid: string): boolean,
}
export interface LoginData {
  uuid: string,
  name: string,
  image: string,
  score: string,
}

/**
 * App module
 */
export const App = ({
  socket,
  uuid,
  setUUID,
}: AppProps) => {
  // States
  const [ isConnected, setIsConnected ] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ user, setUser ] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('login', uuid);
    });
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('auth', ({ status, name, data }: Response) => {
      console.log(status, name, data);
      switch (status) {
      default:
        console.log(name, data);
      }
      setIsLoggedIn(true);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('auth');
    };
  }, []);

  

  return (
    <>
      <h1>{uuid}</h1>
      {isLoggedIn && (
        <h2>is Logged in</h2>
      )}
      <h2>test</h2>
    </>
  );
};

App.propTypes = {
  uuid: string,
  setUUID: func,
  socket: Socket
};