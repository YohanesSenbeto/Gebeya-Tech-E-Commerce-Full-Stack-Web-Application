type User = {
    user_token?: string;
    user_role?: string;
    user_id?: string;
    user_fullName?: string;
  };




// Function to read the data from the user's local storage  
const getAuth = async () => {
    const user: User = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.user_token) {
      const decodedToken = await decodeTokenPayload(user.user_token);
      user.user_role = decodedToken.user_role;
      user.user_id = decodedToken.user_id;
      user.user_fullName = decodedToken.user_fullName;
      return user;
    } else {
      return {};
    }
  };
  
  // Function to decode the payload from the token
  // The purpose of this code is to take a JWT token, extract its payload, decode it from Base64Url encoding, and then convert the decoded payload into a JavaScript object for further use and manipulation
  const decodeTokenPayload = (token:string) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  };
  
  export default getAuth;