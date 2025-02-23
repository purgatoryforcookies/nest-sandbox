import { Link } from 'react-router';

const Footer = () => {
  return (
    <section className="pt-2 pb-10 px-4 bg-footer">
      <footer>
        <div className="mt-24 flex justify-center gap-4 border-t pt-8 text-sm font-medium text-footer-foreground/70">
          <ul className="flex gap-4">
            <li className="">
              <Link to="/about" className="hover:text-primary hover:underline">
                About
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
};

export default Footer;
