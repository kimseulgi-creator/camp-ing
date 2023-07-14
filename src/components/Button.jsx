import React from 'react';
import { styled } from 'styled-components';

function Button(props) {
  const { children, onClick } = props;
  return (
    <StButton type="submit" onClick={onClick}>
      {children}
    </StButton>
  );
}

export default Button;
export const StButton = styled.button`
  display: ${(props) => props.display};
  background-color: ${(props) => props.backgroundcolor || '#002925'};
  width: ${(props) => props.width || '140px'};
  height: 30px;
  color: white;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 3px 3px 10px 0 rgb(0 0 0 / 30%);
  transition: all 1s;
  border-radius: 30px;
  &:hover {
    background-color: ${(props) => props.hoverbackgroundcolor || '#b1d2ce'};
    color: black;
  }
`;
