import styled from 'styled-components';
import RatingComponent from '../../../../common/MUI - components/Rating';

export default function AveragesContainers({ ratingsSum }) {
  return (
    <>
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
    </>
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
