import axios from 'axios';

const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
  return response.data;
};

const addUser = async (newUser) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, newUser);
};

export { getUsers, addUser };
