import axios from 'axios';
// const API_URL = `https://my-json-server.typicode.com/balajigite16/bwjson`;
const API_URL = `https://my-json-server.typicode.com/dnyanesh94/demo-data`

export const getAlertConfList = async () => {
    return axios.get(`${API_URL}/alertConfiguration `).then((resp) => {
        return resp?.data
    }).catch((error) => {
        return error
    }
    )
}
export const addAlertConf = async (data) => {
    return axios.post(`${API_URL}/alertConfiguration`, data).then((resp) => {
        return resp?.data
    }).catch((error) => {
        return error
    }
    )
}


export const deleteAlertConf = async (id) => {
    return axios.delete(`${API_URL}/alertConfiguration/${id}`).then((resp) => {
        return resp?.data
    }).catch((error) => {
        return error
    }
    )
}

export const editAlertConf = async (id, data) => {
    return axios.put(`${API_URL}/alertConfiguration/${id}`, data).then((resp) => {
        return resp?.data
    }).catch((error) => {
        return error
    }
    )
}