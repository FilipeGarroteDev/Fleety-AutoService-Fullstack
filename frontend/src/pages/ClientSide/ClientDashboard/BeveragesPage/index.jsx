import { useState } from 'react';
import styled from 'styled-components';
import CategoriesMenu from '../../../../components/ClientSideComponents/Dashboard/FoodsAndDrinksPages/CategoriesMenu';
import EmptyPage from '../../../../components/ClientSideComponents/Dashboard/FoodsAndDrinksPages/EmptyPage';
import ProductCard from '../../../../components/ClientSideComponents/Dashboard/FoodsAndDrinksPages/ProductCard';
import ProductsList from '../../../../components/ClientSideComponents/Dashboard/FoodsAndDrinksPages/ProductsList';

export default function BeveragesPage() {
  const [products, setProducts] = useState([]);

  return (
    <>
      <CategoriesMenu setProducts={setProducts} />
      <ProductsList>
        {products.length === 0 ? (
          <EmptyPage>
            <h1>Para visualizar as nossas opções de bebidas, selecione uma das categorias ao lado.</h1>
            <h2>
              Caso deseje que as bebidas cheguem logo, recomendamos que envie, primeiro, o pedido com as bebidas. Caso
              prefira que cheguem junto com as comidas, pode aproveitar o mesmo pedido! :)
            </h2>
          </EmptyPage>
        ) : (
          ''
        )}
        <InnerCategoryTitle>{products[0]?.Category.name}</InnerCategoryTitle>
        {products?.map(({ name, description, value, id, image }) => (
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
