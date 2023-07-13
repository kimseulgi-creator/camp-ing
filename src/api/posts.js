import axios from 'axios';

const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

const addPost = async (newPost) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPost);
};

const deletePost = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
};

const editPost = async (editPost) => {
  console.log(editPost);
  await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/posts/${editPost.id}`,
    editPost
  );
};

export { getPosts, addPost, deletePost, editPost };
