const checkAuthStatus = async () => {
    
    const endpoint = process.env.REACT_APP_ENDPOINT;
    try {
      const response = await fetch(`${endpoint}/auth/check-auth`, {
        method: 'GET',
        credentials: 'include', // 쿠키를 포함시키기 위해 필요합니다
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        
        // 이미 인증된 사용자라면 홈페이지로 리다이렉트
        if(window.location.href.includes("login")){
            window.location.href = '/';
        }else{
            console.log(data);
        }
        
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
};
  
export default checkAuthStatus;