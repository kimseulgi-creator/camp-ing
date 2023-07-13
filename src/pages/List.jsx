import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';
import {
  StContainer,
  StPostingCard,
  StPostingWord,
  StWriteBtn,
} from '../style/ListStyle';

function List() {
  const navigate = useNavigate();

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
              onClick={() => navigate(`/detail/${post.id}`)}
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
      <StWriteBtn onClick={() => navigate('/write')}>글쓰기</StWriteBtn>
    </Layout>
  );
}

export default List;
