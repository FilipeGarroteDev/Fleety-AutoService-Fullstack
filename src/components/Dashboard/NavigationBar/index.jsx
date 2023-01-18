import styled from 'styled-components';

export default function NavigationBar() {
  return <Container></Container>;
}

const Container = styled.aside`
  width: 160px;
  height: 100%;
  background-color: #292727;
  box-shadow: 0 6px 10px 5px rgba(0,0,0,0.4);
  position: absolute;
  bottom: 0;
  top: 100px;
  left: 0;
`;
