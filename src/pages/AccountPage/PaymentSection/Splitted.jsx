import styled from 'styled-components';
import fleetyLogo from '../../../assets/images/fleetyLogo.png';

export default function Splitted() {
  return (
    <SplittedContainer>
      <span>
        Para ter uma experiência ainda melhor, clique no botão "Chamar o Garçom", localizado no menu superior, e
        finalizem o pagamento por pessoa.
      </span>
      <img src={fleetyLogo} alt="logo" />
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
