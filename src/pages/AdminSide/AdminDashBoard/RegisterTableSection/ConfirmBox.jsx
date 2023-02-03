import { useState } from 'react';
import styled from 'styled-components';
import { postNewUserData } from '../../../../services/axios/users-connections';

export default function ConfirmBox({ type, setConfirmRegister, data, setData }) {
  const [restaurantSecretKey, setRestaurantSecretKey] = useState('');

  async function registerNewUser() {
    const body = {
      ...data,
      role: type === 'admin' ? 'ADMIN' : 'CLIENT',
      restaurantSecretKey,
    };

    try {
      await postNewUserData(body);
      setData({
        name: '',
        password: '',
        email: '',
      });
      setConfirmRegister(false);
      alert('Usuário criado com sucesso!');
    } catch (error) {
      alert(
        'Não foi possível cadastrar o usuário. Verifique se digitou a chave de segurança corretamente e tente novamente mais tarde.'
      );
      setRestaurantSecretKey('');
    }
  }

  return (
    <Wrapper>
      <Box>
        <h1>Confirmação de cadastro</h1>
        <h2>Para seguir com a solicitação, por gentileza, insira abaixo a chave de segurança do restaurante:</h2>
        <input
          placeholder="Chave de segurança"
          type="password"
          value={restaurantSecretKey}
          onChange={(e) => setRestaurantSecretKey(e.target.value)}
        />
        <div>
          <button onClick={() => setConfirmRegister(false)}>Cancelar</button>
          <button onClick={registerNewUser}>Cadastrar</button>
        </div>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  @keyframes opacityWindow {
    0% {
      background-color: transparent;
    }
    100% {
      background-color: #00000057;
    }
  }

  width: 100vw;
  height: 100vh;
  background-color: #00000057;
  animation: opacityWindow 0.7s ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
`;

const Box = styled.div`
  @keyframes boxSlide {
    0% {
      top: -100%;
    }
    100% {
      top: calc(50% - 20%);
    }
  }

  width: 40%;
  height: 35%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: boxSlide 0.7s ease-in-out;
  background-color: #ffffff;
  position: absolute;
  padding: 20px;
  border: 1px solid #3f6ad8;
  border-radius: 8px;
  top: calc(50% - 20%);

  > h1 {
    width: 100%;
    text-align: center;
    font-size: 22px;
    font-weight: 400;
    color: #3f6ad8;
    margin-bottom: 10px;
  }

  > h2 {
    width: 100%;
    font-size: 18px;
    color: #3f6ad8;
    margin-bottom: 30px;
  }

  > input {
    width: 80%;
    height: 40px;
    border: 1px solid #3f6ad8;
    border-radius: 5px;
    padding: 10px;
    outline: none;
    margin-bottom: 30px;

    &::placeholder {
      font-style: italic;
    }
  }

  > div {
    display: flex;
    gap: 30px;

    > button {
      width: 120px;
      height: 40px;
      border: none;
      background-color: #5b82e4;
      border-radius: 8px;
      box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);
      color: #ffffff;
      font-size: 16px;
      font-weight: 400;

      &:hover {
        cursor: pointer;
        filter: brightness(1.1);
      }
    }
  }
`;
