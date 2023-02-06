import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 30px;
  background: linear-gradient(to right, #272a5d, #866575);
  border: none;
  border-radius: 8px;
  margin-top: 10px;
  color: #ffffff;
  font-size: 14px;

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;
