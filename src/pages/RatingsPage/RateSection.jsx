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
      tag: 'environmentRate',
      image: <BiHomeHeart />,
    },
    {
      id: 2,
      name: 'Comidas',
      tag: 'foodRate',
      image: <IoRestaurantOutline />,
    },
    {
      id: 3,
      name: 'Bebidas',
      tag: 'beverageRate',
      image: <IoBeerOutline />,
    },
    {
      id: 4,
      name: 'Preços',
      tag: 'priceRate',
      image: <RiMoneyDollarCircleLine />,
    },
    {
      id: 5,
      name: 'Atendimento',
      tag: 'serviceRate',
      image: <BiWinkSmile />,
    },
  ];
  const [ratingObject, setRatingObject] = useState({});

  return (
    <Container>
      <h2>Compartilhe conosco o que achou do nosso serviço. Sua opinião é muito importante para nós!</h2>
      <ul>
        {ratingsOptions.map(({ id, name, image, tag }) => (
          <OptionLine
            key={id}
            name={name}
            image={image}
            tag={tag}
            ratingObject={ratingObject}
            setRatingObject={setRatingObject}
          />
        ))}
      </ul>
    </Container>
  );
}

function OptionLine({ name, image, tag, ratingObject, setRatingObject }) {
  const [rate, setRate] = useState(1);

  function handleRatingOption(value, name) {
    setRatingObject({
      ...ratingObject,
      [name]: value,
    });
    setRate(value);
  }

  return (
    <LineStyle>
      <div>
        <div>{image}</div>
        <h3>{name}</h3>
      </div>
      <Rate rate={rate}>
        <IoStar onClick={() => handleRatingOption(1, tag)} />
        <IoStar onClick={() => handleRatingOption(2, tag)} />
        <IoStar onClick={() => handleRatingOption(3, tag)} />
        <IoStar onClick={() => handleRatingOption(4, tag)} />
        <IoStar onClick={() => handleRatingOption(5, tag)} />
      </Rate>
    </LineStyle>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 45%;
  border-right: 1px solid #b4b1b1;
  padding-right: 20px;

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

  svg:nth-child(1) {
    color: ${(props) => (props.rate >= 1 ? '#DEA12A' : '#9e9a9a')};

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }

  svg:nth-child(2) {
    color: ${(props) => (props.rate >= 2 ? '#DEA12A' : '#9e9a9a')};

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }

  svg:nth-child(3) {
    color: ${(props) => (props.rate >= 3 ? '#DEA12A' : '#9e9a9a')};

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }

  svg:nth-child(4) {
    color: ${(props) => (props.rate >= 4 ? '#DEA12A' : '#9e9a9a')};

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }

  svg:nth-child(5) {
    color: ${(props) => (props.rate === 5 ? '#DEA12A' : '#9e9a9a')};

    &:hover {
      cursor: pointer;
      filter: brightness(0.9);
    }
  }
`;
