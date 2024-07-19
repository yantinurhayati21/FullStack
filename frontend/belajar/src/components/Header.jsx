import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-200">
            FilmApp
          </Link>
        </div>
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link to="/films" className="hover:text-blue-200">
            Films
          </Link>
          <Link to="/films/add" className="hover:text-blue-200">
            Add Film
          </Link>
          <Link to="/register" className="hover:text-blue-200">
            Register
          </Link>
          <Link to="/login" className="hover:text-blue-200">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
