import React, { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
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

  function cardComplete() {
    if (card.cvv === '' || card.expiry === '' || card.focused === '' || card.name === '' || card.number === '')
      return alert('Preencha corretamente os campos do cartão');
    if (isNaN(Number(card.number) && Number(card.expiry) && Number(card.cvv)) || card.issuer === 'UNKNOWN')
      return alert('Preencha o cartão com dados válidos');
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
        <form>
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
          <Button onClick={cardComplete}>FINALIZAR PAGAMENTO</Button>
        </form>
      </CardContainer>
      
    </div>
  );
}
const Button = styled.button`
  margin-top: 30px;
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
