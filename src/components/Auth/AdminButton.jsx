import styled from 'styled-components';
import { RiGoogleLine } from 'react-icons/ri';
import { auth } from '../../services/firebase.js';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { adminSignIn } from '../../services/axios/auth-connections';
import { useNavigate } from 'react-router-dom';

export default function AdminButton() {
  const navigate = useNavigate();

  async function handleAdminSignIn() {
    const provider = new GoogleAuthProvider();

    try {
      const signInObject = await signInWithPopup(auth, provider);

      const adminCredentials = {
        name: signInObject.user.displayName,
        email: signInObject.user.email,
        image: signInObject.user.photoURL,
        restaurantSecretKey: process.env.REACT_APP_RESTAURANT_SECRET_KEY,
      };

      const promise = await adminSignIn(adminCredentials);
      localStorage.setItem('token', promise.data.token);
      localStorage.setItem('user', JSON.stringify(promise.data.user));
      navigate('/admin/waiter-queue');
    } catch (error) {
      alert('Você não possui permissão de administrador. Tente novamente.');
    }
  }

  return (
    <StyledGitHubButton onClick={handleAdminSignIn}>
      <span>Logar como Admin</span>
      <div>
        <em>Powered by</em>
        <RiGoogleLine />
      </div>
    </StyledGitHubButton>
  );
}

const StyledGitHubButton = styled.div`
  width: 50%;
  height: 50px;
  background-color: #2b2b2b;
  border: none;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 20px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    color: #ffffff;
    font-size: 16px;
    font-family: 'Oswald', sans-serif;
  }

  em {
    color: #ffffff;
    font-size: 13px;
    font-weight: 300;
    font-family: 'Oswald', sans-serif;
    margin-right: 5px;
  }

  svg {
    color: #ffffff;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(1.2);
  }
`;
