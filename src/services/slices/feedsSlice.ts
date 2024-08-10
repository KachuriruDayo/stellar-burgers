import { getFeeds } from './../thunk/feeds';
import { createSlice } from '@reduxjs/toolkit';
import { RequestStatus, TOrdersData } from '../../utils/types';

type TFeedsState = {
  data: TOrdersData;
  requestStatus: RequestStatus;
};

const initialState: TFeedsState = {
  data: {
    orders: [],
    total: 0,
    totalToday: 0
  },
  requestStatus: RequestStatus.Idle
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const { getFeedsSelector } = feedsSlice.selectors;
