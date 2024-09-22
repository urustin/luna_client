// component/WeeklyChecker/Checkbox.js

import React, { useState, useEffect } from 'react';
import styles from './Checkbox.module.css';
import isUploadAllowed from '../function/allowUpload';
import formatDateToKorean from '../function/formatDateToKorean';

const Checkbox = ({ checked, onChange, username, task, date, currentUserId }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [password, setPassword] = useState(""); 
  const ep = process.env.REACT_APP_ENDPOINT;

  useEffect(() => {
    if (checked) {
      fetchUploadedImage();
    }
  }, [checked]);


  
  const fetchUploadedImage = async () => {
    try {
      const response = await fetch(`${ep}/weeklyChecker/get-image?username=${username}&task=${task}&date=${date}`);
      if (response.ok) {
        const data = await response.json();
        setUploadedImageUrl(data.imageUrl);
      }
    } catch (error) {
      console.error('Error fetching uploaded image:', error);
    }
  };

  const handleClick = () => {
    if(!checked){

    
      if (currentUserId===username) {
        if(isUploadAllowed(date)){
          if (!checked) {
            setShowUpload(!showUpload);
          } else {
            setShowUpload(true);
          }
        }else{
          alert('업로드/수정이 불가능한 시간입니다!');
        }
      } else {
        alert("본인 아이디만 업로드할수 있습니다!");
      }
    }else{
      setShowUpload(true);
    }
  };


  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };
  // console.log(username);
  // console.log(getCurrentId());
  const handleSubmit = async () => {
    
    if (!image) {
      alert('이미지를 선택해주세요!');
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append('image', image);
    formData.append('username', username);
    formData.append('task', task);
    formData.append('password', password);
    const formattedDate = new Date(date).toISOString().split('T')[0];
    formData.append('date', formattedDate);

    try {
      const response = await fetch(`${ep}/weeklyChecker/upload-image`, {
        method: 'POST',
        body: formData,
        credentials:'include'
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Image uploaded successfully:', data.imageUrl);
        setUploadedImageUrl(data.imageUrl);
        onChange(true); // Update the checkbox state
        setShowUpload(false);
        setImage(null);
        setPassword("");
        window.location.reload();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('업로드 실패!');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${ep}/weeklyChecker/delete-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, task, date, password }),
      });

      if (response.ok) {
        setUploadedImageUrl(null);
        onChange(false); // Uncheck the checkbox
        setShowUpload(false);
        setImage(null);
        setPassword("");
        window.location.reload();
      } else {
        throw new Error('Failed to delete image');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('이미지 제거 실패!');
    }
  };

  return (
    <div className={styles.checkboxContainer}>
      <div 
        className={`${styles.checkbox} ${checked ? styles.checked : ''} ${!isUploadAllowed(date) || currentUserId!==username ? styles.disabled : ""}`} 
        onClick={handleClick}
      >
        {checked && <span className={styles.checkmark}>✓</span>}
      </div>
      {showUpload && (
        <div className={styles.uploadContainer}>
          <button onClick={() => setShowUpload(false)} className={styles.exitButton}>
            x
          </button>
          {checked && uploadedImageUrl ? (
            <>


              <div>
                <label for="pw">Password (4 characters minimum):</label>
                <input 
                type="password" 
                id="pw" 
                name="password" 
                minLength="4" 
                onChange={handlePasswordChange}
                required />
              </div>
              <img src={uploadedImageUrl} alt="Uploaded proof" className={styles.uploadedImage} />
              <button 
                onClick={handleDelete} 
                className={styles.deleteButton}
                disabled={uploading}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <div className={styles.status}>
                {username}
                <br/>
                {formatDateToKorean(date)} - {task}
              </div>

              <input 
                id = "files"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                // style={{visibility:"hidden"}}
                disabled={uploading}
              />

              <div>
                {/* <label for="pw">Password (4 characters minimum):</label> */}
                <input 
                type="password" 
                placeholder="비밀번호를 입력해주세요"
                id="pw" 
                name="password" 
                minLength="4" 
                onChange={handlePasswordChange}
                required />
              </div>

              <button 
                onClick={handleSubmit} 
                className={styles.submitButton}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Submit'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Checkbox;