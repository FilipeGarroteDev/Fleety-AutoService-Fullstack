import SectionTitle from '../../../../components/AdminSideComponents/AdminDashboard/SectionTitle';
import SectionContainer from '../../../../components/AdminSideComponents/AdminDashboard/SectionContainer';
import styled from 'styled-components';
import LineStyle from '../../../../components/AdminSideComponents/AdminDashboard/LineStyle';
import { useState } from 'react';
import RatingComponent from '../../../../common/MUI - components/Rating';
import { useQuery } from 'react-query';
import { getAllRatings } from '../../../../services/axios';

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
    return <h1>LOADINGGGGGGGGGGG!</h1>;
  }

  return (
    <SectionContainer>
      <SectionTitle>
        <h1>Avaliação dos clientes</h1>
        <span>O que o cliente está achando dos nossos serviços? Abaixo estão as notas e avaliações dos clientes</span>
      </SectionTitle>
      <RestaurantAverage>
        <h3>Nota média do restaurante: </h3>
        <strong>{ratingsSum.total?.toFixed(2)}</strong>
        <RatingComponent rate={ratingsSum.total} total />
      </RestaurantAverage>
      <OverviewContainer>
        <div>
          <h3>Média Ambiente:</h3>
          <strong>{ratingsSum.environmentRate?.toFixed(2)}</strong>
          <RatingComponent rate={ratingsSum.environmentRate} />
        </div>
        <div>
          <h3>Média Comidas:</h3>
          <strong>{ratingsSum.foodRate?.toFixed(2)}</strong>
          <RatingComponent rate={ratingsSum.foodRate} />
        </div>
        <div>
          <h3>Média Bebidas:</h3>
          <strong>{ratingsSum.beverageRate?.toFixed(2)}</strong>
          <RatingComponent rate={ratingsSum.beverageRate} />
        </div>
        <div>
          <h3>Média Preços:</h3>
          <strong>{ratingsSum.pricesRate?.toFixed(2)}</strong>
          <RatingComponent rate={ratingsSum.pricesRate} />
        </div>
        <div>
          <h3>Média Serviço:</h3>
          <strong>{ratingsSum.serviceRate?.toFixed(2)}</strong>
          <RatingComponent rate={ratingsSum.serviceRate} />
        </div>
      </OverviewContainer>
      <OrdersQueue>
        <OrderLine header />
        {data.map(({ id, name, email, userNote, createdAt }) => (
          <OrderLine key={id} email={email} userNote={userNote} createdAt={createdAt} name={name} />
        ))}
      </OrdersQueue>
    </SectionContainer>
  );
}

function OrderLine({ name, email, userNote, createdAt, header }) {
  return (
    <LineStyle order>
      <div>{header ? <h2>Nome do Cliente</h2> : <span>{name}</span>}</div>
      <div>{header ? <h2>E-mail</h2> : <span>{email}</span>}</div>
      <div>{header ? <h2>Observações</h2> : <span>{userNote}</span>}</div>
      <div>{header ? <h2>Entrada</h2> : <span>{createdAt}</span>}</div>
    </LineStyle>
  );
}

const OverviewContainer = styled.section`
  width: 100%;
  height: 130px;
  padding: 0 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  > span {
    font-size: 80px;
    font-weight: 400;
    color: #3f6ad8;
  }

  > div {
    height: 100%;
    width: 15%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 6px;
    padding: 10px;
    box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);

    > h3 {
      font-size: 18px;
      font-weight: 400;
      color: #3f6ad8;
      margin-bottom: 15px;
    }

    > strong {
      font-size: 30px;
      font-weight: 400;
      width: 100%;
      text-align: center;
    }
  }
`;

const RestaurantAverage = styled.div`
  width: 40%;
  margin-left: 80px;
  margin-bottom: 30px;
  padding: 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);
  border-radius: 6px;

  > h3 {
    width: 80%;
    font-size: 18px;
    font-weight: 400;
    color: #3f6ad8;
  }

  > strong {
    font-size: 30px;
    font-weight: 400;
    text-align: center;
    margin-right: 15px;
  }
`;

const OrdersQueue = styled.ul`
  width: 100%;
  height: auto;
  background-color: #ffffff;
  margin-top: 35px;
`;
