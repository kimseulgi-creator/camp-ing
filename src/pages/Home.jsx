import React, { useState } from 'react';
import { styled } from 'styled-components';
import Bg from '../images/login_bg.jpg';
import loginLogo from '../images/login_logo.png';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import { editUser, getUsers } from '../api/users';
import { useMutation, useQuery, useQueryClient } from 'react-query';

function Home() {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      console.log('성공하였습니다!');
    },
  });

  const [inputs, setInputs] = useState({
    userId: '',
    password: '',
  });

  const { userId, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  const { isLoading, isError, data } = useQuery('users', getUsers);

  const loginButtonHandler = () => {
    const filterLoginUser = data.filter((user) => {
      return user.userId === userId && user.password === password;
    });
    const [loginUser] = filterLoginUser;
    console.log(loginUser);

    const { id, isLogin } = loginUser;

    mutation.mutate({ id, isLogin });
  };

  return (
    <StBgSection backgroundimg={Bg}>
      <StMainWrap>
        <div className="mainWord">
          <h1>CAMP ING</h1>
          <p>
            베테랑 캠핑러부터 초보 캠핑러까지 모두 모여 소통하자!
            <br />
            캠핑 꿀팁부터 장비, 다양한 자연환경 속 캠핑 장소 추천까지!
          </p>
        </div>
        <StForm
          onSubmit={function (e) {
            e.preventDefault();
          }}
        >
          <input
            name="userId"
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChange}
          />
          <StButton>
            <button
              type="submit"
              onClick={function () {
                navigate('/join');
              }}
            >
              JOIN
            </button>
            <button
              type="submit"
              onClick={function () {
                // setCookie('id', inputs.email)
                loginButtonHandler();
                // navigate('/list');
              }}
            >
              LOGIN
            </button>
          </StButton>
        </StForm>
      </StMainWrap>
    </StBgSection>
  );
}

export default Home;

export const StBgSection = styled.section`
  background-image: url(${(props) => props.backgroundimg});
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const StMainWrap = styled.div`
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

export const StButton = styled.div`
  text-align: center;
  & button {
    background-color: #002925;
    width: 140px;
    height: 30px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 3px 3px 10px 0 rgb(0 0 0 / 30%);
    transition: all 1s;
    border-radius: 30px;
  }
  & button:nth-child(2) {
    margin-left: 20px;
  }
  & button:hover {
    background-color: #b1d2ce;
    color: black;
  }
`;
