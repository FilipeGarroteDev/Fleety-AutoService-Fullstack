import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { getAllRatings } from '../../../../services/axios/ratings-connections';
import EmptyPage from '../../../../components/AdminSideComponents/AdminDashboard/EmptyPage';
import AveragesContainers from './AveragesContainers';
import dayjs from 'dayjs';

export default function ClientRatings() {
  const [ratingsSum, setRatingsSum] = useState({});
  const { data, isLoading } = useQuery(
    'ratings',
    () => {
      const ratings = getAllRatings().then((res) => {
        const ratingsAvg = {
          environmentRate: 0,
          foodRate: 0,
          beverageRate: 0,
          pricesRate: 0,
          serviceRate: 0,
        };
        let total = 0;
        let reps = 0;

        for (let i = 0; i < res.data.length; i++) {
          ratingsAvg.environmentRate += res.data[i].environmentRate;
          ratingsAvg.foodRate += res.data[i].foodRate;
          ratingsAvg.beverageRate += res.data[i].beverageRate;
          ratingsAvg.pricesRate += res.data[i].pricesRate;
          ratingsAvg.serviceRate += res.data[i].serviceRate;

          reps++;
        }

        const ratingsArray = Object.keys(ratingsAvg);
        Object.values(ratingsAvg).forEach((rate, index) => {
          total += rate;
          ratingsAvg[ratingsArray[index]] = rate / reps;
        });

        setRatingsSum({ ...ratingsAvg, total: total / (reps * 5) });
        return res.data;
      });
      return ratings;
    },
    { retry: 2 }
  );

  if (isLoading) {
    return <></>;
  }

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Avaliação dos clientes</h1>
        <span>O que o cliente está achando dos nossos serviços? Abaixo estão as notas e avaliações dos clientes</span>
      </SectionTitle>
      {data.length === 0 ? (
        <EmptyPage>
          <span>Ainda não há avaliações para mostrar. Quando houver, serão listadas nesta seção.</span>
        </EmptyPage>
      ) : (
        <>
          <AveragesContainers ratingsSum={ratingsSum} />
          <OrdersQueue>
            <OrderLine header />
            {data.map(({ id, name, email, userNote, createdAt }) => (
              <OrderLine key={id} email={email} userNote={userNote} createdAt={createdAt} name={name} />
            ))}
          </OrdersQueue>
        </>
      )}
    </SectionContainer>
  );
}

function OrderLine({ name, email, userNote, createdAt, header }) {
  const date = dayjs(createdAt).format('DD/MM/YYYY');

  return (
    <LineStyle order>
      <div>{header ? <h2>Nome do Cliente</h2> : <span>{name}</span>}</div>
      <div>{header ? <h2>E-mail</h2> : <span>{email}</span>}</div>
      <div>{header ? <h2>Observações</h2> : <span>{userNote}</span>}</div>
      <div>{header ? <h2>Entrada</h2> : <span>{date}</span>}</div>
    </LineStyle>
  );
}

const OrdersQueue = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
