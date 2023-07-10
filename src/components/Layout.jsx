import React from 'react';
import { styled } from 'styled-components';
import logo from '../images/header_logo.svg';
import { StButton } from '../pages/Home';

function Layout(props) {
  return (
    <StBackground>
      <StHeader>
        <p>paperwhite_wits</p>
        <h1>
          <a href="#">camp ing</a>
        </h1>
        <StButton>
          <button>Logout</button>
        </StButton>
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
  position: fixed;
  box-shadow: 0px 5px 10px #00000030;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  width: 100%;
  z-index: 2;
  & p {
    font-size: 15px;
  }
  & h1 > a {
    background-image: url(${logo});
    width: 130px;
    height: 100%;
    text-indent: -9999px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
  }
  & button {
    width: 100px;
  }
`;

const StInner = styled.div`
  width: 1300px;
  margin: 0 auto;
`;
