import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header id="header">
        <Link to="/" className="logo-link">
          <div className="logo">
            <h1>Koiner</h1>
            <FaEthereum color="orange" size={40} />
          </div>
        </Link>
        <nav className="nav">
          <button className={`toggle-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          
        </nav>
      </header>

      <div id="menu" className={menuOpen ? 'open' : ''}>
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/" onClick={toggleMenu}>Home</Link>
            </li>
            <li>
              <Link to="/coins" onClick={toggleMenu}>Coins</Link>
            </li>
            <li>
              <Link to="/news" onClick={toggleMenu}>News</Link>
            </li>
          </ul>
        </nav>

        <footer className="menu-footer">
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="https://www.linkedin.com/in/aditya453gupta/">
                  <i className="fa fa-linkedin fa-fw"></i>
                  Developer
                </a>
              </li>
              <li>
                <a href="mailto:aditya453gupta@gmail.com">
                  <i className="fa fa-envelope fa-fw"></i>
                  Mail
                </a>
              </li>
            </ul>
          </nav>
        </footer>
      </div>
    </>
  );
};

export default Header;
