import React, { useEffect, useRef, useState } from 'react';
import Bg from '../images/form_bg.jpg';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addUser } from '../api/users';
import { useNavigate } from 'react-router';
import shortid from 'shortid';
import Button from '../components/Button';
import { StBgSection, StButtonWrap, StForm } from '../style/HomeStyle';
import { StFormBg } from '../style/JoinStyle';

function Join() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // const { isLoading, isError, data } = useQuery('users', getUsers);
  // if (isLoading) {
  //   return <p>로딩중입니다...</p>;
  // }
  const mutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      console.log('성공하였습니다!');
    },
  });

  const [inputs, setInputs] = useState({
    userId: '',
    nickName: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const { userId, nickName, password } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const userIdRef = useRef('');
  const passwordRef = useRef('');
  const passwordConfirmRef = useRef('');
  const idValidationMsgRef = useRef('');
  const pwValidationMsgRef = useRef('');
  const checkPwValidationMsgRef = useRef('');

  const idCheck = /^(?=.*[a-z])[a-z0-9]{5,20}$/;
  const pwCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  useEffect(() => {
    if (!idCheck.test(inputs.userId)) {
      idValidationMsgRef.current.style.display = 'block';
      // return false;
    } else {
      idValidationMsgRef.current.style.display = 'none';
    }

    if (!pwCheck.test(inputs.password)) {
      pwValidationMsgRef.current.style.display = 'block';
      // return false;
    } else {
      pwValidationMsgRef.current.style.display = 'none';
    }

    if (inputs.password !== confirmPassword) {
      console.log(inputs.password);
      console.log(confirmPassword);
      checkPwValidationMsgRef.current.style.display = 'block';
      // return false;
    } else {
      checkPwValidationMsgRef.current.style.display = 'none';
    }
  }, [inputs, confirmPassword]);

  const joinButtonHandler = () => {
    const idValidation = idValidationMsgRef.current.style.display;
    const pwValidation = pwValidationMsgRef.current.style.display;
    const checkPwValidation = checkPwValidationMsgRef.current.style.display;
    console.log(idValidation === 'none');
    console.log(pwValidation === 'none');
    console.log(checkPwValidation === 'none');
    if (inputs.userId === '') {
      alert('아이디를 입력해주세요.');
      userIdRef.current.focus();
      return false;
    } else if (inputs.password === '') {
      alert('비밀번호를 입력해주세요.');
      passwordRef.current.focus();
      return false;
    } else if (confirmPassword === '') {
      alert('비밀번호 확인을 입력해주세요.');
      passwordConfirmRef.current.focus();
      return false;
    } else if (
      idValidation === 'none' &&
      pwValidation === 'none' &&
      checkPwValidation === 'none'
    ) {
      mutation.mutate({ ...inputs, isLogin: false, id: shortid() });
      alert('이제부터 CAMP ING-와 함께 즐거운 캠핑소통을 시작해보아요⛺');
      navigate('/');
    } else {
      alert('조건이 맞지 않는 항목이 있습니다.');
    }
  };

  return (
    <StBgSection backgroundimg={Bg}>
      <StFormBg>
        <h2>저희와 함께 캠핑을 즐겨보아요!</h2>
        <StForm
          onSubmit={function (e) {
            e.preventDefault();
          }}
        >
          <label>
            아이디
            <input
              name="userId"
              type="text"
              value={userId}
              onChange={onChange}
              ref={userIdRef}
            />
          </label>
          <p ref={idValidationMsgRef}>
            5~20자의 영문 소문자, 숫자만 사용 가능합니다.
          </p>

          {/* <label>
            닉네임
            <input
              name="nickName"
              type="text"
              value={nickName}
              onChange={onChange}
            />
          </label> */}
          <label>
            비밀번호
            <input
              name="password"
              type="text"
              value={password}
              onChange={onChange}
              ref={passwordRef}
            />
          </label>
          <p ref={pwValidationMsgRef}>
            비밀번호는 영문자+숫자+특수문자 조합으로 <br /> 8~25자리 사용해야
            합니다.
          </p>
          <label>
            비밀번호 확인
            <input
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              ref={passwordConfirmRef}
            />
          </label>
          <p ref={checkPwValidationMsgRef}>비밀번호가 일치하지 않습니다.</p>
          <StButtonWrap marginTop="40px">
            <Button onClick={() => joinButtonHandler()}>JOIN</Button>
            <Button onClick={() => navigate(-1)}>CANCEL</Button>
          </StButtonWrap>
        </StForm>
      </StFormBg>
    </StBgSection>
  );
}

export default Join;
