import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './common/GlobalStyle';
import Reset from './common/Reset';
import AccountPage from './pages/AccountPage';
import ChartPage from './pages/ChartPage';
import Dashboard from './pages/Dashboard';
import BeveragesPage from './pages/Dashboard/BeveragesPage';
import FoodsPage from './pages/Dashboard/FoodsPage';
import Home from './pages/Dashboard/Home';
import ProductPage from './pages/Dashboard/ProductPage';
import RatingsPage from './pages/RatingsPage';
import SigninPage from './pages/SigninPage';

export default function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="foods/:categoryId" element={<FoodsPage />} />
            <Route path="beverages/:categoryId" element={<BeveragesPage />} />
            <Route path="product/:productId" element={<ProductPage />} />
          </Route>
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/checkout" element={<AccountPage />} />
          <Route path="/rate" element={<RatingsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
