import React, { useState } from 'react';
import Bg from '../images/login_bg.jpg';
import { useNavigate } from 'react-router';
// import { useCookies } from 'react-cookie';
import { editUser, getUsers } from '../api/users';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/modules/LoginSlice';
import Button from '../components/Button';
import {
  StBgSection,
  StButtonWrap,
  StForm,
  StMainWrap,
} from '../style/HomeStyle';

function Home() {
  // const loginUserData = useSelector((state) => state);
  // const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
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
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }

  const loginButtonHandler = () => {
    const filterLoginUser = data.filter((user) => {
      return user.userId === userId && user.password === password;
    });
    dispatch(loginUser(filterLoginUser));

    // console.log(filterLoginUser == false);
    if (filterLoginUser != false) {
      const [loginUser] = filterLoginUser;
      console.log(loginUser);
      const { id, userId, isLogin } = loginUser;
      mutation.mutate({ id, isLogin: true });
      alert(`welcome ${userId}💚`);
      navigate('/list');
    } else {
      alert('아이디와 비밀번호를 확인해주세요.');
    }

    // if (id) {
    //   alert('로그인 성공');
    //   // mutation.mutate({ id, isLogin });
    //   // navigate('/list');
    // } else {
    //   alert('로그인 실패');
    // }
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
          <StButtonWrap marginTop="40px">
            <Button
              onClick={function () {
                // setCookie('id', inputs.email)
                loginButtonHandler();
                // navigate('/list');
              }}
            >
              LOGIN
            </Button>
            <Button
              onClick={function () {
                navigate('/join');
              }}
            >
              JOIN
            </Button>
          </StButtonWrap>
        </StForm>
      </StMainWrap>
    </StBgSection>
  );
}

export default Home;
