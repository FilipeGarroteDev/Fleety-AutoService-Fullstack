import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getCategories } from '../../../services/axios';

export default function CategoriesMenu({ setCategory }) {
  const { pathname } = useLocation();
  const page = pathname.slice(1).split('/')[0];
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const promise = await getCategories(page);
        setCategories(promise.data);
      } catch (error) {
        alert('Houve um erro com a sua requisição');
      }
    }
    fetchData();
  }, []);

  return (
    <CategoriesContainer>
      {categories?.map((category) => (
        <CategoryOption category={category} setCategory={setCategory} page={page} />
      ))}
    </CategoriesContainer>
  );
}

function CategoryOption({ category, setCategory, page }) {
  const navigate = useNavigate();
  return (
    <OptionStyle
      onClick={() => {
        setCategory(category.name);
        navigate(`/${page}/${category.id}`);
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
