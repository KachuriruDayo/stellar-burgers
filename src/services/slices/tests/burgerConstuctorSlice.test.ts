import {
  addToConstructor,
  moveElement,
  deleteElement,
  resetConstructor,
  constructorSlice
} from '../burgerConstructorSlice';

const constructorReducer = constructorSlice.reducer;

const initialState = {
  bun: null,
  ingredients: []
};

const mockAddIngredient = {
  _id: '32bef',
  name: 'space bun',
  type: 'bun',
  proteins: 7,
  fat: 5,
  carbohydrates: 2,
  calories: 78,
  price: 799,
  image: 'bunImage',
  image_large: 'largeBunImage',
  image_mobile: 'mobiBunImage'
};

const mockAddConstructorIngredient = {
  id: 'testId',
  _id: '32bef',
  name: 'space bun',
  type: 'bun',
  proteins: 7,
  fat: 5,
  carbohydrates: 2,
  calories: 78,
  price: 799,
  image: 'bunImage',
  image_large: 'largeBunImage',
  image_mobile: 'mobiBunImage'
};

type TIngredientWithId = {
  id: string | undefined;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

const mockAddIngredientWithId: TIngredientWithId = {
  id: 'testId',
  _id: '32bef',
  name: 'space bun',
  type: 'bun',
  proteins: 7,
  fat: 5,
  carbohydrates: 2,
  calories: 78,
  price: 799,
  image: 'bunImage',
  image_large: 'largeBunImage',
  image_mobile: 'mobiBunImage'
};

const mockArrConstructorIngredients = [
  {
    id: '1',
    _id: '37bey',
    name: 'space mushroom',
    type: 'ingredient',
    proteins: 7,
    fat: 5,
    carbohydrates: 2,
    calories: 78,
    price: 799,
    image: 'mushroomImage',
    image_large: 'largeMushroomImage',
    image_mobile: 'mobiMushroomImage'
  },
  {
    id: '2',
    _id: '32bay',
    name: 'space meat',
    type: 'ingredient',
    proteins: 23,
    fat: 16,
    carbohydrates: 7,
    calories: 135,
    price: 1588,
    image: 'meetImage',
    image_large: 'largeMeetImage',
    image_mobile: 'mobiMeetImage'
  },
  {
    id: '3',
    _id: '26far',
    name: 'space souce',
    type: 'ingredient',
    proteins: 4,
    fat: 13,
    carbohydrates: 4,
    calories: 90,
    price: 677,
    image: 'souceImage',
    image_large: 'largeSouceImage',
    image_mobile: 'mobiSouceImage'
  }
];

const mockOneDelConstructorIngredientsArr = [
  {
    id: '2',
    _id: '32bay',
    name: 'space meat',
    type: 'ingredient',
    proteins: 23,
    fat: 16,
    carbohydrates: 7,
    calories: 135,
    price: 1588,
    image: 'meetImage',
    image_large: 'largeMeetImage',
    image_mobile: 'mobiMeetImage'
  },
  {
    id: '3',
    _id: '26far',
    name: 'space souce',
    type: 'ingredient',
    proteins: 4,
    fat: 13,
    carbohydrates: 4,
    calories: 90,
    price: 677,
    image: 'souceImage',
    image_large: 'largeSouceImage',
    image_mobile: 'mobiSouceImage'
  }
];

const mockEditUpArrConstructorIngredients = [
  {
    id: '1',
    _id: '37bey',
    name: 'space mushroom',
    type: 'ingredient',
    proteins: 7,
    fat: 5,
    carbohydrates: 2,
    calories: 78,
    price: 799,
    image: 'mushroomImage',
    image_large: 'largeMushroomImage',
    image_mobile: 'mobiMushroomImage'
  },
  {
    id: '3',
    _id: '26far',
    name: 'space souce',
    type: 'ingredient',
    proteins: 4,
    fat: 13,
    carbohydrates: 4,
    calories: 90,
    price: 677,
    image: 'souceImage',
    image_large: 'largeSouceImage',
    image_mobile: 'mobiSouceImage'
  },
  {
    id: '2',
    _id: '32bay',
    name: 'space meat',
    type: 'ingredient',
    proteins: 23,
    fat: 16,
    carbohydrates: 7,
    calories: 135,
    price: 1588,
    image: 'meetImage',
    image_large: 'largeMeetImage',
    image_mobile: 'mobiMeetImage'
  }
];

const mockMoveUpIngredient = {
  direction: 'up',
  ingredient: {
    id: '3',
    _id: '26far',
    name: 'space souce',
    type: 'ingredient',
    proteins: 4,
    fat: 13,
    carbohydrates: 4,
    calories: 90,
    price: 677,
    image: 'souceImage',
    image_large: 'largeSouceImage',
    image_mobile: 'mobiSouceImage'
  }
};

const mockMoveDownIngredient = {
  direction: 'down',
  ingredient: {
    id: '3',
    _id: '26far',
    name: 'space souce',
    type: 'ingredient',
    proteins: 4,
    fat: 13,
    carbohydrates: 4,
    calories: 90,
    price: 677,
    image: 'souceImage',
    image_large: 'largeSouceImage',
    image_mobile: 'mobiSouceImage'
  }
};

const mockDelIngredient = {
  id: '1',
  _id: '37bey',
  name: 'space mushroom',
  type: 'ingredient',
  proteins: 7,
  fat: 5,
  carbohydrates: 2,
  calories: 78,
  price: 799,
  image: 'mushroomImage',
  image_large: 'largeMushroomImage',
  image_mobile: 'mobiMushroomImage'
};

describe('test constructorSlice', () => {
  it('should add ingredient in constructor with unique id', () => {
    let referenceState = {
      bun: mockAddIngredientWithId,
      ingredients: []
    };

    const actualState = constructorReducer(
      {
        ...initialState
      },
      addToConstructor(mockAddIngredient)
    );

    expect(actualState.bun).toHaveProperty('id');

    referenceState.bun.id = actualState.bun?.id;

    expect(actualState).toEqual(referenceState);
  });

  it('should move ingrediet up and down in state', () => {
    const actualStateUp = constructorReducer(
      {
        ...initialState,
        ingredients: mockArrConstructorIngredients
      },
      moveElement(mockMoveUpIngredient)
    );

    const actualStateDown = constructorReducer(
      {
        ...initialState,
        ingredients: mockEditUpArrConstructorIngredients
      },
      moveElement(mockMoveDownIngredient)
    );

    expect(actualStateUp.ingredients).toEqual(
      mockEditUpArrConstructorIngredients
    );
    expect(actualStateDown.ingredients).toEqual(mockArrConstructorIngredients);
  });

  it('should delete one ingredient from state', () => {
    const actualState = constructorReducer(
      {
        ...initialState,
        ingredients: mockArrConstructorIngredients
      },
      deleteElement(mockDelIngredient)
    );

    expect(actualState.ingredients).toEqual(
      mockOneDelConstructorIngredientsArr
    );
  });

  it('should reset state date to default values', () => {
    const actualState = constructorReducer(
      {
        bun: mockAddConstructorIngredient,
        ingredients: mockArrConstructorIngredients
      },
      resetConstructor()
    );

    expect(actualState).toEqual(initialState);
  });
});
