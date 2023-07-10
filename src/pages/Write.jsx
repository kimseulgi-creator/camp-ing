import React, { useState } from 'react';
import { StBgSection, StButton, StForm } from './Home';
import Bg from '../images/form_bg.jpg';
import { StformBg } from './Join';
import { useMutation, useQueryClient } from 'react-query';
import { addPost } from '../api/posts';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';

function Write() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      console.log('성공하였습니다!');
    },
  });
  const [inputs, setInputs] = useState({
    image: '',
    firstday: '',
    lastday: '',
  });

  const { image, firstday, lastday } = inputs;

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
      <StformBg className="writeForm">
        <h2>이번 캠핑은 어땠는지 알려주세요</h2>
        <StForm
          onSubmit={function (e) {
            e.preventDefault();
          }}
        >
          <StLabel>
            이미지
            <input name="image" type="file" value={image} onChange={onChange} />
          </StLabel>
          <StLabel>
            캠핑 날짜
            <input
              name="firstday"
              type="date"
              value={firstday}
              onChange={onChange}
            />
            ~
            <input
              name="lastday"
              type="date"
              value={lastday}
              onChange={onChange}
            />
          </StLabel>
          <StLabel>
            캠핑 장소
            <input type="text" />
          </StLabel>
          <StLabel>
            <textarea placeholder="캠핑을 다녀오면서 인상깊었던 내용을 적어보세요🍃"></textarea>
          </StLabel>
          <StButton>
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

export default Write;
const StLabel = styled.label`
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
  &:nth-child(2) input {
    width: 130px;
    &:nth-child(1) {
      margin-right: 15px;
    }
    &:nth-child(2) {
      margin-left: 15px;
    }
  }
  & input {
    width: 305px;
    margin-left: 30px;
    line-height: 30px;
  }
  & textarea {
    width: 100%;
    margin-top: 30px;
    height: 150px;
    padding: 10px;
    border: none;
    resize: none;
    box-shadow: 3px 3px 10px 0 #00000030 inset;
    margin-bottom: 60px;
  }
`;
