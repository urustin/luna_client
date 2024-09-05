import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { mockData } from '../../data/mockData';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', task: '', goal: '', startDate:'' });
  const [newTask, setNewTask] = useState({ userName: '', task: '', goal: '' });
  const [hasChanges, setHasChanges] = useState(false);
  const ep = process.env.REACT_APP_ENDPOINT;


  const addWeek = () => {
    const newData = data.map(user => {
      const lastWeek = user.weeks[user.weeks.length - 1];
      const newStartDate = new Date(lastWeek.startDate);
      newStartDate.setDate(newStartDate.getDate() + 7);
      
      const newWeek = {
        startDate: newStartDate.toISOString().split('T')[0],
        tasks: lastWeek.tasks.map(task => ({
          ...task,
          days: [false, false, false, false, false, false, false]
        }))
      };

      return {
        ...user,
        weeks: [...user.weeks, newWeek]
      };
    });

    setData(newData);
  };

  const addUser = () => {
    if (newUser.name && newUser.task && newUser.goal) {
      const currentDate = new Date().toISOString().split('T')[0];
      const newUserData = {
        name: newUser.name,
        weeks: [{
          startDate: newUser.startDate,
          tasks: [{
            name: newUser.task,
            days: [false, false, false, false, false, false, false],
            goal: parseInt(newUser.goal)
          }]
        }]
      };
      setData([...data, newUserData]);
      setNewUser({ name: '', task: '', goal: '', startDate: '' });
    }
  };

  const addTask = () => {
    if (newTask.userName && newTask.task && newTask.goal) {
      const updatedData = data.map(user => {
        if (user.name === newTask.userName) {
          const updatedWeeks = user.weeks.map((week, index) => {
            if (index === 0) {
              return {
                ...week,
                tasks: [...week.tasks, {
                  name: newTask.task,
                  days: [false, false, false, false, false, false, false],
                  goal: parseInt(newTask.goal)
                }]
              };
            }
            return week;
          });
          return { ...user, weeks: updatedWeeks };
        }
        return user;
      });
      setData(updatedData);
      setNewTask({ userName: '', task: '', goal: '' });
    }
  };

  // monday function

  const isMonday = (dateString) => {
    const date = new Date(dateString);
    return date.getDay() === 1; //return true or false
  };

  const handleStartDateChange = (e) => {
    let selectedDate = e.target.value;
    if(!isMonday(selectedDate)){
      alert("Please Select Monday!")
      e.target.value = "";
    }else{
      setNewUser({ ...newUser, startDate: selectedDate });
    }
  }


  // Date function (to be removed later)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const downloadServer = async () => {
    try {
        console.log(data);
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
      console.log(result);
      setData(result);
      console.log(result.message);

    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Failed to upload data");
    }
  };
  useEffect(() => {
    downloadServer();
  }, []);
// upload server
  const uploadToServer = async () => {
    try {
        console.log(data);
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

// delete user
  const deleteUser = (userName) => {
    if (window.confirm(`Do you want to delete ${userName}?`)) {
      const newData = data.filter(user => user.name !== userName);
      setData(newData);
      setHasChanges(true);
      alert(`${userName} has been marked for deletion. Press the Upload button to confirm changes.`);
    }
  };
  // delete task
  const deleteTask = (userName, taskName) => {
    if (window.confirm(`Do you want to delete ${taskName}?`)) {

    const newData = data.map((user)=>{
      if (user.name === userName) {
        return {
          ...user,
          weeks: user.weeks.map(week => ({
            ...week,
            tasks: week.tasks.filter((task) => task.name !== taskName)
          }))
        };
      }
      return user;
    });
    setData(newData);
    setHasChanges(true);

    alert(`${taskName} has been marked for deletion. Press the Upload button to confirm changes.`);
    }

  };


  return (
    <div className={styles.dashboard}>
      <h1>User Dashboard</h1>
      <button onClick={addWeek} className={styles.addWeekButton}>+ Add Week for All Users</button>
      <button 
        onClick={uploadToServer} 
        className={`${styles.uploadButton} ${hasChanges ? styles.hasChanges : ''}`}
      >
        Upload Data {hasChanges ? '(Changes Pending)' : ''}
      </button>

      <div className={styles.addUserForm}>
        <input
          type="text"
          placeholder="User Name"
          value={newUser.name}
          onChange={(e) => setNewUser({...newUser, name: e.target.value})}
        />
        
        <input
          type="text"
          placeholder="Initial Task"
          value={newUser.task}
          onChange={(e) => setNewUser({...newUser, task: e.target.value})}
        />
        <input
          type="number"
          placeholder="Goal"
          value={newUser.goal}
          onChange={(e) => setNewUser({...newUser, goal: e.target.value})}
        />
        <input
          type="date"
          placeholder="Start Date(Monday)"
          value={newUser.startDate}
          onChange={handleStartDateChange}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <div className={styles.addTaskForm}>
        <select
          value={newTask.userName}
          onChange={(e) => setNewTask({...newTask, userName: e.target.value})}
        >
          <option value="">Select User</option>
          {data.map(user => (
            <option key={user.name} value={user.name}>{user.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="New Task"
          value={newTask.task}
          onChange={(e) => setNewTask({...newTask, task: e.target.value})}
        />
        <input
          type="number"
          placeholder="Goal"
          value={newTask.goal}
          onChange={(e) => setNewTask({...newTask, goal: e.target.value})}
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <table className={styles.dashboardTable}>
        <thead>
          <tr>
            <th>User</th>
            <th>Joined Week</th>
            <th>Task</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => {
            const firstWeek = user.weeks[0];
            return firstWeek.tasks.map((task, taskIndex) => (
              <tr key={`${user.name}-${firstWeek.startDate}-${taskIndex}`}>
                {
                    taskIndex === 0 ? 
                        
                        <>
                            <td onClick={()=>deleteUser(user.name)}
                            >{user.name}</td>
                            <td>{formatDate(firstWeek.startDate)}</td>
                        </>
                        :
                        <>
                            <td></td>
                            <td></td>
                        </>
                }
                
                <td onClick={()=>{deleteTask(user.name, task.name)}}>{task.name}</td>
                <td>{task.goal}</td>
              </tr>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;