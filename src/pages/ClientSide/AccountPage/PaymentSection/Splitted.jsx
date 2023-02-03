import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckoutButton from '../../../../components/ClientSideComponents/AccountPage/CheckoutButton';
import { postPayment } from '../../../../services/axios/checkout-connections';

export default function Splitted({ totalValue, setPaymentMethod }) {
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    const storageTicket = localStorage.getItem('ticket');
    const parsedTicket = JSON.parse(storageTicket);
    setTicket(parsedTicket);
  }, []);

  async function finishOrder() {
    const paymentBody = {
      totalValue: totalValue,
      firstName: 'SPLITTED',
      cardLastDigits: 'SPLT',
      isSplitted: true,
    };

    try {
      await postPayment(paymentBody, ticket.id);
      setPaymentMethod('paymentSuccessful');
    } catch (error) {
      alert(error.response.data);
    }
  }

  return (
    <SplittedContainer>
      <span>
        Para ter uma experiência ainda melhor, clique no botão "Chamar o Garçom", localizado no menu superior, e
        finalizem o pagamento por pessoa.
      </span>
      <CheckoutButton onClick={finishOrder}>Finalizar pedido</CheckoutButton>
    </SplittedContainer>
  );
}

const SplittedContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: relative;

  > span {
    width: 60%;
    color: #7a7474;
    font-size: 30px;
    text-align: center;
    z-index: 3;
  }
`;
