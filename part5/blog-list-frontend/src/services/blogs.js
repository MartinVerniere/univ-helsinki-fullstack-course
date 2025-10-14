import axios from 'axios'
const baseURL = '/api/blogs'

let token = null;
const setToken = newToken => { token = `Bearer ${newToken}` }

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
}

const create = (newBlog) => {
  const config = { headers: { Authorization: token } };
  const request = axios.post(baseURL, newBlog, config);
  return request.then(response => response.data);
}

export default { getAll, create, setToken }