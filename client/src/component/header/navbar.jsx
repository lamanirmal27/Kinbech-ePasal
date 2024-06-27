import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0  sticky top-0">
      <h2 className="text-2xl font-semibold">
        <NavLink to={"/"}>KinBech ePasal</NavLink>
      </h2>

      <ul className="flex gap-5">
        <li>
          <NavLink
            to={"/"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/login"}
            className="text-black hover:text-gray-700 duration-300"
          >
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
