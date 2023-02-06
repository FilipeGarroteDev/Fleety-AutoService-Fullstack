import dayjs from 'dayjs';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';

export default function TicketsList({ data }) {
  return (
    <Wrapper>
      <OrderLine header />
      {data.map(({ id, ticketId, totalValue, isSplitted, createdAt }) => (
        <OrderLine key={id} ticketId={ticketId} totalValue={totalValue} isSplitted={isSplitted} createdAt={createdAt} />
      ))}
    </Wrapper>
  );
}

function OrderLine({ ticketId, totalValue, isSplitted, createdAt, header }) {
  const date = dayjs(createdAt).format('DD/MM/YY');
  const formattedValue = (totalValue/100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <LineStyle order>
      <div>{header ? <h2>Nº Comanda</h2> : <span>{ticketId}</span>}</div>
      <div>{header ? <h2>Valor da conta</h2> : <span>{`${formattedValue}`}</span>}</div>
      <div>{header ? <h2>Método de Pagamento</h2> : <span>{isSplitted ? 'Dividido' : 'Cartão de Crédito'}</span>}</div>
      <div>{header ? <h2>Data do Atendimento</h2> : <span>{`${date}`}</span>}</div>
    </LineStyle>
  );
}

const Wrapper = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
