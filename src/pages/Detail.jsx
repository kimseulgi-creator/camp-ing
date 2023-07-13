import React from 'react';
import Layout from '../components/Layout';
import { StFormBg } from '../style/JoinStyle';
import { useNavigate, useParams } from 'react-router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deletePost, getPosts } from '../api/posts';
import Button from '../components/Button';
import { StDetailContents, StDetailImg, StInfo } from '../style/DetailStyle';
import { StButtonWrap } from '../style/HomeStyle';

function Detail() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const param = useParams();
  const mutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
      console.log('성공하였습니다!');
    },
  });
  const { isLoading, isError, data } = useQuery('posts', getPosts);
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  const postDetailData = data.filter((post) => {
    return post.id === param.id;
  });
  console.log(postDetailData);
  const [postDetail] = postDetailData;
  const { userId, firstday, lastday, place, review, image } = postDetail;
  const period =
    Number(lastday.replaceAll('-', '')) -
    Number(firstday.replaceAll('-', '')) +
    1;
  console.log(period);

  const deletButtonHandler = () => {
    alert('삭제버튼이 클릭되었습니다.');
    mutation.mutate(deletePost(param.id));
    navigate('/list');
  };

  return (
    <Layout>
      <StFormBg
        marginTop={'25px'}
        width={'1300px'}
        height={'740px'}
        flexDirection={'row'}
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
            <Button onClick={() => deletButtonHandler()}>Delete</Button>
            <Button>Edit</Button>
          </StButtonWrap>
        </StDetailContents>
      </StFormBg>
    </Layout>
  );
}

export default Detail;
