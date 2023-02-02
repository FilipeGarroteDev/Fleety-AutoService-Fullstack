import styled from 'styled-components';

export default styled.li`
  width: 100%;
  padding: ${(props) => (props.order ? '10px 20px' : '0')};
  height: ${(props) => (props.order ? 'auto' : '60px')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  > div {
    width: ${(props) => (props.order ? '20%' : '15%')};
    display: flex;
    justify-content: center;

    > h3 {
      font-weight: 400;
    }

    > h2 {
      font-weight: 500;
      font-size: 18px;
      color: #294897;
    }

    > svg {
      color: #3f6ad8;
      font-size: 22px;
    }

    > button {
      width: 120px;
      height: 35px;
      border: none;
      background-color: #5b82e4;
      border-radius: 8px;
      box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);
      color: #ffffff;
      font-size: 16px;
      font-weight: 400;

      &:hover {
        cursor: pointer;
        filter: brightness(1.1);
      }
    }
  }

  &:nth-child(even) {
    background-color: aliceblue;
  }
`;
