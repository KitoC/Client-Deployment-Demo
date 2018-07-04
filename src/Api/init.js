import axios from 'axios'


// Create an axios instance
const api = axios.create({
    baseURL: 'https://express-mongo-passport-qosevaoepq.now.sh'
})

// Add the bearer token to the axios instance
// Axios will then add this header with every subsequent request
const setJwt = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { api, setJwt }
