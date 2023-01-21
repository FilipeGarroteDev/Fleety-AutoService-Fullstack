import { useState } from 'react';
import styled from 'styled-components';
import CategoriesMenu from '../../../components/Dashboard/FoodsAndDrinksPages/CategoriesMenu';
import ProductCard from '../../../components/Dashboard/FoodsAndDrinksPages/ProductCard';
import ProductsList from '../../../components/Dashboard/FoodsAndDrinksPages/ProductsList';

export default function BeveragesPage() {
  const [category, setCategory] = useState('Entradas');
  const products = [
    {
      id: 1,
      name: 'Drinkão da massa',
      category: 'Drinks',
      description: 'Um drink maneiroso, feito com vódega, limão, açúcar, gelo e amor',
      value: 1290,
      image:
        'https://p2.trrsf.com/image/fget/cf/942/530/images.terra.com/2022/10/15/1910289543-whatsapp-image-2020-10-09-at-144545.jpeg',
    },
    {
      id: 2,
      name: 'Drinkão da massa',
      category: 'Drinks',
      description: 'Um drink maneiroso, feito com vódega, limão, açúcar, gelo e amor',
      value: 1290,
      image:
        'https://p2.trrsf.com/image/fget/cf/942/530/images.terra.com/2022/10/15/1910289543-whatsapp-image-2020-10-09-at-144545.jpeg',
    },
    {
      id: 3,
      name: 'Drinkão da massa',
      category: 'Drinks',
      description: 'Um drink maneiroso, feito com vódega, limão, açúcar, gelo e amor',
      value: 1290,
      image:
        'https://p2.trrsf.com/image/fget/cf/942/530/images.terra.com/2022/10/15/1910289543-whatsapp-image-2020-10-09-at-144545.jpeg',
    },
    {
      id: 4,
      name: 'Cervejinha gelada',
      category: 'Cervejas',
      description: 'Uma cerveja da melhor marca brasileira, trincando de gelada.',
      value: 99,
      image: 'https://www.terramagazine.com.br/wp-content/uploads/2021/05/itaipava.jpg',
    },
    {
      id: 5,
      name: 'Cervejinha gelada',
      category: 'Cervejas',
      description: 'Uma cerveja da melhor marca brasileira, trincando de gelada.',
      value: 99,
      image: 'https://www.terramagazine.com.br/wp-content/uploads/2021/05/itaipava.jpg',
    },
    {
      id: 6,
      name: 'Cervejinha gelada',
      category: 'Cervejas',
      description: 'Uma cerveja da melhor marca brasileira, trincando de gelada.',
      value: 99,
      image: 'https://www.terramagazine.com.br/wp-content/uploads/2021/05/itaipava.jpg',
    },
    {
      id: 7,
      name: 'Coquinha bacana',
      category: 'Não Alcoólicos',
      description: 'O famoso refri da galera, servido a -10ºC',
      value: 599,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCrMwwVG74WYPUbjEq46tm00IoPfMpy6tUw&usqp=CAU',
    },
    {
      id: 8,
      name: 'Coquinha bacana',
      category: 'Não Alcoólicos',
      description: 'O famoso refri da galera, servido a -10ºC',
      value: 599,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCrMwwVG74WYPUbjEq46tm00IoPfMpy6tUw&usqp=CAU',
    },

    {
      id: 9,
      name: 'Coquinha bacana',
      category: 'Não Alcoólicos',
      description: 'O famoso refri da galera, servido a -10ºC',
      value: 599,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCrMwwVG74WYPUbjEq46tm00IoPfMpy6tUw&usqp=CAU',
    },
  ];

  return (
    <>
      <CategoriesMenu setCategory={setCategory} />
      <ProductsList>
        <InnerCategoryTitle>{category}</InnerCategoryTitle>
        {products.map(({ name, description, value, id, image }) => (
          <ProductCard key={id} image={image} name={name} description={description} value={value} id={id} />
        ))}
      </ProductsList>
    </>
  );
}

const InnerCategoryTitle = styled.h1`
  font-size: 30px;
  font-weight: 700;
  color: #d9d9d9;
  margin-bottom: 10px;
`;
