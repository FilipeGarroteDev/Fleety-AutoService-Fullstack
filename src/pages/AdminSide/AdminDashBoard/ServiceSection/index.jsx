import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import { getAllUserCall } from '../../../../services/axios/waiter-connections';
import WaiterQueue from './WaiterQueue';
import EmptyPage from '../../../../components/AdminSideComponents/AdminDashboard/EmptyPage';
import { useQuery } from 'react-query';

export default function ServiceSection() {
  const { data, isLoading } = useQuery(
    'calls',
    () => {
      return getAllUserCall().then((res) => res.data);
    },
    {
      retry: 2,
      refetchInterval: 5000,
    }
  );

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Aguardando garçom</h1>
        <span>Abaixo estão listadas as mesas à espera de atendimento pessoal.</span>
      </SectionTitle>
      {isLoading || data.length === 0 ? (
        <EmptyPage>
          <span>
            Não há mesas à espera de atendimento, por enquanto. Quando houver, serão listadas aqui e haverá uma
            notificação na seção respectiva, ao lado.
          </span>
        </EmptyPage>
      ) : (
        <WaiterQueue callList={data}/>
      )}
    </SectionContainer>
  );
}
