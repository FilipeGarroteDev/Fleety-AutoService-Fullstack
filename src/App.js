import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Reset from './common/Reset';
import AdminRouteProtector from './common/RouteProtector/AdminRouteProtector';
import ClientRouteProtector from './common/RouteProtector/ClientRouteProtector';
import AdminDashboard from './pages/AdminSide/AdminDashBoard';
import BillingSection from './pages/AdminSide/AdminDashBoard/BillingSection';
import ClientRatings from './pages/AdminSide/AdminDashBoard/ClientRatings';
import OrdersSection from './pages/AdminSide/AdminDashBoard/OrdersSection';
import RegisterTableSection from './pages/AdminSide/AdminDashBoard/RegisterTableSection';
import ServiceSection from './pages/AdminSide/AdminDashBoard/ServiceSection';
import AccountPage from './pages/ClientSide/AccountPage';
import ChartPage from './pages/ClientSide/ChartPage';
import ClientDashboard from './pages/ClientSide/ClientDashboard';
import BeveragesPage from './pages/ClientSide/ClientDashboard/BeveragesPage';
import FoodsPage from './pages/ClientSide/ClientDashboard/FoodsPage';
import Home from './pages/ClientSide/ClientDashboard/Home';
import ProductPage from './pages/ClientSide/ClientDashboard/ProductPage';
import RatingsPage from './pages/ClientSide/RatingsPage';
import SigninPage from './pages/SigninPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <>
      <Reset />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <QueryClientProvider client={queryClient}>
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
              <Route path="waiter-queue" element={<ServiceSection />} />
              <Route path="orders-queue" element={<OrdersSection />} />
              <Route path="ratings-overview" element={<ClientRatings />} />
              <Route path="register" element={<RegisterTableSection />} />
              <Route path="billing" element={<BillingSection />} />
            </Route>

            <Route
              path="/"
              element={
                <ClientRouteProtector>
                  <ClientDashboard />
                </ClientRouteProtector>
              }
            >
              <Route path="" element={<Home />} />
              <Route path="foods/:categoryId?" element={<FoodsPage />} />
              <Route path="beverages/:categoryId?" element={<BeveragesPage />} />
              <Route path="product/:productId" element={<ProductPage />} />
              <Route path="chart" element={<ChartPage />} />
              <Route path="checkout" element={<AccountPage />} />
              <Route path="rate" element={<RatingsPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}
