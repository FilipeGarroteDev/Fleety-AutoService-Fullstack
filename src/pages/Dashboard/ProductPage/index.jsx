import { useState } from 'react';
import styled from 'styled-components';

export default function ProductPage() {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-right: 20px;
  background-color: red;
`;

const ProductBanner = styled.div`
  width: 100%;
  height: 200px;
  background-color: #000000;
  overflow: hidden;
  position: relative;

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
    animation: animateImage 3.5s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }
`;
