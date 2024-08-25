import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { FaEthereum } from 'react-icons/fa';
import Authmodal from './Authmodal';
import UserSidebar from './UserSidebar';
import { CryptoState } from './CryptoContext';


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {user} = CryptoState();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header id="header">
        <Link to="/" className="logo-link">
          <div className="logo">
            <h1>Koinly</h1>
            <FaEthereum color="orange" size={40} />
          </div>
        </Link>
        <nav className="nav">
          <button className={`toggle-menu ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          {user ? <UserSidebar /> : <Authmodal />}
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
            {/* <li>
              <Link to="/Wishlist" onClick={toggleMenu}>Wishlist</Link>
            </li> */}
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
                <a href="https://github.com/iadityagupta/Koiner">
                  <i className="fa fa-envelope fa-fw"></i>
                  Github 
                </a>
              </li>
              <li>
                <a href="https://iadityagupta.github.io/PortfolioSite/">
                  <i className="fa fa-envelope fa-fw"></i>
                  Portfolio
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
