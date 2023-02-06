import styled from 'styled-components';
import fleetyLogo from '../../../../assets/images/fleetyLogo.png';

export default function EmptyPage({ children }) {
  return (
    <Layout>
      <img src={fleetyLogo} alt="logo" />
      {children}
    </Layout>
  );
}

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  >h1 {
    text-align: center;
    width: 60%;
    color: #d9d9d9;
    font-size: 26px;
    margin-top: 30px;
  }

  >h2 {
    text-align: center;
    width: 60%;
    color: #d9d9d9;
    font-size: 20px;
    margin-top: 20px;
  }
`;
