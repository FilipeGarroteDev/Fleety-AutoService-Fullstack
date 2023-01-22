import styled from 'styled-components';

export default styled.section`
  width: 100%;
  height: auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #655d5d;
  border-radius: 6px;
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.3);
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin-top: 25px;
  transition: all 0.3s;
  overflow: hidden;

  > .closed {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > .opened {
    display: flex;
    height: ${(props) => (props.isClicked ? '205px' : '0')};
    width: 100%;
    transition: all 1s;

    > textarea {
      width: 100%;
      height: 80%;
      background-color: #655d5d;
      border-radius: 15px;
      border: 1px solid #d9d9d9;
      outline: none;
      resize: none;
      font-size: 20px;
      color: #d9d9d9;
      padding: 15px;

      ::placeholder {
        font-size: 16px;
        color: #d9d9d9;
        font-style: italic;
      }
    }
  }
`;
