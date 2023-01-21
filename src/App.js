import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './common/GlobalStyle';
import Reset from './common/Reset';
import Dashboard from './pages/Dashboard';
import BeveragesPage from './pages/Dashboard/BeveragesPage';
import FoodsPage from './pages/Dashboard/FoodsPage';
import Home from './pages/Dashboard/Home';
import ProductPage from './pages/Dashboard/ProductPage';

export default function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="foods/:categoryId" element={<FoodsPage />} />
            <Route path="beverages/:categoryId" element={<BeveragesPage />} />
            <Route path="product/:productId" element={<ProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
