import React from 'react';
import { styled } from 'styled-components';
import logo from '../images/header_logo.svg';

function Layout(props) {
  return (
    <StBackground>
      <StHeader>
        <p>paperwhite_wits</p>
        <h1>camp ing</h1>
      </StHeader>
      <StInner>{props.children}</StInner>
    </StBackground>
  );
}

export default Layout;
const StBackground = styled.div`
  background-color: #2b8279;
`;
const StHeader = styled.header`
  background-color: white;
  position: relative;
  box-shadow: 0px 5px 10px #00000030;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  & p {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0px, -50%);
    font-size: 15px;
  }
  & h1 {
    background-image: url(${logo});
    width: 130px;
    height: 100%;
    text-indent: -9999px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    cursor: pointer;
  }
`;

const StInner = styled.div`
  width: 1300px;
  margin: 0 auto;
`;
