import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../services/axios';

export default function ClientRouteProtector({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await validateToken(token);
        if (user.data.role === 'CLIENT') {
          navigate('/home');
        } else if (user.data.role === 'ADMIN') {
          navigate('/admin');
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
