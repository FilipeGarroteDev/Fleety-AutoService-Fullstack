import { useState } from 'react';
import styled from 'styled-components';
import CategoriesMenu from '../../../components/Dashboard/FoodsAndDrinksPages/CategoriesMenu';
import ProductCard from '../../../components/Dashboard/FoodsAndDrinksPages/ProductCard';
import ProductsList from '../../../components/Dashboard/FoodsAndDrinksPages/ProductsList';

export default function FoodsPage() {
  const [products, setProducts] = useState([]);

  return (
    <>
      <CategoriesMenu setProducts={setProducts} />
      <ProductsList>
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
