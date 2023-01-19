import styled from 'styled-components';
import fleetyLogo from '../../../assets/images/fleetyLogo.png';
import { IoHandRight, IoWallet } from 'react-icons/io5';
import { BsFillCartCheckFill } from 'react-icons/bs';

export default function TopMenu() {
  return (
    <Container>
      <img src={fleetyLogo} alt="logo" />
      <div>Mesa 15</div>
      <ButtonsContainer>
        <button>
          <IoHandRight />
          <span>Chamar garçom</span>
        </button>
        <button>
          <IoWallet />
          <span>Minha conta</span>
        </button>
        <button>
          <BsFillCartCheckFill />
          <span>Meu pedido</span>
        </button>
      </ButtonsContainer>
    </Container>
  );
}

const Container = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: #292727;
  box-shadow: 6px 0 10px 5px rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;

  > img {
    width: 160px;
    height: 100px;
  }

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 140px;
    height: 40px;
    border-radius: 30px;
    background-color: #dea12a;
    color: #292727;
    font-size: 18px;
    font-weight: 700;
  }
`;

const ButtonsContainer = styled.nav`
  display: flex;
  width: auto;
  height: 100%;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 200px;
    height: 100%;
    border-left: 0.5px solid #000000;
    background-color: #292727;

    > svg {
      color: #dea12a;
      font-size: 35px;
    }

    > span {
      width: 85px;
      color: #dea12a;
      font-size: 18px;
      font-weight: 700;
    }

    &:hover {
      cursor: pointer;
      background-color: #121111;
    }
  }
`;
