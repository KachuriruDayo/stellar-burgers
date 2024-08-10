import { getIngredients } from '../../thunk/ingredients';
import { ingredientsSlice } from '../ingredientsSlice';
import { RequestStatus } from '../../../utils/types';

const ingredientsReducer = ingredientsSlice.reducer;

const initialState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

const mockRequestData = [
  {
    _id: '732ud3sjkhd3',
    name: 'moon bun',
    type: 'bun',
    proteins: 12,
    fat: 7,
    carbohydrates: 2,
    calories: 75,
    price: 780,
    image: 'localImg',
    image_large: 'bigLocalImg',
    image_mobile: 'mobiLocalImg'
  },
  {
    _id: '732ud3sjkhd3',
    name: 'moon meat',
    type: 'ingredient',
    proteins: 36,
    fat: 34,
    carbohydrates: 9,
    calories: 175,
    price: 1400,
    image: 'localImg1',
    image_large: 'bigLocalImg1',
    image_mobile: 'mobiLocalImg1'
  }
];

const mockReferenceState = {
  ingredients: [
    {
      _id: '732ud3sjkhd3',
      name: 'moon bun',
      type: 'bun',
      proteins: 12,
      fat: 7,
      carbohydrates: 2,
      calories: 75,
      price: 780,
      image: 'localImg',
      image_large: 'bigLocalImg',
      image_mobile: 'mobiLocalImg'
    },
    {
      _id: '732ud3sjkhd3',
      name: 'moon meat',
      type: 'ingredient',
      proteins: 36,
      fat: 34,
      carbohydrates: 9,
      calories: 175,
      price: 1400,
      image: 'localImg1',
      image_large: 'bigLocalImg1',
      image_mobile: 'mobiLocalImg1'
    }
  ],
  requestStatus: RequestStatus.Success
};

describe('test ingredientsSlice',() => {

  it('should set Loading to RequestStatus when pending is dispatch',() => {

    const referenceState = {
      ingredients: [],
      requestStatus: RequestStatus.Loading
    };

    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      getIngredients.pending('')
    );

    expect(actualState).toEqual(referenceState);
  });

  it('should set Success to RequestStatus and add ingredients in data when fulfilled is dispatch',() => {

    const actualState = ingredientsReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getIngredients.fulfilled(mockRequestData, 'success')
    );

    expect(actualState).toEqual(mockReferenceState);
  });

  it('should set Failed to RequestStatus when rejected is dispatch',() => {

    const referenceState = {
      ingredients: [],
      requestStatus: RequestStatus.Failed
    };

    const actualState = ingredientsReducer(
      {
        ...initialState,
        requestStatus: RequestStatus.Loading
      },
      getIngredients.rejected(Error('403'),'')
    );

    expect(actualState).toEqual(referenceState);
  });
});
