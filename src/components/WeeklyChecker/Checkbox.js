// component/WeeklyChecker/Checkerbox.js

import React from 'react';
import styles from './Checkbox.module.css';


const Checkbox = ({ checked, onChange, user, task, day }) => {
  const handleClick = async (event) => {
    onChange();  // Call the onChange function passed from the parent

    console.log(`Checkbox clicked for User: ${user}, Task: ${task}, Day: ${day}, New state: ${!checked}`);

    // Your API call can go here
    // try {
    //   const response = await fetch('https://ec2.flaresolution.com/send_email', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ user, task, day, checked: !checked })
    //   });
    //   const responseData = await response.json();
    //   if (response.ok) {
    //     console.log('Update sent successfully!');
    //   } else {
    //     throw new Error(responseData.error || 'Failed to send update');
    //   }
    // } catch (error) {
    //   console.error('Sending update failed:', error);
    // }
  };

  return (
    <div 
      className={`${styles.checkbox} ${checked ? styles.checked : ''}`} 
      onClick={handleClick}
    >
      {checked && <span className={styles.checkmark}>✓</span>}
    </div>
  );
};

export default Checkbox;