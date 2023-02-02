import { useState } from 'react';
import styled from 'styled-components';
import ConfirmBox from './ConfirmBox';

export default function RegisterForm({ children, type, clientData, setClientData, adminData, setAdminData }) {
  const [confirmRegister, setConfirmRegister] = useState(false);

  return (
    <>
      {confirmRegister ? (
        <ConfirmBox
          type={type}
          setConfirmRegister={setConfirmRegister}
          data={clientData ? clientData : adminData}
          setData={setClientData ? setClientData : setAdminData}
        />
      ) : (
        ''
      )}
      <FormLayout>
        <h1>{`Cadastrar ${type}:`}</h1>
        <div>
          {children}
          <button
            onClick={(e) => {
              e.preventDefault();
              setConfirmRegister(true);
            }}
          >
            Cadastrar
          </button>
        </div>
      </FormLayout>
    </>
  );
}

const FormLayout = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 60px;
  margin-bottom: 20px;

  > h1 {
    width: 15%;
    font-size: 22px;
    font-weight: 400;
    color: #3f6ad8;
  }

  > div {
    display: flex;
    gap: 20px;

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
  }
`;
