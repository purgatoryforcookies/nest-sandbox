import { Link } from 'react-router';

const Header = () => {
  return (
    <nav className="border-b-2 flex justify-center">
      <div className="w-full flex justify-between py-5 px-10 max-w-[1200px]">
        <a href="/">
          <p>Sandbox</p>
        </a>
        <ul className="flex gap-5 items-center">
          <li>
            <Link to={'/'} className="hover:text-primary hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link
              to={'/profile'}
              className="hover:text-primary hover:underline"
            >
              Profile
            </Link>
          </li>
          <li>
            <a
              href={'/auth/logout'}
              className="hover:text-primary hover:underline"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
