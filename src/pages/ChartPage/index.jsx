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
        <header>MEU PEDIDO</header>
        <div></div>
        <footer></footer>
      </ChartWindow>
    </>
  );
}

const OpacityStyle = styled.main`
  width: 100vw;
  height: 100vh;
  background-color: #0000006c;
  position: absolute;
  z-index: 2;
`;
const ChartWindow = styled.section`
  width: 50%;
  height: 100vh;
  background-color: #A39D9D;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.8);
  position: absolute;
  right: 0;
  z-index: 3;

  >header {
    width: inherit;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #292727;
    color: #ffffff;
    font-size: 40px;
    font-weight: 700;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
  }



  >footer {
    width: inherit;
    height: 110px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    background-color: #D9D9D9;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 0.8);
    position: fixed;
    bottom: 0;
  }
`;
