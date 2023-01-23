import styled from 'styled-components';
import { BiHomeHeart, BiWinkSmile } from 'react-icons/bi';
import { IoRestaurantOutline, IoBeerOutline, IoStar } from 'react-icons/io5';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useState } from 'react';

export default function RateSection() {
  const ratingsOptions = [
    {
      id: 1,
      name: 'Ambiente',
      image: <BiHomeHeart />,
    },
    {
      id: 2,
      name: 'Comidas',
      image: <IoRestaurantOutline />,
    },
    {
      id: 3,
      name: 'Bebidas',
      image: <IoBeerOutline />,
    },
    {
      id: 4,
      name: 'Preços',
      image: <RiMoneyDollarCircleLine />,
    },
    {
      id: 5,
      name: 'Atendimento',
      image: <BiWinkSmile />,
    },
  ];

  return (
    <Container>
      <h2>Compartilhe conosco o que achou do nosso serviço. Sua opinião é muito importante para nós!</h2>
      <ul>
        {ratingsOptions.map(({ id, name, image }) => (
          <OptionLine key={id} name={name} image={image} />
        ))}
      </ul>
    </Container>
  );
}

function OptionLine({ name, image }) {
  const [rate, setRate] = useState();
  
  return (
    <LineStyle>
      <div>
        <div>{image}</div>
        <h3>{name}</h3>
      </div>
      <Rate>
        <IoStar />
        <IoStar />
        <IoStar />
        <IoStar />
        <IoStar />
      </Rate>
    </LineStyle>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 45%;

  > h2 {
    font-size: 16px;
    color: #121111;
    margin-bottom: 25px;
  }

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
  }
`;

const LineStyle = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;
    gap: 15px;

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 38px;
      background-color: #6b6464;
      border-radius: 50px;

      > svg {
        font-size: 26px;
        color: #dad8d8;
      }
    }

    > h3 {
      font-size: 18px;
      font-weight: 700;
      color: #6b6464;
    }
  }
`;

const Rate = styled.li`
  display: flex;
  gap: 5px;
  font-size: 26px;
  color: #9e9a9a;
`;
