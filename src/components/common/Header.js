// Header.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import checkAuth  from '../function/checkAuth'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        const result = await checkAuth();
        setUser(result.user);
      } catch (error) {
        console.error('Error fetching auth status:', error);
      } 
    };

    fetchAuthStatus();
  }, []);


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
          {!user ? (
            <>
              <li><Link to="/login" onClick={toggleMenu}>로그인</Link></li>
              <li><Link to="/register" onClick={toggleMenu}>회원 가입</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/checker/current" onClick={toggleMenu}>이번 주</Link></li>
              <li><Link to="/dashboard" onClick={toggleMenu}>목표 추가</Link></li>
              <li><Link to="/checker/past" onClick={toggleMenu}>지난 결과 보기</Link></li>
              <li><Link to="/logout" onClick={toggleMenu}>로그아웃</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;