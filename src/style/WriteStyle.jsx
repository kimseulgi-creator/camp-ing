import { styled } from 'styled-components';

export const StLabel = styled.label`
  flex-direction: row !important;
  align-items: center;
  justify-content: space-between;
  &:nth-child(2) input {
    width: 130px;
    &:nth-child(1) {
      margin-right: 15px;
    }
    &:nth-child(2) {
      margin-left: 15px;
    }
  }
  & input {
    width: 305px;
    margin-left: 30px;
    line-height: 30px;
  }
  & textarea {
    width: 100%;
    margin-top: 30px;
    height: 150px;
    padding: 10px;
    border: none;
    resize: none;
    box-shadow: 3px 3px 10px 0 #00000030 inset;
    margin-bottom: 60px;
    line-height: 24px;
  }
`;
