import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

//get data from server
const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

//save new data to server
const add = (newPerson) => {
	const request = axios.post(baseUrl, newPerson);
	return request.then((response) => response.data);
};

//delete data from server
const del = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then((response) => response.data);
};

//amend data and save to server
const update = (id, number) => {
	const request = axios.put(`${baseUrl}/${id}`, number);
	return request.then((response) => response.data);
};

export default { getAll, add, del, update };
