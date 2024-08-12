import { createSlice } from '@reduxjs/toolkit';
import { getIngredients } from '../thunk/ingredients';
import { RequestStatus, TIngredient } from '../../utils/types';

type TIngredientsState = {
  ingredients: Array<TIngredient>;
  requestStatus: RequestStatus;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientsSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});

export const { getIngredientsSelector } = ingredientsSlice.selectors;
