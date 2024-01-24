import axios from 'axios';
const API_URL = `https://ooq5mqxlu8.execute-api.ap-southeast-2.amazonaws.com/default/neptuneViewerApis?`;
const POST_API_URL = `https://7chg1o6vnc.execute-api.ap-southeast-2.amazonaws.com/default/gemsPushServices`;
const POST_Alerts_API_URL = `https://kiln7uoo76.execute-api.ap-southeast-2.amazonaws.com/default/postgresCrudFuncsForUI`;
const CONFIG_URL = `https://ooq5mqxlu8.execute-api.ap-southeast-2.amazonaws.com/default/neptuneViewerApis?queryType=viewerConfig`

const storedToken = localStorage.getItem('jwtToken');
export const isAuthenticated = (tokenData=false) =>{
    var decodedToken = null;
    var isValidToken = false;
    try {
        const decodeIdToken = (token) => {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      
            return JSON.parse(jsonPayload);
        };
        decodedToken = decodeIdToken(storedToken);
        console.log('Decoded Token:', decodedToken);
    } catch (error) {
        console.error('Error decoding token:', error.message);
    }
    if(tokenData){
        return decodedToken;
    }
    return isValidToken;
}

export const userInfo = (token) =>{
    var decodedToken = null;
    try {
        const decodeIdToken = (token) => {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      
            return JSON.parse(jsonPayload);
        };
        if(token !=null){
            decodedToken = decodeIdToken(token);
        }
        console.log('Decoded Token:', decodedToken);
    } catch (error) {
        console.error('Error decoding token:', error.message);
    }
   return decodedToken
}

export const getApiDataFromAws = async (item) => {
    try {
        const headers = {
            'jwtToken': storedToken,
        };

        const response = await axios.get(API_URL + item);
        const data = response.data;
        return data;
    } catch (error) {
         console.error('Error fetching data:', error);    
    }
}
  
export const postApiDataToAws = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': '5DwkxSENaM4vfLyRYMeRHaxViuV7Nhvv21sYu9P4'
        };

        const response = await axios.post(POST_API_URL, body, {headers});
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response.data
    }
}

export const postAlertsApiDataToAws = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': '30jiTelrj53mcKS1AtDblnD4iizBj1U1ZZS8o93j'
        };

        const response = await axios.post(POST_Alerts_API_URL, body, {headers});
        const data = response.data;
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getConfigDataFromAws = async (item) => {
    try {
        const response = await axios.get(CONFIG_URL);
        const data = response.data[item];
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
}

const login = async () => {
    try {
      const response = await axios.get('https://auth.apeiron.network/login', {
        params: {
          client_id: '6jk6h3n6hukhkqvul7hcqfh05u',
          response_type: 'token',
          scope: 'email openid phone profile',
          redirect_uri: 'https://your-redirect-uri.com/callback',
        },
      });
  
      // Handle the response, which may contain the JWT token.
      const jwtToken = response.data.token;
      // Continue with token handling...
    } catch (error) {
      // Handle errors
      console.error('Error during login:', error);
    }
  };