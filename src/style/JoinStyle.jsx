import { styled } from 'styled-components';

export const StFormBg = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${(props) => props.width || '800px'};
  height: ${(props) => props.height || '600px'};
  padding: ${(props) => props.padding};
  background-color: white;
  border-radius: 30px;
  box-shadow: 5px 5px 10px 0 #00000030;
  display: flex;
  flex-direction: ${(props) => props.flexDirection || 'column'};
  align-items: center;
  justify-content: center;
  margin-top: ${(props) => props.marginTop};

  & h2 {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 60px;
  }
  & label {
    display: flex;
    flex-direction: column;
  }
  & p {
    color: red;
    font-size: 12px;
    margin-bottom: 20px;
    line-height: 18px;
  }
`;
