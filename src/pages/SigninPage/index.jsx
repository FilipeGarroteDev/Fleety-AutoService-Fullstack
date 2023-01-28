import AuthLayout from '../../components/Auth/AuthLayout';
import Button from '../../components/Auth/Button';
import Form from '../../components/Auth/Form';
import Wrapper from '../../components/Auth/Wrapper';
import fleetyLogo from '../../assets/images/fleetyLogo.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../services/axios';

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
      navigate('/');
    } catch (error) {
      alert('Não foi possível realizar o login. Verifique os campos preenchidos!');
    }
  }

  return (
    <Wrapper>
      <AuthLayout>
        <img src={fleetyLogo} alt="logo" />
        <Form onSubmit={sendForm}>
          <input name="name" type="name" placeholder="Login da Mesa" onChange={handleInput} />
          <input name="password" type="password" placeholder="Senha" onChange={handleInput} />
          <Button>Entrar</Button>
        </Form>
      </AuthLayout>
    </Wrapper>
  );
}
