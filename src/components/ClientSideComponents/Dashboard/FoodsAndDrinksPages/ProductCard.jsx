import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoTrash } from 'react-icons/io5';
import { deleteActiveOrder } from '../../../../services/axios/orders-connections';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner';
import { useState } from 'react';

export default function ProductCard({
  name,
  description,
  value,
  id,
  image,
  optionals,
  amount,
  chart,
  orderId,
  rerender,
  setRerender,
}) {
  const navigate = useNavigate();
  const formattedValue = (value / 100).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  const formattedDescription =
    description?.split(' ').length > 15 ? description.split(' ').splice(0, 15).join(' ') + ' (...)' : description;
  const [isClicked, setIsClicked] = useState(false);

  async function deleteProduct() {
    setIsClicked(true);
    try {
      await deleteActiveOrder(orderId);
      setRerender(!rerender);
      toast.success('Seu pedido foi excluído do carrinho com sucesso!');
      setIsClicked(false);
    } catch (error) {
      toast.error('Ocorreu um erro com sua requisição. Por gentileza, tente novamente!');
      setIsClicked(false);
      navigate('/');
    }
  }

  return (
    <>
      <CardStyle chart={chart}>
        <img src={image} alt="productImage" onClick={() => navigate(`/product/${id}`)} />
        <div onClick={() => navigate(`/product/${id}`)}>
          <h2>{chart ? `${amount}x ${name}` : name}</h2>
          <h4>{optionals ? '+ observações' : formattedDescription}</h4>
        </div>
        <aside onClick={() => navigate(`/product/${id}`)}>
          {chart ? '' : <p>A partir de:</p>}
          <span>{formattedValue}</span>
        </aside>
        {!chart ? '' : isClicked ? <p><TailSpin color='#c3c3c3' width={15} height={15}/></p> : <IoTrash onClick={deleteProduct} />}
      </CardStyle>
    </>
  );
}

const CardStyle = styled.div`
  width: ${(props) => (props.chart ? '100%' : '95%')};
  height: ${(props) => (props.chart ? '90px' : '130px')};
  background-color: #2f2c2c;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-shrink: 0;

  > img {
    width: 25%;
    height: 100%;
    object-fit: cover;
    mask-image: linear-gradient(to top, #0000001f, #000000df);
    -webkit-mask-image: linear-gradient(to top, #0000001f, #000000df);
  }

  > div {
    width: ${(props) => (props.chart ? '70%' : '50%')};
    height: 100%;
    padding: ${(props) => (props.chart ? '15px 15px' : '20px 15px')};
    display: flex;
    flex-direction: column;
    color: #c3c3c3;

    > h2 {
      font-weight: 700;
      margin-bottom: 15px;
    }
  }

  > aside {
    display: flex;
    flex-direction: column;
    width: 25%;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 20px;
    color: #ffffff;

    > span {
      font-size: 22px;
      font-weight: 700;
      color: #65cf7c;
    }
  }

  > svg {
    color: #eb9696;
    font-size: 20px;
    position: absolute;
    top: 10px;
    right: 15px;

    &:hover {
      cursor: pointer;
      color: red;
    }
  }

  >p {
    position: absolute;
    top: 10px;
    right: 15px;
  }

  &:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }
`;
