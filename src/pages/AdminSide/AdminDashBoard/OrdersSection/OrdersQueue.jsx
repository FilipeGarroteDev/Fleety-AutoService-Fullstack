import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { updateOrderStatus } from '../../../../services/axios/orders-connections';

export default function OrdersQueue({ data }) {
  return (
    <Wrapper>
      <OrderLine header />
      {data.map(({ id, ticketId, amount, optionals, createdAt, Product, Ticket }) => (
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
    </Wrapper>
  );
}

function OrderLine({ id, ticketId, amount, optionals, createdAt, name, header, table }) {
  async function deliverOrder() {
    try {
      await updateOrderStatus(id);
    } catch (error) {
      alert('Algo deu errado. Atualize a página e tente novamente.');
    }
  }

  return (
    <LineStyle order>
      <div>{header ? <h2>Mesa</h2> : <h3>{table}</h3>}</div>
      <div>{header ? <h2>Nº Comanda</h2> : <span>{ticketId}</span>}</div>
      <div>{header ? <h2>Item</h2> : <span>{`${amount}x ${name}`}</span>}</div>
      <div>{header ? <h2>Observações</h2> : <span>{optionals}</span>}</div>
      <div>{header ? <h2>Entrada</h2> : <span>{createdAt}</span>}</div>
      <div>{header ? <h2>Tempo de espera</h2> : <span>15m</span>}</div>
      <div>{header ? '' : <button onClick={deliverOrder}>Entregar</button>}</div>
    </LineStyle>
  );
}

const Wrapper = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
