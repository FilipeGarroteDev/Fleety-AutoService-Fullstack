import { useState } from 'react';
import styled from 'styled-components';

export default function ResumeSection() {
  const mockOrders = [
    {
      id: 1,
      amount: 2,
      name: 'Salada de atum',
      value: 2599,
    },
    {
      id: 1,
      amount: 2,
      name: 'Salada de atum',
      value: 2599,
    },
    {
      id: 1,
      amount: 2,
      name: 'Salada de atum',
      value: 2599,
    },
    {
      id: 1,
      amount: 2,
      name: 'Salada de atum',
      value: 2599,
    },
    {
      id: 1,
      amount: 2,
      name: 'Salada de atum',
      value: 2599,
    },
    {
      id: 1,
      amount: 2,
      name: 'Salada de atum',
      value: 2599,
    },
  ];
  const [peopleQuantity, setPeopleQuantity] = useState(1);

  function selectPeopleQuantity(e) {
    setPeopleQuantity(e.target.value);
  }

  return (
    <ResumeContainer>
      <h2>Resumo do pedido</h2>
      <ul>
        {mockOrders.map(({ id, amount, name, value }) => (
          <OrderItem key={id} amount={amount} name={name} value={value} />
        ))}
      </ul>
      <Subtotal>
        <div>
          <h3>Subtotal:</h3>
          <span>R$ 181,93</span>
        </div>
        <div>
          <h3>Total + gorjeta:</h3>
          <span>R$ 201,12</span>
        </div>
      </Subtotal>
      <TipsContainer>
        <h3>Gostaria de adicionar gorjeta?</h3>
        <div>
          <button>0%</button>
          <button>10%</button>
          <button>15%</button>
          <button>20%</button>
        </div>
      </TipsContainer>
      <SplitContainer>
        <h3>Não está sozinho? Calcule a divisão correta:</h3>
        <input type="range" min="1" max="15" value={peopleQuantity} onChange={selectPeopleQuantity} />
        <div>
          <h3>Total por pessoa {`(${peopleQuantity}p)`}:</h3>
          <span>{'R$ '+(201.12 / peopleQuantity).toFixed(2)}</span>
        </div>
      </SplitContainer>
    </ResumeContainer>
  );
}

function OrderItem({ amount, name, value }) {
  const formattedValue = (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <ItemStyle>
      <p>{`${amount}x`}</p>
      <p>{name}</p>
      <span>{formattedValue}</span>
    </ItemStyle>
  );
}

const ResumeContainer = styled.div`
  width: 35%;
  height: 100%;
  border-right: 1px solid #928f8f;
  padding: 15px 20px;

  > h2 {
    font-size: 20px;
    font-weight: 700;
    color: #312e2e;
    margin-bottom: 10px;
  }

  > ul {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
  }
`;

const ItemStyle = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #312e2e;
  font-size: 18px;

  > span {
    color: #275832;
    font-size: 14px;
    font-weight: 700;
  }
`;

const Subtotal = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-top: 1px solid #928f8f;
  border-bottom: 1px solid #928f8f;
  padding: 10px 0;
  margin-bottom: 10px;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    > h3 {
      font-size: 18px;
      font-weight: 700;
      color: #312e2e;
    }

    > span {
      color: #275832;
      font-size: 14px;
      font-weight: 700;
    }
  }
`;

const TipsContainer = styled.footer`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;

  > h3 {
    font-size: 18px;
    font-weight: 700;
    color: #312e2e;
  }

  > div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > button {
      width: 20%;
      height: 40px;
      border: 1px solid #275832;
      border-radius: 25px;
      background-color: #a39d9d;
      color: #275832;
      font-size: 16px;
      font-weight: 700;
    }
  }
`;

const SplitContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  border-top: 1px solid #928f8f;
  padding-top: 10px;

  > h3 {
    font-size: 18px;
    font-weight: 700;
    color: #312e2e;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 0.5em;
    left: 4em;
    border-radius: 5px;
    background-color: #312e2e;
    outline: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #275832;
      cursor: pointer;
    }
  }

  > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 5px;

    > h3 {
      font-size: 17px;
      font-weight: 700;
      color: #312e2e;
    }

    > span {
      color: #275832;
      font-size: 14px;
      font-weight: 700;
    }
  }
`;
