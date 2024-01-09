import axios from 'axios';
const API_URL = `https://ooq5mqxlu8.execute-api.ap-southeast-2.amazonaws.com/default/neptuneViewerApis?`;
const POST_API_URL = `https://7chg1o6vnc.execute-api.ap-southeast-2.amazonaws.com/default/gemsPushServices`;
const POST_Alerts_API_URL = `https://kiln7uoo76.execute-api.ap-southeast-2.amazonaws.com/default/postgresCrudFuncsForUI`;




export const getApiDataFromAws = async (item) => {
    try {
        const response = await axios.get(API_URL + item);
        const data = response.data;
        return data;
    } catch (error) {
        return console.error('Error fetching data:', error);
    }
}

const body = {
    funcName: "createStateRecordsFromJson",
    recList: [{ stateName: "TestState123FromGEMS" }],
  };
  
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
        return console.error('Error fetching data:', error);
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
        return console.error('Error fetching data:', error);
    }
}