import { useState } from 'react';
import styled from 'styled-components';
import RateSection from './RateSection';
import UserNoteSection from './UserNoteSection';

export default function RatingsPage() {
  const [ratingObject, setRatingObject] = useState({});

  return (
    <>
      <Wrapper>
        <h1>Avalie os nossos serviços</h1>
        <RatingsBox>
          <div>
            <RateSection ratingObject={ratingObject} setRatingObject={setRatingObject} />
            <UserNoteSection ratingObject={ratingObject} setRatingObject={setRatingObject} />
          </div>
          <button>Enviar Avaliação</button>
        </RatingsBox>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`

  > h1 {
    font-size: 22px;
    font-weight: 700;
    color: #9b9999;
  }
`;

const RatingsBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 84vw;
  height: 70vh;
  border-radius: 5px;
  background-color: #dad8d8;
  box-shadow: 2px 0 15px rgba(0, 0, 0, 0.5);
  margin-top: 30px;
  padding: 40px;

  > div {
    display: flex;
  }

  > button {
    width: 20%;
    height: 50px;
    margin-top: 25px;
    margin-right: 120px;

    border: none;
    background-color: #dea12a;
    border-radius: 10px;
    font-size: 18px;
    font-weight: 700;
    color: #121111;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }

    &:active {
      transform: scale(1.02);
    }
  }
`;
