import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';

export const createNewOrder = createAsyncThunk('order/create', orderBurgerApi);

export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNum',
  getOrderByNumberApi
);
