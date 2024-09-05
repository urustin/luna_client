import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const endpoint = process.env.REACT_APP_ENDPOINT;

const Login = () => {

  const navigate = useNavigate();
    
  const logout = async () => {
    try {
      const response = await fetch(`${endpoint}/auth/logout`, {
        method: 'GET',
        credentials: 'include', // 쿠키를 포함시키기 위해 필요합니다
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        // 이미 인증된 사용자라면 홈페이지로 리다이렉트
        navigate('/');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
  };
  logout();

};

export default Login;