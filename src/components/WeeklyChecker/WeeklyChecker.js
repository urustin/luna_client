// component/WeeklyChecker/WeeklyChecker.js

import React, { act, useEffect, useState } from 'react';
import Checkbox from './Checkbox';
import styles from './WeeklyChecker.module.css';
import { getCurrentWeek, getCurrentMonth, getDateForDay, getCurrentMonday, formatDate } from '../function/getTime';
import useData from '../../hooks/useData';
import getCurrentId from '../function/getCurrentId';

const WeeklyChecker = (time) => {
  const [activeWeek, setActiveWeek] = useState({date:null});
  const [weekArray, setWeekArray] = useState([]);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    
  const {
    weeks,
    setWeeks,
    isLoading,
    data,
    currentUserId,
    setData,
    downloadData,
    downloadDataAll,
    uploadData,
    getUserId,
    
  } = useData();


  useEffect(() => {
    downloadDataAll();
    getUserId();
    // set activeWeek as this monday first.
    // setActiveWeek({date:getCurrentMonday()})
    
    console.log(activeWeek);
    
  },[]);

  

  useEffect(() => {
    if (!isLoading&&data) {

      const allWeeks = data.flatMap(user => user.weeks.map(week => week.startDate)); // get all week
      const uniqueWeeks = Array.from(new Set(allWeeks)).map(startDate => ({date: startDate})); // if there's same date week, remove
      if(time.time.time==="current"){
        uniqueWeeks.sort((a, b) => new Date(b.date) - new Date(a.date)); // sort + pop first element
        setWeekArray(uniqueWeeks);
      }else{
        uniqueWeeks.sort((a, b) => new Date(b.date) - new Date(a.date)).shift(); // sort + pop first element
        setWeekArray(uniqueWeeks);
      }
    }
  }, [data, time]);

  useEffect(()=>{
    if (!isLoading&&data) {
      setActiveWeek({date:weekArray[0].date});
    }
    
  },[weekArray])

  const handleCheckboxToggle = (userIndex, taskIndex, dayIndex, newValue) => {

    const newData = [...data];
    const userWeekIndex = newData[userIndex].weeks.findIndex(week => week.startDate === activeWeek.date);
    
    if (userWeekIndex === -1) return; // User doesn't have data for this week

    newData[userIndex].weeks[userWeekIndex].tasks[taskIndex].days[dayIndex] = newValue;
    setData(newData);
    console.log(`User: ${data[userIndex].name}, Task: ${newData[userIndex].weeks[userWeekIndex].tasks[taskIndex].name}, Day: ${days[dayIndex]}, Checked: ${newValue}`);
  };


  // if (!weeks || weeks.length === 0 || activeWeekIndex >= weeks.length) {
  //   return <div>No data available for the selected week</div>;
  // }

  

  // const activeWeekStartDate = weeks[activeWeekIndex].startDate;


  

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.container}>




      {/* if time = current */}
      {time.time.time==="current"?
      // current
      <>
        {/* title */}
        <div className={styles.titleContainer}>
          <h2>
            {/* time of today */}
            {getCurrentMonth(activeWeek.date)}월 {getCurrentWeek(activeWeek.date)}째 주
            <br></br>
            스터디 진행 상황
          </h2>
        </div>
      </>
      :
      // past
      <>
        {/* title */}
        <div className={styles.titleContainer}>
          <select
            // value= {formatDate(activeWeek.date)}
            onChange={(e)=> {
              setActiveWeek({ date: e.target.value});
              // setActiveWeek({date:formatDate(new Date("2024-08-28"))});

          }}
          >
            {
              weekArray.map((week,weekIndex)=>{
                // let text = week;
                // console.log(week);
                return(
                  <option 
                    key= {weekIndex} 
                    value= {week.date}
                    >
                    {/* {week.date} */}
                    {getCurrentMonth(new Date(week.date))}월 {getCurrentWeek(new Date(week.date))}째 주
                  </option>
                );
              })
            }
            

          </select>
          {/* <h4>{getCurrentDuration()}</h4> */}
          <h2>
            스터디 진행 상황
          </h2>
        </div>


      </>
      }

      {/* tables */}
      {[...data]
        .filter(user => user.weeks.filter(week => week.startDate === activeWeek.date).length > 0)
        .sort((a, b) => {
          // console.log(currentUserId);
          if (a.username === currentUserId) return -1;
          if (b.username === currentUserId) return 1;
          return a.username.localeCompare(b.username);
        })
        .map((user, userIndex) => {
          // console.log(user);
        const userWeek = user.weeks.filter(week=>week.startDate === activeWeek.date)[0];
        // const userWeek = user.weeks.find(week => week.startDate === activeWeek.date);


        if (!userWeek) return null; // Skip this user if they don't have data for the active week;

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
                  {
                    userWeek.tasks.map((task, taskIndex) => {
                    
                    const completedDays = task.days.filter(day => day).length;
                    let successRate = Math.round((completedDays / task.goal) * 100);
                    let successColor = '';
                    if (successRate >= 100) {
                      successRate = 100; 
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
                            onChange={(newValue) => handleCheckboxToggle(userIndex, taskIndex, dayIndex, newValue)}
                            username={user.username}
                            task={task.name}
                            date={getDateForDay(activeWeek.date, dayIndex)}
                            currentUserId={currentUserId}
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