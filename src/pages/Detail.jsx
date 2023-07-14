import React from 'react';
import Layout from '../components/Layout';
import { StFormBg } from '../style/JoinStyle';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePost, getPosts } from '../api/posts';
import Button, { StButton } from '../components/Button';
import closeBtnImg from '../images/close_btn.svg';
import { StDetailContents, StDetailImg, StInfo } from '../style/DetailStyle';
import { StButtonWrap } from '../style/HomeStyle';
import { StEtcBtn } from '../style/ListStyle';

function Detail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const param = useParams();

  // Invalidate의 과정
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
  });

  // json server에서 posts 컬렉션 데이터 가져오기
  const { isLoading, isError, data } = useQuery('posts', getPosts);
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }

  // json server post 데이터 중 param id와 같은 데이터 찾기
  const postDetailData = data.filter((post) => {
    return post.id === param.id;
  });

  // 데이터 구조분해 할당
  const [postDetail] = postDetailData;
  const { userId, firstday, lastday, place, review, image } = postDetail;

  // 캠핑 기간 구하는 계산식
  const period =
    Number(lastday.replaceAll('-', '')) -
    Number(firstday.replaceAll('-', '')) +
    1;

  // 삭제 버튼 클릭시 데이터 삭제 후 list 페이지로 이동
  const deletButtonHandler = () => {
    if (window.confirm('해당 게시글을 삭제 하시겠습니까?')) {
      mutation.mutate(deletePost(param.id));
      navigate('/list');
    }
  };

  return (
    <Layout>
      <StFormBg
        margintop={'25px'}
        width={'1300px'}
        height={'740px'}
        flexdirection={'row'}
      >
        <StDetailImg>
          <img src={image} />
        </StDetailImg>
        <StDetailContents>
          <p>{userId}</p>
          <StInfo>
            <p>{`${period}일간 캠핑🍃`}</p>
            <dl>
              <dt>{`${firstday} ~ ${lastday}`}</dt>
            </dl>
            <dl>
              <dt>PLACE</dt>
              <dd>{place}</dd>
            </dl>
            <dl>
              <dt>REVIEW</dt>
              <dd>{review}</dd>
            </dl>
          </StInfo>
          <StButtonWrap>
            <Button
              onClick={() =>
                navigate(`/editdetail/${param.id}`, {
                  state: postDetailData[0],
                })
              }
            >
              Edit
            </Button>
            <StButton
              onClick={deletButtonHandler}
              backgroundcolor="#fd7b6a"
              hoverbackgroundcolor="#f8c5be"
            >
              Delete
            </StButton>
          </StButtonWrap>
        </StDetailContents>
        <StEtcBtn
          onClick={() => navigate(-1)}
          backgroundimg={closeBtnImg}
          boxshadow="none"
          top="60px"
          bottom="0px"
          size="40px"
        >
          이전
        </StEtcBtn>
      </StFormBg>
    </Layout>
  );
}

export default Detail;
