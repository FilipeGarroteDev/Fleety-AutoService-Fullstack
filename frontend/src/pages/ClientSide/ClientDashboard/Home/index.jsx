import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import banner1 from '../../../../assets/images/banner1.png';
import banner2 from '../../../../assets/images/banner2.png';
import banner3 from '../../../../assets/images/banner3.png';

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
      <Banner ref={carousel}>
        <img src={banner1} alt="banner1" onClick={() => navigate('/rate')} />
        <img src={banner2} alt="banner2" onClick={() => navigate('/foods')} />
        <img src={banner3} alt="banner3" onClick={() => navigate('/beverages')} />
      </Banner>
      <CarouselButtons>
        <CarouselButton onClick={() => handleCarouselButton('first')} selected={isClicked} option="first" />
        <CarouselButton onClick={() => handleCarouselButton('second')} selected={isClicked} option="second" />
        <CarouselButton onClick={() => handleCarouselButton('third')} selected={isClicked} option="third" />
      </CarouselButtons>
    </>
  );
}

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 88%;
  height: 86%;
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

  &:hover {
      cursor: pointer;
      filter: brightness(1.1)
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

  &:hover {
    cursor: pointer;
  }
`;
