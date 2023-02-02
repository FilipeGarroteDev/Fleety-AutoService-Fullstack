import styled from 'styled-components';

export default function SummaryContainer({ data }) {
  return (
    <Wrapper>
      <div>
        <h3>Em espera:</h3>
        <strong>{data.length}</strong>
      </div>
      <div>
        <h3>Entregues:</h3>
        <strong>53</strong>
      </div>
      <div>
        <h3>Total:</h3>
        <strong>10</strong>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: 130px;
  padding: 0 30px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  > div {
    height: 100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: #ffffff;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px 3px rgba(0, 0, 0, 0.2);

    > h3 {
      font-size: 22px;
      font-weight: 400;
      color: #3f6ad8;
    }

    > strong {
      font-size: 46px;
      font-weight: 400;
      width: 100%;
      text-align: start;
    }
  }
`;
