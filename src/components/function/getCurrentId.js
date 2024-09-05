const getCurrentId = async () => {
    
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

        console.log(data);
        return data.user.username;
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    }
};
  
export default getCurrentId;