import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import RegisterForm from './RegisterForm';
import { deleteUser, getAllActiveUsers } from '../../../../services/axios/users-connections';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export default function RegisterTableSection() {
  const [clientData, setClientData] = useState({});
  const [adminData, setAdminData] = useState({});
  const { data, isLoading } = useQuery('users', () => {
    return getAllActiveUsers().then((res) => res.data);
  });

  if (isLoading) {
    return <></>;
  }

  function handleClientRegister(e) {
    setClientData({
      ...clientData,
      [e.target.name]: e.target.value,
    });
  }

  function handleAdminRegister(e) {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Cadastro de nova mesa</h1>
        <span>Abaixo é possível cadastrar nova mesa, bem como visualizar as mesas cadastradas e ativas.</span>
      </SectionTitle>
      <RegisterForm type="cliente" clientData={clientData} setClientData={setClientData}>
        <input
          name="name"
          value={clientData.name}
          type="name"
          placeholder='Nome (ex: "Mesa 01")'
          onChange={handleClientRegister}
        />
        <input
          name="password"
          value={clientData.password}
          type="password"
          placeholder="Senha"
          onChange={handleClientRegister}
        />
      </RegisterForm>
      <RegisterForm type="admin" adminData={adminData} setAdminData={setAdminData}>
        <input
          name="name"
          value={adminData.name}
          type="name"
          placeholder='Nome (ex: "Mesa 01")'
          onChange={handleAdminRegister}
        />
        <input
          name="email"
          value={adminData.email}
          type="email"
          placeholder="E-mail válido (Google)"
          onChange={handleAdminRegister}
        />
        <input
          name="password"
          value={adminData.password}
          type="password"
          placeholder="Senha"
          onChange={handleAdminRegister}
        />
      </RegisterForm>
      <UsersList>
        <UserLine header />
        {data.map(({ id, name, role, createdAt }) => (
          <UserLine key={id} id={id} name={name} role={role} createdAt={createdAt} />
        ))}
      </UsersList>
    </SectionContainer>
  );
}

function UserLine({ id, name, role, createdAt, header }) {
  const date = dayjs(createdAt).format('DD/MM/YYYY');

  const [isHidden, setIsHidden] = useState(true);
  const objectLiterals = {
    true: <BiShow onClick={() => setIsHidden(!isHidden)} />,
    false: <BiHide onClick={() => setIsHidden(!isHidden)} />,
  };

  async function deleteSelectedUser() {
    try {
      await deleteUser(id);
      toast.success('Usuário excluído com sucesso!', { theme: 'light' });
    } catch (error) {
      toast.error('Não foi possível deletar o usuário. Tente novamente mais tarde', { theme: 'light' });
      return;
    }
  }

  return (
    <LineStyle order>
      <div>{header ? '' : objectLiterals[isHidden]}</div>
      <div>{header ? <h2>ID</h2> : <h3>{!isHidden ? id : '------'}</h3>}</div>
      <div>{header ? <h2>Mesa</h2> : <span>{!isHidden ? name : '------'}</span>}</div>
      <div>{header ? <h2>Privilégio</h2> : <span>{!isHidden ? role : '------'}</span>}</div>
      <div>{header ? <h2>Data de criação</h2> : <span>{!isHidden ? date : '------'}</span>}</div>
      <div>{header ? '' : <button onClick={deleteSelectedUser}>Excluir</button>}</div>
    </LineStyle>
  );
}

const UsersList = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
