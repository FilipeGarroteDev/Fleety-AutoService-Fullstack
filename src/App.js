import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './common/GlobalStyle';
import Reset from './common/Reset';
import Dashboard from './pages/Dashboard';
import FoodsPage from './pages/Dashboard/FoodsPage';
import Home from './pages/Dashboard/Home';

export default function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="foods" element={<FoodsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
