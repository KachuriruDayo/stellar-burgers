import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, getOrdersApi, getOrderByNumberApi } from '@api';

export const createNewOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => orderBurgerApi(data)
);

export const getOrders = createAsyncThunk('user/getOrders', async () =>
  getOrdersApi()
);

export const getOrderByNumber = createAsyncThunk(
  'order/getByNum',
  async (number: number) => getOrderByNumberApi(number)
);
