import { getOrderByNumber, getOrders } from "../thunk/order";
import { ordersSlice } from "../slices/orderSlice";

const ordersReducer = ordersSlice.reducer;

const initialState = {
  userOrders: [],
  orderByNum: undefined
};

const mockRequestData = [
    {
      _id: 'sue43j67jys9iekg',
      status: 'done',
      name: 'Dave',
      createdAt: 'morning',
      updatedAt: 'noon',
      number: 43256,
      ingredients: ['id64582','id725245']
    }
  ]

const mockOrderData = {
  _id: 'sue43j67jys9iekg',
      status: 'done',
      name: 'Dave',
      createdAt: 'morning',
      updatedAt: 'noon',
      number: 43256,
      ingredients: ['id64582','id725245']
}


describe('test ordersSlice',() => {

  it('should get user orders and add it in state',() => {
    const referenceState = {
      userOrders: mockRequestData,
      orderByNum: undefined
    }

    const actualState = ordersReducer(
      {
        ...initialState
      },
      getOrders.fulfilled(mockRequestData, '')
    )
    
    expect(actualState).toEqual(referenceState)
  });

  it('should get order by number and add it in state',() => {
    const referenceState = {
      userOrders: [],
      orderByNum: mockOrderData
    }

    const actualState = ordersReducer(
      {
        ...initialState
      },
      getOrderByNumber.fulfilled(mockRequestData, '', 434221)
    )
    
    expect(actualState).toEqual(referenceState)
  });

  it('should toggle orderByNumber to undefined by pending',() => {
    const referenceState = {
      userOrders: [],
      orderByNum: undefined
    }

    const actualState = ordersReducer(
      {
        ...initialState
      },
      getOrderByNumber.pending('', 434221)
    )
    
    expect(actualState).toEqual(referenceState)
  });
});
