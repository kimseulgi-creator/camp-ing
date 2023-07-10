import React from 'react';
import Layout from '../components/Layout';
import dummy1 from '../dummy/reveiw01.jpg';
import dummy2 from '../dummy/reveiw02.jpg';
import dummy3 from '../dummy/reveiw03.jpg';
import dummy4 from '../dummy/reveiw04.jpg';
import { styled } from 'styled-components';
import writeBtn from '../images/write_btn.svg';
import { useNavigate } from 'react-router';

function List() {
  const navigate = useNavigate();
  return (
    <Layout>
      <StContainer>
        <StPostingCard>
          <img src={dummy1} />
          <StPostingWord>
            <p>paperwhite_wits</p>
          </StPostingWord>
        </StPostingCard>
        <StPostingCard>
          <img src={dummy2} />
          <StPostingWord>
            <p>near_deer.wits</p>
          </StPostingWord>
        </StPostingCard>
        <StPostingCard>
          <img src={dummy3} />
          <StPostingWord>
            <p>weeny_mt.wits</p>
          </StPostingWord>
        </StPostingCard>
        {/* <div>
          <img src={dummy4} />
          <div>
            <p>lovable._.wits</p>
          </div>
        </div> */}
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
    border-radius: 30px;
    box-shadow: 5px 5px 10px 0px #00000030;
  }
`;

const StPostingCard = styled.div`
  position: relative;
  cursor: pointer;
  transition: all ease 0.7s;
  &:hover {
    scale: 1.03;
  }
`;

const StPostingWord = styled.div`
  position: absolute;
  bottom: 0;
  height: 70px;
  background-color: white;
  width: 100%;
  border-radius: 0 0px 30px 30px;
  display: flex;
  align-items: center;
  & p {
    margin-left: 20px;
    font-size: 18px;
    font-weight: bold;
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
