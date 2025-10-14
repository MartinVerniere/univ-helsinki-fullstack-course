import axios from 'axios';
const baseURL = '/api/notes';

let token = null
const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const create = async (newNote) => {
    const config = { headers: { Authorization: token } };
    const response = await axios.post(baseURL, newNote, config);
    return response.data;
}

const update = (id, newNote) => {
    const request = axios.put(`${baseURL}/${id}`, newNote);
    return request.then(response => response.data);
}

export default { getAll, create, update, setToken }