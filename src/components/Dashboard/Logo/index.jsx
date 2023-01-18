import styled from 'styled-components';
import fleetyLogo from '../../../assets/images/fleetyLogo.png';

export default function Logo() {
  return (
    <Container>
      <img src={fleetyLogo} alt="logo" />
    </Container>
  );
}

const Container = styled.aside`
  width: 160px;
  height: 100px;
  background-color: #292727;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  > img {
    width: 160px;
    height: 100px;
  }
`;
