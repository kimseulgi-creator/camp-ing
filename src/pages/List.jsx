import React from 'react';
import Layout from '../components/Layout';
import { styled } from 'styled-components';
import writeBtn from '../images/write_btn.svg';
import { useNavigate } from 'react-router';
import { useQuery } from 'react-query';
import { getPosts } from '../api/posts';

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

const StContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  grid-gap: 90px 120px;
  padding: 120px 0;

  & img {
    width: 590px;
  }
`;

const StPostingCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: all ease 0.7s;
  height: 390px;
  overflow: hidden;
  display: flex;
  align-items: center;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 0px #00000030;
  &:hover {
    scale: 1.03;
  }
`;

const StPostingWord = styled.div`
  position: absolute;
  bottom: 0;
  height: 70px;
  background-color: white;
  width: 530px;
  border-radius: 0 0px 30px 30px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  justify-content: space-between;
  & p {
    font-size: 18px;
    font-weight: bold;
  }
  & p:nth-child(2) {
    font-weight: normal;
    font-size: 14px;
  }
`;

const StWriteBtn = styled.a`
  position: fixed;
  bottom: 60px;
  right: 60px;
  background-image: url(${writeBtn});
  width: 60px;
  height: 60px;
  background-color: transparent;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  text-indent: -9999px;
  box-shadow: 5px 5px 10px 0 #00000030;
  border-radius: 100px;
  cursor: pointer;
  transition: all ease 0.7s;
  &:hover {
    transform: rotate(90deg);
    scale: 1.1;
  }
`;
