import { createSlice } from '@reduxjs/toolkit';
import { getOrders, getOrderByNumber } from '../thunk/order';
import { TOrder } from '@utils-types';

type TOrderState = {
  userOrders: TOrder[];
  orderByNum: TOrder | undefined;
};

const initialState: TOrderState = {
  userOrders: [],
  orderByNum: undefined
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getOrdersSelector: (state) => state,
    getOrderByNumSelector: (state) => state.orderByNum
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderByNum = undefined;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNum = action.payload.find(function (order) {
          return order;
        });
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        console.log(action.payload);
      });
  }
});

export const { getOrdersSelector, getOrderByNumSelector } =
  ordersSlice.selectors;
