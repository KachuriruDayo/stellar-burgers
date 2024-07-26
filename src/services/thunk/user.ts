import { TRegisterData, TLoginData } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  logoutApi,
  updateUserApi,
  getUserApi,
  registerUserApi,
  loginUserApi
} from '@api';

export const getUser = createAsyncThunk('user/getData', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateData',
  async (data: TRegisterData) => updateUserApi(data)
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => loginUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());
