import styled from 'styled-components';
import { BsFillStopwatchFill } from 'react-icons/bs';

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
  ];

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Aguardando garçom</h1>
        <span>Abaixo estão listadas as mesas à espera de atendimento pessoal.</span>
      </SectionTitle>
      <WaiterQueue>
        {waiterArrMock.map(({ id, userId, name, createdAt }) => (
          <QueueCard key={id} name={name} createdAt={createdAt} userId={userId} />
        ))}
      </WaiterQueue>
    </SectionContainer>
  );
}

function QueueCard({ id, userId, name, createdAt }) {
  return (
    <LineStyle>
      <BsFillStopwatchFill />
      <h3>{name}</h3>
      <span>{createdAt}</span>
      <button>Finalizar</button>
    </LineStyle>
  );
}

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: calc(150px);
  width: 100%;
  height: 100%;
`;

const SectionTitle = styled.header`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  padding-left: 22%;
  padding-top: 30px;
  background: linear-gradient(to bottom, #2a93da, #3f6ad8);
  position: fixed;
  left: 0;
  top: 60px;
  box-shadow: 0 6px 10px 5px rgba(0, 0, 0, 0.2);

  > h1 {
    color: #ffffff;
    font-size: 30px;
    font-weight: 400;
  }

  > span {
    color: #ffffff;
    font-size: 20px;
  }
`;

const WaiterQueue = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
`;

const LineStyle = styled.li`
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 60px;
  justify-content: space-between;
  align-items: center;

  > h3 {
    font-weight: 400;
  }

  &:nth-child(even) {
    background-color: aliceblue;
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

    &:hover{
      cursor: pointer;
      filter: brightness(1.1);
    }
  }
`;
