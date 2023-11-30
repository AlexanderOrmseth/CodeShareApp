import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="flex sm:flex-1 items-center justify-center">
      <div className="p-8 bg-dark-400 border border-dark-300 rounded-md text-center">
        <h1 className="sm:text-4xl text-2xl font-bold text-white mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-300 mb-6">
          Oops! The page you are looking for does not exist.
        </p>
        <Link to="/" className="btn-secondary py-2">
          Go Back to CodeShare Home Page
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
