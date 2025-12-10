import axios from 'axios';


const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
console.log("Backend URL in fetchProduct.js:", backendURL);
const token = localStorage.getItem('token');
console.log("Token in cartApi.js:", token);


const userLogin = async (email, pass) => {
    try{
        const response = await axios.post(`${backendURL}/api/auth/login`, {
            email,
            pass
        });
        return response;
    }
    catch(error){
        console.error("Error during user login:", error);
        throw error;
    }
}


const userRegister = async (userName, email, password) => {
    try {
        const response = await axios.post(`${backendURL}/api/auth/register`, {
            userName,
            email,
            pass: password
        });
        return response;
    }
    catch(error){
        console.error("Error during user registration:", error);
        throw error;
    }
}


export {
    userLogin,
    userRegister
}