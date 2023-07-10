import React, { useState } from 'react';
import { StBgSection, StButton, StForm } from './Home';
import Bg from '../images/form_bg.jpg';
import { styled } from 'styled-components';
import { useMutation, useQueryClient } from 'react-query';
import { addUser } from '../api/users';
import { useNavigate } from 'react-router';

function Join() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      console.log('성공하였습니다!');
    },
  });
  const [inputs, setInputs] = useState({
    email: '',
    nickName: '',
    password: '',
  });

  const { email, nickName, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
    console.log(inputs);
  };
  return (
    <StBgSection backgroundimg={Bg}>
      <StformBg>
        <h2>저희와 함께 캠핑을 즐겨보아요!</h2>
        <StForm
          onSubmit={function (e) {
            e.preventDefault();
          }}
        >
          <label>
            이메일
            <input name="email" type="text" value={email} onChange={onChange} />
          </label>
          <label>
            닉네임
            <input
              name="nickName"
              type="text"
              value={nickName}
              onChange={onChange}
            />
          </label>
          <label>
            비밀번호
            <input
              name="password"
              type="text"
              value={password}
              onChange={onChange}
            />
          </label>
          <label>
            비밀번호 확인
            <input type="text" />
          </label>
          <StButton className="btnWrap">
            <button
              type="submit"
              onClick={function () {
                mutation.mutate({ ...inputs, isLogin: false });
                navigate('/');
              }}
            >
              JOIN
            </button>
            <button type="submit" onClick={() => navigate(-1)}>
              CANCEL
            </button>
          </StButton>
        </StForm>
      </StformBg>
    </StBgSection>
  );
}

export default Join;
export const StformBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 600px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 0 #00000030;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 60px;
  }
  & label {
    display: flex;
    flex-direction: column;
  }
  & .btnWrap {
    margin-top: 30px;
  }
  &.writeForm {
    padding: 60px 0;
  }
`;
