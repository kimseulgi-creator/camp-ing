import React from 'react';
import { styled } from 'styled-components';
import logo from '../images/header_logo.svg';
import { StButton } from '../pages/Home';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editUser, getUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';

function Layout(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      console.log('성공하였습니다!');
    },
  });

  const { isLoading, isError, data } = useQuery('users', getUsers);
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  const filterLoginUser = data.filter((user) => {
    return user.isLogin === true;
  });
  const [loginUser] = filterLoginUser;

  if (!loginUser) {
    // 로그인한 사용자가 없는 경우에 대한 처리
    return <p>로그인한 사용자가 없습니다.</p>;
  }

  console.log(loginUser);

  const logoutButtonHandler = () => {
    const { id, isLogin } = loginUser;
    mutation.mutate({ id, isLogin: false });
  };

  return (
    <StBackground>
      <StHeader>
        <a className="loginUserId">{loginUser.userId}</a>
        <h1>
          <a href="#">camp ing</a>
        </h1>
        <StButton>
          <button
            onClick={function () {
              logoutButtonHandler();
              navigate('/');
            }}
          >
            Logout
          </button>
        </StButton>
      </StHeader>
      <StInner>{props.children}</StInner>
    </StBackground>
  );
}

export default React.memo(Layout);
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
  & .loginUserId {
    font-size: 14px;
    font-weight: bold;
    width: 100px;
    line-height: 30px;
    text-align: center;
    cursor: pointer;
    transition: all 1s;
    border-radius: 30px;
  }
  & .loginUserId:hover {
    box-shadow: 2px 2px 5px 0 #00000030;
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
