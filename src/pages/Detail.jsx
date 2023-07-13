import React from 'react';
import Layout from '../components/Layout';
import { StformBg } from './Join';
import { StButton } from './Home';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';

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
      <StformBg as="div">
        <StDetailImg>
          <img src="https://firebasestorage.googleapis.com/v0/b/camp-ing.appspot.com/o/qwerty%2F000022940015.jpg?alt=media&token=c627facb-ec2b-4142-b9bd-1b98df036f4a" />
        </StDetailImg>
        <div>
          <p>{userId}</p>
          <dl>
            <dt>
              {`${firstday} ~ ${lastday}`}
              <span>{`${period}일간 캠핑🍃`}</span>
            </dt>
            <dt>PLACE</dt>
            <dd>{place}</dd>
            <dt>REVIEW</dt>

            <dd>{review}</dd>
          </dl>
          <StButton>
            <button>Delete</button>
            <button>Edit</button>
          </StButton>
        </div>
      </StformBg>
    </Layout>
  );
}

export default Detail;

const StDetailImg = styled.div`
  width: 350px;
  height: 480px;
  overflow: hidden;
`;
