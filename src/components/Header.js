import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import Logo from "../assets/images/Logo.png";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={Logo} alt="Logo" width={250} height={60} />
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
