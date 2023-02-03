import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { validateToken } from '../../services/axios/auth-connections';

export default function ClientRouteProtector({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) navigate('/signin');

  const { data, isError, isLoading } = useQuery('userData', () => {
    return validateToken(token).then((res) => res.data);
  });

  if (isLoading) {
    return <h1>LOADINGGGGGGGGGG</h1>;
  }

  if (isError) {
    localStorage.clear();
    navigate('/signin');
  }

  if (data.role === 'ADMIN') {
    navigate('/admin');
  }

  if (data.role === 'CLIENT') {
    return <>{children}</>;
  }
}
