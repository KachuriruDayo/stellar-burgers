import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { feedsSlice } from './slices/feedsSlice';
import { constructorSlice } from './slices/burgerConstructorSlice';
import { userSlice } from './slices/userSlice';
import { ordersSlice } from './slices/orderSlice';

const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [ordersSlice.name]: ordersSlice.reducer
});

export default rootReducer;
