import styled from 'styled-components';
import { BsFillStopwatchFill, BsStarFill, BsPeopleFill, BsChevronRight } from 'react-icons/bs';
import { IoFastFoodSharp } from 'react-icons/io5';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';

export default function AdminNavBar() {
  return (
    <Container>
      <h1>Navegação</h1>
      <ButtonDiv>
        <BsFillStopwatchFill />
        <span>Aguardando atendimento</span>
        <BsChevronRight />
      </ButtonDiv>
      <ButtonDiv>
        <IoFastFoodSharp />
        <span>Aguardando pedidos</span>
        <BsChevronRight />
      </ButtonDiv>
      <ButtonDiv>
        <RiMoneyDollarCircleFill />
        <span>Faturamento</span>
        <BsChevronRight />
      </ButtonDiv>
      <ButtonDiv>
        <BsStarFill />
        <span>Avalições dos clientes</span>
        <BsChevronRight />
      </ButtonDiv>
      <ButtonDiv>
        <BsPeopleFill />
        <span>Cadastro de usuário</span>
        <BsChevronRight />
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
  z-index: 1;

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
`;
