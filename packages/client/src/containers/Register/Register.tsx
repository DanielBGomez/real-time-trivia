// Modules
import React, { FormEvent, useState } from 'react';
import { bool, func, string } from 'prop-types';

// Elements
import {
  Root,
  Label,
  Error,
  Input,
  Button,
} from './Register.layout';

// Types
interface RegisterFormProps {
  isLoading: boolean,
  error: string,
  submit(name: string): void
}

/**
 * Register form container.
 */
export const RegisterForm = (props: RegisterFormProps) => {
  const {
    isLoading,
    error,
    submit
  } = props;

  // States
  const [ name, setName ] = useState('');
  const [ internalError, setInternalError ] = useState('');

  // Computed
  const submitDisabled = Boolean(internalError || error || !name);

  // Methods
  const onNameChange = (event: FormEvent<HTMLInputElement>) => {
    const value = String(event.currentTarget.value);
    setName(value);
    setInternalError(/^(?:[a-zA-Z]+(?:\s|$)){2,}/.test(value.trim()) ? '' : 'Por favor utiliza al menos 2 nombres sin símbolos ni números');
  };
  const handleSubmit = () => !submitDisabled ? submit(name.trim()) : null; 

  // Render
  return (
    <Root>
      <h2>Bienvenido a la trivia!</h2>
      <div style={{ marginBottom: 16, marginTop: 32 }}>
        <Label>Ingresa tu nombre</Label>
        <Input
          value={name}
          placeholder="Nombre"
          disabled={isLoading}
          onKeyUp={({ key }) => key === 'Enter' ? handleSubmit() : undefined}
          onChange={onNameChange}
        />
        {Boolean(error || internalError) && (
          <Error style={{ marginTop: 8 }}>{error || internalError}</Error>
        )}
      </div>
      <Button
        disabled={submitDisabled}
        onClick={handleSubmit}
      >
        Ingresar
      </Button>
    </Root>
  );
};

RegisterForm.defaultProps = {
  error: ''
};

RegisterForm.propTypes = {
  isLoading: bool,
  error: string,
  submit: func
};
