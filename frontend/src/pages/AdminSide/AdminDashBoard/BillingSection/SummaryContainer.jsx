import styled from 'styled-components';

export default function SummaryContainer({ data }) {
  const totalBilling = data.reduce((acc, curr) => {
    acc += curr.totalValue;
    return acc;
  }, 0);

  return (
    <OverviewContainer>
      <div>
        <h3>Clientes atendidos:</h3>
        <strong>{`${data.length} ${data.length > 1 ? 'clientes' : 'cliente'}`}</strong>
      </div>
      <div>
        <h3>Faturamento total:</h3>
        <strong>{(totalBilling / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
      </div>
      <div>
        <h3>Ticket Médio: </h3>
        <strong>
          {(totalBilling / data.length / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </strong>
      </div>
    </OverviewContainer>
  );
}

const OverviewContainer = styled.section`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  > span {
    font-size: 80px;
    font-weight: 400;
    color: #3f6ad8;
  }

  > div {
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 10px;
    box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);

    > h3 {
      font-size: 20px;
      font-weight: 400;
      color: #3f6ad8;
      margin-bottom: 15px;
    }

    > strong {
      font-size: 30px;
      font-weight: 400;
      width: 100%;
      text-align: end;
      color: #208120;
    }
  }

  > div:nth-of-type(1) {
    > strong {
      color: #121111;
    }
  }
`;
