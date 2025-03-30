import { OidcProvider } from '@/service/oidc';
import { Outlet } from 'react-router';

export const PrivateRoute = () => {
  return (
    <OidcProvider>
      <Outlet />
    </OidcProvider>
  );
};
