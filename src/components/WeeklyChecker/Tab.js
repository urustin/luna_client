import React from 'react';
import styles from './Tab.module.css';

const Tab = ({ name, color, isActive, onClick }) => (
  <div
    className={`${styles.tab} ${styles[color]} ${isActive ? styles.active : ''}`}
    onClick={onClick}
  >
    {name}
  </div>  
);

export default Tab;