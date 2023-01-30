import { useState } from 'react';
import styled from 'styled-components';
import CreditCard from './CreditCard';
import PaymentSuccessful from './PaymentSuccessful';
import Splitted from './Splitted';

export default function PaymentSection({ totalValue }) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const paymentOptions = {
    paymentSuccessful: <PaymentSuccessful />,
    creditCard: <CreditCard totalValue={totalValue} setPaymentMethod={setPaymentMethod} />,
    splitted: <Splitted />,
  };

  function renderSection(section) {
    if (paymentMethod === 'paymentSuccessful') return;
    setPaymentMethod(section);
  }

  return (
    <Wrapper>
      <h2>Pagamento</h2>
      <PaymentOptions>
        <Button onClick={() => renderSection('creditCard')} paymentMethod={paymentMethod} type="creditCard">
          Pagar com o cartão de crédito
        </Button>
        <Button onClick={() => renderSection('splitted')} paymentMethod={paymentMethod} type="splitted">
          Prefiro dividir a conta
        </Button>
      </PaymentOptions>
      {paymentOptions[paymentMethod]}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;

  > h2 {
    font-size: 20px;
    font-weight: 700;
    color: #312e2e;
    margin-bottom: 10px;
  }
`;

const PaymentOptions = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  margin-top: 20px;
`;

const Button = styled.button`
  border: 1px solid #7a7474;
  width: 45%;
  height: 150px;
  background-color: ${(props) => (props.paymentMethod === props.type ? '#7a7474' : '#c4bdbd')};
  border-radius: 20px;
  color: ${(props) => (props.paymentMethod === props.type ? '#c4bdbd' : '#7a7474')};
  font-size: 22px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);

  &:hover {
    cursor: pointer;
    filter: brightness(1.07);
  }
`;
