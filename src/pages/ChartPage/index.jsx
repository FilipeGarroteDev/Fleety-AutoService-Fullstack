import styled from 'styled-components';
import NavigationBar from '../../components/Dashboard/Menus/NavigationBar';
import TopMenu from '../../components/Dashboard/Menus/TopMenu';

export default function ChartPage() {
  return (
    <>
      <OpacityStyle />
      <TopMenu />
      <NavigationBar />
      <ChartWindow>
        <button>X</button>
        <header>MEU PEDIDO</header>
        <div></div>
        <footer>
          <div>
            <h2>VALOR TOTAL:</h2>
            <h3>R$ 103,96</h3>
          </div>
          <button>ENVIAR PEDIDO</button>
        </footer>
      </ChartWindow>
    </>
  );
}

const OpacityStyle = styled.main`
  @keyframes opacityWindow {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.5;
    }
  }

  width: 100vw;
  height: 100vh;
  position: absolute;
  animation: opacityWindow 0.7s ease-in-out;
  background-color: #000000;
  opacity: 0.5;
  z-index: 2;
  padding-left: 14%;
`;

const ChartWindow = styled.section`
  @keyframes showWindow {
    0% {
      right: -50%;
    }
    100% {
      right: 0;
    }
  }

  width: 50%;
  height: 100vh;
  background-color: #a39d9d;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.8);
  position: absolute;
  right: 0;
  z-index: 3;
  animation: showWindow 0.7s ease-in-out;

  > button {
    width: 50px;
    height: 50px;
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
    border: none;
    background-color: #dea12a;
    position: absolute;
    left: -50px;
    top: 25px;
    color: #292727;
    font-size: 26px;
    font-weight: 700;
  }

  > header {
    width: inherit;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #292727;
    color: #dea12a;
    font-size: 40px;
    font-weight: 700;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
  }

  > footer {
    width: inherit;
    height: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    background-color: #d9d9d9;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.8);
    position: fixed;
    bottom: 0;

    >div h2 {
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    >div h3 {
      font-size: 24px;
      font-weight: 700;
      color: #2A6437;
    }

    >button {
      width: 180px;
      height: 65px;
      border: none;
      background-color: #dea12a;
      border-radius: 15px;
      color: #292727;
      font-weight: 700;
      font-size: 16px;
    }
  }
`;
