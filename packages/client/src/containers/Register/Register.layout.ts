// Modules
import Styled from '@emotion/styled';

// Elements
export const Root = Styled.div`
  width: 90%;
  padding: 100px 0;
  max-width: 500px;
`;

export const Label = Styled.label`
  width: 100%;
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Error = Styled(Label)`
  color: #F94B4B;
`;

export const Input = Styled.input`
  width: 100%;
  padding: 12px 16px;
  border: #dadada 2px solid;
`;

export const Button = Styled.button(({ disabled }) => `
  width: 100%;
  color: #333;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  padding: 10px 16px 14px;
  background-color: #52ded7;
  box-shadow: inset 0 -4px 0px rgba(0,0,0,0.3);
  transition: all 100ms linear;

  ${disabled ? `
    opacity: 0.4;
    cursor: not-allowed;
  ` : `
    &:focus,
    &:hover {
      opacity: 0.8;
    }
    &:active {
      padding: 12px 16px 12px;
      box-shadow: inset 0 -1px 0 rgba(0,0,0,0.4);
    }
  `}
`);