import {
  getUser,
  updateUser,
  logout,
  registerUser,
  loginUser
} from './../thunk/user';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';

type TUserData = {
  userData: TUser;
  isAuth: boolean;
};

const initialState: TUserData = {
  userData: {
    name: '',
    email: ''
  },
  isAuth: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.userData = action.payload.user;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        deleteCookie('accessToken');
        state.userData = { name: '', email: '' };
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        console.log(action.payload);
      });
  }
});

export const { getUserSelector } = userSlice.selectors;
