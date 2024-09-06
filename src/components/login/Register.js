// Register.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
const endpoint = process.env.REACT_APP_ENDPOINT;


const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();


  const isValidPassword = (password) => {
    return /^.{4}$/.test(password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidPassword(password)) {
      alert('비밀번호는 정확히 4자리여야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    

    try {

      const response = await fetch(`${endpoint}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials:"include"
      });

      if (response.ok) {
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 리다이렉트
      } else {
        const data = await response.json();
        alert(data.message || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className={styles.register}>
      <h1>회원가입</h1>

      <form onSubmit={handleSubmit}>
        <input
          // type="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="닉네임"
          required
        />
        <p>단톡방과 같은 닉네임을 사용해주세요!
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="4자리의 비밀번호"
          maxLength={4}
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호 확인"
          maxLength={4}
          required
        />

        <button type="submit" className={styles.btn}>회원가입</button>
      </form>
      <p>
        이미 계정이 있으신가요? <Link to="/login">로그인</Link>
      </p>
    </div>
  );
};

export default Signup;