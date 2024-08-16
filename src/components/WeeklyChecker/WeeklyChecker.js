// component/WeeklyChecker/WeeklyChecker.js

import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import styles from './WeeklyChecker.module.css';

const WeeklyChecker = () => {
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const [data, setData] = useState([]);
  const [weeks, setWeeks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasChanges, setHasChanges] = useState(false);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const ep = process.env.REACT_APP_ENDPOINT;
    
  const getDateForDay = (weekStartDate, dayIndex) => {
    // console.log('getDateForDay input:', weekStartDate, dayIndex); // Add this log

    // Ensure weekStartDate is a valid date string (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(weekStartDate)) {
      console.error('Invalid date format:', weekStartDate);
      return new Date().toISOString().split('T')[0]; // Return today's date as fallback
    }

    const date = new Date(weekStartDate);
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', weekStartDate);
      return new Date().toISOString().split('T')[0]; // Return today's date as fallback
    }

    date.setDate(date.getDate() + dayIndex);
    
    // Format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const result = `${year}-${month}-${day}`;
    
    // console.log('getDateForDay result:', result); // Add this log
    return result;
  };

  const downloadServer = async () => {
    try {
      const response = await fetch(`${ep}/weeklyChecker/download`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result);

      const allWeeks = result.flatMap(user => user.weeks);
      const uniqueWeeks = [...new Set(allWeeks.map(week => week.startDate))].sort();
      
      setWeeks(uniqueWeeks.map(startDate => ({ startDate })));

      setIsLoading(false);
    } catch (error) {
      console.error("Error downloading data:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    downloadServer();
  }, []);

  const handleCheckboxToggle = (userIndex, taskIndex, dayIndex, newValue) => {
    const newData = [...data];
    const userWeekIndex = newData[userIndex].weeks.findIndex(week => week.startDate === weeks[activeWeekIndex].startDate);
    
    if (userWeekIndex === -1) return; // User doesn't have data for this week

    newData[userIndex].weeks[userWeekIndex].tasks[taskIndex].days[dayIndex] = newValue;
    setData(newData);
    setHasChanges(true);
    console.log(`User: ${data[userIndex].name}, Task: ${newData[userIndex].weeks[userWeekIndex].tasks[taskIndex].name}, Day: ${days[dayIndex]}, Checked: ${newValue}`);
  };

  const uploadToServer = async () => {
    try {
      const response = await fetch(`${ep}/weeklyChecker/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message);
      setHasChanges(false);
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload data");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (weeks.length === 0 || activeWeekIndex >= weeks.length) {
    return <div>No data available for the selected week</div>;
  }

  const activeWeekStartDate = weeks[activeWeekIndex].startDate;

  return (
    <div className={styles.container}>
      <button 
        onClick={uploadToServer} 
        className={`${styles.uploadButton} ${hasChanges ? styles.hasChanges : ''}`}
        disabled={!hasChanges}
      >
        Upload Changes
      </button>

      {data.map((user, userIndex) => {
        const userWeek = user.weeks.find(week => week.startDate === activeWeekStartDate);
        if (!userWeek) return null; // Skip this user if they don't have data for the active week

        return (
          <div key={user.name} className={`${styles.userSection} ${styles[user.color]}`}>
            <div className={styles.userHeader}>
              <h2>{user.name}</h2>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{width: "24%"}}>Task</th>
                  {days.map(day => <th key={day} style={{width: "8%"}}>{day}</th>)}
                  <th style={{width: "10%"}}>Goal</th>
                  <th style={{width: "10%"}}>Res</th>
                </tr>
              </thead>
              <tbody>
                {userWeek.tasks.map((task, taskIndex) => (
                  <tr key={taskIndex}>
                    <td>{task.name}</td>
                    {task.days.map((checked, dayIndex) => (
                      <td key={dayIndex} className={styles.textCenter}>
                        <Checkbox 
                          checked={checked}
                          onChange={(newValue) => handleCheckboxToggle(userIndex, taskIndex, dayIndex, newValue)}
                          username={user.name}
                          task={task.name}
                          date={getDateForDay(activeWeekStartDate, dayIndex)}
                        />
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
        );
      })}
        
      {weeks.length > 0 && (
        <div className={styles.tabContainer}>
          {weeks.map((week, index) => (
            <button
              key={week.startDate}
              className={`${styles.tab} ${index === activeWeekIndex ? styles.activeTab : ''}`}
              onClick={() => setActiveWeekIndex(index)}
            >
              {week.startDate}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyChecker;