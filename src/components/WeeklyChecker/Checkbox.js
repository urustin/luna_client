import React from 'react';
import styles from './Checkbox.module.css';

const Checkbox = ({ checked }) => (
  <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
    {checked && <span className={styles.checkmark}>✓</span>}
  </div>
);

export default Checkbox;