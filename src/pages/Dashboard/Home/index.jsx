import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function Home() {
  const carousel = useRef(null);
  const [isClicked, setIsClicked] = useState('first');
  const navigate = useNavigate();

  function handleCarouselButton(position) {
    if (position === 'first') {
      carousel.current.scrollLeft = 0;
      setIsClicked(position);
      return;
    } else if (position === 'second') {
      carousel.current.scrollLeft = carousel.current.offsetWidth;
      setIsClicked(position);
      return;
    } else {
      carousel.current.scrollLeft += 2 * carousel.current.offsetWidth;
      setIsClicked(position);
      return;
    }
  }

  return (
    <>
      <Greetings>Seja bem vindo, Filipe Garrote</Greetings>
      <Banner ref={carousel}>
        <img
          src="https://media.istockphoto.com/id/530415758/pt/foto/frango-assado-guarnecido-com-espargos-e-plantas-arom%C3%A1ticas.jpg?s=612x612&w=0&k=20&c=O0fwJuFYtlHDXoy9fgTpi93q7T3tIJk8fMCijiBmbBY="
          alt="banner2"
          onClick={() => navigate('/rate')}
        />
        <img
          src="https://www.maquinbal.com.br/media/resized/xl-1400-797/blog/1/blog-5-melhores-entradas.jpg"
          alt="banner3"
          onClick={() => navigate('/foods')}
        />
        <img
          src="https://www.lojabrazil.com.br/blog/wp-content/uploads/2017/09/blog1500.jpg"
          alt="banner1"
          onClick={() => navigate('/drinks')}
        />
      </Banner>
      <CarouselButtons>
        <CarouselButton onClick={() => handleCarouselButton('first')} selected={isClicked} option="first" />
        <CarouselButton onClick={() => handleCarouselButton('second')} selected={isClicked} option="second" />
        <CarouselButton onClick={() => handleCarouselButton('third')} selected={isClicked} option="third" />
      </CarouselButtons>
    </>
  );
}

const Greetings = styled.h1`
  color: #d9d9d9;
  font-size: 30px;
  font-weight: 700;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 88%;
  height: 77%;
  position: absolute;
  background-color: black;
  bottom: 0;
  right: 0;
  overflow: hidden;
  scroll-behavior: smooth;

  img {
    flex-shrink: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    mask-image: linear-gradient(to top, #0000001f, #000000df);
    -webkit-mask-image: linear-gradient(to top, #0000001f, #000000df);
  }
`;

const CarouselButtons = styled.nav`
  position: absolute;
  height: 60px;
  width: 150px;
  bottom: 20px;
  left: calc(50% - 75px);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const CarouselButton = styled.button`
  border-radius: 50px;
  border: none;
  width: 15px;
  height: 15px;
  background-color: ${(props) => (props.selected === props.option ? '#ffffff' : '#5f5858')};

  &:hover{
    cursor: pointer;
  }
`;
