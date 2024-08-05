// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Weekly Checker</div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>홈</Link></li>
          {user ? (
            <>
              <li><Link to="/checker" onClick={toggleMenu}>새 글 작성</Link></li>
              <li><Link to="/" onClick={toggleMenu}>로그아웃</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/checker" onClick={toggleMenu}>체커</Link></li>
              <li><Link to="/dashboard" onClick={toggleMenu}>DASH</Link></li>
              <li><Link to="/auth/google2" onClick={toggleMenu}>CHECKID</Link></li>
              <li><Link to="/login" onClick={toggleMenu}>로그인</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;