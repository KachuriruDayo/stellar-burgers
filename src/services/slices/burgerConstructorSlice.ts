import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  TIngredient,
  TConstructorIngredient,
  TMoveIngredient
} from '../../utils/types';
import { v4 as uuid } from 'uuid';

type TIngredientsState = {
  bun: TConstructorIngredient | null;
  ingredients: Array<TConstructorIngredient>;
};

const initialState: TIngredientsState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'contructor',
  initialState,
  reducers: {
    addToConstructor: {
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      }),
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients === undefined
            ? (state.ingredients = [payload])
            : state.ingredients.push(payload);
        }
      }
    },
    moveElement: (state, { payload }: PayloadAction<TMoveIngredient>) => {
      const idArr: string[] = [];
      state.ingredients.map((ingredient) => {
        idArr.push(ingredient.id);
      });

      const index = idArr.indexOf(payload.ingredient.id);

      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== payload.ingredient.id
      );

      if (payload.direction === 'up') {
        state.ingredients.splice(index - 1, 0, payload.ingredient);
      } else {
        state.ingredients.splice(index + 1, 0, payload.ingredient);
      }
    },
    deleteElement: (
      state,
      { payload }: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== payload.id
      );
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    getConstructorSelector: (state) => state
  }
});

export const { getConstructorSelector } = constructorSlice.selectors;
export const {
  addToConstructor,
  moveElement,
  deleteElement,
  resetConstructor
} = constructorSlice.actions;
