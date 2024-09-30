

const getCurrentWeek = (d) => {
  const date = new Date(d);
  const year = date.getFullYear();
  const month = date.getMonth();
  
  // 주어진 월의 첫 번째 날을 구합니다.
  const firstDayOfMonth = new Date(year, month, 1);
  
  // 첫 번째 날의 요일을 구합니다 (0: 일요일, 1: 월요일, ..., 6: 토요일)
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  // 첫 번째 목요일의 날짜를 구합니다.
  const firstThursday = new Date(year, month, 1 + ((4 - firstDayOfWeek + 7) % 7));
  
  // 주어진 날짜가 속한 주의 목요일을 구합니다.
  const thisThursday = new Date(year, month, date.getDate() + ((4 - date.getDay() + 7) % 7));
  
  // 첫 번째 목요일과 이 주의 목요일 사이의 주 수를 계산합니다.
  const weekNumber = Math.floor((thisThursday - firstThursday) / (7 * 24 * 60 * 60 * 1000)) + 1;
  
  // 이 주의 목요일이 다음 달에 속하는지 확인합니다.
  if (thisThursday.getMonth() !== month) {
      return { month: month + 2, week: 1 }; // 다음 달의 1주차
  }
  
  return { month: month + 1, week: weekNumber };
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