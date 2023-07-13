import { styled } from 'styled-components';
import writeBtn from '../images/write_btn.svg';

export const StContainer = styled.div`
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

export const StPostingCard = styled.div`
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

export const StPostingWord = styled.div`
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

export const StWriteBtn = styled.a`
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
