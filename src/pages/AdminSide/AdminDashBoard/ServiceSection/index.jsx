import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import { useEffect, useState } from 'react';
import { getAllUserCall } from '../../../../services/axios';
import WaiterQueue from './WaiterQueue';
import EmptyPage from '../../../../components/AdminSideComponents/AdminDashboard/EmptyPage';

export default function ServiceSection() {
  const [callList, setCallList] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const activeCalls = await getAllUserCall();
        setCallList(activeCalls.data);
      } catch (error) {
        alert('Ocorreu um erro inesperado, favor atualizar a página e tentar novamente.');
      }
    }
    fetchData();
    setInterval(() => setRerender(!rerender), 5000);
  }, [rerender]);

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Aguardando garçom</h1>
        <span>Abaixo estão listadas as mesas à espera de atendimento pessoal.</span>
      </SectionTitle>
      {callList.length === 0 ? (
        <EmptyPage>
          <span>
            Não há mesas à espera de atendimento, por enquanto. Quando houver, serão listadas aqui e haverá uma
            notificação na seção respectiva, ao lado.
          </span>
        </EmptyPage>
      ) : (
        <WaiterQueue callList={callList} rerender={rerender} setRerender={setRerender} />
      )}
    </SectionContainer>
  );
}
