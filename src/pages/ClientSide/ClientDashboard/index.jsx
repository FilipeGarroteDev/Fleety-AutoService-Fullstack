import { Outlet } from 'react-router-dom';
import ClientSideStyle from '../../../common/ClientSideStyle';
import MainContainer from '../../../common/MainContainer';
import Menus from '../../../components/ClientSideComponents/Dashboard/Menus';

export default function ClientDashboard() {
  return (
    <>
      <ClientSideStyle />
      <Menus />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
