import {
  getUser,
  updateUser,
  logout,
  registerUser,
  loginUser
} from './../thunk/user';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { TUser, RequestStatus } from './../../utils/types';
import { createSlice } from '@reduxjs/toolkit';

type TUserData = {
  userData: TUser;
  isAuth: boolean;
  requestStatus: RequestStatus;
};

const initialState: TUserData = {
  userData: {
    name: '',
    email: ''
  },
  isAuth: false,
  requestStatus: RequestStatus.Idle
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
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(getUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(getUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.userData = action.payload.user;
        state.isAuth = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
        state.userData = action.payload.user;
        state.isAuth = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        deleteCookie('accessToken');
        state.userData = { name: '', email: '' };
        state.isAuth = false;
        state.requestStatus = RequestStatus.Idle;
      })
      .addCase(logout.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logout.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
  }
});

export const { getUserSelector } = userSlice.selectors;
