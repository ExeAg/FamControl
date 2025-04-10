import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { ButtonLink } from "./ui/ButtonLink";

export function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    console.log("Usuario en Navbar:", user);

  
    return (
      <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
        <h1 className="text-2xl font-bold">
          <Link to={isAuthenticated ? "/control" : "/"}>Panel de Control</Link>
        </h1>
        <ul className="flex gap-x-2">
          {isAuthenticated ? (
            <>
              <li>
                Bienvenido, {user?.nombre}
              </li>
              <li>
                <Link to="/" onClick={() => logout()}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <ButtonLink to="/login">Login</ButtonLink>
              </li>
              <li>
                <ButtonLink to="/register">Register</ButtonLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    );
  }