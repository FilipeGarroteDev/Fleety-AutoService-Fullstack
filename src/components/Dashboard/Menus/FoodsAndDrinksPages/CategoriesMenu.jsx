import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function CategoriesMenu({ setCategory }) {
  const { pathname } = useLocation();
  const page = pathname.slice(1).split('/')[0];

  //MOCK
  const categories =
    page === 'foods'
      ? [
        {
          id: 1,
          name: 'Entradas',
          image:
              'https://b1861587.smushcdn.com/1861587/wp-content/themes/yootheme/cache/80/entradas-para-cardapio-restaurante-804ebbe0.jpeg?lossy=1&strip=1&webp=1',
        },
        {
          id: 2,
          name: 'Lanches',
          image: 'https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg',
        },
        {
          id: 3,
          name: 'Pratos Principais',
          image: 'https://revistanews.com.br/wp-content/uploads/2018/05/Prato-principal-Didge-Steakhouse-Pub.jpg',
        },
        {
          id: 4,
          name: 'Sobremesas',
          image: 'https://cdn.abrahao.com.br/base/fa1/4db/4d8/tipos-sobremesa-para-vender.jpg',
        },
      ]
      : [
        {
          id: 5,
          name: 'Não Alcoólicos',
          image:
              'https://lh6.googleusercontent.com/7Nblxtd6xPXkDqB93N4VT3owsGR1zgoGXQFe18tYOh0-xXvFIB-v6-90KrVrX5SB85nSAVnLdWOFTs76mlAD8qEs3lwwqRJuI8pjKQwMy6M9o62GJfyYDz73IGiOR3xhCuIiwAeLfdKcDgWUs9ApeA',
        },
        {
          id: 6,
          name: 'Cervejas',
          image: 'https://content.paodeacucar.com/wp-content/uploads/2017/03/tipos-de-cerveja-vienna.jpg',
        },
        {
          id: 7,
          name: 'Drinks da Casa',
          image: 'https://www.receiteria.com.br/wp-content/uploads/receitas-de-drinks-faceis-0.jpg',
        },
        {
          id: 8,
          name: 'Carta de Vinhos',
          image:
              'https://ichef.bbci.co.uk/news/640/cpsprodpb/3E8F/production/_127251061_c2018252-e442-4ee1-905e-9f55c6deb967.jpg',
        },
      ];

  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <CategoryOption category={category} setCategory={setCategory} />
      ))}
    </CategoriesContainer>
  );
}

function CategoryOption({ category, setCategory }) {
  const navigate = useNavigate();
  return (
    <OptionStyle
      onClick={() => {
        setCategory(category.name);
        navigate(`/foods/${category.id}`);
      }}
    >
      <img src={category.image} alt="categoryImage" />
      <h3>{category.name}</h3>
    </OptionStyle>
  );
}

const CategoriesContainer = styled.nav`
  height: calc(100% - 100px);
  width: 300px;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  left: 12%;
`;

const OptionStyle = styled.section`
  height: 25%;
  width: 100%;
  background-color: #000000;
  position: relative;

  > img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    mask-image: linear-gradient(to top, #0000001f, #000000df);
    -webkit-mask-image: linear-gradient(to top, #0000001f, #000000df);
  }

  > h3 {
    color: #ffffff;
    width: 120px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    position: absolute;
    bottom: 20px;
    left: calc(50% - 50px);
  }

  &:hover {
    cursor: pointer;
    filter: brightness(0.8);
  }
`;
