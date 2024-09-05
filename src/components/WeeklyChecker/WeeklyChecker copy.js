// component/WeeklyChecker/WeeklyChecker.js

import React, { useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import styles from './WeeklyChecker.module.css';
import { getCurrentWeek, getCurrentMonth, getDateForDay } from '../function/getTime';
import useData from '../../hooks/useData';


const WeeklyChecker = (time) => {
  const [activeWeekIndex, setActiveWeekIndex] = useState(0);
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
  const {
    weeks,
    setWeeks,
    isLoading,
    data,
    setData,
    downloadData,
    downloadDataAll,
    uploadData,
    
  } = useData();

  

  useEffect(() => {
    downloadDataAll();
  },[]);
  
  
  
  if(!isLoading){
    console.log([...data]);
  }

  
  const handleCheckboxToggle = (userIndex, taskIndex, dayIndex, newValue) => {
    const newData = [...data];
    const userWeekIndex = newData[userIndex].weeks.findIndex(week => week.startDate === weeks[activeWeekIndex].startDate);
    
    if (userWeekIndex === -1) return; // User doesn't have data for this week

    newData[userIndex].weeks[userWeekIndex].tasks[taskIndex].days[dayIndex] = newValue;
    setData(newData);
    console.log(`User: ${data[userIndex].name}, Task: ${newData[userIndex].weeks[userWeekIndex].tasks[taskIndex].name}, Day: ${days[dayIndex]}, Checked: ${newValue}`);
  };


  if (!weeks || weeks.length === 0 || activeWeekIndex >= weeks.length) {
    return <div>No data available for the selected week</div>;
  }

  

  const activeWeekStartDate = weeks[activeWeekIndex].startDate;


  

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      {/* <button 
        onClick={uploadToServer} 
        className={`${styles.uploadButton} ${hasChanges ? styles.hasChanges : ''}`}
        disabled={!hasChanges}
      >
        Upload Changes
      </button> */}



      {/* if time = current */}
      {time.time.time==="current"?
      // current
      <>
        {/* title */}
        <div className={styles.titleContainer}>
          <h2>
            {/* time of today */}
            {getCurrentMonth(new Date())}월 {getCurrentWeek(new Date())}째 주
          </h2>
          {/* <h4>{getCurrentDuration()}</h4> */}
          <h2>
            스터디 진행 상황
          </h2>
        </div>
      </>
      :
      // past
      <>
      
      </>
      }
      
      {/* tables */}
      {[...data]
        .sort((a,b) => a.username.localeCompare(b.username))
        .map((user, userIndex) => {
        const userWeek = user.weeks.find(week => week.startDate === activeWeekStartDate);
        if (!userWeek) return null; // Skip this user if they don't have data for the active week

        return (
          <div key={user.username} className={`${styles.userSection}`}>
            <div className={styles.userHeader}>
              <h2>{userIndex+1}. {user.username}</h2>
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th style={{width: "24%"}}>Task</th>
                  <th style={{width: "10%"}}>Goal</th>
                  {days.map((day, dayIndex) => <th key={dayIndex} style={{width: "8%"}}>{day}</th>)}
                  
                  <th style={{width: "10%"}}>Res</th>
                </tr>
              </thead>
              <tbody>
                {userWeek.tasks.map((task, taskIndex) => {
                  
                  const completedDays = task.days.filter(day => day).length;
                  const successRate = Math.round((completedDays / task.goal) * 100);
                  let successColor = '';
                  if (successRate >= 100) {
                    successColor = styles.successGreen;
                  } else if (successRate >= 70) {
                    successColor = styles.successYellow;
                  } else {
                    successColor = styles.successRed;
                  }

                  return (
                  <tr key={taskIndex}>
                    <td>{task.name}</td>

                    <td className={styles.textCenter}>
                      <span className={`${styles.goal}`}>{task.goal}</span>
                    </td>

                    {task.days.map((checked, dayIndex) => (
                      <td key={dayIndex} className={styles.textCenter}>
                        <Checkbox 
                          checked={checked}
                          // onChange={(newValue) => handleCheckboxToggle(userIndex, taskIndex, dayIndex, newValue)}
                          username={user.username}
                          task={task.name}
                          date={getDateForDay(activeWeekStartDate, dayIndex)}
                        />
                      </td>
                    ))}
                    
                    <td className={`${styles.textCenter} ${successColor}`}>
                      {successRate}%
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>
        );
      })}
        
      
    </div>
  );
};

export default WeeklyChecker;