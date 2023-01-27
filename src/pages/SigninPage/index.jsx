import AuthLayout from '../../components/Auth/AuthLayout';
import Button from '../../components/Auth/Button';
import Form from '../../components/Auth/Form';
import Wrapper from '../../components/Auth/Wrapper';
import fleetyLogo from '../../assets/images/fleetyLogo.png';

export default function SigninPage() {
  return (
    <Wrapper>
      <AuthLayout>
        <img src={fleetyLogo} alt="logo" />
        <Form>
          <input name="name" type="name" placeholder="Login da Mesa" />
          <input name="password" type="password" placeholder="Senha" />
          <Button>Entrar</Button>
        </Form>
      </AuthLayout>
    </Wrapper>
  );
}
