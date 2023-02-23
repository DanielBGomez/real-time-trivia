// Modules
import { func, string } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

// CSS
import 'normalize.css';
import '../../static/global.css';

// Containers
import { RegisterForm } from '../../containers/Register';

// Types
import { Response } from 'server/lib/common/interfaces';
import { User } from 'server/lib/schemas/User.schema';
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
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isConnected, setIsConnected ] = useState(false);
  const [ error, setError ] = useState('');
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ user, setUser ] = useState<boolean | object>(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      socket.emit('login', uuid);
    });
    socket.on('disconnect', () => setIsConnected(false));
    socket.on('auth', ({ status, name, data }: Response) => {
      setIsLoggedIn(true);
      switch (status) {
      case 200:
        setUser(data?.user);
        break;
      case 400:
        setUUID(data?.uuid);
        location.reload();
        break;
      default:
        console.log(name, data);
      }
    });
    socket.on('login', resp => setUser(resp.data.user));

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('auth');
      socket.off('login');
    };
  }, []);

  console.log(user);

  /**
   * Register name
   */
  const register = (name: string) => {
    if (isLoading) return;
    setIsLoading(true);
    socket.emit('register', name, () => setIsLoading(false));
  };

  return (
    <>
      {isLoggedIn && (
        !user ? (
          <RegisterForm
            isLoading={isLoading}
            submit={register}
          />
        ) : (
          <h1>Esperando la siguiente pregunta...</h1>
        )
      )}
    </>
  );
};

App.propTypes = {
  uuid: string,
  setUUID: func,
  socket: Socket
};