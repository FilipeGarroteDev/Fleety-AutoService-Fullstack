import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import LoadingPage from '../../components/LoadingPage';
import { validateToken } from '../../services/axios/auth-connections';

export default function AdminRouteProtector({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (!token) navigate('/signin');

  const { data, isError, isLoading } = useQuery('userData', () => {
    return validateToken(token).then((res) => res.data);
  });

  if (isLoading) {
    return <LoadingPage admin/>;
  }

  if (isError) {
    localStorage.clear();
    navigate('/signin');
  }

  if (data.role === 'CLIENT') {
    navigate('/');
  }

  if (data.role === 'ADMIN') {
    return <>{children}</>;
  }
}
