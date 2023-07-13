import React, { useEffect, useRef, useState } from 'react';
import { StBgSection, StButtonWrap, StForm } from '../style/HomeStyle';
import Bg from '../images/form_bg.jpg';
import { StFormBg } from '../style/JoinStyle';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addPost, editPost, getPosts } from '../api/posts';
import { useLocation, useNavigate } from 'react-router';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { storage } from '../firebase';
import { loginUser } from '../redux/modules/LoginSlice';
import shortid from 'shortid';
import Button from '../components/Button';
import { StLabel } from '../style/WriteStyle';

function EditDetail() {
  const navigate = useNavigate();
  const editData = useLocation();

  console.log(editData.state);
  const { id, user, image, firstday, lastday, place, review, postDate } =
    editData.state;

  // query 포스트 수정
  const queryClient = useQueryClient();
  const mutation = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      console.log('성공하였습니다!');
    },
  });
  const [editFirstday, setEditFirstday] = useState(firstday);
  const [editLastday, setEditLastday] = useState(lastday);
  const [editPlace, setEditPlace] = useState(place);
  const [editReview, setEditReview] = useState(review);
  // 다중 input
  // const [image, setImage] = useState('');

  // 유효성 검사를 위한 Dom 요소 접근
  const editPlaceRef = useRef('');
  const editReviewRef = useRef('');
  const [selectedFile, setSelectedFile] = useState('');

  // useEffect(() => {}, []);

  // 캠핑기간 구하는 식
  const period =
    Number(editLastday.replaceAll('-', '')) -
    Number(editFirstday.replaceAll('-', ''));

  // 이미지 파일 select
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // 유효성 검사
  const handleUpload = async () => {
    if (period < 0) {
      alert('입력해주신 캠핑기간이 1일 미만인거 같아요!');
      return false;
    } else if (editPlace === '') {
      alert('캠핑 장소를 입력해주세요');
      editPlaceRef.current.focus();
      return false;
    } else if (editReview === '') {
      alert('캠핑 중 인상 깊었던 내용을 입력해주세요');
      editReviewRef.current.focus();
      return false;
    } else {
      // ref 함수를 이용해서 Storage 내부 저장할 위치를 지정하고, uploadBytes 함수를 이용해서 파일을 저장합니다.
      const imageRef = ref(storage, `${user}/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);

      const editImgDownloadURL = await getDownloadURL(imageRef);
      // setImage(editImgDownloadURL);
      const undefinedImg = editImgDownloadURL.split('?')[0].slice(-9);
      console.log(undefinedImg);
      mutation.mutate({
        firstday: editFirstday,
        lastday: editLastday,
        place: editPlace,
        review: editReview,
        id,
        user,
        image: undefinedImg === 'undefined' ? image : editImgDownloadURL,
        postDate,
      });
      navigate('/list');
    }
  };
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
              type="date"
              value={editFirstday}
              onChange={(e) => setEditFirstday(e.target.value)}
            />
            ~
            <input
              type="date"
              value={editLastday}
              onChange={(e) => setEditLastday(e.target.value)}
            />
          </StLabel>
          <StLabel>
            캠핑 장소
            <input
              type="text"
              value={editPlace}
              onChange={(e) => setEditPlace(e.target.value)}
              ref={editPlaceRef}
            />
          </StLabel>
          <StLabel>
            <textarea
              placeholder="캠핑을 다녀오면서 인상깊었던 내용을 적어보세요🍃"
              value={editReview}
              onChange={(e) => setEditReview(e.target.value)}
              ref={editReviewRef}
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

export default EditDetail;
