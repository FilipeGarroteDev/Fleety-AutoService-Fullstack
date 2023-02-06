import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import OptionsBoxStyle from '../../../../components/ClientSideComponents/Dashboard/ProductPage/OptionsBoxStyle';

export default function WithdrawItemsMenu({ optional, selectedOptionals, setSelectedOptionals }) {
  if (optional === 'Copos') return;
  const [isClicked, setIsClicked] = useState(false);

  function handleWithdraw(e) {
    setSelectedOptionals({
      ...selectedOptionals,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <OptionsBoxStyle isClicked={isClicked}>
      <div className="closed" onClick={() => setIsClicked(!isClicked)}>
        <h3>Deseja retirar algum item?</h3>
        {isClicked ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      <div className="opened">
        <textarea placeholder="Digite aqui o que deseja retirar..." name="withdraw" onChange={handleWithdraw} />
      </div>
    </OptionsBoxStyle>
  );
}
