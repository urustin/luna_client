const checkAuth = async () => {
    
    const endpoint = process.env.REACT_APP_ENDPOINT;
    try {
      const response = await fetch(`${endpoint}/auth/check-auth`, {
        method: 'GET',
        credentials: 'include', // 쿠키를 포함시키기 위해 필요합니다
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // if pass
      if(response.ok){
        if(window.location.href.includes("login") || (window.location.pathname === "/")){
          window.location.href = '/checker/current'
        }
        const result = await response.json();
        return result;

      // if not pass
      }else{
        if(!window.location.href.includes("login")){
          window.location.href = '/login'
        }
      }

    } catch (error) {
      
      console.error('Error checking auth status:', error);
    }
};
  
export default checkAuth;