import styled from 'styled-components';

export default function RatingsPage() {
  return (
    <Wrapper>
      <h1>Avalie os nossos serviços</h1>
      <RateContainer>

      </RateContainer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  margin-left: 14%;
  margin-top: 9%;

  >h1{
    font-size: 22px;
    font-weight: 700;
    color: #9b9999;
  }
`;

const RateContainer = styled.section`
  width: 84vw;
  height: 70vh;
  border-radius: 5px;
  background-color: #dad8d8;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  padding: 40px;
`;
