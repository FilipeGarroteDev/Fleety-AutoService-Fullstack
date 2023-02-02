import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { useEffect, useState } from 'react';
import { getAllPreparingOrders } from '../../../../services/axios';

export default function OrdersSection() {
  const [ordersList, setOrdersList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const preparingOrders = await getAllPreparingOrders();
        setOrdersList(preparingOrders.data);
      } catch (error) {
        alert('Algo deu errado com sua requisição. Por favor, atualize a página');
      }
    }
    fetchData();
  }, []);

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Pedidos pendentes</h1>
        <span>Abaixo estão listados os pedidos pendentes de entrega.</span>
      </SectionTitle>
      <SummaryContainer>
        <div>
          <h3>Em espera:</h3>
          <strong>{ordersList.length}</strong>
        </div>
        <div>
          <h3>Entregues:</h3>
          <strong>53</strong>
        </div>
        <div>
          <h3>Total:</h3>
          <strong>10</strong>
        </div>
      </SummaryContainer>
      <OrdersQueue>
        <OrderLine header />
        {ordersList.map(({ id, ticketId, amount, optionals, createdAt, Product, Ticket }) => (
          <OrderLine
            id={id}
            ticketId={ticketId}
            amount={amount}
            optionals={optionals}
            createdAt={createdAt}
            name={Product.name}
            table={Ticket.User.name}
          />
        ))}
      </OrdersQueue>
    </SectionContainer>
  );
}

function OrderLine({ id, ticketId, amount, optionals, createdAt, name, header, table }) {
  return (
    <LineStyle order>
      <div>{header ? <h2>Mesa</h2> : <h3>{table}</h3>}</div>
      <div>{header ? <h2>Nº Comanda</h2> : <span>{ticketId}</span>}</div>
      <div>{header ? <h2>Item</h2> : <span>{`${amount}x ${name}`}</span>}</div>
      <div>{header ? <h2>Observações</h2> : <span>{optionals}</span>}</div>
      <div>{header ? <h2>Entrada</h2> : <span>{createdAt}</span>}</div>
      <div>{header ? <h2>Tempo de espera</h2> : <span>15m</span>}</div>
      <div>{header ? '' : <button>Entregar</button>}</div>
    </LineStyle>
  );
}

const SummaryContainer = styled.section`
  width: 100%;
  height: 130px;
  padding: 0 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  > div {
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);

    > h3 {
      font-size: 22px;
      font-weight: 400;
      color: #3f6ad8;
    }

    > strong {
      font-size: 46px;
      font-weight: 400;
      width: 100%;
      text-align: start;
    }
  }
`;

const OrdersQueue = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
