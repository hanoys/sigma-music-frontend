import axios from "axios";

const API_BASE_URL = "http://localhost:80/api/v1";

export async function apiRequest(url: string, method: string='get', payload?: object, token?: string) {
    let data, error

    let headers = {}
    if (token) {
        headers = {'Authorization': token}
    }

    await axios({
        method: method,
        url: API_BASE_URL + url,
        withCredentials: true,
        data: payload,
        headers: headers
    })
        .then(resp => {
            data = resp.data;
        })
        .catch(err => {
            error = err.response.data
        });

    return {data, error}
}