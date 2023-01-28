import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PaymentSection from './PaymentSection/PaymentSection';
import ResumeSection from './ResumeSection';

export default function AccountPage() {
  const navigate = useNavigate();

  return (
    <>
      <OpacityStyle onClick={() => navigate('/home')} />
      <CheckoutWindow>
        <header>
          <h1>MINHA CONTA</h1>
          <span>Mesa 15</span>
        </header>
        <section>
          <ResumeSection />
          <PaymentSection />
        </section>
      </CheckoutWindow>
    </>
  );
}

const OpacityStyle = styled.main`
  @keyframes opacityWindow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }

  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  animation: opacityWindow 0.7s ease-in-out;
  background-color: #000000;
  opacity: 0.8;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CheckoutWindow = styled.main`
  @keyframes appearWindow {
    0% {
      width: 0;
      height: 0;
      top: 50%;
      left: 50%;
    }
    100% {
      width: 80%;
      height: 92%;
    }
  }

  width: 80%;
  height: 92%;
  position: absolute;
  top: 4%;
  left: 10%;
  overflow: hidden;
  border-radius: 25px;
  box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.4);
  animation: appearWindow 0.5s ease-in-out;
  background-color: #a39d9d;
  z-index: 3;

  > header {
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: center;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
    align-items: center;
    gap: 20px;
    background-color: #312e2e;

    h1 {
      font-size: 26px;
      font-weight: 700;
      color: #dea12a;
    }

    span {
      height: 25px;
      width: 80px;
      background-color: #dea12a;
      border-radius: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #312e2e;
      font-weight: 700;
    }
  }

  >section{
    display: flex;
  }
`;
