// Modules
import { func, string } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

// CSS
import 'normalize.css';

// Types
interface HostProps {
  socket: Socket
}

/**
 * Host module
 */
export const Host = ({
  socket
}: HostProps) => {
  // States
  const [ isConnected, setIsConnected ] = useState(false);

  // Effets
  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  

  return (
    <>
      {isConnected ? 'Connected' : 'Disconnected'}
    </>
  );
};

Host.propTypes = {
  uuid: string,
  setUUID: func,
  socket: Socket
};