import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { useOidc } from '@/service/oidc';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useOidc();

  return (
    <nav className="border-b-2 flex justify-center">
      <div className="w-full flex justify-between py-5 px-10 max-w-[1200px]">
        <a href="/">
          <p>Sandbox</p>
        </a>
        <ul className="flex gap-3 items-center">
          <li>
            <Button onClick={() => navigate('/')} variant={'link'}>
              Home
            </Button>
          </li>
          <li>
            <Button onClick={() => navigate('/profile')} variant={'link'}>
              Profile
            </Button>
          </li>
          <li>
            <Button
              variant={'link'}
              onClick={() => logout({ redirectTo: 'home' })}
            >
              Logout
            </Button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
