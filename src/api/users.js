import axios from 'axios';

const getUsers = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
  console.log(response.data);
  return response.data;
};

const addUser = async (newUser) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, newUser);
};

const editUser = async (loginUser) => {
  console.log(loginUser);
  const { id, isLogin } = loginUser;
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, {
    isLogin,
  });
};

export { getUsers, addUser, editUser };
