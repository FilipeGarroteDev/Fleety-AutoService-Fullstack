import { useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import AddItemsMenu from './AddItemsMenu';
import WithdrawItemsMenu from './WithdrawItemsMenu';

export default function ProductPage() {
  const [productAmount, setProductAmount] = useState(1);
  const [extraValue, setExtraValue] = useState(0);
  const mockValue = 2599;
  const formattedValue = (((mockValue + extraValue) * productAmount) / 100).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  function increaseOrDecreaseProductAmount(operation) {
    if (operation === '-' && productAmount > 1) {
      setProductAmount(productAmount - 1);
    } else if (operation === '+') {
      setProductAmount(productAmount + 1);
    }
  }

  return (
    <Wrapper>
      <ProductBanner>
        <img
          src="https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd"
          alt="productImage"
        />
        <h1>Salada de salmão</h1>
      </ProductBanner>
      <h2>
        Salada fresca com folhas diversas, incluindo alface crespa, rúcula e alface americana, além de salmão desfiado,
        azeitonas e muçarela de búfala.
      </h2>
      <WithdrawItemsMenu />
      <AddItemsMenu extraValue={extraValue} setExtraValue={setExtraValue} />
      <FinishOrderSection>
        <aside>
          <AiOutlineMinusCircle onClick={() => increaseOrDecreaseProductAmount('-')} />
          <strong>{productAmount}</strong>
          <AiOutlinePlusCircle onClick={() => increaseOrDecreaseProductAmount('+')} />
        </aside>
        <button>{`${formattedValue} Adicionar`}</button>
      </FinishOrderSection>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-right: 20px;
  padding-bottom: 150px;
  overflow-x: hidden;
  overflow-y: auto;

  > h2 {
    font-size: 26px;
    color: #d9d9d9;
  }
`;

const ProductBanner = styled.header`
  width: 100%;
  height: 200px;
  background-color: #000000;
  box-shadow: 5px 0 15px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;

  > img {
    @keyframes animateImage {
      0% {
        transform: translateY(100px);
      }
      100% {
        transform: translateY(0);
      }
    }

    width: 100%;
    height: 500%;
    position: absolute;
    top: -500px;
    mask-image: linear-gradient(to top, #0000001f, #000000df);
    -webkit-mask-image: linear-gradient(to top, #0000001f, #000000df);
    animation: animateImage 5s ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  > h1 {
    width: 300px;
    position: absolute;
    color: #ffffff;
    font-size: 40px;
    font-weight: 700;
    bottom: 10px;
    left: calc(50% - 150px);
  }
`;

const FinishOrderSection = styled.footer`
  width: 100%;
  height: 100px;
  padding-left: 14%;
  padding-right: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  background-color: #544e4e;

  > aside {
    display: flex;
    align-items: center;
    gap: 15px;

    > svg {
      color: #d9d9d9;
      font-size: 40px;
    }

    > strong {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      background-color: #d9d9d9;
      border-radius: 50px;
      color: #544e4e;
      font-size: 20px;
      font-weight: 700;
    }
  }

  > button {
    width: 160px;
    height: 80px;
    border-radius: 15px;
    background-color: #2a6437;
    border: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
