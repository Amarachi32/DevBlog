//export const baseUrl = "http://localhost:5050";
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('Final baseUrl:', baseUrl);
export const baseUrl = process.env.REACT_APP_API_URL || "/api";
//export const baseUrl = process.env.REACT_APP_API_URL || "https://devblog-backend-prod.onrender.com";
