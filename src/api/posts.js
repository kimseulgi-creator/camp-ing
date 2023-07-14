import axios from 'axios';

// Post 데이터 가져오기
const getPosts = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
  return response.data;
};

// Post 데이터 추가하기
const addPost = async (newPost) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPost);
};

// Post 데이터 삭제하기
const deletePost = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
};

// Post 데이터 수정하기
const editPost = async (editPost) => {
  await axios.put(
    `${process.env.REACT_APP_SERVER_URL}/posts/${editPost.id}`,
    editPost
  );
};

export { getPosts, addPost, deletePost, editPost };
