import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = (newBlog) => {
	const request = axios.post(baseUrl, newBlog);
	return request.then((response) => response.data);
};

const update = (id, updatedBlog) => {
	const request = axios.put(`${baseUrl}/${id}`, updatedBlog);
	return request.then((response) => response.data);
};

export default { getAll, create, update };
