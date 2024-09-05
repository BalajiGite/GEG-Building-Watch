import axios from 'axios';
const API_URL = `https://ooq5mqxlu8.execute-api.ap-southeast-2.amazonaws.com/default/neptuneViewerApis?`;
const POST_API_URL = `https://7chg1o6vnc.execute-api.ap-southeast-2.amazonaws.com/default/gemsPushServices`;
const POST_Alerts_API_URL = `https://kiln7uoo76.execute-api.ap-southeast-2.amazonaws.com/default/postgresCrudFuncsForUI`;
const CONFIG_URL = `https://ooq5mqxlu8.execute-api.ap-southeast-2.amazonaws.com/default/neptuneViewerApis?queryType=viewerConfig`
const MP_READINGS_URL = `https://2uwa6zvw9a.execute-api.ap-southeast-2.amazonaws.com/default/generateSiteConsumptionsForView`
const COMPUTE_PROFILE_URL = 'https://yn6x0486e6.execute-api.ap-southeast-2.amazonaws.com/default/generateSiteUtilityProfile?'
const AUTH_URL = 'https://df6no14ahf.execute-api.ap-southeast-2.amazonaws.com/default/validateJwtTokenAndGetUserWidgetAccess'
const UserPolicy_URL = 'https://or3yvho811.execute-api.ap-southeast-2.amazonaws.com/default/avpPolicies'

var localToken = "";
const decodeIdToken = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
};

export const isAuthenticated = async (tokenData = false) => {
    var decodedToken = null;
    var isValidToken = false;
    try {
        console.log("Inside is Authentication");
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken != null) {
            decodedToken = decodeIdToken(jwtToken);
            const date = new Date(decodedToken.exp * 1000);
            date.setMinutes(date.getMinutes() - 15);
            if (date < new Date()) {
                console.log("inside Refresh token" + date + "new date" + new Date());
                isValidToken = await refreshToken();
            } else {
                isValidToken = true;
                console.log("Refresh token not called" + date + "new date" + new Date());
            }
        }
    } catch (error) {
        console.error('Error decoding token:', error.message);
    }
    if (tokenData) {
        return decodedToken;
    }
    //console.log("isValidToken: " + isValidToken);
    return isValidToken;
}


export const userInfo = (token) =>{
    var decodedToken = null;
    try {
        if(Object.keys(token).length !== 0){
            decodedToken = decodeIdToken(token);
            localToken = token;
        }
        //console.log('Decoded Token:', decodedToken);
    } catch (error) {
        console.error('Error decoding token:', error.message);
    }
   return decodedToken
}

export const getApiDataFromAws = async (item) => {
    try {
        //console.log("local storage: "+localStorage.getItem('jwtToken') )
        //console.log("local token: "+localToken )
        //console.log("Tokens Data:" + localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'))
        const headers = {
            'Authorization': localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'),
        };

        const response = await axios.get(API_URL + item, {headers});
        const data = response.data;
        return data;
    } catch (error) {
         console.error('Error fetching data:', error);    
    }
}

export const getRecompueteProfile = async (item) => {
    try {
        const headers = {
            'Authorization': localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'),
        };

        const response = await axios.get(COMPUTE_PROFILE_URL + item, {headers});
        const data = response.data;
        return data;
    } catch (error) {
         console.error('Error fetching data:', error);    
    }
}

export const getUserProfiles = async () => {
  try {
    const response = await axios.get(UserPolicy_URL);
    const data = response.data;
    return data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Error request:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  }
};

  
export const postApiDataToAws = async (body) => {
    try {
        //console.log("My jwtToken" + localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'))
        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': '5DwkxSENaM4vfLyRYMeRHaxViuV7Nhvv21sYu9P4',
            'Authorization': localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'),
        };

        const response = await axios.post(POST_API_URL, body, {headers});
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response.data
    }
}

export const postMpReadingsDataToAws = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
           // 'x-api-key': '5DwkxSENaM4vfLyRYMeRHaxViuV7Nhvv21sYu9P4',
            'Authorization': localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'),
        };

        const response = await axios.post(MP_READINGS_URL, body, {headers});
        const data = response.data;
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return error.response.data
    }
}

const parseJSON = (responseData) => {
    try {
        return JSON.parse(responseData.replace(/NaN/g, "null"));
    } catch (error) {
        return responseData;
    }
};

export const postAlertsApiDataToAws = async (body) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'x-api-key': '30jiTelrj53mcKS1AtDblnD4iizBj1U1ZZS8o93j',
            'Authorization': localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'),
        };

        const response = await axios.post(POST_Alerts_API_URL, body, {headers});
        const data = parseJSON(response.data);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const getConfigDataFromAws = async (item) => {
    try {
        const headers = {
            'Authorization': localStorage.getItem('jwtToken') == null?localToken:localStorage.getItem('jwtToken'),
        };
        const response = await axios.get(CONFIG_URL, {headers});
        const data = response.data[item];
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
}

export const validateAuth = async (token) => {
    try {
        try {
            const headers = {
                'Authorization': token,
                'Content-Type': 'application/json',
                'x-api-key': 'rAQSMoSRmE3fCPvbe6q0Q7z0UbDh9qJh4tXFLs13'
            };
            const response = await axios.get(AUTH_URL, {headers});
            console.log(response)
            const data = response.data;
            return data;
        } catch (error) {
            return {isTokenValid: false};
             console.error('Error fetching data:', error);    
        }
    }catch(error){

    }
}

export const login = async (code) => {
    try {

        const clientId = '6jk6h3n6hukhkqvul7hcqfh05u';
        const clientSecret = '1vuaa8jb2m5t4hb95cgtmuuhb0nptm7bjfasp9lpovjrssj9kflo'; // Replace with your actual client secret
        const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
        };

        var params =  {
            grant_type: 'authorization_code',
            code: code,
            client_id: '6jk6h3n6hukhkqvul7hcqfh05u',
            client_secret: '1vuaa8jb2m5t4hb95cgtmuuhb0nptm7bjfasp9lpovjrssj9kflo',
            scope: 'email openid phone profile',
            redirect_uri: 'https://gems2.d2hjsv3slbr4gu.amplifyapp.com/callback',
            //redirect_uri: 'http://localhost:3000/callback',
            //redirect_uri: 'https://sbm.verdeos.com/callback',
        };

       //console.log("Checking code" + code);
       const response = await axios.post('https://auth.apeiron.network/oauth2/token',params, {headers});

      // Handle the response, which may contain the JWT token.
      const tokensData = response.data;
      return tokensData;
    } catch (error) {
      // Handle errors
      console.error('Error during login:', error);
    }
  };

  export const refreshToken = async () => {
    try {

        //console.log("refreshToken:" + localStorage.getItem('refreshToken'))
        if (localStorage.getItem('refreshToken') === null || localStorage.getItem('refreshToken') === "undefined") {
           handleSignOut()
        }

        const clientId = '6jk6h3n6hukhkqvul7hcqfh05u';
        const clientSecret = '1vuaa8jb2m5t4hb95cgtmuuhb0nptm7bjfasp9lpovjrssj9kflo'; 
        const authHeader = `Basic ${btoa(`${clientId}:${clientSecret}`)}`;
        var headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': authHeader,
        };

        var params =  {
            grant_type: 'refresh_token',
            refresh_token: localStorage.getItem('refreshToken'),
            client_id: '6jk6h3n6hukhkqvul7hcqfh05u',
          };

       const response = await axios.post('https://auth.apeiron.network/oauth2/token',params, {headers});

      // Handle the response, which may contain the JWT token.
      const tokensData = response.data;
      setupTokens(tokensData)
      //console.log("tokensData:" + tokensData)
      return true;
    } catch (error) {
      // Handle errors
      console.error('Errorupdating id_token:', error);
      return false
    }
  };

  export const removeToken = async () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expires_in');
    localStorage.removeItem("isPolicyExist");
    localStorage.removeItem("isWidgetAccessFilter");
  }
  
  export const setupTokens = async(awsTokens)=>{
    const token = awsTokens.id_token; 
    localToken = token;
    const refresh_token = awsTokens.refresh_token;
    const expires_in = awsTokens.expires_in;
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('refreshToken', refresh_token);
    localStorage.setItem('expires_in', expires_in);
  }

  export const handleSignOut = () => {
    removeToken()
    window.location.href = 'https://auth.apeiron.network/logout';
    window.location.href = '/';
  };