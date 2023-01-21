import styled from 'styled-components';

export default function CategoriesMenu() {
  const categories = [
    {
      name: 'Entradas',
      image:
        'https://b1861587.smushcdn.com/1861587/wp-content/themes/yootheme/cache/80/entradas-para-cardapio-restaurante-804ebbe0.jpeg?lossy=1&strip=1&webp=1',
    },
    {
      name: 'Lanches',
      image: 'https://www.sabornamesa.com.br/media/k2/items/cache/bf1e20a4462b71e3cc4cece2a8c96ac8_XL.jpg',
    },
    {
      name: 'Pratos Principais',
      image: 'https://revistanews.com.br/wp-content/uploads/2018/05/Prato-principal-Didge-Steakhouse-Pub.jpg',
    },
    { name: 'Sobremesas', image: 'https://cdn.abrahao.com.br/base/fa1/4db/4d8/tipos-sobremesa-para-vender.jpg' },
  ];

  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <CategoryOption category={category} />
      ))}
    </CategoriesContainer>
  );
}

function CategoryOption({ category }) {
  return (
    <OptionStyle>
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
    width: 100px;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    position: absolute;
    bottom: 20px;
    left: calc(50% - 50px);
  }
`;
