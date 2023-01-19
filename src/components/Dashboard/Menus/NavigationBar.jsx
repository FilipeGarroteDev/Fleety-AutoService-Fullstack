import styled from 'styled-components';
import { GiWineBottle } from 'react-icons/gi';
import { IoRestaurant, IoHome } from 'react-icons/io5';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
  return (
    <Container>
      <ButtonsContainer>
        <Link to="/home">
          <button>
            <IoHome />
            <span>Home</span>
          </button>
        </Link>

        <Link to="/foods">
          <button>
            <IoRestaurant />
            <span>Comidas</span>
          </button>
        </Link>

        <Link to="/beverages">
          <button>
            <GiWineBottle />
            <span>Bebidas</span>
          </button>
        </Link>
      </ButtonsContainer>
      <div>
        <p>Avaliar</p>
        <p>Logout</p>
      </div>
    </Container>
  );
}

const Container = styled.aside`
  padding-bottom: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 12%;
  height: 100%;
  background-color: #292727;
  box-shadow: 0 6px 10px 5px rgba(0, 0, 0, 0.4);
  position: fixed;
  bottom: 0;
  top: 100px;
  left: 0;
  z-index: 1;

  > div {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    p {
      color: #ffffff;
      font-size: 16px;
      font-weight: 700;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;

const ButtonsContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;

  > a {
    text-decoration: none;

    button {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      height: 160px;
      border: none;
      border-top: 0.5px solid #000000;
      border-bottom: 0.5px solid #000000;
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
  }
`;
