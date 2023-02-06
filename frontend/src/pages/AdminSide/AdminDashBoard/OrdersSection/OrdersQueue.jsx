import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { updateOrderStatus } from '../../../../services/axios/orders-connections';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';

export default function OrdersQueue({ data, refetch }) {
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
          refetch={refetch}
        />
      ))}
    </Wrapper>
  );
}

function OrderLine({ id, ticketId, amount, optionals, createdAt, name, header, table, refetch }) {
  const [isClicked, setIsClicked] = useState(false);
  const date = dayjs(createdAt).format('DD/MM/YY');
  const hour = dayjs(createdAt).format('HH:mm');

  const timeDiff = dayjs(Date.now() - dayjs(createdAt)).format('mm:ss');

  async function deliverOrder() {
    setIsClicked(true);

    try {
      await updateOrderStatus(id);
      toast.success('O pedido está a caminho do cliente!', { theme: 'light' });
      setIsClicked(false);
      refetch();
    } catch (error) {
      toast.error('Algo deu errado. Atualize a página e tente novamente.', { theme: 'light' });
      setIsClicked(false);
    }
  }

  return (
    <LineStyle order>
      <div>{header ? <h2>Mesa</h2> : <h3>{table}</h3>}</div>
      <div>{header ? <h2>Nº Comanda</h2> : <span>{ticketId}</span>}</div>
      <div>{header ? <h2>Item</h2> : <span>{`${amount}x ${name}`}</span>}</div>
      <div>{header ? <h2>Observações</h2> : <span>{optionals}</span>}</div>
      <div>{header ? <h2>Entrada</h2> : <span>{`${hour} - ${date}`}</span>}</div>
      <div>{header ? <h2>Tempo de espera</h2> : <span>{`${timeDiff}`}</span>}</div>
      <div>
        {header ? '' : <button onClick={deliverOrder}>{isClicked ? <ThreeDots color="#ece8e8" /> : 'Entregar'}</button>}
      </div>
    </LineStyle>
  );
}

const Wrapper = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
