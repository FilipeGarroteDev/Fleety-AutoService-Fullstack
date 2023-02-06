import styled from 'styled-components';

export default styled.form`
  width: 85%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: white;

  input {
    width: 100%;
    height: 30px;
    border: none;
    border-bottom: 1px #121111 solid;
    padding: 6px 0;
    background-color: #d9d9d9;
    color: #121111;
    font-size: 15px;
    font-weight: 400;
    outline: none;

    &::placeholder {
      color: #121111;
      font-size: 12px;
      font-weight: 300;
    }
  }
`;
