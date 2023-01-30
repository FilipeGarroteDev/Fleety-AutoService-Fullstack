import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/Dashboard/FoodsAndDrinksPages/ProductCard';
import { finishOrderAndUpdateStatus, listAllOrders } from '../../services/axios';
import Home from '../Dashboard/Home';

export default function ChartPage() {
  const navigate = useNavigate();
  const [ordersList, setOrdersList] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    const storedTicket = JSON.parse(localStorage.getItem('ticket'));
    setTicket(storedTicket);

    async function fetchData() {
      try {
        const promise = await listAllOrders(storedTicket.id);
        setOrdersList(promise.data);
      } catch (error) {
        alert('Algo deu errado em sua requisição. Tente novamente mais tarde');
        navigate('/home');
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
    const body = {
      ticketId: ticket.id,
      status: 'PREPARING',
    };

    try {
      await finishOrderAndUpdateStatus(body);
      alert(
        'Seu pedido foi enviado para a cozinha! Você já consegue visualizá-lo no menu "Minha Conta". Fique à vontade para escolher mais itens! :)'
      );
      navigate('/foods');
    } catch (error) {
      alert(
        'Ocorreu um erro com seu pedido. Certifique-se de que seu pedido não está vazio ou, caso o erro persista, chame o garçom.'
      );
    }
  }

  return (
    <>
      <OpacityStyle onClick={() => navigate('/home')} />
      <Home />
      <ChartWindow>
        <button onClick={() => navigate('/home')}>X</button>
        <header>MEU PEDIDO</header>
        <OrderContainer>
          {ordersList.length === 0 ? (
            <h1>Não tem nada</h1>
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
          <button onClick={checkout}>ENVIAR PEDIDO</button>
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

  width: 50%;
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
      border: none;
      background-color: #dea12a;
      border-radius: 15px;
      color: #292727;
      font-weight: 700;
      font-size: 16px;
    }
  }
`;

const OrderContainer = styled.div`
  width: 100%;
  height: 71.5%;
  display: flex;
  margin-top: 12.5%;
  padding-top: 3%;
  padding-left: 5%;
  padding-bottom: 5%;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;

  &::-webkit-scrollbar-track {
    background: #a39d9d;
  }

  &::-webkit-scrollbar-thumb {
    border: 3px solid #a39d9d;
  }
`;
