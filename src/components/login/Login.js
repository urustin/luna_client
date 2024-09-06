import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import checkAuth from '../function/checkAuth';

const endpoint = process.env.REACT_APP_ENDPOINT;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

    
  

  // useEffect(() => {
  //   checkAuth();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${endpoint}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', 
      });
      const data = await response.data;


      if (response.ok) {
        const sessionID = response.headers.get('X-Session-ID');
        sessionStorage.setItem('sessionID', sessionID); // sessionStorage에 저장
        navigate('/'); // 로그인 성공 시 홈페이지로 리다이렉트
      } else {
        
        setError(data.message || "로그인에 실패하였습니다");
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
    }
  };




  
  


  
  return (
    <div className={styles.login}>
      <h1>로그인</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          // type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="유저명"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        <button type="submit" className={styles.btn}>로그인</button>
      </form>
      <p>
        계정이 없으신가요? <Link to="/register">회원가입</Link>
      </p>
    </div>
  );
};

export default Login;