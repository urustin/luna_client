const isUploadAllowed = (date) => {
    const now = new Date();
    const uploadDate = new Date(date);
    
    // Set the boundary times
    const startTime = new Date(uploadDate);
    startTime.setHours(4, 0, 0, 0); // 4:00:00 AM on the task date
    
    const endTime = new Date(uploadDate);
    endTime.setDate(endTime.getDate() + 1); // Next day
    endTime.setHours(4, 0, 0, 0); // 4:00:00 AM on the next day

    return now >= startTime && now < endTime;
};

export default isUploadAllowed;