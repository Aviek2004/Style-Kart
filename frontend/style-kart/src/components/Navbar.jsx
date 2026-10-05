import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems } = useCart();

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <nav className="border-b">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}

        <Link
          to="/"
          className="text-2xl font-bold"
        >
          StyleKart
        </Link>

        {/* Navigation */}

        <div className="flex items-center gap-8">

          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Products
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-1"
          >
            Cart

            {totalItems > 0 && (
              <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* My Orders */}

          {user && (
            <Link
              to="/orders"
              className="hover:text-gray-500"
            >
              My Orders
            </Link>
          )}

          {/* Authentication */}

          {user ? (
            <>
              <span className="text-sm text-gray-600">
                Hi, {user.name}
              </span>

              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              Login
            </Link>
          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;