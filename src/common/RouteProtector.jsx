import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../services/axios';

export default function RouteProtector({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    async function fetchData() {
      try {
        await validateToken(token);
        navigate('/home');
      } catch (error) {
        navigate('/signin');
      }
    }
    fetchData();
  }, []);

  return <>{children}</>;
}
