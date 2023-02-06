import React, { useEffect, useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import CheckoutButton from '../../../../components/ClientSideComponents/AccountPage/CheckoutButton';
import { postPayment } from '../../../../services/axios/checkout-connections';

export default function CreditCard({ totalValue, setPaymentMethod }) {
  const [card, setCard] = useState({
    cvv: '',
    expiry: '',
    focused: '',
    name: '',
    number: '',
    issuer: '',
    totalValue,
  });
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    const storageTicket = localStorage.getItem('ticket');
    const parsedTicket = JSON.parse(storageTicket);
    setTicket(parsedTicket);
  }, []);

  async function sendPayment(e) {
    e.preventDefault();
    if (card.cvv === '' || card.expiry === '' || card.focused === '' || card.name === '' || card.number === '')
      return toast.error('Preencha corretamente os campos do cartão');
    if (isNaN(Number(card.number) && Number(card.expiry) && Number(card.cvv)) || card.issuer === 'UNKNOWN')
      return toast.error('São aceitas somente as bandeiras Visa (início 4) e MasterCard (início 54)');

    const paymentBody = {
      totalValue: card.totalValue,
      firstName: card.name.split(' ')[0],
      cardIssuer: card.issuer,
      cardLastDigits: card.number.slice(12),
      isSplitted: false,
    };

    try {
      await postPayment(paymentBody, ticket.id);
      setPaymentMethod('paymentSuccessful');
      toast.success('Pagamento efetuado com sucesso!');
    } catch (error) {
      toast.error(error.response.data);
    }
  }

  return (
    <div id="PaymentForm">
      <CardContainer>
        <Cards
          cvc={card.cvv}
          expiry={card.expiry}
          focused={card.focused}
          name={card.name}
          number={card.number}
          acceptedCards={['visa', 'mastercard']}
          callback={(e) => setCard({ ...card, issuer: e.issuer.toUpperCase() })}
        />
        <form onSubmit={sendPayment}>
          <input
            type="text"
            name="name"
            val={card.name}
            pattern="[a-z A-Z-]+"
            required
            placeholder="Nome (como está no cartão)"
            onChange={(e) => setCard({ ...card, name: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
          <Text>Exemplo: 49..., 51..., 36..., 37...</Text>
          <input
            type="tel"
            name="number"
            pattern="[\d| ]{16,22}"
            maxLength="19"
            val={card.number}
            placeholder="Número do Cartão (Apenas MasterCard e Visa)"
            required
            onChange={(e) => setCard({ ...card, number: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
          <input
            className={'ValidThru'}
            type="tel"
            name="expiry"
            pattern="\d\d\d\d"
            maxLength="4"
            required
            val={card.expiry}
            placeholder="Validade"
            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
          <input
            className={'cvv'}
            maxLength={3}
            type="tel"
            name="cvc"
            val={card.cvc}
            placeholder="CVV"
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
          <CheckoutButton>FINALIZAR PAGAMENTO</CheckoutButton>
        </form>
      </CardContainer>
    </div>
  );
}

const CardContainer = styled.div`
  display: flex;
  form {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 70px 0px 20px;
    width: 70%;
    justify-content: space-between;

    input {
      border-radius: 5px;
      border: 2px solid #8e8e8e;
      height: 30px;
      width: 100%;
      margin-top: 5px;
      color: #8e8e8e;
      font-size: 15px;
      line-height: 23px;
      outline: none;
    }
    .ValidThru {
      width: 50%;
    }
    .cvv {
      width: 40%;
    }
  }
`;
const Text = styled.div`
  margin: 15px;
  width: 290px;
  font-size: 20px;
  line-height: 23px;
  color: #7a7474;
`;
