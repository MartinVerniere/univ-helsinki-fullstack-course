import axios from 'axios';

const baseURL = 'http://localhost:3001/api/notes';

const getAll = () => {
    const request = axios.get(baseURL);
    return request.then(response => response.data);
}

const create = (newNote) => {
    const request = axios.post(baseURL, newNote);
    return request.then(response => response.data);
}

const update = (id, newNote) => {
    const request = axios.put(`${baseURL}/${id}`, newNote);
    return request.then(response => response.data);
}

export default { getAll, create, update };
