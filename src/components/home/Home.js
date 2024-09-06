// Register.js

import React, { useState } from 'react';
import styles from './Home.module.css';
import getCurrentId from '../function/getCurrentId';
import checkAuth from '../function/checkAuth';
const endpoint = process.env.REACT_APP_ENDPOINT;


const Home = () => {


  const upTest = async () => {
    try {
      const response = await fetch(`${endpoint}/weeklyChecker/add-new-week`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials:"include"
      });
      console.log("uptest");
      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const data = await response.json();
      }
    } catch (err) {

    }
  };


  checkAuth();

  return (
    <div className={styles.home}>
        <div>홈 화면입니다!
        </div>
        실험용 기능
        <button onClick={getCurrentId}>check user</button>
        <button onClick={upTest}>add week</button>
    </div>
  );
};

export default Home;