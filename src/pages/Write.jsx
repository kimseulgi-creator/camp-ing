import React, { useRef, useState } from 'react';
import { StBgSection, StButton, StForm } from './Home';
import Bg from '../images/form_bg.jpg';
import { StformBg } from './Join';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost } from '../api/posts';
import { useNavigate } from 'react-router';
import { styled } from 'styled-components';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { storage } from '../firebase';
import { getUsers } from '../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/modules/LoginSlice';
import shortid from 'shortid';

function Write() {
  const filterLoginUser = useSelector((state) => state.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      console.log('성공하였습니다!');
    },
  });
  // const [image, setImage] = useState('');
  const [inputs, setInputs] = useState({
    firstday: '',
    lastday: '',
    place: '',
    review: '',
  });

  const { firstday, lastday, place, review } = inputs;

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const placeRef = useRef('');
  const reviewRef = useRef('');
  const [selectedFile, setSelectedFile] = useState(null);
  const { isLoading, isError, data } = useQuery('users', getUsers);
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  dispatch(loginUser(data));
  console.log(filterLoginUser);
  const { userId, password, id } = filterLoginUser;

  const period =
    Number(lastday.replaceAll('-', '')) - Number(firstday.replaceAll('-', ''));

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile === null) {
      alert('이미지 한장을 선택해주세요.');
      return false;
    } else if (firstday === '' || lastday === '') {
      alert('캠핑 날짜를 입력해주세요');
      return false;
    } else if (period < 0) {
      alert('입력해주신 캠핑기간이 1일 미만인거 같아요!');
      return false;
    } else if (place === '') {
      alert('캠핑 장소를 입력해주세요');
      placeRef.current.focus();
      return false;
    } else if (review === '') {
      alert('캠핑 중 인상 깊었던 내용을 입력해주세요');
      reviewRef.current.focus();
      return false;
    } else {
      // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
      const imageRef = ref(storage, `${userId}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);

      const imgDownloadURL = await getDownloadURL(imageRef);
      // setImage(imgDownloadURL);
      console.log(imgDownloadURL);
      mutation.mutate({
        ...inputs,
        id: shortid(),
        userId,
        // image,
        image: imgDownloadURL,
        postDate: Date.now(),
      });
      navigate('/list');
    }
  };
  console.log(inputs);
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
            <input type="file" onChange={handleFileSelect} />
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
            <input
              name="place"
              type="text"
              value={place}
              onChange={onChange}
              ref={placeRef}
            />
          </StLabel>
          <StLabel>
            <textarea
              name="review"
              placeholder="캠핑을 다녀오면서 인상깊었던 내용을 적어보세요🍃"
              value={review}
              onChange={onChange}
              ref={reviewRef}
            ></textarea>
          </StLabel>
          <StButton>
            <button type="submit" onClick={() => handleUpload()}>
              POST
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
