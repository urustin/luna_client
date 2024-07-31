// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';



const Header = ({ user }) => {

  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li><Link to="/">홈</Link></li>
          {user ? (
            <>
              <li><Link to="/checker">새 글 작성</Link></li>
              <li><Link to="/">로그아웃</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/checker" >체커</Link></li>
              <li><Link to="/posts/create">글쓰기</Link></li>
              <li><Link to="/auth/google2">CHECKID</Link></li>
              <li><Link to="/login">로그인</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;