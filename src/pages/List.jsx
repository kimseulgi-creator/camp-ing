import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import etcbtn from '../images/write_btn.svg';
import {
  StContainer,
  StEtcBtn,
  StPostingCard,
  StPostingWord,
} from '../style/ListStyle';

function List() {
  const navigate = useNavigate();

  // json server에서 posts 컬렉션 데이터 가져오기
  const { isLoading, isError, data } = useQuery('posts', getPosts);
  if (isLoading) {
    return <p>로딩중입니다...</p>;
  }
  return (
    <Layout>
      <StContainer>
        {data.map((post) => {
          return (
            <StPostingCard
              onClick={() =>
                navigate(`/detail/${post.id}`, {
                  state: post.user,
                })
              }
              key={post.id}
            >
              <img src={post.image} />
              <StPostingWord>
                <p>{`#${post.place.replaceAll(' ', ' #')}`}</p>
                <p>
                  {`${String(new Date(post.postDate)).split(' ')[3]} ${
                    String(new Date(post.postDate)).split(' ')[1]
                  } ${String(new Date(post.postDate)).split(' ')[2]} ${
                    String(new Date(post.postDate)).split(' ')[4]
                  }`}
                </p>
              </StPostingWord>
            </StPostingCard>
          );
        })}
      </StContainer>
      <StEtcBtn onClick={() => navigate('/write')} backgroundimg={etcbtn}>
        글쓰기
      </StEtcBtn>
    </Layout>
  );
}

export default List;
