import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoTrash } from 'react-icons/io5';
import { deleteActiveOrder } from '../../../../services/axios';

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
    description?.split(' ').length > 10 ? description.split(' ').splice(0, 10).join(' ') + ' (...)' : description;

  async function deleteProduct() {
    try {
      await deleteActiveOrder(orderId);
      setRerender(!rerender);
      alert('Seu pedido foi excluído do carrinho com sucesso!');
    } catch (error) {
      alert('Ocorreu um erro com sua requisição. Por gentileza, tente novamente!');
      navigate('/home');
    }
  }

  return (
    <CardStyle chart={chart}>
      <img src={image} alt="productImage" onClick={() => navigate(`/product/${id}`)} />
      <div onClick={() => navigate(`/product/${id}`)}>
        <h2>{chart ? `${amount}x ${name}` : name}</h2>
        <h4>{optionals ? '+ observações' : formattedDescription}</h4>
      </div>
      <aside onClick={() => navigate(`/product/${id}`)}>
        <span>{formattedValue}</span>
      </aside>
      {chart ? (
        <button onClick={deleteProduct}>
          <IoTrash />
          Excluir Pedido
        </button>
      ) : (
        ''
      )}
    </CardStyle>
  );
}

const CardStyle = styled.div`
  width: ${(props) => (props.chart ? '90%' : '80%')};
  height: ${(props) => (props.chart ? '90px' : '120px')};
  border-radius: 15px;
  background-color: #2f2c2c;
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
    width: 25%;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 20px;

    > span {
      font-size: 18px;
      font-weight: 700;
      color: #65cf7c;
    }
  }

  > button {
    background-color: #9b4646;
    border: none;
    box-shadow: 2px 0 10px 5px rgba(211, 152, 152, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
    color: #ffffff;
    font-weight: 700;
    font-size: 11px;
    z-index: 10;

    > svg {
      font-size: 22px;
    }
  }
`;
