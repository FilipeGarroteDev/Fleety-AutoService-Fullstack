import styled from 'styled-components';

export default styled.section`
  height: 300px;
  width: 17%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 30px 0;
  background-color: #121111;
  border-bottom-right-radius: 50px;
  border-top-left-radius: 50px;
  box-shadow: 5px 10px 3px 0px rgba(0, 0, 0, 0.3);

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
