import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './common/GlobalStyle';
import Reset from './common/Reset';
import Home from './pages/Home';

export default function App() {
  return (
    <>
      <Reset />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
