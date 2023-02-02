import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import { getAllPreparingOrders } from '../../../../services/axios';
import { useQuery } from 'react-query';
import SummaryContainer from './SummaryContainer';
import OrdersQueue from './OrdersQueue';
import EmptyPage from '../../../../components/AdminSideComponents/AdminDashboard/EmptyPage';

export default function OrdersSection() {
  const { data, isLoading, isError } = useQuery(
    'orders',
    () => {
      return getAllPreparingOrders().then((res) => res.data);
    },
    {
      retry: 3,
      refetchInterval: 5000,
    }
  );

  if (isError) {
    return <div>ERROOOOOOOOOOOOOO!!!</div>;
  }

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Pedidos pendentes</h1>
        <span>Abaixo estão listados os pedidos pendentes de entrega.</span>
      </SectionTitle>
      {isLoading ? (
        <div>LOADINGGGGGGGGGGGGG!!!</div>
      ) : (
        <>
          <SummaryContainer data={data} />
          {data.length === 0 ? (
            <EmptyPage>
              <span>
                Ainda não há pedidos pendentes de entrega. Quando houver, serão listados aqui e haverá uma notificação
                na seção respectiva, ao lado.
              </span>
            </EmptyPage>
          ) : (
            <OrdersQueue data={data} />
          )}
        </>
      )}
    </SectionContainer>
  );
}
