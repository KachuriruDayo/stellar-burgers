import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  logoutApi,
  updateUserApi,
  getUserApi,
  registerUserApi,
  loginUserApi
} from '../../utils/burger-api';

export const getUser = createAsyncThunk('user/getData', getUserApi);

export const updateUser = createAsyncThunk('user/updateData', updateUserApi);

export const registerUser = createAsyncThunk('user/register', registerUserApi);

export const loginUser = createAsyncThunk('user/login', loginUserApi);

export const logout = createAsyncThunk('user/logout', logoutApi);
