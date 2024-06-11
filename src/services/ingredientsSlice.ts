import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';


export const getIngredients = createAsyncThunk(
  "ingredients/getAll",
  async () => {
    return getIngredientsApi();
  }
)

type TIngredientsState = {
  ingredients: Array<TConstructorIngredient>;
  // loading: boolean;
  // error: string | null;
};

const initialState: TIngredientsState = {
  ingredients: [],
  // loading: false,
  // error: null
};

const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {

  },
  selectors: {
    getBooksSelector: (state) => state, 
  }, 
  extraReducers: (builder) => {
    // builder
    //       .addCase(getBooks.pending, (state) => {
    //     state.loading = true;
    //   state.error = null;
    //       })
    // .addCase(getBooks.rejected, (state, action) => {
    //     state.loading = false;
    //   state.error = action.error.message;
    // })
    // .addCase(getBooks.fulfilled, (state, action) => {
    //           state.loading = false;
    //   state.books = action.payload;    
    }
  },
});

// export { reducer } = bookSlice.reducer;
// export { getBookSelector } = bookSlice.selectors;
