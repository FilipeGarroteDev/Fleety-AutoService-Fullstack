import styled from 'styled-components';

export default styled.button`
  width: ${(props) => (props.logout ? '30%' : 'auto')};
  margin-top: 30px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #7a7474;
  background-color: #c4bdbd;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  animation: fadeIn 1s;
  color: #7a7474;
  font-weight: 700;

  cursor: pointer;
  :active {
    transform: translate(-5px, 5px);
  }
`;
