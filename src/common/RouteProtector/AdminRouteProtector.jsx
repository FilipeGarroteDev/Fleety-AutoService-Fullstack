import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../services/axios';

export default function AdminRouteProtector({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await validateToken(token);
        if (user.data.role === 'ADMIN') {
          navigate('/admin');
        } else if (user.data.role === 'CLIENT') {
          navigate('/home');
        }
      } catch (error) {
        localStorage.clear();
        navigate('/signin');
      }
    }
    fetchData();
  }, []);

  return <>{children}</>;
}
