import { Outlet } from 'react-router-dom';
import MainContainer from '../../common/MainContainer';

export default function Dashboard() {
  return (
    <>
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
