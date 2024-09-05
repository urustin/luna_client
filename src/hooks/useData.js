// src/hooks/useDataManagement.js
import { useState } from 'react';

const ep = process.env.REACT_APP_ENDPOINT;

const useData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  // download
  const downloadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${ep}/weeklyChecker/download`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      
      setData(result);
    } catch (error) {
      console.error("Error downloading data:", error);
      setError("Failed to download data");
    } finally {
      setIsLoading(false);
    }
  };

  // downloadAll
  const downloadDataAll = async () => {
    try {

      setIsLoading(true);
      setError(null);
      const response = await fetch(`${ep}/weeklyChecker/download-all`, {
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
      // console.log(result);
      // You might want to return this data if you need to process it further in the component
      // return result;

      const allWeeks = result.flatMap(user => user.weeks);
      const uniqueWeeks = [...new Set(allWeeks.map(week => week.startDate))].sort();
      
      setWeeks(uniqueWeeks.map(startDate => ({ startDate })));
      // console.log(uniqueWeeks.map(startDate => ({ startDate })));
    } catch (error) {
      console.error("Error downloading all data:", error);
      setError("Failed to download all data");
    } finally {
      setIsLoading(false);
    }
  };

  // upload
  const uploadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`${ep}/weeklyChecker/upload`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result.message);
      alert("Data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading data:", error);
      setError("Failed to upload data");
    } finally {
      setIsLoading(false);
    }
  };


  // getUserId
  const getUserId = async () => {
    try {
      const response = await fetch(`${ep}/auth/check-auth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentUserId(data.user.username);
        return data.user.username;
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setError("Failed to get user ID");
    }
    return null;
  };

  return {
    isLoading,
    data,
    error,
    currentUserId,
    downloadData,
    uploadData,
    downloadDataAll,
    setData,
    getUserId,
  };
};

export default useData;