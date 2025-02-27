import { useNavigate } from 'react-router';
import { Button } from './ui/button';

const Header = () => {
  const navigate = useNavigate();

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
            <form action="/auth/logout" method="POST">
              <Button type="submit" variant={'link'}>
                Logout
              </Button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
