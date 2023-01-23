import styled from 'styled-components';
import PaymentForm from './CreditCardContainer';

export default function PaymentSection() {
  return (
    <Wrapper>
      <h2>Pagamento</h2>
      <PaymentOptions>
        <button>Pagar com o cartão de crédito</button>
        <button>Prefiro dividir a conta</button>
      </PaymentOptions>
      <PaymentForm />
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

  button {
    border: 1px solid #7a7474;
    width: 45%;
    height: 150px;
    background-color: #c4bdbd;
    border-radius: 20px;
    color: #7a7474;
    font-size: 22px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.4);
;
  }
`;
