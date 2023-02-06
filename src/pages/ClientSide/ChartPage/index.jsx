import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import EmptyPage from '../../../components/ClientSideComponents/Dashboard/FoodsAndDrinksPages/EmptyPage';
import ProductCard from '../../../components/ClientSideComponents/Dashboard/FoodsAndDrinksPages/ProductCard';
import { listAllOrders } from '../../../services/axios/orders-connections';
import { finishOrderAndUpdateStatus } from '../../../services/axios/checkout-connections';
import Home from '../ClientDashboard/Home';
import { toast } from 'react-toastify';
import { ThreeDots } from 'react-loader-spinner';

export default function ChartPage() {
  const navigate = useNavigate();
  const [ordersList, setOrdersList] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [rerender, setRerender] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const storedTicket = JSON.parse(localStorage.getItem('ticket'));
    setTicket(storedTicket);

    async function fetchData() {
      try {
        const promise = await listAllOrders(storedTicket.id);
        setOrdersList(promise.data);
      } catch (error) {
        toast.error('Algo deu errado em sua requisição. Tente novamente mais tarde');
        navigate('/');
      }
    }

    if (ticket) {
      fetchData();
    }
  }, [rerender]);

  function calculateTotalValue() {
    const sumValues = ordersList.reduce((acc, curr) => {
      acc += curr.totalValue;
      return acc;
    }, 0);

    return (sumValues / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  async function checkout() {
    setIsClicked(true);
    const body = {
      ticketId: ticket.id,
      status: 'PREPARING',
    };

    try {
      await finishOrderAndUpdateStatus(body);
      toast.success(
        'Seu pedido foi enviado para a cozinha! Você já consegue visualizá-lo no menu "Minha Conta". Fique à vontade para escolher mais itens! :)'
      );
      setIsClicked(false);

      navigate('/foods');
    } catch (error) {
      toast.error(
        'Ocorreu um erro com seu pedido. Certifique-se de que seu pedido não está vazio ou, caso o erro persista, chame o garçom.'
      );
      setIsClicked(false);
    }
  }

  return (
    <>
      <OpacityStyle onClick={() => navigate('/')} />
      <Home />
      <ChartWindow>
        <button onClick={() => navigate('/')}>X</button>
        <header>MEU PEDIDO</header>
        <OrderContainer>
          {ordersList.length === 0 ? (
            <EmptyPage>
              <h1>Ainda não há itens selecionados. Navegue pelo menu lateral para escolher os produtos desejados</h1>
            </EmptyPage>
          ) : (
            ordersList.map(({ totalValue, id, optionals, amount, Product }) => (
              <ProductCard
                key={id}
                name={Product.name}
                value={totalValue}
                image={Product.image}
                optionals={optionals}
                amount={amount}
                id={Product.id}
                orderId={id}
                rerender={rerender}
                setRerender={setRerender}
                chart
              />
            ))
          )}
        </OrderContainer>
        <footer>
          <div>
            <h2>VALOR TOTAL:</h2>
            <h3>{calculateTotalValue()}</h3>
          </div>
          {isClicked ? (
            <button disabled>
              <ThreeDots color="#ece8e8" />
            </button>
          ) : (
            <button onClick={checkout}>ENVIAR PEDIDO</button>
          )}
        </footer>
      </ChartWindow>
    </>
  );
}

const OpacityStyle = styled.main`
  @keyframes opacityWindow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }

  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  top: 0;
  animation: opacityWindow 0.7s ease-in-out;
  background-color: #000000;
  opacity: 0.5;
  z-index: 2;
  padding-left: 14%;

  &:hover {
    cursor: crosshair;
  }
`;

const ChartWindow = styled.section`
  @keyframes showWindow {
    0% {
      right: -50%;
    }
    100% {
      right: 0;
    }
  }

  width: 35%;
  height: 100vh;
  background-color: #a39d9d;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.8);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  animation: showWindow 0.7s ease-in-out;

  > button {
    width: 50px;
    height: 50px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border: none;
    background-color: #dea12a;
    position: absolute;
    left: -50px;
    top: 25px;
    color: #292727;
    font-size: 26px;
    font-weight: 700;

    &:hover {
      cursor: pointer;
      filter: brightness(0.7);
    }
  }

  > header {
    width: inherit;
    height: 14%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #292727;
    color: #dea12a;
    font-size: 40px;
    font-weight: 700;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
  }

  > footer {
    width: inherit;
    height: 14.5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: #d9d9d9;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.8);
    position: fixed;
    bottom: 0;

    > div h2 {
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    > div h3 {
      font-size: 24px;
      font-weight: 700;
      color: #2a6437;
    }

    > button {
      width: 180px;
      height: 65px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      background-color: #dea12a;
      border-radius: 15px;
      color: #292727;
      font-weight: 700;
      font-size: 16px;

      &:hover {
        cursor: pointer;
        filter: brightness(0.95);
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);
      }
    }
  }
`;

const OrderContainer = styled.div`
  width: 100%;
  height: 71.5%;
  display: flex;
  margin-top: 17.5%;
  padding-top: 3%;
  padding-bottom: 5%;
  padding-left: 5%;
  flex-direction: column;
  gap: 10px;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background: #a39d9d;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #a39d9d;
  }
`;
