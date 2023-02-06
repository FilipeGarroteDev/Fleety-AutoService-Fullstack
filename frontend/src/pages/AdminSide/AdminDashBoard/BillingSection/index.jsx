import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import { useQuery } from 'react-query';
import EmptyPage from '../../../../components/AdminSideComponents/AdminDashboard/EmptyPage';
import { listAllPaidTickets } from '../../../../services/axios/checkout-connections';
import SummaryContainer from './SummaryContainer';
import TicketsList from './TicketsList';

export default function BillingSection() {
  const { data, isLoading, isError } = useQuery(
    'billing',
    () => {
      return listAllPaidTickets().then((res) => res.data);
    },
    {
      retry: 3,
    }
  );

  if (isError) {
    return <div>ERROOOOOOOOOOOOOO!!!</div>;
  }

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Comandas finalizadas e pagas</h1>
        <span>Abaixo estão listadas todas as comandas pagas.</span>
      </SectionTitle>
      {isLoading ? (
        <></>
      ) : (
        <>
          {data.length === 0 ? (
            <EmptyPage>
              <span>
                Ainda não há pedidos pendentes de entrega. Quando houver, serão listados aqui e haverá uma notificação
                na seção respectiva, ao lado.
              </span>
            </EmptyPage>
          ) : (
            <>
              <SummaryContainer data={data} />
              <TicketsList data={data} />
            </>
          )}
        </>
      )}
    </SectionContainer>
  );
}
