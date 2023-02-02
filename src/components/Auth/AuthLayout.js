import styled from 'styled-components';

export default styled.section`
  height: 60%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.3);

  > span {
    font-size: 12px;
    font-weight: 400;
    color: #ffffff;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
      font-weight: 700;
    }
  }

  >img{
    width: 150px;
    height: 150px;
  }
`;
