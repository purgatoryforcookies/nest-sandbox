import { getMe } from '@/service/api';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

export const PrivateRoute = () => {
  const [isLoading, setIsloading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const get = async () => {
      setIsloading(true);
      try {
        await getMe();
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsloading(false);
      }
    };
    get();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
};
