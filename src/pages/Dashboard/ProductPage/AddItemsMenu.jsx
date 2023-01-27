import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import styled from 'styled-components';
import OptionsBoxStyle from '../../../components/Dashboard/ProductPage/OptionsBoxStyle';

export default function AddItemsMenu({ extraValue, setExtraValue, optionals }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <OptionsBoxStyle isClicked={isClicked}>
      <div className="closed" onClick={() => setIsClicked(!isClicked)}>
        <h3>Adicionais</h3>
        {isClicked ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="opened">
        <ExtraItemsList>
          {optionals?.map(({ id, name, value }) => (
            <ExtraItem key={id} name={name} value={value} extraValue={extraValue} setExtraValue={setExtraValue} />
          ))}
        </ExtraItemsList>
      </div>
    </OptionsBoxStyle>
  );
}

function ExtraItem({ name, value, extraValue, setExtraValue }) {
  const [extraAmount, setExtraAmount] = useState(0);

  function selectExtraItems(operation) {
    if (operation === '-' && extraAmount > 0) {
      setExtraAmount(extraAmount - 1);
      setExtraValue(extraValue - value);
    } else if (operation === '+') {
      setExtraAmount(extraAmount + 1);
      setExtraValue(extraValue + value);
    }
  }

  return (
    <li>
      <h5>{`Adicional ${name}`}</h5>
      <aside>
        <span>{`+ ${(value / 100).toLocaleString('pt-br', {
          style: 'currency',
          currency: 'BRL',
        })}`}</span>
        <div>
          <button onClick={() => selectExtraItems('-')}>-</button>
          <strong>{extraAmount}</strong>
          <button onClick={() => selectExtraItems('+')}>+</button>
        </div>
      </aside>
    </li>
  );
}

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
