import styled from 'styled-components';
import loading from '../assets/images/loading.gif';

export default function LoadingPage() {
  return (
    <Wrapper >
      <div>
        <img src={loading} alt="loading" />
        <h1>Fleety</h1>
        <h2>Carregando...</h2>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #544e4e;
  display: flex;
  justify-content: center;
  align-items: center;

  > div {
    > img {
      width: 40%;
      height: 40%;
      position: absolute;
      top: calc(50% - 20%);
      left: calc(50% - 20%);
    }

    > h1 {
      font-family: 'Playball', sans-serif;
      font-size: 60px;
      color: #d9d9d9;
    }
    > h2 {
      font-size: 22px;
      color: #d9d9d9;
    }
  }
`;
