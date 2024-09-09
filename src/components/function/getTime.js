

const getCurrentWeek = (d) => {
    const date = new Date(d);
    // 주어진 날짜의 월의 첫 날을 구합니다.
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    
    // 이번 달의 첫 번째 월요일을 찾습니다.
    const firstMonday = new Date(firstDayOfMonth);
    while (firstMonday.getDay() !== 1) {
      firstMonday.setDate(firstMonday.getDate() + 1);
    }
  
    // 주어진 날짜가 첫 번째 월요일보다 앞서면 0주차로 간주합니다.
    if (date < firstMonday) {
      return 0;
    }
  
    // 첫 번째 월요일부터 주어진 날짜까지의 일수를 계산합니다.
    const days = Math.floor((date - firstMonday) / (24 * 60 * 60 * 1000));

    // 주 수를 계산하고 1을 더합니다 (첫 주는 1주차로 계산).
    return Math.floor(days / 7) + 1;
};


const getCurrentMonth = (d) => {
    const date = new Date(d);
    return date.getMonth()+1;
}


const getCurrentDuration = () => {
    const date = new Date();
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - date.getDay() + 1);  // 1은 월요일
  
    // calculate sunday
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
  
    const formatDate = (d) => {
      const year = d.getFullYear();
      const month = d.getMonth() + 1;  // getMonth()는 0부터 시작하므로 1을 더함
      const day = d.getDate();
      return `${year}년 ${month}월 ${day}일`;
    };
  
    // 결과 문자열 생성
    const duration = `${formatDate(startDate)} ~ ${formatDate(endDate)}`;

    return duration;
};
  



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
    
    return result;
};

const getCurrentMonday = (date = new Date()) => {
  const resultDate = new Date(date);
  // console.log(resultDate.getDate());
  resultDate.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1));
  return formatDate(resultDate);
}

const formatDate = (date)=> {

  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = String(newDate.getMonth() + 1).padStart(2, '0');
  const day = String(newDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}




export {
    getCurrentWeek,
    getCurrentMonth,
    getCurrentDuration,
    getDateForDay,
    getCurrentMonday,
    formatDate,
}