import { useRef } from 'react';
import styled from 'styled-components';

export default function Home() {
  const carousel = useRef(null);

  function handleCarouselButton(position) {
    if (position === 'first') {
      carousel.current.scrollLeft = 0;
      return;
    } else if (position === 'second') {
      carousel.current.scrollLeft = carousel.current.offsetWidth;
      return;
    } else {
      carousel.current.scrollLeft += 2 * carousel.current.offsetWidth;
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
        />
        <img
          src="https://www.maquinbal.com.br/media/resized/xl-1400-797/blog/1/blog-5-melhores-entradas.jpg"
          alt="banner3"
        />
        <img src="https://www.lojabrazil.com.br/blog/wp-content/uploads/2017/09/blog1500.jpg" alt="banner1" />
      </Banner>
      <CarouselButtons>
        <button onClick={() => handleCarouselButton('first')} />
        <button onClick={() => handleCarouselButton('second')} />
        <button onClick={() => handleCarouselButton('third')} />
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
  height: 75%;
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
  bottom: 20px;
  left: 50%;
  display: flex;
  gap: 30px;

  > button {
    border-radius: 50px;
    border: none;
    width: 15px;
    height: 15px;
    background-color: #ffffff;
  }
`;
