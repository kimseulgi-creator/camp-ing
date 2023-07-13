import React from 'react';
import Layout from '../components/Layout';
import { StFormBg } from '../style/JoinStyle';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import Button from '../components/Button';
import { StDetailContents, StDetailImg, StInfo } from '../style/DetailStyle';
import { StButtonWrap } from '../style/HomeStyle';

function Detail() {
  const navigate = useNavigate();
  const param = useParams();

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

  return (
    <Layout>
      <StFormBg
        marginTop={'25px'}
        width={'1300px'}
        height={'740px'}
        flexDirection={'row'}
      >
        <StDetailImg>
          <img src="https://firebasestorage.googleapis.com/v0/b/camp-ing.appspot.com/o/qwerty%2F000022940015.jpg?alt=media&token=c627facb-ec2b-4142-b9bd-1b98df036f4a" />
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
            <Button>Delete</Button>
            <Button>Edit</Button>
          </StButtonWrap>
        </StDetailContents>
      </StFormBg>
    </Layout>
  );
}

export default Detail;
