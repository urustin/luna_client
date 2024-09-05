function formatDateToKorean(dateString) {
    // Parse the input date string
    const date = new Date(dateString);
  
    // Array of Korean weekday names
    const weekdays = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  
    // Get the month, day, and weekday
    const month = date.getMonth() + 1; // getMonth() returns 0-11
    const day = date.getDate();
    const weekday = weekdays[date.getDay()];
  
    // Construct the formatted string
    return `${month}월 ${day}일 ${weekday}`;
}
  
export default formatDateToKorean;