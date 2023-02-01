import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { useState } from 'react';
import { BiHide } from 'react-icons/bi';

export default function RegisterTableSection() {
  const mockedUsers = [
    {
      id: 1,
      name: 'Mesa 01',
      password: '123456',
      role: 'CLIENT',
      createdAt: Date.now(),
    },
    {
      id: 2,
      name: 'Mesa 02',
      password: '123456',
      role: 'CLIENT',
      createdAt: Date.now(),
    },
    {
      id: 3,
      name: 'Mesa 03',
      password: '123456',
      role: 'CLIENT',
      createdAt: Date.now(),
    },
    {
      id: 4,
      name: 'Mesa 04',
      password: '123456',
      role: 'CLIENT',
      createdAt: Date.now(),
    },
    {
      id: 5,
      name: 'Mesa 05',
      password: '123456',
      role: 'CLIENT',
      createdAt: Date.now(),
    },
    {
      id: 6,
      name: 'Mesa 06',
      password: '123456',
      role: 'CLIENT',
      createdAt: Date.now(),
    },
  ];

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Cadastro de nova mesa</h1>
        <span>Abaixo é possível cadastrar nova mesa, bem como visualizar as mesas cadastradas e ativas.</span>
      </SectionTitle>
      <RegisterForm>
        <h1>Novo usuário: </h1>
        <input placeholder='Nome (ex: "Mesa 01")' />
        <input placeholder="Senha" />
        <input placeholder="Confirme a senha" />
        <button>Cadastrar</button>
      </RegisterForm>
      <UsersList>
        <UserLine header />
        {mockedUsers.map(({ id, name, password, role, createdAt }) => (
          <UserLine key={id} id={id} name={name} password={password} role={role} createdAt={createdAt} />
        ))}
      </UsersList>
    </SectionContainer>
  );
}

function UserLine({ id, name, password, role, createdAt, header }) {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <LineStyle order>
      <div>{header ? <h2>ID</h2> : <h3>{id}</h3>}</div>
      <div>{header ? <h2>Mesa</h2> : <span>{name}</span>}</div>
      <div>
        {header ? (
          <h2>Senha</h2>
        ) : (
          <span onClick={() => setIsHidden(!isHidden)}>{isHidden ? <BiHide /> : password}</span>
        )}
      </div>
      <div>{header ? <h2>Privilégio</h2> : <span>{role}</span>}</div>
      <div>{header ? <h2>Data de criação</h2> : <span>{createdAt}</span>}</div>
      <div>{header ? '' : <button>Excluir</button>}</div>
    </LineStyle>
  );
}

const RegisterForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 0 60px;

  > h1 {
    font-size: 22px;
    font-weight: 400;
    color: #3f6ad8;
  }

  > input {
    width: 200px;
    height: 40px;
    border: 1px solid #3f6ad8;
    border-radius: 8px;
    padding: 10px;
    outline: none;

    &::placeholder {
      font-style: italic;
    }
  }

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
`;

const UsersList = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
