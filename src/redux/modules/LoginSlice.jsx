import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  password: '',
  userId: '',
  isLogin: '',
};

// isLogin:true인 user 데이터 추출
const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const filterLoginUser = action.payload.filter((user) => {
        return user.isLogin === true;
      });
      const [loginUser] = filterLoginUser;
      return (state = loginUser);
    },
  },
});

export const { loginUser } = LoginSlice.actions;
export default LoginSlice.reducer;
