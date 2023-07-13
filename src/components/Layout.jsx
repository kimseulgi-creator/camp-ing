import React from 'react';
import { styled } from 'styled-components';
import logo from '../images/header_logo.svg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { editUser, getUsers } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/modules/LoginSlice';
import Button, { StButton } from './Button';
import { StButtonWrap } from '../style/HomeStyle';

function Layout(props) {
  const filterLoginUser = useSelector((state) => state.login);
  const dispatch = useDispatch();
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
  dispatch(loginUser(data));
  console.log(filterLoginUser);
  if (!filterLoginUser) {
    // 로그인한 사용자가 없는 경우에 대한 처리
    return <p>로그인한 사용자가 없습니다.</p>;
  }

  const logoutButtonHandler = () => {
    const { id, isLogin } = filterLoginUser;
    mutation.mutate({ id, isLogin: false });
  };

  return (
    <StBackground>
      <StHeader>
        <a className="loginUserId">{filterLoginUser.userId}</a>
        <h1>
          <a href="#">camp ing</a>
        </h1>
        <StButtonWrap>
          <StButton
            width="100px"
            onClick={function () {
              logoutButtonHandler();
              navigate('/');
            }}
          >
            Logout
          </StButton>
        </StButtonWrap>
      </StHeader>
      <StInner>{props.children}</StInner>
    </StBackground>
  );
}

export default React.memo(Layout);
const StBackground = styled.div`
  background-color: #2b8279;
  min-height: 100vh;
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
`;

const StInner = styled.div`
  width: 1300px;
  margin: 0 auto;
`;
