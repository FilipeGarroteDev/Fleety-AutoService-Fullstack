import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { toast } from 'react-toastify';
import styled from 'styled-components';

export default function CredCard() {
  const [card, setCard] = useState({
    cvv: '',
    expiry: '',
    focused: '',
    name: '',
    number: '',
    issuer: '',
  });

  function cardComplet() {
    if (card.cvv === '' || card.expiry === '' || card.focused === '' || card.name === '' || card.number === '')
      return toast('Preencha corretamente os campos do cartão');
    if (isNaN(Number(card.number) && Number(card.expiry) && Number(card.cvv)) || card.issuer === 'UNKNOWN')
      return toast('Preencha o cartão com dados válidos');
    toast('maneiro, tá mockado, mas deu certo!');
  }

  return (
    <div id="PaymentForm">
      <Allcards>
        <Cards
          cvc={card.cvv}
          expiry={card.expiry}
          focused={card.focused}
          name={card.name}
          number={card.number}
          acceptedCards={['visa', 'mastercard']}
          callback={(e) => setCard({ ...card, issuer: e.issuer.toUpperCase() })}
        />
        <form>
          <input
            type="text"
            name="name"
            val={card.name}
            pattern="[a-z A-Z-]+"
            required
            placeholder="Name"
            onChange={(e) => setCard({ ...card, name: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
          <Text>E.g:49..., 51..., 36..., 37...</Text>
          <input
            type="tel"
            name="number"
            pattern="[\d| ]{16,22}"
            maxLength="19"
            val={card.number}
            placeholder="Card Number"
            required
            onChange={(e) => setCard({ ...card, number: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
          <input
            className={'ValidThru'}
            type="tel"
            name="expiry"
            pattern="\d\d/\d\d"
            maxLength="4"
            required
            val={card.expiry}
            placeholder="Valid Thru"
            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
          <input
            className={'cvv'}
            maxLength={3}
            type="tel"
            name="cvc"
            val={card.cvc}
            placeholder="cvv"
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
            onFocus={(e) => setCard({ ...card, focused: e.target.name })}
          />
        </form>
      </Allcards>
      <Button onClick={cardComplet}>FINALIZAR PAGAMENTO</Button>
    </div>
  );
}
const Button = styled.button`
  margin-top: 50px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #7a7474;
  background-color: #c4bdbd;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  animation: fadeIn 1s;
  color: #7a7474;
  font-weight: 700;
  
  cursor: pointer;
  :active {
    transform: translate(-5px, 5px);
  }
`;

const Allcards = styled.div`
  display: flex;
  form {
    display: flex;
    flex-wrap: wrap;
    padding: 0px 150px 0px 20px;
    width: 70%;
    justify-content: space-between;

    input {
      border-radius: 5px;
      border: 2px solid #8e8e8e;
      height: 30px;
      width: 100%;
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
