import { useState } from 'react';
import styled from 'styled-components';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function ProductPage() {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <Wrapper isClicked={isClicked}>
      <ProductBanner>
        <img
          src="https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd"
          alt="productImage"
        />
        <h1>Salada de salmão</h1>
      </ProductBanner>
      <h2>
        Salada fresca com folhas diversas, incluindo alface crespa, rúcula e alface americana, além de salmão desfiado,
        azeitonas e muçarela de búfala.
      </h2>
      <div>
        <div className="closed" onClick={() => setIsClicked(!isClicked)}>
          <h3>Deseja retirar algum item?</h3>
          {isClicked ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <div className="opened">
          <textarea placeholder="Digite aqui o que deseja retirar..." />
        </div>
      </div>
      {/* <div>
        <h3>Adicionais</h3>
        <FaChevronDown />
      </div> */}
      <footer></footer>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-right: 20px;

  > h2 {
    font-size: 26px;
    color: #d9d9d9;
  }

  > div {
    width: 100%;
    height: auto;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #655d5d;
    border-radius: 6px;
    box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.3);
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    margin-top: 25px;
    transition: all 0.3s;
    overflow: hidden;

    > .closed {
      width: 100%;
      height: 55px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    > .opened {
      display: flex;
      height: ${(props) => (props.isClicked ? '205px' : '0')};
      width: 100%;
      transition: all 1s;

      > textarea {
        width: 100%;
        height: 80%;
        background-color: #655d5d;
        border-radius: 15px;
        border: 1px solid #d9d9d9;
        outline: none;
        resize: none;
        font-size: 20px;
        color: #d9d9d9;
        padding: 15px;

        ::placeholder {
          font-size: 16px;
          color: #d9d9d9;
          font-style: italic;
        }
      }
    }
  }
`;

const ProductBanner = styled.header`
  width: calc(100% + 45px);
  height: 200px;
  background-color: #000000;
  box-shadow: 5px 0 15px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
  top: -20px;
  left: -27px;
  right: 0;
  margin-bottom: 10px;

  > img {
    @keyframes animateImage {
      0% {
        transform: translateY(100px);
      }
      100% {
        transform: translateY(0);
      }
    }

    width: 100%;
    height: 500%;
    position: absolute;
    top: -500px;
    mask-image: linear-gradient(to top, #0000001f, #000000df);
    -webkit-mask-image: linear-gradient(to top, #0000001f, #000000df);
    animation: animateImage 5s ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  > h1 {
    width: 300px;
    position: absolute;
    color: #ffffff;
    font-size: 40px;
    font-weight: 700;
    bottom: 10px;
    left: calc(50% - 150px);
  }
`;
