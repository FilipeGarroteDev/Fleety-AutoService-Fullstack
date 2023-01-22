import { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

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

function WithdrawItemsMenu() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <OptionsBoxStyle isClicked={isClicked}>
      <div className="closed" onClick={() => setIsClicked(!isClicked)}>
        <h3>Deseja retirar algum item?</h3>
        {isClicked ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="opened">
        <textarea placeholder="Digite aqui o que deseja retirar..." />
      </div>
    </OptionsBoxStyle>
  );
}

function AddItemsMenu({ extraValue, setExtraValue }) {
  const [isClicked, setIsClicked] = useState(false);
  const mockAddValue = 400;
  const [extraAmount, setExtraAmount] = useState(0);

  function selectExtraItems(operation) {
    if (operation === '-' && extraAmount > 0) {
      setExtraAmount(extraAmount - 1);
      setExtraValue(extraValue - mockAddValue);
    } else if (operation === '+') {
      setExtraAmount(extraAmount + 1);
      setExtraValue(extraValue + mockAddValue);
    }
  }

  return (
    <OptionsBoxStyle isClicked={isClicked}>
      <div className="closed" onClick={() => setIsClicked(!isClicked)}>
        <h3>Adicionais</h3>
        {isClicked ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="opened">
        <ExtraItemsList>
          <li>
            <h5>Adicional Parmesão</h5>
            <aside>
              <span>+ R$ 4,00</span>
              <div>
                <button onClick={() => selectExtraItems('-')}>-</button>
                <strong>{extraAmount}</strong>
                <button onClick={() => selectExtraItems('+')}>+</button>
              </div>
            </aside>
          </li>
          <li>
            <h5>Adicional Parmesão</h5>
            <aside>
              <span>+ R$ 4,00</span>
              <div>
                <button onClick={() => selectExtraItems('-')}>-</button>
                <strong>{extraAmount}</strong>
                <button onClick={() => selectExtraItems('+')}>+</button>
              </div>
            </aside>
          </li>
          <li>
            <h5>Adicional Parmesão</h5>
            <aside>
              <span>+ R$ 4,00</span>
              <div>
                <button onClick={() => selectExtraItems('-')}>-</button>
                <strong>{extraAmount}</strong>
                <button onClick={() => selectExtraItems('+')}>+</button>
              </div>
            </aside>
          </li>
          <li>
            <h5>Adicional Parmesão</h5>
            <aside>
              <span>+ R$ 4,00</span>
              <div>
                <button onClick={() => selectExtraItems('-')}>-</button>
                <strong>{extraAmount}</strong>
                <button onClick={() => selectExtraItems('+')}>+</button>
              </div>
            </aside>
          </li>
          <li>
            <h5>Adicional Parmesão</h5>
            <aside>
              <span>+ R$ 4,00</span>
              <div>
                <button onClick={() => selectExtraItems('-')}>-</button>
                <strong>{extraAmount}</strong>
                <button onClick={() => selectExtraItems('+')}>+</button>
              </div>
            </aside>
          </li>
        </ExtraItemsList>
      </div>
    </OptionsBoxStyle>
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

const OptionsBoxStyle = styled.section`
  width: 100%;
  height: auto;
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #655d5d;
  border-radius: 6px;
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.3);
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  margin-top: 25px;
  transition: all 0.3s;
  overflow: hidden;

  > .closed {
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > .opened {
    display: flex;
    height: ${(props) => (props.isClicked ? '205px' : '0')};
    width: 100%;
    transition: all 1s;

    > textarea {
      width: 100%;
      height: 80%;
      background-color: #655d5d;
      border-radius: 15px;
      border: 1px solid #d9d9d9;
      outline: none;
      resize: none;
      font-size: 20px;
      color: #d9d9d9;
      padding: 15px;

      ::placeholder {
        font-size: 16px;
        color: #d9d9d9;
        font-style: italic;
      }
    }
  }
`;

const ExtraItemsList = styled.ul`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-top: 1px solid #807b7b;
  padding-top: 15px;

  > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    > h5 {
      font-size: 22px;
      font-weight: 400;
      color: #ffffff;
    }

    > aside {
      display: flex;
      gap: 20px;
      align-items: center;

      > span {
        font-size: 18px;
        font-weight: 700;
        color: #ffffff;
      }

      > div {
        width: 70px;
        height: 22px;
        border-radius: 2px;
        background-color: #d9d9d9;
        padding: 0 0;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > button {
          width: 22px;
          height: 22px;
          border-radius: 2px;
          background-color: #544e4e;
          border: none;
          color: #d9d9d9;
          font-size: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        > strong {
          font-size: 14px;
          font-weight: 700;
          color: #000000;
        }
      }
    }
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
