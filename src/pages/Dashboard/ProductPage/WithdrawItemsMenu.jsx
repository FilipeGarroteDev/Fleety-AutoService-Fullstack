import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import OptionsBoxStyle from '../../../components/Dashboard/ProductPage/OptionsBoxStyle';

export default function WithdrawItemsMenu() {
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
