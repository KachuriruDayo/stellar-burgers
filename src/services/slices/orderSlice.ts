import { createSlice } from '@reduxjs/toolkit';
import { getOrders, getOrderByNumber } from '../thunk/order';
import { TOrder, RequestStatus } from '../../utils/types';

type TOrderState = {
  userOrders: TOrder[];
  userOrdersRequest: RequestStatus;
  orderByNum: TOrder | undefined;
  orderByNumRequest: RequestStatus;
};

const initialState: TOrderState = {
  userOrders: [],
  userOrdersRequest: RequestStatus.Idle,
  orderByNum: undefined,
  orderByNumRequest: RequestStatus.Idle
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
      .addCase(getOrders.pending, (state) => {
        state.userOrdersRequest = RequestStatus.Loading;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.userOrders = action.payload;
        state.userOrdersRequest = RequestStatus.Success;
      })
      .addCase(getOrders.rejected, (state) => {
        state.userOrdersRequest = RequestStatus.Failed;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.orderByNumRequest = RequestStatus.Loading;
        state.orderByNum = undefined;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNum = action.payload.find(function (order) {
          return order;
        });
        state.orderByNumRequest = RequestStatus.Success;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.orderByNumRequest = RequestStatus.Failed;
      });
  }
});

export const { getOrdersSelector, getOrderByNumSelector } =
  ordersSlice.selectors;
