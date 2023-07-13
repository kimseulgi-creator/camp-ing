import { styled } from 'styled-components';
import loginLogo from '../images/login_logo.png';

export const StBgSection = styled.section`
  background-image: url(${(props) => props.backgroundimg});
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
export const StMainWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  & .mainWord {
    display: inline-block;
    & h1 {
      background-image: url(${loginLogo});
      /* width: 800px; */
      width: 41vw;
      background-repeat: no-repeat;
      background-position: center;
      text-indent: -9999px;
      /* line-height: 450px; */
      line-height: 23vw;
      background-size: contain;
    }
    & p {
      font-size: 26px;
      color: white;
      font-weight: bold;
      /* margin-top: 60px; */
      margin-top: 3vw;
      line-height: 40px;
    }
  }
  & form {
    /* margin-left: 250px; */
    margin-left: 13vw;
    & div {
      margin-top: 20px;
    }
  }
`;

export const StForm = styled.form`
  display: flex;
  flex-direction: column;

  & input {
    width: 295px;
    height: 30px;
    padding-left: 5px;
    box-shadow: inset 2px 2px 10px 0px rgb(0 0 0 / 20%);
    border: none;
    margin: 10px 0;
  }
`;

export const StButtonWrap = styled.div`
  text-align: center;
  margin-top: ${(props) => props.marginTop};
  & button:nth-child(2) {
    margin-left: 20px;
  }
`;
