interface LoginResponse {
    token: string;
    // Add other properties if the server response contains more data
}

const api_url: string = `http://localhost:8000`; 

// A function to send the login request to the server
const logIn = async (formData: { [key: string]: string }): Promise<LoginResponse> => {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
    };
    console.log("About to send request");
    console.log(requestOptions.body);
    const response = await fetch(`${api_url}/api/user/login`, requestOptions);
    return response.json(); // parse the response as JSON
};

// A function to log out the user
const logOut = () => {
    localStorage.removeItem("user");
};

// Export the functions
export { logIn as default, logOut };