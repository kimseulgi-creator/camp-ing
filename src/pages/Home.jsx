import React, { useState } from 'react';
import Bg from '../images/login_bg.jpg';
import { useNavigate } from 'react-router';
import { editUser, getUsers } from '../api/users';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/modules/LoginSlice';
import Button from '../components/Button';
import {
  StBgSection,
  StButtonWrap,
  StForm,
  StMainWrap,
} from '../style/HomeStyle';

function Home() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  // Invalidate의 과정
  const mutation = useMutation(editUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    },
  });

  // 다중 input
  const [inputs, setInputs] = useState({
    user: '',
    password: '',
  });

  const { user, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  // json server에서 users 컬렉션 데이터 가져오기
  const { isLoading, isError, data } = useQuery('users', getUsers);
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }

  // 로그인 버튼 클릭시 json server users 데이터 중 id와 비밀번호 같은 데이터 불러오기
  const loginButtonHandler = () => {
    const filterLoginUser = data.filter((userData) => {
      return userData.user === user && userData.password === password;
    });
    dispatch(loginUser(filterLoginUser));

    // 해당 데이터 중 isLogin:true로 변경
    if (filterLoginUser != false) {
      const [loginUser] = filterLoginUser;
      const { id, user, isLogin } = loginUser;
      mutation.mutate({ id, isLogin: true });
      alert(`welcome ${user}💚`);
      navigate('/list');
    } else {
      alert('아이디와 비밀번호를 확인해주세요.');
    }
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
            name="user"
            type="text"
            placeholder="아이디"
            value={user}
            onChange={onChange}
          />
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={onChange}
          />
          <StButtonWrap margintop="40px">
            <Button
              onClick={function () {
                loginButtonHandler();
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
