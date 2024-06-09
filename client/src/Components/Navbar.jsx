// src/Components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 p-4">
    <ul className="flex space-x-4">
      <li>
        <NavLink
          to="/conversion"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Data Conversion
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/missing-values"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Missing Values
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/outliers"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Outliers
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/scaling"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Scaling
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/stats-and-plot"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Stats And Plot
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/preprocessed-data"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Preprocessed Data
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/feature-selection"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Feature Selection
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/encoding"
          activeClassName="text-white"
          className="text-gray-200 hover:text-white"
        >
          Encoding
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
