import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { mockData } from '../../data/mockData';
import { getCurrentWeek, getCurrentMonth, getDateForDay } from '../function/getTime';
import useData from '../../hooks/useData';


const Dashboard = () => {
  const [hasChanged, setHasChanged] = useState(false);
  const [newTask, setNewTask] = useState({task: '', goal: '' });

  const {
    isLoading,
    data,
    setData,
    downloadData,
    uploadData
  } = useData();
  


  

  const addTask = () => {
      setHasChanged(true);
      if (newTask.task && newTask.goal) {
        const newData = {
          ...data,
          weeks:
            data.weeks.map((week,index)=>{
              if(index===0){
                return {
                  ...week,
                  tasks:[
                    ...week.tasks,
                    {
                      name : newTask.task,
                      days: [false, false, false, false, false, false, false],
                      goal: parseInt(newTask.goal)
                    }
                  ]
                };
              }
              return week;
            })
        }
        setNewTask({ task: '', goal: '' });
        setData(newData);
      }
    } 



  

  useEffect(() => {
    downloadData();
  }, []);
  

  useEffect(() => {
    if(!isLoading && hasChanged){
      uploadData();
      setHasChanged(false);
    }
  }, [data]);



  // delete task
  const deleteTask = (userName, taskName) => {
    if (window.confirm(`Do you want to delete ${taskName}?`)) {
      setHasChanged(true);
      const newData = ()=> {
        if(data.username === userName){
          return {
            ...data,
            weeks: data.weeks.map(week => ({
              ...week,
              tasks: week.tasks.filter((task) => task.name !== taskName)
            }))
          };
        }
        return data;
      }
      setData(newData);
      alert(`${taskName} 가 삭제되었습니다!.`);
    }

  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.dashboard}>

        {/* title */}
        <div className={styles.titleContainer}>
          <h2>
            {/* time of today */}
            {getCurrentMonth(new Date())}월 {getCurrentWeek(new Date())}째 주
          </h2>
          {/* <h4>{getCurrentDuration()}</h4> */}
          <h2>
            목표 추가하기
          </h2>
        </div>

      <div className={styles.addTaskContainer}>
        <div className={styles.idBox}>
          현재 로그인된 아이디 :
          <br/>
          {data.username}
        </div>

        <div className={styles.addTaskForm}>
          <input
            type="text"
            placeholder="공부 방법"
            value={newTask.task}
            onChange={(e) => setNewTask({...newTask, task: e.target.value})}
          />
          <input
            type="number"
            placeholder="목표 횟수"
            value={newTask.goal}
            onChange={(e) => setNewTask({...newTask, goal: e.target.value})}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>



      
      <table className={styles.dashboardTable}>
        <thead>
          <tr>
            <th>User</th>

            <th>Task</th>
            <th>Goal</th>
          </tr>
        </thead>

        <tbody>
          {
            data.weeks[0].tasks.map((task, taskIndex) => (
              <tr key={`${data.weeks[0].startDate}-${taskIndex}`}>
                {
                    taskIndex === 0 ? 
                        
                        <>
                            <td>{data.username}</td>
                        </>
                        :
                        <>
                            <td></td>
                        </>
                }
                
                <td onClick={()=>{deleteTask(data.username, task.name)}}>{task.name}</td>
                <td>{task.goal}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;