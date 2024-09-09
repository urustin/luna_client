const isUploadAllowed = (date) => {
    const now = new Date();
    const uploadDate = new Date(date);
    
    // Set the boundary times
    const startTime = new Date(uploadDate);
    startTime.setHours(0, 0, 0, 0); // 0:00:00 AM on the task date
    
    const endTime = new Date(uploadDate);
    endTime.setDate(endTime.getDate() + 1); // Next day
    endTime.setHours(17, 0, 0, 0); // 5:00:00 PM on the next day

    return now >= startTime && now < endTime;
};

export default isUploadAllowed;