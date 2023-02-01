import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';

export default function OrdersSection() {
  const table = 'Mesa 13';

  const ordersMock = [
    {
      id: 1,
      ticketId: 1,
      amount: 5,
      optionals:
        'Retirar: por gentileza, retirar a porra toda, desde salada até à carne. Ah, no bife acebolado, traz sem cebola\nAdicionais: 1x Ovo frito, 2x Bacon em fatia, 1x Maionese da casa, 1x Batata frita',
      createdAt: Date.now(),
      Product: {
        name: 'Salada de tomate com bife acebolado.',
      },
    },
    {
      id: 2,
      ticketId: 2,
      amount: 1,
      optionals: 'Adicionais: 1x Ovo frito, 2x Bacon em fatia, 1x Maionese da casa, 1x Batata frita',
      createdAt: Date.now(),
      Product: {
        name: 'Salada de tomate com bife acebolado.',
      },
    },
    {
      id: 3,
      ticketId: 3,
      amount: 2,
      optionals:
        'Retirar: por gentileza, retirar a porra toda, desde salada até à carne. Ah, no bife acebolado, traz sem cebola\n',
      createdAt: Date.now(),
      Product: {
        name: 'Salada de tomate com bife acebolado.',
      },
    },
    {
      id: 4,
      ticketId: 4,
      amount: 10,
      optionals:
        'Retirar: por gentileza, retirar a porra toda, desde salada até à carne. Ah, no bife acebolado, traz sem cebola\nAdicionais: 1x Ovo frito, 2x Bacon em fatia, 1x Maionese da casa, 1x Batata frita',
      createdAt: Date.now(),
      Product: {
        name: 'Salada de tomate com bife acebolado.',
      },
    },
    {
      id: 5,
      ticketId: 5,
      amount: 5,
      optionals:
        'Retirar: por gentileza, retirar a porra toda, desde salada até à carne. Ah, no bife acebolado, traz sem cebola\nAdicionais: 1x Ovo frito, 2x Bacon em fatia, 1x Maionese da casa, 1x Batata frita',
      createdAt: Date.now(),
      Product: {
        name: 'Salada de tomate com bife acebolado.',
      },
    },
  ];

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Pedidos pendentes</h1>
        <span>Abaixo estão listados os pedidos pendentes de entrega.</span>
      </SectionTitle>
      <SummaryContainer>
        <div>
          <h3>Em espera:</h3>
          <strong>{ordersMock.length}</strong>
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
        {ordersMock.map(({ id, ticketId, amount, optionals, createdAt, Product }) => (
          <OrderLine
            id={id}
            ticketId={ticketId}
            amount={amount}
            optionals={optionals}
            createdAt={createdAt}
            name={Product.name}
            table={table}
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
