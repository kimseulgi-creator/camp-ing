import React, { useRef, useState } from 'react';
import { StBgSection, StButtonWrap, StForm } from '../style/HomeStyle';
import Bg from '../images/form_bg.jpg';
import { StFormBg } from '../style/JoinStyle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost } from '../api/posts';
import { useNavigate } from 'react-router';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { storage } from '../firebase';
import { getUsers } from '../api/users';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/modules/LoginSlice';
import shortid from 'shortid';
import Button from '../components/Button';
import { StLabel } from '../style/WriteStyle';

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
  const { user, password, id } = filterLoginUser;

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
      const imageRef = ref(storage, `${user}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);

      const imgDownloadURL = await getDownloadURL(imageRef);
      // setImage(imgDownloadURL);
      console.log(imgDownloadURL);
      mutation.mutate({
        ...inputs,
        id: shortid(),
        user,
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
      <StFormBg padding={'60px 0'}>
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
          <StButtonWrap>
            <Button type="submit" onClick={() => handleUpload()}>
              POST
            </Button>
            <Button type="submit" onClick={() => navigate(-1)}>
              CANCEL
            </Button>
          </StButtonWrap>
        </StForm>
      </StFormBg>
    </StBgSection>
  );
}

export default Write;
