import AuthLayout from '../../components/Auth/AuthLayout';
import Button from '../../components/Auth/Button';
import Form from '../../components/Auth/Form';
import Wrapper from '../../components/Auth/Wrapper';
import fleetyLogo from '../../assets/images/fleetyLogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/axios';
import styled from 'styled-components';
import AdminButton from '../../components/Auth/AdminButton';

export default function SigninPage() {
  const [signInData, setSignInData] = useState({});
  const navigate = useNavigate();

  function handleInput(e) {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  }

  async function sendForm(e) {
    e.preventDefault();
    try {
      const promise = await signIn(signInData);
      localStorage.setItem('token', promise.data.token);
      localStorage.setItem('user', JSON.stringify(promise.data.user));
      localStorage.setItem('ticket', JSON.stringify(promise.data.ticket));
      if (promise.data.user.role === 'CLIENT') {
        navigate('/');
      } else if (promise.data.user.role === 'ADMIN') {
        navigate('/admin');
      }
    } catch (error) {
      alert('Não foi possível realizar o login. Verifique os campos preenchidos!');
    }
  }

  return (
    <Wrapper>
      <AuthLayout>
        <LogoSection>
          <img src={fleetyLogo} alt="logo" />
          <h2>O seu serviço preferido de automatização de atendimento em restaurante.</h2>
          <h2>Rápido. Prático. Personalizável. Seguro. Fleety.</h2>
        </LogoSection>
        <AuthContainer>
          <h1>Login</h1>
          <Form onSubmit={sendForm}>
            <input name="name" type="name" placeholder="Login da Mesa" onChange={handleInput} />
            <input name="password" type="password" placeholder="Senha" onChange={handleInput} />
            <Button>Entrar</Button>
          </Form>
          <AdminButton />
        </AuthContainer>
      </AuthLayout>
    </Wrapper>
  );
}

const LogoSection = styled.aside`
  width: 60%;
  height: 100%;
  background-color: #121111;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 3px 0px 10px rgba(0, 0, 0, 0.5);

  > img {
    width: 40%;
    height: 30%;
    object-fit: cover;
    margin-bottom: 30px;
  }

  > h2:nth-of-type(1) {
    color: #d9d9d9;
    font-size: 26px;
    font-weight: 300;
    font-family: 'Oswald', sans-serif;
    text-align: center;
    margin-bottom: 10px;
  }

  > h2:nth-of-type(2) {
    color: #d9d9d9;
    font-size: 26px;
    font-family: 'Oswald', sans-serif;
    text-align: center;
  }
`;

const AuthContainer = styled.main`
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;

  > h1 {
    color: #121111;
    font-size: 26px;
    font-family: 'Oswald', sans-serif;
    text-align: center;
    margin-bottom: 30px;
  }
`;
