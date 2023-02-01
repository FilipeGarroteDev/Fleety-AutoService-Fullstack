import styled from 'styled-components';
import { BsFillStopwatchFill } from 'react-icons/bs';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';

export default function PendingWaiter() {
  const waiterArrMock = [
    {
      _id: 1,
      userId: 1,
      name: 'Mesa 13',
      createdAt: Date.now(),
    },
    {
      _id: 2,
      userId: 2,
      name: 'Mesa 14',
      createdAt: Date.now(),
    },
    {
      _id: 3,
      userId: 3,
      name: 'Mesa 15',
      createdAt: Date.now(),
    },
    {
      _id: 4,
      userId: 4,
      name: 'Mesa 16',
      createdAt: Date.now(),
    },
    {
      _id: 5,
      userId: 5,
      name: 'Mesa 17',
      createdAt: Date.now(),
    },
    {
      _id: 1,
      userId: 1,
      name: 'Mesa 13',
      createdAt: Date.now(),
    },
    {
      _id: 2,
      userId: 2,
      name: 'Mesa 14',
      createdAt: Date.now(),
    },
    {
      _id: 3,
      userId: 3,
      name: 'Mesa 15',
      createdAt: Date.now(),
    },
    {
      _id: 4,
      userId: 4,
      name: 'Mesa 16',
      createdAt: Date.now(),
    },
    {
      _id: 5,
      userId: 5,
      name: 'Mesa 17',
      createdAt: Date.now(),
    },
    {
      _id: 1,
      userId: 1,
      name: 'Mesa 13',
      createdAt: Date.now(),
    },
    {
      _id: 2,
      userId: 2,
      name: 'Mesa 14',
      createdAt: Date.now(),
    },
    {
      _id: 3,
      userId: 3,
      name: 'Mesa 15',
      createdAt: Date.now(),
    },
    {
      _id: 4,
      userId: 4,
      name: 'Mesa 16',
      createdAt: Date.now(),
    },
    {
      _id: 5,
      userId: 5,
      name: 'Mesa 17',
      createdAt: Date.now(),
    },
  ];

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Aguardando garçom</h1>
        <span>Abaixo estão listadas as mesas à espera de atendimento pessoal.</span>
      </SectionTitle>
      <WaiterQueue>
        <WaiterQueueLine header={true} />
        {waiterArrMock.map(({ id, userId, name, createdAt }) => (
          <WaiterQueueLine key={id} name={name} createdAt={createdAt} userId={userId} />
        ))}
      </WaiterQueue>
    </SectionContainer>
  );
}

function WaiterQueueLine({ id, userId, name, createdAt, header }) {
  return (
    <LineStyle>
      <div>{header ? '' : <BsFillStopwatchFill />}</div>
      <div>{header ? <h2>Mesa solicitante</h2> : <h3>{name}</h3>}</div>
      <div>{header ? <h2>Hora da chamada</h2> : <span>{createdAt}</span>}</div>
      <div>{header ? '' : <button>Finalizar</button>}</div>
    </LineStyle>
  );
}

const WaiterQueue = styled.ul`
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  height: auto;
  background-color: #ffffff;
`;

const LineStyle = styled.li`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    width: 15%;
    display: flex;
    justify-content: center;

    > h3 {
      font-weight: 400;
    }

    > h2 {
      font-weight: 500;
      font-size: 18px;
      color: #294897;
    }

    > svg {
      color: #3f6ad8;
      font-size: 22px;
    }

    > button {
      width: 120px;
      height: 35px;
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

  &:nth-child(even) {
    background-color: aliceblue;
  }
`;
