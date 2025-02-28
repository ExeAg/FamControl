import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-zinc-800 h-screen w-64 fixed left-0 top-0 flex flex-col items-center py-10 space-y-6 text-white">
      <h1 className="text-2xl font-bold">Menú</h1>
      <ul className="flex flex-col space-y-4 w-full px-4">
        <li>
          <Link
            to="/"
            className="block text-center py-2 px-4 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
          >
            Inicio
          </Link>
        </li>
        <li>
          <Link
            to="/register"
            className="block text-center py-2 px-4 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
          >
            Registro
          </Link>
        </li>
        <li>
          <Link
            to="/contacto"
            className="block text-center py-2 px-4 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition"
          >
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
}
