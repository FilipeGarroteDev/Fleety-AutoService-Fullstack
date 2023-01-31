import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import AddItemsMenu from './AddItemsMenu';
import WithdrawItemsMenu from './WithdrawItemsMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductData, postOrder } from '../../../../services/axios';

export default function ProductPage() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [productAmount, setProductAmount] = useState(1);
  const [extraValue, setExtraValue] = useState(0);
  const [productData, setProductData] = useState({});
  const [selectedOptionals, setSelectedOptionals] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const product = await getProductData(productId);
        setProductData(product.data);
      } catch (error) {
        alert(error.response.data);
      }
    }
    fetchData();
  }, []);

  const formattedValue = (((productData.value + extraValue) * productAmount) / 100).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  function increaseOrDecreaseProductAmount(operation) {
    if (operation === '-' && productAmount > 1) {
      setProductAmount(productAmount - 1);
    } else if (operation === '+') {
      setProductAmount(productAmount + 1);
    }
  }

  async function sendProduct() {
    const withdrawItens = selectedOptionals.withdraw ? `Retirar: ${selectedOptionals.withdraw}\n` : '';
    let auxString = '';
    for (let i = 0; i < Object.keys(selectedOptionals).length; i++) {
      if (Object.keys(selectedOptionals)[i] === 'withdraw') continue;
      auxString = auxString + `${Object.values(selectedOptionals)[i]}x ${Object.keys(selectedOptionals)[i]}, `;
    }
    const additionals = auxString === '' ? '' : 'Adicionais: ' + auxString.trim().slice(0, -1);
    const optionals = `${withdrawItens}${additionals}`;
    const ticketId = JSON.parse(localStorage.getItem('ticket')).id;

    const body = {
      ticketId,
      productId: Number(productId),
      totalValue: (productData.value + extraValue) * productAmount,
      optionals,
      status: 'SELECTED',
      amount: productAmount,
    };

    try {
      await postOrder(body);
      alert('Pedido realizado com sucesso. Você já pode visualizá-lo no menu "Meu Pedido"');
      navigate('/chart');
    } catch (error) {
      alert('Algo deu errado com o seu pedido, por gentileza, refaça a operação');
    }
  }

  return (
    <Wrapper>
      <ProductBanner>
        <img src={productData.image} alt="productImage" />
        <h1>{productData.name}</h1>
      </ProductBanner>
      <h2>{productData.description}</h2>
      <WithdrawItemsMenu
        optional={productData.Optionals ? productData.Optionals[0].name : ''}
        selectedOptionals={selectedOptionals}
        setSelectedOptionals={setSelectedOptionals}
      />
      <AddItemsMenu
        extraValue={extraValue}
        setExtraValue={setExtraValue}
        optionals={productData.Optionals}
        selectedOptionals={selectedOptionals}
        setSelectedOptionals={setSelectedOptionals}
      />
      <FinishOrderSection>
        <aside>
          <AiOutlineMinusCircle onClick={() => increaseOrDecreaseProductAmount('-')} />
          <strong>{productAmount}</strong>
          <AiOutlinePlusCircle onClick={() => increaseOrDecreaseProductAmount('+')} />
        </aside>
        <button onClick={sendProduct}>{`${formattedValue} Adicionar`}</button>
      </FinishOrderSection>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  padding-right: 20px;
  padding-bottom: 150px;
  overflow-x: hidden;
  overflow-y: auto;

  > h2 {
    font-size: 26px;
    color: #d9d9d9;
  }
`;

const ProductBanner = styled.header`
  width: 100%;
  height: 200px;
  background-color: #000000;
  box-shadow: 5px 0 15px 0 rgba(0, 0, 0, 0.3);
  overflow: hidden;
  position: relative;
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
    text-align: center;
    width: 300px;
    position: absolute;
    color: #ffffff;
    font-size: 40px;
    font-weight: 700;
    bottom: 10px;
    left: calc(50% - 150px);
  }
`;

const FinishOrderSection = styled.footer`
  width: 100%;
  height: 100px;
  padding-left: 14%;
  padding-right: 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.2);
  justify-content: space-between;
  background-color: #544e4e;

  > aside {
    display: flex;
    align-items: center;
    gap: 15px;

    > svg {
      color: #d9d9d9;
      font-size: 40px;
    }

    > strong {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      background-color: #d9d9d9;
      border-radius: 50px;
      color: #544e4e;
      font-size: 20px;
      font-weight: 700;
    }
  }

  > button {
    width: 160px;
    height: 80px;
    border-radius: 15px;
    background-color: #2a6437;
    border: none;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
