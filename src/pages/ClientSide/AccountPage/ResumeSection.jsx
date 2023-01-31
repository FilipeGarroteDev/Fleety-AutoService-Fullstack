import { useEffect, useState } from 'react';
import styled from 'styled-components';
import fleetyLogo from '../../../assets/images/fleetyLogo.png';

export default function ResumeSection({ finishedOrders, totalValue, setTotalValue }) {
  const [peopleQuantity, setPeopleQuantity] = useState(1);
  const [tipValue, setTipValue] = useState(1);

  function selectPeopleQuantity(e) {
    setPeopleQuantity(e.target.value);
  }

  useEffect(() => {
    const sumValues = finishedOrders.reduce((acc, curr) => {
      acc += curr.totalValue;
      return acc;
    }, 0);

    setTotalValue(sumValues * tipValue);
  }, [finishedOrders, tipValue]);

  return (
    <ResumeContainer>
      <h2>Resumo do pedido</h2>
      <ul>
        {finishedOrders.map(({ id, amount, Product, totalValue }) => (
          <OrderItem key={id} amount={amount} name={Product.name} value={totalValue} />
        ))}
      </ul>
      <Subtotal>
        <div>
          <h3>Total + gorjeta:</h3>
          <span>{(totalValue / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
        </div>
      </Subtotal>
      <TipsContainer>
        <h3>Gostaria de adicionar gorjeta?</h3>
        <div>
          <TipButton onClick={() => setTipValue(1)} tipValue={tipValue} thisTip={1}>
            0%
          </TipButton>
          <TipButton onClick={() => setTipValue(1.1)} tipValue={tipValue} thisTip={1.1}>
            10%
          </TipButton>
          <TipButton onClick={() => setTipValue(1.15)} tipValue={tipValue} thisTip={1.15}>
            15%
          </TipButton>
          <TipButton onClick={() => setTipValue(1.2)} tipValue={tipValue} thisTip={1.2}>
            20%
          </TipButton>
        </div>
      </TipsContainer>
      <SplitContainer>
        <h3>Não está sozinho? Calcule a divisão correta:</h3>
        <input type="range" min="1" max="15" value={peopleQuantity} onChange={selectPeopleQuantity} />
        <div>
          <h3>Total por pessoa {`(${peopleQuantity}p)`}:</h3>
          <span>
            {(totalValue / 100 / peopleQuantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </div>
      </SplitContainer>
      <img src={fleetyLogo} alt="logo" />
    </ResumeContainer>
  );
}

function OrderItem({ amount, name, value }) {
  const formattedValue = (value / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  const formattedName = name[0].toUpperCase() + name.toLowerCase().slice(1);

  return (
    <ItemStyle>
      <p>{`${amount}x`}</p>
      <p>{formattedName}</p>
      <span>{formattedValue}</span>
    </ItemStyle>
  );
}

const ResumeContainer = styled.div`
  width: 35%;
  height: 100%;
  border-right: 1px solid #928f8f;
  padding: 15px 20px;
  flex-shrink: 0;

  > h2 {
    font-size: 20px;
    font-weight: 700;
    color: #312e2e;
    margin-bottom: 10px;
  }

  > ul {
    height: 150px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-track {
      background: #a39d9d;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #292727;
      border-radius: 50px;
      border: 3px solid #a39d9d;
    }
  }

  > img {
    margin-left: 65px;
  }
`;

const ItemStyle = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #312e2e;
  font-size: 18px;

  > p:nth-of-type(2) {
    width: 60%;
  }

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
  }
`;

const TipButton = styled.button`
  width: 20%;
  height: 40px;
  border: 1px solid #275832;
  border-radius: 25px;
  background-color: ${(props) => (props.tipValue === props.thisTip ? '#275832' : '#a39d9d')};
  color: ${(props) => (props.tipValue === props.thisTip ? '#a39d9d' : '#275832')};
  font-size: 16px;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
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
