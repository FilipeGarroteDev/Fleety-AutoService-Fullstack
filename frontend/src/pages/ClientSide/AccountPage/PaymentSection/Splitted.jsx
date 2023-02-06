import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import CheckoutButton from '../../../../components/ClientSideComponents/AccountPage/CheckoutButton';
import { postPayment } from '../../../../services/axios/checkout-connections';
import { ThreeDots } from 'react-loader-spinner';

export default function Splitted({ totalValue, setPaymentMethod }) {
  const [ticket, setTicket] = useState({});
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const storageTicket = localStorage.getItem('ticket');
    const parsedTicket = JSON.parse(storageTicket);
    setTicket(parsedTicket);
  }, []);

  async function finishOrder() {
    setIsClicked(true);
    const paymentBody = {
      totalValue: totalValue,
      firstName: 'SPLITTED',
      cardLastDigits: 'SPLT',
      isSplitted: true,
    };

    try {
      await postPayment(paymentBody, ticket.id);
      setPaymentMethod('paymentSuccessful');
      toast.success('Pagamento efetuado com sucesso!');
      setIsClicked(false);
    } catch (error) {
      toast.error(error.response.data);
      setIsClicked(false);
    }
  }

  return (
    <SplittedContainer>
      <span>
        Para ter uma experiência ainda melhor, o garçom está indo até sua mesa para que finalizem o pagamento por
        pessoa.
      </span>
      {isClicked ? (
        <CheckoutButton disabled>
          <ThreeDots color="#ece8e8" />
        </CheckoutButton>
      ) : (
        <CheckoutButton onClick={finishOrder}>Finalizar pedido</CheckoutButton>
      )}
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
