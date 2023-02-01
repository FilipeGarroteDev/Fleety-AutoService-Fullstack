import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Reset from './common/Reset';
import AdminRouteProtector from './common/RouteProtector/AdminRouteProtector';
import ClientRouteProtector from './common/RouteProtector/ClientRouteProtector';
import AdminDashboard from './pages/AdminSide/AdminDashBoard';
import OrdersSection from './pages/AdminSide/AdminDashBoard/OrdersSection';
import PendingWaiter from './pages/AdminSide/AdminDashBoard/ServiceSection/PendingWaiter';
import AccountPage from './pages/ClientSide/AccountPage';
import ChartPage from './pages/ClientSide/ChartPage';
import ClientDashboard from './pages/ClientSide/ClientDashboard';
import BeveragesPage from './pages/ClientSide/ClientDashboard/BeveragesPage';
import FoodsPage from './pages/ClientSide/ClientDashboard/FoodsPage';
import Home from './pages/ClientSide/ClientDashboard/Home';
import ProductPage from './pages/ClientSide/ClientDashboard/ProductPage';
import RatingsPage from './pages/ClientSide/RatingsPage';
import SigninPage from './pages/SigninPage';

export default function App() {
  return (
    <>
      <Reset />
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />

          <Route
            path="/admin"
            element={
              <AdminRouteProtector>
                <AdminDashboard />
              </AdminRouteProtector>
            }
          >
            <Route path="waiter-queue" element={<PendingWaiter />} />
            <Route path="orders-queue" element={<OrdersSection />} />
          </Route>

          <Route
            path="/"
            element={
              <ClientRouteProtector>
                <ClientDashboard />
              </ClientRouteProtector>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="foods/:categoryId?" element={<FoodsPage />} />
            <Route path="beverages/:categoryId?" element={<BeveragesPage />} />
            <Route path="product/:productId" element={<ProductPage />} />
            <Route path="chart" element={<ChartPage />} />
            <Route path="checkout" element={<AccountPage />} />
            <Route path="rate" element={<RatingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
