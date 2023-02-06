import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AdminSideStyle from '../../../common/AdminSideStyle';
import AdminPageMenus from '../../../components/AdminSideComponents/AdminPageMenus';

export default function AdminDashboard() {
  return (
    <>
      <AdminSideStyle />
      <AdminPageMenus />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}

const MainContainer = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  padding-top: 100px;
  padding-left: 18%;
`;
