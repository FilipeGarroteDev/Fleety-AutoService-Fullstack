import dayjs from 'dayjs';
import { BsFillStopwatchFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { deleteWaiterCall } from '../../../../services/axios/waiter-connections';
import { ThreeDots } from 'react-loader-spinner';
import { useState } from 'react';

export default function WaiterQueue({ callList, refetch }) {
  return (
    <TableStyle>
      <WaiterQueueLine header={true} />
      {callList.map(({ id, userId, table, createdAt }) => (
        <WaiterQueueLine key={id} table={table} createdAt={createdAt} userId={userId} refetch={refetch} />
      ))}
    </TableStyle>
  );
}

function WaiterQueueLine({ table, createdAt, userId, header, refetch }) {
  const [isClicked, setIsClicked] = useState(false);

  const date = dayjs(createdAt).format('DD/MM/YY');
  const hour = dayjs(createdAt).format('HH:mm');

  const timeDiff = dayjs(Date.now() - dayjs(createdAt)).format('mm:ss');

  async function finishCall() {
    setIsClicked(true);

    try {
      await deleteWaiterCall(userId);
      toast.success('O garçom está a caminho!', { theme: 'light' });
      setIsClicked(false);
      refetch();
    } catch (error) {
      toast.error('Algo deu errado. Atualize a página e tente novamente.', { theme: 'light' });
      setIsClicked(false);
    }
  }

  return (
    <LineStyle>
      <div>{header ? '' : <BsFillStopwatchFill />}</div>
      <div>{header ? <h2>Mesa solicitante</h2> : <h3>{table}</h3>}</div>
      <div>{header ? <h2>Hora da chamada</h2> : <span>{`${hour} - ${date}`}</span>}</div>
      <div>{header ? <h2>Tempo de espera</h2> : <span>{`${timeDiff}`}</span>}</div>
      <div>
        {header ? (
          ''
        ) : (
          <button onClick={finishCall} disabled={isClicked}>
            {isClicked ? <ThreeDots color="#ece8e8" /> : 'Finalizar'}
          </button>
        )}
      </div>
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
