import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import { getAllPreparingOrders } from '../../../../services/axios/orders-connections';
import { useQuery } from 'react-query';
import OrdersQueue from './OrdersQueue';
import EmptyPage from '../../../../components/AdminSideComponents/AdminDashboard/EmptyPage';
import styled from 'styled-components';

export default function OrdersSection() {
  const { data, isLoading, isError, refetch } = useQuery(
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
        <></>
      ) : (
        <>
          <SummaryContainer>
            <div>
              <h3>Em espera:</h3>
              <strong>{`${data.length} ${data.length > 1 ? 'pedidos' : 'pedido'}`}</strong>
            </div>
          </SummaryContainer>
          {data.length === 0 ? (
            <EmptyPage>
              <span>
                Ainda não há pedidos pendentes de entrega. Quando houver, serão listados aqui e haverá uma notificação
                na seção respectiva, ao lado.
              </span>
            </EmptyPage>
          ) : (
            <OrdersQueue data={data} refetch={refetch}/>
          )}
        </>
      )}
    </SectionContainer>
  );
}

const SummaryContainer = styled.section`
  width: 100%;
  height: 70px;
  padding: 0 150px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  > div {
    height: 100%;
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 0 30px;
    box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);

    > h3 {
      font-size: 22px;
      font-weight: 400;
      color: #3f6ad8;
    }

    > strong {
      font-size: 28px;
      font-weight: 400;
      text-align: start;
    }
  }
`;
