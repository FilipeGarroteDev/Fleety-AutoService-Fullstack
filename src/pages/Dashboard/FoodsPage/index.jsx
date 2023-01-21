import { useState } from 'react';
import styled from 'styled-components';
import CategoriesMenu from '../../../components/Dashboard/FoodsAndDrinksPages/CategoriesMenu';
import ProductCard from '../../../components/Dashboard/FoodsAndDrinksPages/ProductCard';
import ProductsList from '../../../components/Dashboard/FoodsAndDrinksPages/ProductsList';

export default function FoodsPage() {
  const [category, setCategory] = useState('Entradas');
  const products = [
    {
      id: 1,
      name: 'Salada de Atum',
      category: 'Entradas',
      productSection: 'Saladas',
      description: 'Uma salada bem maneira com atum, queijo e azeitona',
      value: 2599,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
    },
    {
      id: 2,
      name: 'Salada de Atum',
      category: 'Entradas',
      description: 'Uma salada bem maneira com atum, queijo e azeitona',
      productSection: 'Saladas',
      value: 2599,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
    },
    {
      id: 3,
      name: 'Salada de Atum',
      category: 'Entradas',
      description: 'Uma salada bem maneira com atum, queijo e azeitona',
      productSection: 'Saladas',
      value: 2599,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
    },
    {
      id: 4,
      name: 'Salada de Atum',
      category: 'Entradas',
      productSection: 'Saladas',
      description: 'Uma salada bem maneira com atum, queijo e azeitona',
      value: 2599,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
    },
    {
      id: 4,
      name: 'Salada de Atum',
      category: 'Entradas',
      productSection: 'Saladas',
      description: 'Uma salada bem maneira com atum, queijo e azeitona',
      value: 2599,
      image:
        'https://saboreiaavida.nestle.pt/sites/default/files/styles/receita_card_620x560/public/pictures/e10d8b86-55e2-11e4-b7b1-d4ae52be23e7.png?h=80accfed&itok=ZvgUCzxd',
    },
    {
      id: 5,
      name: 'Dadinho de Tapioca',
      category: 'Entradas',
      description: 'Dadinho de tapioca show de bola, frito na hora e com molho de pimenta para acompanhar.',
      productSection: 'Petiscos',
      value: 3850,
      image: 'https://img.cybercook.com.br/receitas/695/dadinho-de-tapioca-com-queijo-de-coalho-1.jpeg',
    },
    {
      id: 6,
      name: 'Dadinho de Tapioca',
      category: 'Entradas',
      description: 'Dadinho de tapioca show de bola, frito na hora e com molho de pimenta para acompanhar.',
      productSection: 'Petiscos',
      value: 3850,
      image: 'https://img.cybercook.com.br/receitas/695/dadinho-de-tapioca-com-queijo-de-coalho-1.jpeg',
    },
    {
      id: 7,
      name: 'Dadinho de Tapioca',
      category: 'Entradas',
      description: 'Dadinho de tapioca show de bola, frito na hora e com molho de pimenta para acompanhar.',
      productSection: 'Petiscos',
      value: 3850,
      image: 'https://img.cybercook.com.br/receitas/695/dadinho-de-tapioca-com-queijo-de-coalho-1.jpeg',
    },
    {
      id: 8,
      name: 'Dadinho de Tapioca',
      category: 'Entradas',
      description: 'Dadinho de tapioca show de bola, frito na hora e com molho de pimenta para acompanhar.',
      productSection: 'Petiscos',
      value: 3850,
      image: 'https://img.cybercook.com.br/receitas/695/dadinho-de-tapioca-com-queijo-de-coalho-1.jpeg',
    },
    {
      id: 9,
      name: 'Dadinho de Tapioca',
      category: 'Entradas',
      description: 'Dadinho de tapioca show de bola, frito na hora e com molho de pimenta para acompanhar.',
      productSection: 'Petiscos',
      value: 3850,
      image: 'https://img.cybercook.com.br/receitas/695/dadinho-de-tapioca-com-queijo-de-coalho-1.jpeg',
    },
    {
      id: 10,
      name: 'Dadinho de Tapioca',
      category: 'Entradas',
      description: 'Dadinho de tapioca show de bola, frito na hora e com molho de pimenta para acompanhar.',
      productSection: 'Petiscos',
      value: 3850,
      image: 'https://img.cybercook.com.br/receitas/695/dadinho-de-tapioca-com-queijo-de-coalho-1.jpeg',
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
