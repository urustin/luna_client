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
      <div className={styles.logo}><Link to="/">Luna English</Link></div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav className={`${styles.nav} ${isMenuOpen ? styles.open : ''}`}>
        <ul>
          {/* <li><Link to="/" onClick={toggleMenu}>홈</Link></li> */}
          {user ? (
            <>
              <li><Link to="/checker" onClick={toggleMenu}>새 글 작성</Link></li>
              <li><Link to="/" onClick={toggleMenu}>로그아웃</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/checker/current" onClick={toggleMenu}>이번 주</Link></li>
              <li><Link to="/dashboard" onClick={toggleMenu}>목표 추가</Link></li>
              <li><Link to="/checker/past" onClick={toggleMenu}>지난 결과 보기</Link></li>
              <li><Link to="/login" onClick={toggleMenu}>로그인</Link></li>
              <li><Link to="/logout" onClick={toggleMenu}>로그아웃</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;