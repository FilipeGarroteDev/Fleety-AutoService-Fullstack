import styled from 'styled-components';
import { BsCheckCircleFill } from 'react-icons/bs';
import CheckoutButton from '../../../../components/ClientSideComponents/AccountPage/CheckoutButton';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccessful() {
  const navigate = useNavigate();

  function clearDataAndLogout() {
    localStorage.clear();
    navigate('/signin');
  }

  return (
    <Wrapper>
      <SuccessBox>
        <BsCheckCircleFill />
        <div>
          <h2>Pagamento realizado!</h2>
          <span>
            Seu pagamento foi processado e a comanda está paga. Muito obrigado por escolher o nosso estabelecimento.
            Esperamos que volte em breve! :)
          </span>
        </div>
      </SuccessBox>
      <CheckoutButton logout onClick={clearDataAndLogout}>
        Logout
      </CheckoutButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 25%;
`;

const SuccessBox = styled.div`
  width: 90%;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #d9d9d9;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;

    > span {
      width: 95%;
      font-size: 16px;
      font-style: italic;
    }

    > h2 {
      font-weight: 700;
    }
  }

  > svg {
    font-size: 30px;
    color: #0b750b;
  }
`;
