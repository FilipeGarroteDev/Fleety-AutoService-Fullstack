import styled from 'styled-components';
import { BsFillStopwatchFill, BsStarFill, BsPeopleFill, BsChevronRight } from 'react-icons/bs';
import { IoFastFoodSharp } from 'react-icons/io5';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { ImExit } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';

export default function AdminNavBar() {
  const navigate = useNavigate();
  return (
    <Container>
      <h1>Navegação</h1>
      <ButtonDiv onClick={() => navigate('/admin/waiter-queue')}>
        <BsFillStopwatchFill />
        <span>Aguardando atendimento</span>
        <BsChevronRight />
      </ButtonDiv>
      <ButtonDiv onClick={() => navigate('/admin/orders-queue')}>
        <IoFastFoodSharp />
        <span>Aguardando pedidos</span>
        <BsChevronRight />
      </ButtonDiv>
      {/* <ButtonDiv>
        <RiMoneyDollarCircleFill />
        <span>Faturamento</span>
        <BsChevronRight />
      </ButtonDiv> */}
      <ButtonDiv onClick={() => navigate('/admin/ratings-overview')}>
        <BsStarFill />
        <span>Avalições dos clientes</span>
        <BsChevronRight />
      </ButtonDiv>
      <ButtonDiv onClick={() => navigate('/admin/register')}>
        <BsPeopleFill />
        <span>Cadastro de usuário</span>
        <BsChevronRight />
      </ButtonDiv>
      <ButtonDiv
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        <ImExit />
        <span>Logout</span>
      </ButtonDiv>
    </Container>
  );
}

const Container = styled.aside`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  width: 17%;
  height: 80%;
  background-color: #fafbfc;
  box-shadow: 0 6px 10px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 1000px;
  top: 100px;
  left: 20px;
  z-index: 2;

  > h1 {
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: #3f6ad8;
    margin-bottom: 25px;
  }
`;

const ButtonDiv = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 20px;

  > span {
    width: 70%;
    font-size: 18px;
    color: #3f6ad8;
  }

  > svg {
    font-size: 22px;
    color: #3f6ad8;
  }

  &:hover {
    background-color: aliceblue;
    cursor: pointer;
  }

  &:nth-last-child(1) {
    position: absolute;
    bottom: 40px;

    > span {
      font-size: 18px;
      font-weight: 400;
      color: #bd3550;
    }

    > svg {
      font-size: 22px;
      color: #bd3550;
    }

    &:hover {
      background-color: #e9274e14;
      cursor: pointer;
    }
  }
`;
