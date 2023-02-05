import dayjs from 'dayjs';
import { BsFillStopwatchFill } from 'react-icons/bs';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { deleteWaiterCall } from '../../../../services/axios/waiter-connections';

export default function WaiterQueue({ callList }) {
  return (
    <TableStyle>
      <WaiterQueueLine header={true} />
      {callList.map(({ id, userId, table, createdAt }) => (
        <WaiterQueueLine key={id} table={table} createdAt={createdAt} userId={userId} />
      ))}
    </TableStyle>
  );
}

function WaiterQueueLine({ table, createdAt, userId, header }) {
  const date = dayjs(createdAt).format('DD/MM/YY');
  const hour = dayjs(createdAt).format('HH:mm');

  const timeDiff = dayjs(Date.now() - dayjs(createdAt)).format('mm:ss');

  async function finishCall() {
    try {
      await deleteWaiterCall(userId);
    } catch (error) {
      alert('Algo deu errado. Atualize a página e tente novamente.');
    }
  }

  return (
    <LineStyle>
      <div>{header ? '' : <BsFillStopwatchFill />}</div>
      <div>{header ? <h2>Mesa solicitante</h2> : <h3>{table}</h3>}</div>
      <div>{header ? <h2>Hora da chamada</h2> : <span>{`${hour} - ${date}`}</span>}</div>
      <div>{header ? <h2>Tempo de espera</h2> : <span>{`${timeDiff}`}</span>}</div>
      <div>{header ? '' : <button onClick={finishCall}>Finalizar</button>}</div>
    </LineStyle>
  );
}

const TableStyle = styled.ul`
  width: 100%;
  overflow: hidden;
  overflow-y: auto;
  height: auto;
  background-color: #ffffff;
`;
