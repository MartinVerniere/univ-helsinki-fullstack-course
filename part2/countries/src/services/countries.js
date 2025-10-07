import axios from 'axios';

const baseURL = 'http://localhost:3001/countries';

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const getByName = (id) => {
    const request = axios.get(`${baseURL}/${id}`);
    return request.then(response => response.data);
}

export default { getAll, getByName };