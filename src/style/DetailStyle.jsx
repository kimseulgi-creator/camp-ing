import { styled } from 'styled-components';

export const StDetailImg = styled.div`
  width: 590px;
  height: 620px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  & img {
    height: 100%;
  }
`;
export const StDetailContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-left: 80px;
  & p {
    color: black;
    font-size: 24px;
  }
`;
export const StInfo = styled.dl`
  margin: 60px 0px;
  & p {
    color: #2b8279;
    font-size: 16px;
    display: block;
    font-weight: bold;
  }
  & dl {
    margin: 30px 0px;
    display: flex;
    align-items: center;

    & dt {
      font-size: 24px;
      display: flex;
      align-items: center;
    }
    & dd {
      margin-left: 20px;
      font-size: 18px;
    }
    &:nth-child(2) {
      margin-top: 0px;
    }
    &:nth-child(4) {
      flex-direction: column;
      align-items: normal;
      dd {
        margin: 15px 0px 0px 0px;
        height: 200px;
        overflow: auto;
      }
    }
  }
`;
