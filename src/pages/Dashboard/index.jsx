import { Outlet } from 'react-router-dom';
import MainContainer from '../../common/MainContainer';
import Menus from '../../components/Dashboard/Menus';

export default function Dashboard() {
  return (
    <>
      <Menus />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
