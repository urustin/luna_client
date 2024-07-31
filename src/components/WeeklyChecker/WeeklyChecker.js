import React, { useState } from 'react';
import { mockData } from '../../data/mockData';
import Checkbox from './Checkbox';
import styles from './WeeklyChecker.module.css';

const WeeklyChecker = () => {
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeks = mockData[0].weeks;

  return (
    <div className={styles.container}>
      {mockData.map((user) => (
        <div key={user.name} className={`${styles.userSection} ${styles[user.color]}`}>
          <div className={styles.userHeader}>
            <h2>{user.name}</h2>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Task</th>
                {days.map(day => <th key={day}>{day}</th>)}
                <th>Goal</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              {user.weeks[activeWeekIndex].tasks.map((task, taskIndex) => (
                <tr key={taskIndex}>
                  <td>{task.name}</td>
                  {task.days.map((checked, dayIndex) => (
                    <td key={dayIndex} className={styles.textCenter}>
                      <Checkbox checked={checked} />
                    </td>
                  ))}
                  <td className={styles.textCenter}>
                    <span className={`${styles.goal} ${styles[user.color + 'Goal']}`}>{task.goal}</span>
                  </td>
                  <td className={styles.textCenter}>-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className={styles.tabContainer}>
        {weeks.map((week, index) => (
          <button
            key={week.startDate}
            className={`${styles.tab} ${index === activeWeekIndex ? styles.activeTab : ''}`}
            onClick={() => setActiveWeekIndex(index)}
          >
            Week of {week.startDate}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeeklyChecker;