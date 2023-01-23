import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ProductCard from '../../components/Dashboard/FoodsAndDrinksPages/ProductCard';
import Home from '../Dashboard/Home';

export default function ChartPage() {
  const navigate = useNavigate();
  const mockedOrderList = [
    {
      id: 1,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
      name: 'Salada de salmão',
      value: 4099,
      amount: 2,
      optionals: ['carne'],
    },
    {
      id: 2,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
      name: 'Salada de salmão',
      value: 2599,
      amount: 1,
    },
    {
      id: 3,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
      name: 'Salada de salmão',
      value: 2599,
      amount: 3,
      optionals: ['carne'],
    },
    {
      id: 4,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
      name: 'Salada de salmão',
      value: 2599,
      amount: 12,
    },
  ];

  function calculateTotalValue() {
    const sumValues = mockedOrderList.reduce((acc, curr) => {
      acc += curr.value;
      return acc;
    }, 0);
    return `R$ ${sumValues / 100}`;
  }

  return (
    <>
      <OpacityStyle onClick={() => navigate('/home')} />
      <Home />
      <ChartWindow>
        <button onClick={() => navigate('/home')}>X</button>
        <header>MEU PEDIDO</header>
        <OrderContainer>
          {mockedOrderList.map(({ name, value, id, image, optionals, amount }) => (
            <ProductCard key={id} name={name} value={value} image={image} optionals={optionals} amount={amount} chart />
          ))}
        </OrderContainer>
        <footer>
          <div>
            <h2>VALOR TOTAL:</h2>
            <h3>{calculateTotalValue()}</h3>
          </div>
          <button>ENVIAR PEDIDO</button>
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
  margin-top: 12%;
  margin-bottom: 14.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;
