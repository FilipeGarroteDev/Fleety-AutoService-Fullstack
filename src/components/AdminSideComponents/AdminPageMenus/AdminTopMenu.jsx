import styled from 'styled-components';
import { useEffect, useState } from 'react';

export default function AdminTopMenu() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  return (
    <Container>
      <h1>Fleety</h1>
      <h2>MyDashboard</h2>
      <img src={String(userData.image)} alt="profileImg" />
    </Container>
  );
}

const Container = styled.aside`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 30px;
  background-color: #fafbfc;
  box-shadow: 6px 0 10px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;

  > h1 {
    font-family: 'Playball', sans-serif;
    font-size: 36px;
    font-weight: 700;
    color: #3f6ad8;
  }

  > h2 {
    font-size: 26px;
    font-weight: 700;
    color: #3f6ad8;
  }

  > img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50px;
  }
`;
